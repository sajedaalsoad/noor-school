import { school } from '../data'

export default function WhatsAppFab() {
  return (
    <a className="wa-fab" href={school.whatsappLink} target="_blank" rel="noreferrer" aria-label="تواصل عبر واتساب">
      واتساب
    </a>
  )
}
