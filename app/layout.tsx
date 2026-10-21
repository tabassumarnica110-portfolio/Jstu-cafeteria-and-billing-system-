export const metadata = { title: 'JSTU DINE - Smart Cafeteria OS', description: 'JSTU Official Smart Cafeteria & Billing System' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body style={{margin:0, fontFamily:'Inter,system-ui', background:'#f8fafc'}}>{children}</body></html>
}
