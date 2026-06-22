import Navbar  from './components/Navbar'
import Hero    from './components/Hero'
import Services from './components/Services'
import Process  from './components/Process'
import Wizard   from './components/Wizard'
import Contact  from './components/Contact'
import Footer   from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Wizard />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
