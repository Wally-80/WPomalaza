import Sidebar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

