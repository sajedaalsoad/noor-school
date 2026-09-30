import { useCallback, useEffect, useState } from 'react'
import { api } from '../api'

const fmt = (iso) =>
  new Date(iso).toLocaleString('ar-SY', { dateStyle: 'medium', timeStyle: 'short' })

function Login({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const { token } = await api('/admin/login', { method: 'POST', body: { password } })
      onLogin(token)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="admin-login" onSubmit={submit}>
      <h1>لوحة الإدارة</h1>
      <label>كلمة المرور
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button className="btn" type="submit" disabled={busy}>دخول</button>
      {error && <p className="err" role="alert">{error}</p>}
    </form>
  )
}

const TABS = {
  messages: { label: 'الرسائل', path: '/admin/messages' },
  registrations: { label: 'طلبات التسجيل', path: '/admin/registrations' },
  subscribers: { label: 'المشتركون', path: '/admin/subscribers' },
  news: { label: 'الأخبار', path: '/news' },
}

function Dashboard({ token, onLogout }) {
  const [tab, setTab] = useState('messages')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [news, setNews] = useState({ title: '', body: '', date: '' })

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    setItems([])
    try {
      setItems(await api(TABS[tab].path, { token }))
    } catch (err) {
      if (err.status === 401) onLogout()
      else setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [tab, token, onLogout])

  useEffect(() => {
    load()
  }, [load])

  const remove = async (id) => {
    if (!window.confirm('هل أنتِ متأكدة من الحذف؟')) return
    try {
      await api(`/admin/${tab}/${id}`, { method: 'DELETE', token })
      setItems((list) => list.filter((i) => i.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const addNews = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api('/admin/news', { method: 'POST', token, body: news })
      setNews({ title: '', body: '', date: '' })
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <div className="admin-head">
        <h1>لوحة الإدارة</h1>
        <button className="tab" onClick={onLogout}>تسجيل الخروج</button>
      </div>

      <div className="tabs" role="tablist">
        {Object.entries(TABS).map(([key, t]) => (
          <button key={key} role="tab" aria-selected={tab === key} className={tab === key ? 'tab on' : 'tab'} onClick={() => setTab(key)}>
            {t.label}
          </button>
        ))}
      </div>

      {error && <p className="err" role="alert">{error}</p>}

      {tab === 'news' && (
        <form className="reg-form" onSubmit={addNews}>
          <h2>إضافة خبر</h2>
          <label>العنوان
            <input value={news.title} onChange={(e) => setNews({ ...news, title: e.target.value })} required maxLength={150} />
          </label>
          <label>النص
            <textarea rows="4" value={news.body} onChange={(e) => setNews({ ...news, body: e.target.value })} required maxLength={2000} />
          </label>
          <label>التاريخ (اختياري، وإلا يُستخدم اليوم)
            <input type="date" value={news.date} onChange={(e) => setNews({ ...news, date: e.target.value })} />
          </label>
          <button className="btn" type="submit">نشر الخبر</button>
        </form>
      )}

      {loading && <p>جارٍ التحميل...</p>}
      {!loading && items.length === 0 && !error && <p>لا يوجد شيء هنا بعد.</p>}

      <div className="admin-list">
        {!loading && items.map((item) => (
          <article key={item.id}>
            {tab === 'messages' && (
              <>
                <h3>{item.name} — <span dir="ltr">{item.phone}</span></h3>
                <p>{item.message}</p>
                <time>{fmt(item.created_at)}</time>
              </>
            )}
            {tab === 'registrations' && (
              <>
                <h3>{item.student_name}</h3>
                <p>ولي الأمر: {item.guardian_name} — <span dir="ltr">{item.phone}</span></p>
                <p>الصف: {item.grade}{item.branch ? ` — الفرع: ${item.branch}` : ''}</p>
                {item.notes && <p>ملاحظات: {item.notes}</p>}
                <time>{fmt(item.created_at)}</time>
              </>
            )}
            {tab === 'subscribers' && (
              <h3 dir="ltr">{item.email}</h3>
            )}
            {tab === 'news' && (
              <>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <time>{item.date}</time>
              </>
            )}
            <button className="del" onClick={() => remove(item.id)}>حذف</button>
          </article>
        ))}
      </div>
    </div>
  )
}

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem('adminToken') || '')

  const login = (t) => {
    sessionStorage.setItem('adminToken', t)
    setToken(t)
  }
  const logout = useCallback(() => {
    sessionStorage.removeItem('adminToken')
    setToken('')
  }, [])

  return (
    <section className="section">
      {token ? <Dashboard token={token} onLogout={logout} /> : <Login onLogin={login} />}
    </section>
  )
}
