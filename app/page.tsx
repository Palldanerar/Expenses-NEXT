"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Expence Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              type="text"
              placeholder="Enter Item"
              className="col-span-3 p-3 border"
            />
            <input
              type="number"
              placeholder="Enter $"
              className="col-span-2 p-3 border mx-3"
            />
            <button className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl">
              +
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
