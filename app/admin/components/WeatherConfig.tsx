function WeatherConfig() {
  return (
    <div className="space-y-6">
      <h3 className="text-4xl font-black uppercase italic">Weather Display Settings</h3>
      <div className="bg-blue-500 text-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-6xl font-black">72°F</p>
        <p className="text-2xl font-bold">RALEIGH, NC - SUNNY</p>
      </div>
      <div className="flex items-center gap-4">
        <label className="font-black uppercase">Display Units:</label>
        <select className="border-4 border-black p-2 font-bold bg-white uppercase">
          <option>Imperial (°F)</option>
          <option>Metric (°C)</option>
        </select>
      </div>
    </div>
  );
}
export default WeatherConfig;