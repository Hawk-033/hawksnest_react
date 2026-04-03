function BlogEditor() {
  return (
    <div className="space-y-6">
      <h3 className="text-4xl font-black uppercase italic">Create New Post</h3>
      <input type="text" placeholder="POST TITLE" className="w-full p-4 border-4 border-black text-xl font-bold focus:bg-amber-100 outline-none" />
      
      {/* Photo Upload Area */}
      <div className="border-4 border-dashed border-black p-10 text-center bg-gray-50">
        <p className="font-black uppercase mb-4 text-gray-500">Drag photo here or</p>
        <input type="file" className="hidden" id="photo-upload" accept="image/*" />
        <label htmlFor="photo-upload" className="bg-black text-white px-6 py-2 font-bold cursor-pointer hover:bg-blue-500">
          SELECT PHOTO
        </label>
        <p className="mt-2 text-xs font-bold text-blue-500">Auto-converting to .WebP</p>
      </div>

      <textarea placeholder="WRITE CONTENT..." className="w-full h-64 p-4 border-4 border-black font-bold outline-none"></textarea>
      <button className="w-full bg-blue-500 text-white border-4 border-black p-4 font-black text-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        PUBLISH TO HAWKSNEST
      </button>
    </div>
  );
}
export default BlogEditor;