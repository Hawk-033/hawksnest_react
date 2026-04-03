# Hawksnest React - Ubuntu VPS Setup Guide

**Target VPS:** 107.173.112.38  
**OS:** Ubuntu (22.04 LTS recommended)

## Prerequisites & System Setup

### 1. Initial VPS Configuration

```bash
# Connect to VPS
ssh root@107.173.112.38

# Update system packages
sudo apt update && sudo apt upgrade -y

# Install required system dependencies
sudo apt install -y \
  curl \
  git \
  build-essential \
  python3 \
  postgres \
  postgresql-contrib \
  nginx \
  certbot \
  python3-certbot-nginx
```

### 2. Install Node.js & Bun Runtime

**Option A: Using Node.js (Recommended for production)**
```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js LTS
nvm install 20
nvm use 20
nvm alias default 20

# Verify installation
node --version
npm --version
```

**Option B: Using Bun (Faster package manager)**
```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
export PATH="$PATH:$HOME/.bun/bin"
echo 'export PATH="$PATH:$HOME/.bun/bin"' >> ~/.bashrc

# Verify installation
bun --version
```

### 3. PostgreSQL Database Setup

```bash
# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Connect to PostgreSQL
sudo -u postgres psql

# Inside psql (PostgreSQL shell):
CREATE DATABASE hawksnest_db;
CREATE USER hawksnest_user WITH PASSWORD 'secure_password_here';
ALTER ROLE hawksnest_user SET client_encoding TO 'utf8';
ALTER ROLE hawksnest_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE hawksnest_user SET default_transaction_deferrable TO on;
ALTER ROLE hawksnest_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE hawksnest_db TO hawksnest_user;
\q
```

### 4. Create Application Users Table

```bash
# Connect to your database
sudo -u postgres psql hawksnest_db

# Create users table:
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  url VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

\q
```

## Application Deployment

### 1. Clone Repository

```bash
# Create application directory
sudo mkdir -p /var/www/hawksnest_react
cd /var/www/hawksnest_react

# Clone repository
sudo git clone https://github.com/Hawk-033/hawksnest_react.git .
sudo chown -R $USER:$USER /var/www/hawksnest_react
```

### 2. Configure Environment Variables

```bash
# Create .env.local file
nano .env.local

# Add the following configuration:
DATABASE_URL=postgresql://hawksnest_user:secure_password_here@localhost:5432/hawksnest_db
NEXTAUTH_SECRET=your-random-secret-key-here-min-32-chars
NEXTAUTH_URL=https://yourdomain.com
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
NODE_ENV=production

# Save and exit: Ctrl+X, then Y, then Enter
```

**Generating NEXTAUTH_SECRET:**
```bash
# Generate a secure random string
openssl rand -base64 32
```

### 3. Install Dependencies & Build

```bash
# Navigate to app directory
cd /var/www/hawksnest_react

# Install dependencies
npm install
# OR if using Bun:
bun install

# Build for production
npm run build
# OR
bun run build

# Verify build success (should show "✓ Compiled successfully")
```

### 4. Setup PM2 for Process Management

```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'hawksnest',
    script: 'npm',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    },
    restart_delay: 4000,
    max_memory_restart: '500M'
  }]
};
EOF

# Start application with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Verify app is running
pm2 status
pm2 logs hawksnest
```

### 5. Configure Nginx as Reverse Proxy

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/hawksnest

# Add the following configuration:
upstream hawksnest_app {
  server 127.0.0.1:3000;
}

server {
  listen 80;
  server_name yourdomain.com www.yourdomain.com;

  location / {
    proxy_pass http://hawksnest_app;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }
}

# Save and exit: Ctrl+X, then Y, then Enter

# Enable site
sudo ln -s /etc/nginx/sites-available/hawksnest /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
sudo systemctl enable nginx
```

### 6. Setup SSL Certificate with Let's Encrypt

```bash
# Run Certbot (automatic HTTPS setup)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts to set up SSL
# Certbot will automatically update Nginx configuration

# Verify SSL renewal will work automatically
sudo certbot renew --dry-run
```

## Verification & Testing

### 1. Check Application Status

```bash
# Verify PM2 process
pm2 status

# Check application logs
pm2 logs hawksnest --lines 50

# Test database connection
psql postgresql://hawksnest_user:password@localhost:5432/hawksnest_db -c "SELECT version();"
```

### 2. Test Application Routes

```bash
# From your local machine:
curl https://yourdomain.com
curl https://yourdomain.com/about
curl https://yourdomain.com/auth/signin
curl https://yourdomain.com/api/fetch-users
```

### 3. Monitor Application

```bash
# Real-time monitoring
pm2 monit

# System resource usage
top -u your_username

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

## Maintenance & Updates

### Regular Updates

```bash
# Update system packages monthly
sudo apt update && sudo apt upgrade -y

# Update Node.js/npm packages
cd /var/www/hawksnest_react
npm update

# Rebuild application
npm run build

# Restart PM2 app
pm2 restart all
```

### Backup Strategy

```bash
# Create backup directory
sudo mkdir -p /backups/hawksnest

# Backup database daily (cron job)
sudo crontab -e
# Add this line:
0 2 * * * pg_dump -U hawksnest_user hawksnest_db | gzip > /backups/hawksnest/db-$(date +\%Y\%m\%d).sql.gz

# Backup application code
tar -czf /backups/hawksnest/app-$(date +%Y%m%d).tar.gz /var/www/hawksnest_react
```

### Log Rotation

```bash
# Create logrotate config
sudo nano /etc/logrotate.d/hawksnest

# Add configuration:
/var/www/hawksnest_react/logs/*.log {
  daily
  rotate 14
  compress
  delaycompress
  notifempty
  create 0640 www-data www-data
  sharedscripts
  postrotate
    systemctl reload nginx > /dev/null 2>&1 || true
  endscript
}
```

## Troubleshooting

### Application Won't Start

```bash
# Check PM2 logs
pm2 logs hawksnest

# Check Node.js version compatibility
node --version

# Rebuild dependencies
rm -rf node_modules
npm install
npm run build
pm2 restart all
```

### Database Connection Issues

```bash
# Test PostgreSQL connection
psql postgresql://hawksnest_user:password@localhost:5432/hawksnest_db -c "\dt"

# Check PostgreSQL service
sudo systemctl status postgresql

# Verify environment variables
cat .env.local

# Check firewall rules
sudo ufw status
```

### Nginx Issues

```bash
# Test configuration
sudo nginx -t

# Check Nginx service status
sudo systemctl status nginx

# View error log
sudo tail -n 50 /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

### HTTPS/SSL Issues

```bash
# Check certificate validity
sudo certbot certificates

# Force renew certificate
sudo certbot renew --force-renewal

# View SSL config in Nginx
sudo cat /etc/nginx/sites-available/hawksnest
```

## Performance Optimization

### 1. Enable Gzip Compression

```bash
# Add to Nginx config (inside http block):
sudo nano /etc/nginx/nginx.conf

# Add these lines:
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
```

### 2. Configure PM2 for Multiple Instances

```bash
# Edit ecosystem.config.js for better performance
instances: 'max'  # Uses all available CPU cores
exec_mode: 'cluster'  # Enables clustering
max_memory_restart: '500M'  # Restart if memory exceeds 500MB
```

### 3. Database Connection Pooling

Already configured in `lib/db.ts` with PostgreSQL Pool connection.

## Security Hardening

```bash
# Enable UFW firewall
sudo ufw enable

# Allow SSH, HTTP, HTTPS
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Disable root login
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no

# Restart SSH
sudo systemctl restart sshd

# Setup fail2ban to prevent brute force attacks
sudo apt install fail2ban
sudo systemctl enable fail2ban
```

## Deployment Checklist

- [ ] VPS system updated
- [ ] Node.js/Bun installed
- [ ] PostgreSQL setup with user and database
- [ ] Users/messages/photos tables created
- [ ] Repository cloned
- [ ] .env.local configured with secure values
- [ ] Dependencies installed
- [ ] Build successful (no TypeScript errors)
- [ ] PM2 running application
- [ ] Nginx configured and tested
- [ ] SSL certificate installed
- [ ] Application accessible via HTTPS
- [ ] Database backups configured
- [ ] Monitoring/logging setup
- [ ] Security hardening completed

## Support & Monitoring Services

Consider adding these for production:

- **Monitoring:** New Relic, DataDog, or Prometheus
- **Error Tracking:** Sentry
- **Analytics:** Google Analytics
- **Uptime Monitoring:** UptimeRobot
- **Email:** SendGrid/Mailgun for transactional emails
