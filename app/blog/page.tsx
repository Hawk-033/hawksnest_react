import Link from "next/link";

export default function Blog() {
  const posts = [
    {
      title: "Optimizing Unbound DNS for Home Labs",
      date: "April 02, 2026",
      preview: "A deep dive into blocklist integration and recursive query performance metrics for local networks.",
      tag: "Networking"
    },
    {
      title: "RF Circuit Design with Machine Learning",
      date: "March 28, 2026",
      preview: "Exploring how automated tuning can revolutionize wireless system automation.",
      tag: "Engineering"
    },
    {
      title: "Transitioning to SQA Roles in 2026",
      date: "March 15, 2026",
      preview: "The evolution of Software Quality Assurance and the impact of AI on junior dev roles.",
      tag: "Career"
    }
  ];

  const navItems = [
    { label: "Home", href: "/", blue: true },
    { label: "Blog", href: "/blog", blue: false },
    { label: "Gallery", href: "/photo_gallery", blue: true },
    { label: "Message Board", href: "/message_board", blue: false },
    { label: "Weather", href: "/weather_app", blue: true },
    { label: "Portfolio", href: "/portfolio", blue: false },
    { label: "About", href: "/about", blue: true }
  ];

  return (  
    <main className="min-h-screen bg-amber-400 p-2 md:p-2 font-mono selection:bg-blue-500 selection:text-white">
      <div className="max-w-8xl mx-auto">
        
        {/* Header Section (Kept from your template) */}
        <section className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-4">
          <h1 className="text-5xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
            Hawk's Nest
          </h1>
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Nav buttons kept for consistency */}
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className={`inline-block ${item.blue ? 'bg-blue-500 text-white' : 'bg-white text-black'} border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase`}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="border-t-4 border-black pt-4">
            <p className="text-xl md:text-2xl font-bold">
              Tristan Hawkins  | Junior Software Developer | Raleigh, North Carolina
            </p>
          </div>
        </section>

        {/* Featured Post (Big Box) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2 bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <span className="bg-blue-500 text-white border-2 border-black px-3 py-1 font-black uppercase text-sm mb-4 inline-block">
              Latest Post
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-none mb-4">
              Building the Alert Monitoring System
            </h2>
            <p className="text-xl font-bold mb-6">
              How I used Python data structures to ingest and store complex alert messages for real-time monitoring.
            </p>
            <button className="bg-amber-400 border-4 border-black px-6 py-2 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              Read Full Entry
            </button>
          </div>

          {/* Sidebar / Newsletter Area */}
          <div className="bg-blue-500 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white">
            <h3 className="text-3xl font-black uppercase mb-4">Search</h3>
            <input 
              type="text" 
              placeholder="KEYWORD..." 
              className="w-full p-2 border-4 border-black text-black font-bold focus:outline-none mb-4"
            />
            <div className="border-t-4 border-black pt-4 mt-4">
              <h3 className="text-2xl font-black uppercase mb-2">Categories</h3>
              <ul className="font-bold space-y-1 uppercase">
                <li className="hover:underline cursor-pointer">/ Networking</li>
                <li className="hover:underline cursor-pointer">/ Python</li>
                <li className="hover:underline cursor-pointer">/ Career</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Recent Posts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <div key={index} className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-sm font-black text-blue-500 mb-1">{post.date}</p>
              <h3 className="text-2xl font-black uppercase leading-tight mb-3">
                {post.title}
              </h3>
              <p className="font-bold text-sm mb-4">{post.preview}</p>
              <div className="flex justify-between items-center">
                <span className="bg-black text-white px-2 py-1 text-xs font-black uppercase">
                  {post.tag}
                </span>
                <span className="font-black uppercase text-sm cursor-pointer hover:underline">
                  Read →
                </span>
              </div>
            </div>
          ))}
        </section>

      </div>
    </main>
  );
}