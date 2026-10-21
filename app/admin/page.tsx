'use client'
import {useEffect,useState} from 'react'
export default function Admin(){
  const [orders,setOrders]=useState<any[]>([])
  useEffect(()=>{fetch('/api/orders').then(r=>r.json()).then(setOrders)},[])
  const total = orders.reduce((s,o)=>s+o.total,0)
  const completed = orders.filter(o=>o.status==='completed').length
  return(
    <div style={{padding:24,fontFamily:'system-ui',background:'#f8fafc',minHeight:'100vh'}}>
      <h1>📊 Admin Billing</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginTop:20}}>
        <div style={{background:'white',padding:20,borderRadius:16}}><div>Total Revenue</div><h2>৳{total}</h2></div>
        <div style={{background:'white',padding:20,borderRadius:16}}><div>Total Orders</div><h2>{orders.length}</h2></div>
        <div style={{background:'white',padding:20,borderRadius:16}}><div>Completed</div><h2>{completed}</h2></div>
      </div>
      <div style={{background:'white',marginTop:20,borderRadius:16,padding:16}}>
        <h3>Recent Orders</h3>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <tr style={{textAlign:'left',borderBottom:'1px solid #eee'}}><th>ID</th><th>Total</th><th>Status</th><th>Time</th></tr>
          {orders.map(o=><tr key={o.id} style={{borderBottom:'1px solid #f1f1f1'}}><td>#{o.id}</td><td>৳{o.total}</td><td>{o.status}</td><td>{new Date(o.createdAt).toLocaleTimeString()}</td></tr>)}
        </table>
      </div>
    </div>
  )
}