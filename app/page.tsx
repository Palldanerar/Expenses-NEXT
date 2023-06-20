"use client";

import IItem from "@/interface/IItem";
import { useState } from "react";

export default function Home() {
  let [items, setItems] = useState<IItem[]>([
    { title: "Nintendo Switch", price: 199 },
  ]);

  let [total, setTotal] = useState(199);

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
          <ul className="text-white text-2xl">
            {items.map((item, id) => {
              return (
                <li
                  key={id}
                  className="my-4 w-full flex justify-between bg-slate-950"
                >
                  <div className="p-4 w-full flex justify-between">
                    <span className="capitalize">{item.title}</span>
                    <span>{item.price}$</span>
                  </div>
                  <button className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16">
                    X
                  </button>
                </li>
              );
            })}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="text-white text-2xl flex justify-between p-3">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
