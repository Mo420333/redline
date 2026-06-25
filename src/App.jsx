import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Events from './components/Events'
import Showroom from './components/Showroom'
import AiShowroom from './components/AiShowroom'
import Giveaways from './components/Giveaways'
import Merch from './components/Merch'
import Community from './components/Community'
import QuickShare from './components/QuickShare'
import CarDetail from './components/CarDetail'
import Footer from './components/Footer'

function Landing() {
  return (
    <>
      <Hero />
      <Events />
      <Showroom />
      <AiShowroom />
      <Giveaways />
      <Merch />
      <Community />
      <QuickShare />
    </>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/car/:id" element={<CarDetail />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
