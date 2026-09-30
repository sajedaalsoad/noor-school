import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import Home from './pages/Home'
import About from './pages/About'
import Branches from './pages/Branches'
import Staff from './pages/Staff'
import Admissions from './pages/Admissions'
import Activities from './pages/Activities'
import News from './pages/News'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import Gallery from './pages/Gallery'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
