import { school, socials } from '../data'
import FacebookButton from './FacebookButton'

export default function Footer() {
  return (
    <footer className="footer">
      {socials.facebook && (
        <div className="footer-follow">
          <p>تابع أخبار المدرسة وإعلاناتها أولاً بأول</p>
          <FacebookButton large />
        </div>
      )}
      <p>© {new Date().getFullYear()} {school.name}</p>
    </footer>
  )
}
