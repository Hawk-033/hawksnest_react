"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [repos, setRepos] = useState<Array<{ id: number; name: string; description: string; html_url: string; language: string }>>([]);

  useEffect(() => {
    async function fetchRepos() {
      const response = await fetch("https://api.github.com/users/Hawk-033/repos");
      const data = await response.json();
      setRepos(data);
    }
    fetchRepos();
  }, []);

  return (
    <main className="min-h-screen bg-amber-400 p-2 md:p-2 font-mono selection:bg-blue-500 selection:text-white">
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <section className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
          <h1 className="text-5xl md:text-5xl font-black mb-4 uppercase tracking-tighter font-mono">
            Hawksnest Software Solutions
          </h1>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-500 text-white border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
              Home
            </button>
            <button className="bg-white text-black border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
              About
            </button>
            <button className="bg-blue-500 text-white border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
              Message Board
            </button>
            <button className="bg-white text-black border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
              Gallery
            </button>
            <button className="bg-blue-500 text-white border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
              Weather
            </button>
          </div>
          <div>
            <p className="text-xl md:text-2xl border-t-4 border-black pt-4 mb-6 font-bold justify-center ">
            Tristan Hawkins  | Junior Software Developer | Raleigh, North Carolina
            </p>
          </div>
        </section>

        {/* GitHub Projects Section */}
        <section className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-4xl font-bold mb-6 font-mono">My GitHub Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <div key={repo.id} className="p-4 border rounded bg-gray-100 shadow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-semibold font-mono">{repo.name}</h3>
                  {repo.language && (
                    <span className="px-2 py-1 bg-blue-500 text-white text-sm rounded font-mono">
                      {repo.language}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-4 font-mono">{repo.description}</p>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline font-mono"
                >
                  View Repository
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}