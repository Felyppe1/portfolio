import { Hero } from './Hero'
import { About } from './About'
import { Work } from './Work'
import { Cta } from './Cta'

export default function Home() {
  return (
    <main className="relative z-[2] pointer-events-none">
      <Hero />
      <About />
      <Work />
      <Cta />
    </main>
  )
}
