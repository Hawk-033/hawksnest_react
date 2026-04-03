# Hawksnest React - Modular Update Architecture

## Overview

This document outlines a structured approach to adding new features to Hawksnest React using modular, scalable patterns. The application is built on Next.js 16+ with TypeScript, featuring a clear separation between server components, client components, and API routes.

## Project Structure Philosophy

```
hawksnest_react/
├── app/                      # Next.js app directory (server-first)
│   ├── (feature-name)/       # Feature-specific routes
│   ├── api/                  # Server API routes
│   ├── auth/                 # Authentication routes
│   └── layout.tsx            # Root layout with global UI
├── components/               # Reusable React components
│   ├── ui/                   # Base UI components (buttons, menus)
│   ├── features/             # Feature-specific components
│   └── AuthButton.tsx        # Global authentication component
├── lib/                      # Utility functions & helpers
│   ├── db.ts                 # Database connections
│   ├── utils.ts              # Helper functions
│   └── api-calls.ts          # API client functions
├── pages/api/                # Legacy API routes (can migrate to app/api)
├── public/                   # Static assets
└── types/                    # TypeScript type definitions
```

## Standards & Patterns

### 1. Component File Structure

Every feature module should follow this pattern:

```typescript
// components/features/FeatureName/FeatureName.tsx
'use client'; // If using hooks or browser APIs

import { useState, useEffect } from 'react';
import type { FC } from 'react';

interface FeatureNameProps {
  title: string;
  onUpdate?: (data: any) => void;
}

const FeatureName: FC<FeatureNameProps> = ({ title, onUpdate }) => {
  const [state, setState] = useState('');

  return (
    <div className="feature-container">
      {/* Component JSX */}
    </div>
  );
};

export default FeatureName;
```

### 2. API Route Convention

```typescript
// pages/api/features/feature-name.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';

interface ResponseData {
  success: boolean;
  data?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Validate request method
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Handle GET request
    if (req.method === 'GET') {
      const result = await pool.query('SELECT * FROM feature_table');
      return res.status(200).json({ success: true, data: result.rows });
    }

    // Handle POST request
    if (req.method === 'POST') {
      const { field1, field2 } = req.body;
      
      // Validate input
      if (!field1 || !field2) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }

      const result = await pool.query(
        'INSERT INTO feature_table (field1, field2) VALUES ($1, $2) RETURNING *',
        [field1, field2]
      );
      
      return res.status(201).json({ success: true, data: result.rows[0] });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
```

### 3. Database Schema Additions

Always create migration scripts for database changes:

```sql
-- migrations/001_create_feature_table.sql
CREATE TABLE IF NOT EXISTS feature_table (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_feature_user_id ON feature_table(user_id);
CREATE INDEX idx_feature_status ON feature_table(status);
```

Run migrations with:
```bash
psql -U hawksnest_user -d hawksnest_db -f migrations/001_create_feature_table.sql
```

## Step-by-Step Feature Addition Process

### Phase 1: Planning (1-2 hours)

1. **Define Feature Requirements**
   - Identify core functionality
   - List user interactions
   - Determine data model

2. **Design Data Model**
   - Create database schema
   - Define relationships
   - Plan indexing strategy

3. **Component Hierarchy**
   - Sketch UI/UX layout
   - Identify reusable components
   - Plan state management

### Phase 2: Database Setup (30 minutes - 1 hour)

1. **Create migration file**
   ```bash
   touch migrations/NNN_feature_name.sql
   ```

2. **Write and test schema**
   ```bash
   psql -U hawksnest_user -d hawksnest_db -f migrations/NNN_feature_name.sql
   ```

3. **Verify tables created**
   ```bash
   psql -U hawksnest_user -d hawksnest_db -c "\dt"
   ```

### Phase 3: API Layer (1-2 hours)

1. **Create API endpoint**
   ```bash
   touch pages/api/features/feature-name.ts
   ```

2. **Implement CRUD operations**
   - Create (POST)
   - Read (GET)
   - Update (PUT/PATCH)
   - Delete (DELETE)

3. **Add error handling & validation**
   ```typescript
   // Validation helper
   const validatePayload = (data: any): boolean => {
     return data.requiredField && data.email;
   };
   ```

4. **Test API endpoints**
   ```bash
   # Test GET
   curl http://localhost:3000/api/features/feature-name
   
   # Test POST
   curl -X POST http://localhost:3000/api/features/feature-name \
     -H "Content-Type: application/json" \
     -d '{"field": "value"}'
   ```

### Phase 4: Frontend Components (2-3 hours)

1. **Create feature directory**
   ```bash
   mkdir -p components/features/FeatureName
   ```

2. **Build component hierarchy**
   ```
   FeatureName/
   ├── FeatureName.tsx
   ├── FeatureList.tsx
   ├── FeatureForm.tsx
   ├── FeatureDetail.tsx
   └── index.ts
   ```

3. **Implement components**
   - Use 'use client' for client-side interactivity
   - Keep server components for data fetching
   - Use TypeScript for type safety

4. **Add component styling**
   ```typescript
   <div className="feature-container border-4 border-gray-300 shadow-lg p-6">
     <h2 className="text-2xl font-bold mb-4">{title}</h2>
     {/* Component content */}
   </div>
   ```

### Phase 5: Page Integration (1-2 hours)

1. **Create feature page**
   ```bash
   mkdir -p app/feature-name
   touch app/feature-name/page.tsx
   ```

2. **Add to navigation**
   ```typescript
   // components/ui/navigation-menu.tsx
   const navigationItems = [
     // ... existing items
     { label: 'Feature Name', href: '/feature-name' },
   ];
   ```

3. **Add navigation button in AuthButton or header**

### Phase 6: Testing & Deployment (2-3 hours)

1. **Local testing**
   ```bash
   npm run dev
   # Test all feature interactions
   ```

2. **Build verification**
   ```bash
   npm run build
   # Should complete with no TypeScript errors
   ```

3. **Commit changes**
   ```bash
   git add -A
   git commit -m "feat: add FeatureName functionality
   
   - Create feature_table with proper schema
   - Implement CRUD API endpoints
   - Build React components with TypeScript
   - Add navigation and integrate into layout
   - All tests passing, build successful"
   ```

4. **Push to repository**
   ```bash
   git push origin main
   ```

5. **Deploy to VPS**
   ```bash
   # SSH to VPS
   cd /var/www/hawksnest_react
   git pull origin main
   npm install  # If new dependencies
   npm run build
   pm2 restart all
   ```

## Feature Template: Complete Example

### Blog Comments Feature

**1. Database Schema**
```sql
-- migrations/002_create_comments_table.sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_comments_post_id ON comments(post_id);
```

**2. API Endpoint**
```typescript
// pages/api/posts/comments.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { postId, userId, content } = req.body;
    
    try {
      const result = await pool.query(
        'INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
        [postId, userId, content]
      );
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to create comment' });
    }
  } else if (req.method === 'GET') {
    const { postId } = req.query;
    
    try {
      const result = await pool.query(
        'SELECT c.*, u.name FROM comments c JOIN users u ON c.user_id = u.id WHERE c.post_id = $1 ORDER BY c.created_at DESC',
        [postId]
      );
      res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch comments' });
    }
  }
}
```

**3. React Components**
```typescript
// components/features/Comments/CommentForm.tsx
'use client';

import { FormEvent, useState } from 'react';

interface CommentFormProps {
  postId: number;
  onCommentAdded: () => void;
}

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/posts/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, userId: 1, content }),
      });

      if (response.ok) {
        setContent('');
        onCommentAdded();
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border-t pt-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}
```

## Version Control Best Practices

### Commit Message Format

```
feat: add feature name
fix: resolve issue
refactor: improve code quality
docs: update documentation
test: add test coverage

Detailed explanation of changes:
- Specific change 1
- Specific change 2
- Related files modified
```

### Branch Strategy

```
main (production)
  ↑ (merge PRs)
development (staging)
  ↑ (merge feature branches)
feature/feature-name (development)
bugfix/bug-name (hotfixes)
```

## Performance Optimization Checklist

When adding new features:

- [ ] Database queries optimized with proper indexes
- [ ] API responses implement pagination for large datasets
- [ ] Client components use `useCallback` and `useMemo` where needed
- [ ] Images are optimized (use Next.js Image component)
- [ ] Unnecessary re-renders eliminated with proper state management
- [ ] TypeScript strict mode enabled (no `any` types)
- [ ] Error boundaries implemented for error handling
- [ ] Load times monitored (target < 3 seconds first contentful paint)

## Security Checklist

When adding new features:

- [ ] User input validated on both client and server
- [ ] SQL injection prevented using parameterized queries (already in place)
- [ ] CSRF protection enabled (Next.js handles automatically)
- [ ] Authentication required for protected routes
- [ ] API endpoints check user authorization
- [ ] Sensitive data not logged in console
- [ ] Environment variables used for secrets
- [ ] HTTPS enforced
- [ ] Rate limiting considered for API endpoints

## Monitoring & Logging

### Add logging to new features:

```typescript
// In API routes
console.log(`[${new Date().toISOString()}] POST /api/features - User: ${userId}`);

// In components
const logAction = (action: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Feature] ${action}`, data);
  }
};
```

### Setup error tracking:

```typescript
// Sentry integration example
import * as Sentry from "@sentry/nextjs";

try {
  // Feature logic
} catch (error) {
  Sentry.captureException(error);
}
```

## Common Patterns & Reusable Code

### API Response Wrapper

```typescript
// lib/api-response.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const successResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

export const errorResponse = (error: string): ApiResponse<null> => ({
  success: false,
  error,
});
```

### Error Boundary Component

```typescript
// components/ErrorBoundary.tsx
'use client';

import { ReactNode, Component, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  featureName?: string;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border-2 border-red-500 bg-red-50">
          <h2 className="text-red-700 font-bold">Something went wrong</h2>
          <p className="text-red-600">Please try refreshing the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Custom Hook for API Calls

```typescript
// lib/hooks/useFetch.ts
import { useState, useEffect } from 'react';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}
```

## Deployment Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Develop and commit**
   ```bash
   # Make changes
   npm run build  # Test build
   git commit -m "feat: description"
   ```

3. **Create pull request**
   ```bash
   git push origin feature/new-feature
   # Create PR on GitHub
   ```

4. **Testing & review**
   - Code review
   - Automated tests pass
   - No TypeScript errors

5. **Merge to main**
   ```bash
   git checkout main
   git pull origin main
   git merge feature/new-feature
   git push origin main
   ```

6. **Deploy to VPS**
   ```bash
   ssh user@107.173.112.38
   cd /var/www/hawksnest_react
   git pull origin main
   npm run build
   pm2 restart hawksnest
   ```

## Future Architecture Considerations

### Planned Enhancements

1. **Microservices** - Separate auth, blog, gallery services
2. **GraphQL** - Add GraphQL API alongside REST
3. **Caching Layer** - Redis for session/query caching
4. **Message Queue** - Bull or RabbitMQ for async tasks
5. **Admin Dashboard** - Enhanced admin functionality
6. **Mobile App** - React Native version

### Technology Roadmap

- [ ] Migrate from Pages Router to App Router API routes
- [ ] Add comprehensive testing (Jest + React Testing Library)
- [ ] Implement Redis caching
- [ ] Setup CI/CD pipeline (GitHub Actions)
- [ ] Add database migration system (Prisma or TypeORM)
- [ ] Implement WebSocket for real-time updates
- [ ] Add multi-tenant support
- [ ] Internationalization (i18n)

## References & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [React Best Practices](https://react.dev/learn)
- [Web Performance](https://web.dev/performance/)
- [Security Best Practices](https://owasp.org/www-project-top-ten/)
