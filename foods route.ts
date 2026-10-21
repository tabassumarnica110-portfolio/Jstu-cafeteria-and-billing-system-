import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
export async function GET(){ const foods = await prisma.food.findMany({ orderBy: { category: 'asc' } }); return NextResponse.json(foods) }