import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { school } from '../data'

const links = [
  { to: '/', label: 'الرئيسية' },
  { to: '/about', label: 'لماذا نحن' },
  { to: '/branches', label: 'الفروع' },
  { to: '/staff', label: 'الكادر' },
  { to: '/admissions', label: 'القبول والتسجيل' },
  { to: '/activities', label: 'أنشطة' },
  { to: '/gallery', label: 'معرض الصور' },
  { to: '/news', label: 'الأخبار' },
  { to: '/contact', label: 'تواصل معنا' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <Link className="brand" to="/" onClick={() => setOpen(false)}>
        <img src="/logo.jpg" alt="شعار المدرسة" />
        {school.name}
      </Link>
      <button className="burger" aria-label="فتح القائمة" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
      <nav className={open ? 'open' : ''} aria-label="التنقل الرئيسي">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)}>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
