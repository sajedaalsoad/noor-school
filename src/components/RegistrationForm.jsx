import { useState } from 'react'
import { school } from '../data'
import { api, isServerDown } from '../api'

const empty = { studentName: '', guardianName: '', phone: '', grade: '', branch: '', notes: '' }

export default function RegistrationForm() {
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
      await api('/registrations', { method: 'POST', body: form })
      setStatus('sent')
      setForm(empty)
    } catch (err) {
      if (isServerDown(err)) {
        const text = `طلب تسجيل\nالطالب: ${form.studentName}\nولي الأمر: ${form.guardianName}\nالهاتف: ${form.phone}\nالصف: ${form.grade}\nالفرع: ${form.branch || 'لم يحدد'}`
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
    <form className="reg-form" onSubmit={onSubmit}>
      <h2>طلب تسجيل مبدئي</h2>
      <label>اسم الطالب
        <input name="studentName" value={form.studentName} onChange={onChange} required maxLength={80} />
      </label>
      <label>اسم ولي الأمر
        <input name="guardianName" value={form.guardianName} onChange={onChange} required maxLength={80} />
      </label>
      <label>رقم الهاتف
        <input name="phone" value={form.phone} onChange={onChange} required dir="ltr" maxLength={20} />
      </label>
      <label>الصف
        <select name="grade" value={form.grade} onChange={onChange} required>
          <option value="">اختاري الصف</option>
          <option value="العاشر">العاشر</option>
          <option value="الحادي عشر">الحادي عشر</option>
          <option value="البكالوريا">البكالوريا</option>
        </select>
      </label>
      <label>الفرع (اختياري)
        <select name="branch" value={form.branch} onChange={onChange}>
          <option value="">لم يُحدَّد بعد</option>
          <option value="علمي">علمي</option>
          <option value="أدبي">أدبي</option>
        </select>
      </label>
      <label>ملاحظات (اختياري)
        <textarea name="notes" rows="3" value={form.notes} onChange={onChange} maxLength={500} />
      </label>
      <button className="btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'جارٍ الإرسال...' : 'إرسال طلب التسجيل'}
      </button>
      {error && <p className="err" role="alert">{error}</p>}
      {status === 'sent' && <p className="ok" role="status">وصل طلبك، وستتواصل معك إدارة المدرسة قريباً.</p>}
      {status === 'fallback' && (
        <p className="ok" role="status">
          تعذّر الإرسال حالياً. أرسلي طلبك مباشرة عبر{' '}
          <a href={waLink} target="_blank" rel="noreferrer">واتساب</a>.
        </p>
      )}
    </form>
  )
}
