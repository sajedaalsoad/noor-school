import { useState } from 'react'
import { api, isServerDown } from '../api'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error | down

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await api('/subscribe', { method: 'POST', body: { email } })
      setStatus('sent')
      setEmail('')
      if (res.alreadySubscribed) {
        // نفس النتيجة للمستخدم: هي مشتركة أصلاً
      }
    } catch (err) {
      setStatus(isServerDown(err) ? 'down' : 'error')
    }
  }

  return (
    <form className="newsletter" onSubmit={onSubmit}>
      <div>
        <h2>لا يفوتكم شيء</h2>
        <p>اشتركي ليصلك كل جديد عن التسجيل والفعاليات على بريدك.</p>
      </div>
      <div className="newsletter-input">
        <input
          type="email"
          placeholder="بريدك الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={120}
        />
        <button className="btn" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? '...' : 'اشتراك'}
        </button>
      </div>
      {status === 'sent' && <p className="ok">تم! شكراً لاشتراكك.</p>}
      {status === 'error' && <p className="err">بريد إلكتروني غير صحيح.</p>}
      {status === 'down' && <p className="err">تعذّر الاشتراك حالياً، حاولي لاحقاً.</p>}
    </form>
  )
}
