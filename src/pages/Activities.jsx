import { activities } from '../data'

export default function Activities() {
  return (
    <section className="section">
      <h1>أنشطة وفعاليات</h1>
      <p className="lead">أفكار أنشطة مقترحة لإثراء الحياة المدرسية، حدّثيها بحسب ما تقرّه إدارة المدرسة.</p>
      <div className="values">
        {activities.map((a) => (
          <article key={a.title}>
            <h3>{a.title}</h3>
            <p>{a.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
