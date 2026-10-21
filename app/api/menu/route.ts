import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
export async function GET(){
  try{
    let menus = await prisma.menu.findMany()
    if(menus.length===0){
      menus = await prisma.menu.createManyAndReturn({ data: [
        { name:'Paratha', price:20, category:'Breakfast', image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' },
        { name:'Chicken Biryani', price:120, category:'Lunch', image:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400' },
        { name:'Beef Khichuri', price:100, category:'Lunch', image:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
        { name:'Tea', price:10, category:'Snacks', image:'https://images.unsplash.com/photo-1544787219-7f47cc556762?w=400' },
        { name:'Samosa', price:15, category:'Snacks', image:'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400' },
      ]})
    }
    return NextResponse.json(menus)
  }catch(e){ return NextResponse.json([{ id:1, name:'Paratha', price:20, category:'Breakfast', image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' }]) }
}
