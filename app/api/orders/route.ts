import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function GET(){ try{ const o=await prisma.order.findMany({orderBy:{id:'desc'}}); return NextResponse.json(o)}catch(e){return NextResponse.json([],{status:200})}}
export async function POST(req:Request){ try{ const {items,total}=await req.json(); const order=await prisma.order.create({data:{total,status:'pending',items:{create:items.map((i:any)=>({name:i.name,qty:i.qty,price:i.price}))}}}); return NextResponse.json(order)}catch(e:any){ console.error(e); return NextResponse.json({error:e.message},{status:500})}}