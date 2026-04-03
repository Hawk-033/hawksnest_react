"use client";

import BlogEditor from "./components/BlogEditor";
import MessageModeration from "./components/MessageBoard";
import WeatherConfig from "./components/WeatherConfig";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-amber-400 p-4 font-mono">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Blog Editor Section */}
        <section className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <BlogEditor />
        </section>

        {/* Message Moderation Section */}
        <section className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <MessageModeration />
        </section>

        {/* Weather Configuration Section */}
        <section className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <WeatherConfig />
        </section>
      </div>
    </main>
  );
}