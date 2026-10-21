'use client'
import { useEffect, useState } from 'react'
export default function Admin(){
  const [orders, setOrders] = useState<any[]>([])
  useEffect(()=>{ fetch('/api/orders').then(r=>r.json()).then(setOrders) },[])
  const totalSales = orders.filter(o=>o.status==='COMPLETED').reduce((s,o)=>s+o.total,0)
  const todaySales = orders.filter(o=>{ const d=new Date(o.createdAt).toDateString(); return d===new Date().toDateString() && o.status==='COMPLETED' }).reduce((s,o)=>s+o.total,0)
  return (
    <div className="min-h-screen bg-gray-100 p-6"><h1 className="text-3xl font-bold mb-6">📊 Admin Billing</h1>
      <div className="grid md:grid-cols-3 gap-4 mb-6"><div className="bg-white p-6 rounded-2xl shadow"><p className="text-gray-500 text-sm">Total Sales</p><p className="text-2xl font-bold">৳{totalSales}</p></div><div className="bg-white p-6 rounded-2xl shadow"><p className="text-gray-500 text-sm">Today Sales</p><p className="text-2xl font-bold">৳{todaySales}</p></div><div className="bg-white p-6 rounded-2xl shadow"><p className="text-gray-500 text-sm">Total Orders</p><p className="text-2xl font-bold">{orders.length}</p></div></div>
      <div className="bg-white rounded-2xl shadow overflow-hidden"><table className="w-full text-sm"><thead className="bg-black text-white"><tr><th className="p-3 text-left">Token</th><th className="p-3">Items</th><th className="p-3">Total</th><th className="p-3">Status</th><th className="p-3">Time</th></tr></thead><tbody>{orders.map(o=><tr key={o.id} className="border-t"><td className="p-3 font-mono">{o.token}</td><td className="p-3">{o.items.map((i:any)=>i.food.name).join(', ')}</td><td className="p-3 font-bold">৳{o.total}</td><td className="p-3"><span className={`px-2 py-1 rounded text-xs ${o.status==='COMPLETED'?'bg-green-100':'bg-yellow-100'}`}>{o.status}</span></td><td className="p-3">{new Date(o.createdAt).toLocaleString()}</td></tr>)}</tbody></table></div>
    </div>
  )
}
