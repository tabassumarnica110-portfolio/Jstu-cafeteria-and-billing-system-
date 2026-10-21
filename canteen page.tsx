'use client'
import { useEffect, useState } from 'react'
type Food = { id: string; name: string; price: number; category: string; image: string; description: string }
export default function Canteen(){
  const [foods, setFoods] = useState<Food[]>([]); const [cart, setCart] = useState<any[]>([]); const [cat, setCat] = useState('All')
  useEffect(()=>{ fetch('/api/foods').then(r=>r.json()).then(setFoods) },[])
  const categories = ['All', ...Array.from(new Set(foods.map(f=>f.category)))]
  const filtered = cat==='All'? foods : foods.filter(f=>f.category===cat)
  const add = (f: Food) => { const ex = cart.find(c=>c.id===f.id); if(ex) setCart(cart.map(c=>c.id===f.id?{...c, qty: c.qty+1}:c)); else setCart([...cart, { id: f.id, name: f.name, price: f.price, qty: 1 }]) }
  const total = cart.reduce((s,c)=>s + c.price*c.qty, 0)
  const order = async() => { if(!cart.length) return alert('Cart empty'); const res = await fetch('/api/orders', { method: 'POST', body: JSON.stringify({ items: cart, total }), headers: { 'Content-Type': 'application/json' } }); const data = await res.json(); alert(`Order Success! Token: ${data.token}`); setCart([]) }
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="max-w-7xl mx-auto flex justify-between items-center py-4"><h1 className="text-2xl font-bold">🍽️ JSTU Cafeteria</h1><div className="flex gap-2"><a href="/kitchen" className="px-4 py-2 bg-orange-500 text-white rounded-lg">Kitchen</a><a href="/admin" className="px-4 py-2 bg-black text-white rounded-lg">Admin</a></div></header>
      <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto py-3">{categories.map(c=> <button key={c} onClick={()=>setCat(c)} className={`px-4 py-2 rounded-full text-sm ${cat===c?'bg-black text-white':'bg-white border'}`}>{c}</button>)}</div>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">{filtered.map(f=>(
        <div key={f.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition border">
          <img src={f.image} className="h-36 w-full object-cover" alt={f.name} />
          <div className="p-3"><p className="text-xs text-gray-500">{f.category}</p><h3 className="font-semibold text-sm">{f.name}</h3><p className="text-xs text-gray-400 truncate">{f.description}</p><div className="flex justify-between items-center mt-2"><span className="font-bold">৳{f.price}</span><button onClick={()=>add(f)} className="px-3 py-1 bg-black text-white rounded-full text-xs">Add</button></div></div>
        </div>
      ))}</div>
      {cart.length>0 && <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-7xl mx-auto rounded-t-2xl shadow-2xl"><div className="flex justify-between"><span>{cart.length} items - ৳{total}</span><button onClick={order} className="px-6 py-2 bg-green-600 text-white rounded-full">Place Order</button></div></div>}
    </div>
  )
}