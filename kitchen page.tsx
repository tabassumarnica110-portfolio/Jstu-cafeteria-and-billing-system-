'use client'
import { useEffect, useState } from 'react'
export default function Kitchen(){
  const [orders, setOrders] = useState<any[]>([])
  const load = () => fetch('/api/orders').then(r=>r.json()).then(setOrders)
  useEffect(()=>{ load(); const i=setInterval(load,3000); return()=>clearInterval(i) },[])
  const update = async(id:string, status:string)=>{ await fetch(`/api/orders/${id}`, { method: 'PATCH', body: JSON.stringify({ status }), headers: { 'Content-Type': 'application/json' } }); load() }
  return (
    <div className="min-h-screen bg-orange-50 p-6"><h1 className="text-3xl font-bold mb-6">👨‍🍳 Kitchen Orders</h1><div className="grid md:grid-cols-3 gap-4">{orders.filter(o=>o.status!=='COMPLETED').map(o=>(
      <div key={o.id} className="bg-white p-4 rounded-2xl shadow border-l-4 border-orange-500"><div className="flex justify-between"><span className="font-bold">{o.token}</span><span className="text-xs px-2 py-1 bg-yellow-100 rounded">{o.status}</span></div><div className="mt-2 text-sm">{o.items.map((it:any)=><div key={it.id} className="flex justify-between"><span>{it.food.name} x{it.quantity}</span><span>৳{it.price*it.quantity}</span></div>)}</div><p className="font-bold mt-2">Total: ৳{o.total}</p><div className="flex gap-2 mt-3">{o.status==='PENDING'&&<button onClick={()=>update(o.id,'PREPARING')} className="flex-1 py-2 bg-blue-600 text-white rounded">Start Cooking</button>}{o.status==='PREPARING'&&<button onClick={()=>update(o.id,'READY')} className="flex-1 py-2 bg-green-600 text-white rounded">Ready</button>}{o.status==='READY'&&<button onClick={()=>update(o.id,'COMPLETED')} className="flex-1 py-2 bg-black text-white rounded">Complete ✅</button>}</div></div>
    ))}</div></div>
  )
}