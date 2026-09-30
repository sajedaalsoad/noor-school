import { useEffect, useState } from 'react'
import { api } from '../api'

export default function News() {
  const [items, setItems] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    api('/news').then(setItems).catch(() => setFailed(true))
  }, [])

  return (
    <section className="section" id="news">
      <h1>آخر الأخبار</h1>
      {failed && <p className="lead">تعذّر تحميل الأخبار حالياً، حاولي لاحقاً.</p>}
      {!failed && items === null && <p className="lead">جارٍ التحميل...</p>}
      {items && items.length === 0 && <p className="lead">لا توجد أخبار حالياً، ترقبوا أخبار المدرسة قريباً.</p>}
      {items && items.length > 0 && (
        <div className="news">
          {items.map((item) => (
            <article key={item.id}>
              <time dateTime={item.date}>
                {new Date(item.date).toLocaleDateString('ar-SY')}
              </time>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
