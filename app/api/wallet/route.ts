import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId') || 'demo-jstu-user-1'
  try{
    let user = await prisma.user.findUnique({ where: { id: userId } })
    if(!user) user = await prisma.user.create({ data: { id: userId, name:'JSTU Student', email:`${userId}@jstu.edu.bd`, wallet:1000 } })
    return NextResponse.json({ wallet: user.wallet })
  }catch{ return NextResponse.json({ wallet: 1000 }) }
}
