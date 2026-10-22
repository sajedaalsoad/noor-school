import { school, socials } from '../data'

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} {school.name}</p>
      {socials.facebook && (
        <p className="social">
          <a href={socials.facebook} target="_blank" rel="noreferrer">صفحتنا على فيسبوك</a>
        </p>
      )}
    </footer>
  )
}
