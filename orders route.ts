import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
export async function GET(){ const orders = await prisma.order.findMany({ include: { items: { include: { food: true } } }, orderBy: { createdAt: 'desc' } }); return NextResponse.json(orders) }
export async function POST(req: Request){
  const { items, total } = await req.json()
  const token = `JSTU-${Date.now().toString().slice(-6)}`
  const order = await prisma.order.create({ data: { token, total, items: { create: items.map((i:any)=>({ foodId: i.id, quantity: i.qty, price: i.price })) } } })
  return NextResponse.json(order)
}