import { stats } from '../data'

export default function Stats() {
  return (
    <section className="stats">
      {stats.map((s) => (
        <div key={s.label}>
          <strong>{s.value}</strong>
          <span>{s.label}</span>
        </div>
      ))}
    </section>
  )
}
