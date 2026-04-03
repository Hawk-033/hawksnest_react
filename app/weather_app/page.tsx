import Link from "next/link";

export default function WeatherApp() {
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
        <section className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
          <h1 className="text-5xl md:text-5xl font-black mb-4 uppercase tracking-tighter font-mono">
            Weather App
          </h1>
          <div className="flex flex-wrap gap-4 mb-6">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className={`inline-block ${item.blue ? 'bg-blue-500 text-white' : 'bg-white text-black'} border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase`}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="border-t-4 border-black pt-4">
            <p className="text-xl md:text-2xl font-bold">
              Tristan Hawkins | Junior Software Developer | Raleigh, North Carolina
            </p>
          </div>
        </section>

        <section className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-4xl font-bold mb-6 uppercase">Weather Dashboard</h2>
          <div className="text-xl">
            <p>Weather application coming soon...</p>
          </div>
        </section>
      </div>
    </main>
  );
}
