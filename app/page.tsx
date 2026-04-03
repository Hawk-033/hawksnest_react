export default function Home() {
  return (
    <main className="min-h-screen bg-amber-400 p-8 flex flex-col items-center justify-center font-mono">
      <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] size-11/12">
        <h1 className="text-6xl font-black mb-4 uppercase tracking-tighter">
          Hawksnest
        </h1>
        <p className="text-xl border-b-4 border-black pb-4 mb-6">
          A React project powered by Bun and shadcn.A React project powered by Bun and shadcn.
        </p>
        <button className="bg-blue-500 text-white border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
          GET STARTED
        </button>
      </div>
    </main>
  );
}