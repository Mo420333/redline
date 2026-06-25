import { CartProvider } from './store'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Events from './components/Events'
import Showroom from './components/Showroom'
import AiShowroom from './components/AiShowroom'
import Giveaways from './components/Giveaways'
import Merch from './components/Merch'
import Community from './components/Community'
import QuickShare from './components/QuickShare'
import Footer from './components/Footer'

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <Events />
        <Showroom />
        <AiShowroom />
        <Giveaways />
        <Merch />
        <Community />
        <QuickShare />
      </main>
      <Footer />
    </CartProvider>
  )
}
