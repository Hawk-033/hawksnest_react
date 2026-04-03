import Link from "next/link";

export default function Home() {
  return (  
    <main className="min-h-screen bg-amber-400 p-2 md:p-2 font-mono selection:bg-blue-500 selection:text-white">
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <section className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
          <h1 className="text-5xl md:text-5xl font-black mb-4 uppercase tracking-tighter font-mono">
            Hawk's Nest
          </h1>
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="inline-block bg-blue-500 text-white border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
              Home
            </Link>
            <Link href="/blog" className="inline-block bg-white text-black border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
              Blog
            </Link>
            <Link href="/photo_gallery" className="inline-block bg-blue-500 text-white border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
              Gallery
            </Link>
            <Link href="/message_board" className="inline-block bg-white text-black border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
              Message Board
            </Link>
            <Link href="/weather_app" className="inline-block bg-blue-500 text-white border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
              Weather
            </Link>
            <Link href="/portfolio" className="inline-block bg-white text-black border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
              Portfolio
            </Link>
            <Link href="/about" className="inline-block bg-blue-500 text-white border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
              About
            </Link>
          </div>
          <div>
            <p className="text-xl md:text-2xl border-t-4 border-black pt-4 mb-6 font-bold justify-center ">
            Tristan Hawkins  | Junior Software Developer | Raleigh, North Carolina
            </p>
          </div>
        </section>
      </div>
    </main>
  );}