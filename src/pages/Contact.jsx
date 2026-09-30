import { useState } from 'react'
import { school, mapEmbedUrl } from '../data'
import { api, isServerDown } from '../api'
import FacebookButton from '../components/FacebookButton'

const empty = { name: '', phone: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle') // idle | sending | sent | fallback
  const [error, setError] = useState('')
  const [waLink, setWaLink] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      await api('/messages', { method: 'POST', body: form })
      setStatus('sent')
      setForm(empty)
    } catch (err) {
      if (isServerDown(err)) {
        // الخادم غير متاح: نعرض رابط واتساب برسالة جاهزة بدل ضياع الرسالة
        const text = `مرحباً، أنا ${form.name}\nرقم هاتفي: ${form.phone}\n\n${form.message}`
        setWaLink(`${school.whatsappLink}?text=${encodeURIComponent(text)}`)
        setStatus('fallback')
        setForm(empty)
      } else {
        setError(err.message)
        setStatus('idle')
      }
    }
  }

  return (
    <section className="section contact" id="contact">
      <div>
        <h1>تواصل معنا</h1>
        <p>{school.address}</p>
        <p>الهاتف: <a href={school.phoneLink} dir="ltr">{school.phone}</a></p>
        <p><a className="btn" href={school.whatsappLink} target="_blank" rel="noreferrer">تواصل معنا مباشرة على واتساب</a></p>
        <p><FacebookButton /></p>
        <div className="map">
          <iframe
            title="موقع المدرسة على الخريطة"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <label>الاسم
          <input name="name" value={form.name} onChange={onChange} required maxLength={80} />
        </label>
        <label>رقم الهاتف
          <input name="phone" value={form.phone} onChange={onChange} required dir="ltr" maxLength={20} />
        </label>
        <label>رسالتك
          <textarea name="message" rows="4" value={form.message} onChange={onChange} required maxLength={1000} />
        </label>
        <button className="btn" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'جارٍ الإرسال...' : 'إرسال الرسالة'}
        </button>
        {error && <p className="err" role="alert">{error}</p>}
        {status === 'sent' && <p className="ok" role="status">وصلتنا رسالتك، وسنتواصل معك قريباً.</p>}
        {status === 'fallback' && (
          <p className="ok" role="status">
            تعذّر الإرسال حالياً. أرسلي رسالتك مباشرة عبر{' '}
            <a href={waLink} target="_blank" rel="noreferrer">واتساب</a>.
          </p>
        )}
      </form>
    </section>
  )
}
