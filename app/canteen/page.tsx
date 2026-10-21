'use client'
import { useState, useEffect } from 'react'

type Food = { id:number, name:string, price:number, cat:string, img:string }
type CartItem = Food & { qty:number }

const FOODS: Food[] = [
  {id:1,name:'Paratha',price:20,cat:'Breakfast',img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'},
  {id:2,name:'Khichuri',price:50,cat:'Breakfast',img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400'},
  {id:3,name:'Bread Omelette',price:40,cat:'Breakfast',img:'https://images.unsplash.com/photo-1482049016688-2d3e4b311543?w=400'},
  {id:4,name:'Puri Sabji',price:30,cat:'Breakfast',img:'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400'},
  {id:5,name:'Chicken Biryani',price:180,cat:'Lunch',img:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400'},
  {id:6,name:'Beef Tehari',price:200,cat:'Lunch',img:'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400'},
  {id:7,name:'Fried Rice Chicken',price:150,cat:'Lunch',img:'https://images.unsplash.com/photo-1603133872875-ca2a98a0d7cf?w=400'},
  {id:8,name:'Daal Vat',price:60,cat:'Lunch',img:'https://images.unsplash.com/photo-1585937421612-70a008356c00?w=400'},
  {id:9,name:'Morog Polao',price:160,cat:'Lunch',img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'},
  {id:10,name:'Chicken Curry Rice',price:120,cat:'Lunch',img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'},
  {id:11,name:'Shingara',price:10,cat:'Snacks',img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400'},
  {id:12,name:'Samosa',price:15,cat:'Snacks',img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400'},
  {id:13,name:'Roll',price:50,cat:'Snacks',img:'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=400'},
  {id:14,name:'Burger',price:90,cat:'Snacks',img:'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=400'},
  {id:15,name:'Sandwich',price:60,cat:'Snacks',img:'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=400'},
  {id:16,name:'Noodles',price:70,cat:'Snacks',img:'https://images.unsplash.com/photo-1552611052-33e04de08191?w=400'},
  {id:17,name:'Cha',price:15,cat:'Drinks',img:'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400'},
  {id:18,name:'Coffee',price:40,cat:'Drinks',img:'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400'},
  {id:19,name:'Lassi',price:50,cat:'Drinks',img:'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400'},
  {id:20,name:'Cold Drinks',price:30,cat:'Drinks',img:'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400'},
  {id:21,name:'Juice',price:40,cat:'Drinks',img:'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400'},
  {id:22,name:'Chicken Fry',price:80,cat:'Snacks',img:'https://images.unsplash.com/photo-1614398753738-8a1d703da3d3?w=400'},
  {id:23,name:'French Fry',price:60,cat:'Snacks',img:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400'},
  {id:24,name:'Momo',price:100,cat:'Snacks',img:'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400'},
]

export default function Canteen(){
  const [cart,setCart]=useState<CartItem[]>([])
  const [wallet,setWallet]=useState(1000)
  const [cat,setCat]=useState('All')

  const filtered = cat==='All' ? FOODS : FOODS.filter(f=>f.cat===cat)
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0)

  const add = (f:Food)=>{
    setCart(p=>{
      const ex=p.find(x=>x.id===f.id)
      if(ex) return p.map(x=>x.id===f.id?{...x,qty:x.qty+1}:x)
      return [...p,{...f,qty:1}]
    })
  }

  const checkout = async ()=>{
    if(cart.length===0) return alert('Cart empty')
    if(total>wallet) return alert('Wallet low')
    try{
      const res = await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:cart,total})})
      if(!res.ok) throw new Error()
      setWallet(w=>w-total)
      setCart([])
      alert('Order Success! Kitchen e chole gese')
    }catch{ alert('DB Error - terminal e dekhun, prisma db push korun') }
  }

  return (
    <div style={{padding:20,fontFamily:'system-ui',background:'#f8fafc',minHeight:'100vh'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1>🍽️ JSTU Canteen</h1>
        <div style={{background:'#16a34a',color:'white',padding:'10px 20px',borderRadius:30}}>Wallet: ৳{wallet} (Real DB)</div>
      </div>
      <div style={{display:'flex',gap:10,margin:'20px 0'}}>
        {['All','Breakfast','Lunch','Snacks','Drinks'].map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{padding:'8px 16px',borderRadius:20,border:'1px solid #ddd',background:cat===c?'#16a34a':'white',color:cat===c?'white':'black'}}>{c}</button>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:16}}>
        {filtered.map(f=>(
          <div key={f.id} style={{background:'white',borderRadius:16,overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            <img src={f.img} style={{width:'100%',height:120,objectFit:'cover'}}/>
            <div style={{padding:12}}>
              <div style={{fontWeight:700}}>{f.name}</div>
              <div style={{fontSize:12,color:'#666'}}>{f.cat}</div>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:8,alignItems:'center'}}>
                <span style={{fontWeight:800}}>৳{f.price}</span>
                <button onClick={()=>add(f)} style={{background:'black',color:'white',border:'none',padding:'6px 12px',borderRadius:20,cursor:'pointer'}}>Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{position:'fixed',right:20,top:100,background:'white',padding:20,borderRadius:16,boxShadow:'0 4px 20px rgba(0,0,0,0.15)',width:250}}>
        <h3>Cart ({cart.length})</h3>
        {cart.map(i=><div key={i.id} style={{display:'flex',justifyContent:'space-between',fontSize:14}}><span>{i.name} x{i.qty}</span><span>৳{i.price*i.qty}</span></div>)}
        <hr/><div style={{display:'flex',justifyContent:'space-between',fontWeight:800}}><span>Total</span><span>৳{total}</span></div>
        <button onClick={checkout} style={{width:'100%',marginTop:12,background:'#16a34a',color:'white',border:'none',padding:'12px',borderRadius:10,fontWeight:700,cursor:'pointer'}}>Checkout (Real DB Deduct)</button>
      </div>
    </div>
  )
}