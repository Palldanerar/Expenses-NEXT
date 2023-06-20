"use client";

import IItem from "@/interface/IItem";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  QuerySnapshot,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase";

export default function Home() {
  let [items, setItems] = useState<IItem[]>([]);

  let [total, setTotal] = useState(0);

  let [newItem, setNewItem] = useState({ title: "", price: "" });

  async function addItem(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    if (newItem.price !== "" && newItem.title !== "") {
      setItems([...items, newItem]);

      await addDoc(collection(db, "items"), {
        title: newItem.title.trim(),
        price: newItem.price,
      });

      setNewItem({ title: "", price: "" });
    }
  }

  async function deleteItem(id: any) {
    await deleteDoc(doc(db, "items", id));
  }

  useEffect(() => {
    const responce = query(collection(db, "items"));
    const unsubscible = onSnapshot(responce, (QuerySnapshot) => {
      let itemArr: any = [];

      QuerySnapshot.forEach((doc) => {
        itemArr.push({ ...doc.data(), id: doc.id });
      });

      console.log(itemArr);

      setItems(itemArr);

      const calcTotalPrice = () => {
        const totalPrice = itemArr.reduce(
          (sum: number, item: IItem) => sum + +item.price,
          0
        );
        setTotal(totalPrice);
      };
      calcTotalPrice();
      return () => unsubscible();
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Expence Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              value={newItem.title}
              type="text"
              placeholder="Enter Item"
              className="col-span-3 p-3 border"
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })
              }
            />
            <input
              value={newItem.price}
              type="number"
              placeholder="Enter $"
              className="col-span-2 p-3 border mx-3"
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />
            <button
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl"
              onClick={() => addItem}
            >
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
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
                  >
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
