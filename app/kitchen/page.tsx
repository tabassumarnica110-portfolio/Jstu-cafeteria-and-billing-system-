'use client'
import {useEffect,useState} from 'react'
export default function Kitchen(){
  const [orders,setOrders]=useState<any[]>([])
  const load=async()=>{
    const r=await fetch('/api/orders'); const d=await r.json(); setOrders(d)
  }
  useEffect(()=>{load(); const id=setInterval(load,3000); return()=>clearInterval(id)},[])
  const complete=async(id:number)=>{
    await fetch(`/api/orders/${id}`,{method:'PATCH',body:JSON.stringify({status:'completed'})})
    load()
  }
  return(
    <div style={{padding:24,fontFamily:'system-ui'}}>
      <h1>👨‍🍳 Kitchen Dashboard</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16,marginTop:20}}>
        {orders.filter(o=>o.status!=='completed').map(o=>(
          <div key={o.id} style={{background:'white',border:'1px solid #eee',borderRadius:16,padding:16}}>
            <b>Order #{o.id}</b> - ৳{o.total} <br/>
            <div style={{margin:'10px 0',fontSize:13}}>{o.items?.map((i:any)=>i.name+' x'+i.qty).join(', ')}</div>
            <button onClick={()=>complete(o.id)} style={{background:'#16a34a',color:'white',border:'none',padding:'10px 16px',borderRadius:10,width:'100%',fontWeight:700}}>✅ Complete</button>
          </div>
        ))}
      </div>
      {orders.length===0 && <p>No pending orders</p>}
    </div>
  )
}