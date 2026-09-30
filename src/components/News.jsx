import { news } from '../data'

export default function News() {
  return (
    <section className="section" id="news">
      <h2>آخر الأخبار</h2>
      <div className="news">
        {news.map((item) => (
          <article key={item.id}>
            <time dateTime={item.date}>
              {new Date(item.date).toLocaleDateString('ar-SY')}
            </time>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
