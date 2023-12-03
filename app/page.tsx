import Image from 'next/image'
import Chat from '@/components/Chat'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col mx-auto max-w-4xl justify-between">
      <Chat />
    </main>
  )
}
