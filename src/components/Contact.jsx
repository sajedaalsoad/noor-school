import { useState } from 'react'
import { school } from '../data'

const WHATSAPP = '963944575371'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    const text = `مرحباً، أنا ${form.name}\nرقم هاتفي: ${form.phone}\n\n${form.message}`
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank')
    setSent(true)
    setForm({ name: '', phone: '', message: '' })
  }

  return (
    <section className="section contact" id="contact">
      <div>
        <h2>تواصل معنا</h2>
        <p>{school.address}</p>
        <p>الهاتف: <a href={school.phoneLink} dir="ltr">{school.phone}</a></p>
      </div>
      <form onSubmit={onSubmit}>
        <label>الاسم
          <input name="name" value={form.name} onChange={onChange} required />
        </label>
        <label>رقم الهاتف
          <input name="phone" value={form.phone} onChange={onChange} required dir="ltr" />
        </label>
        <label>رسالتك
          <textarea name="message" rows="4" value={form.message} onChange={onChange} required />
        </label>
        <button className="btn" type="submit">أرسل عبر واتساب</button>
        {sent && <p className="ok" role="status">فتحنا واتساب لك، اضغط إرسال هناك لتصل رسالتك إلى المدرسة.</p>}
      </form>
    </section>
  )
}