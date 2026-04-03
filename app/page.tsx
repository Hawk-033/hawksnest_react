export default function Home() {
  const projects = [
    {
      title: "Alert Monitor",
      desc: "Python-based system for real-time alert ingestion and storage.",
      tag: "Python",
      link: "#"
    },
    {
      title: "Network Lab",
      desc: "OPNsense and TrueNAS configuration with Unbound DNS filtering.",
      tag: "Networking",
      link: "#"
    },
    {
      title: "RF Automation",
      desc: "Researching ML applications in RF circuit design and wireless systems.",
      tag: "Research",
      link: "#"
    },
    {
      title: "SQL Optimizer",
      desc: "Advanced Oracle SQL management for complex data constraints.",
      tag: "Database",
      link: "#"
    }
  ];

  return (
    <main className="min-h-screen bg-amber-400 p-2 md:p-2 font-mono selection:bg-blue-500 selection:text-white">
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <section className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
          <h1 className="text-6xl md:text-8xl font-black mb-4 uppercase tracking-tighter">
            Hawksnest
          </h1>
          <p className="text-xl md:text-2xl border-t-4 border-black pt-4 mb-6 font-bold">
            Systems Engineering & Development Portfolio. Powered by Bun and shadcn.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-500 text-white border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
              Home
            </button>
            <button className="bg-white text-black border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
              Contact Me
            </button>
            <button className="bg-blue-500 text-white border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
              View Resume
            </button>
            <button className="bg-white text-black border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
              Contact Me
            </button>
          </div>
        </section>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col"
            >
              <div className="bg-blue-500 border-b-4 border-black p-4">
                <span className="bg-black text-white px-3 py-1 text-sm font-bold uppercase tracking-widest">
                  {project.tag}
                </span>
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-3xl font-black mb-3 uppercase leading-none">
                  {project.title}
                </h3>
                <p className="text-lg font-medium mb-6 text-gray-800">
                  {project.desc}
                </p>
                <a 
                  href={project.link}
                  className="inline-block bg-white border-4 border-black px-4 py-2 font-black hover:bg-amber-400 transition-colors uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  View on Github
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center p-6 border-t-4 border-black">
          <p className="font-black uppercase text-lg">
            © {new Date().getFullYear()} Hawksnest / Tristan Hawkins
          </p>
        </footer>
      </div>
    </main>
  );
}