import { school, features } from '../data'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="beam" aria-hidden="true" />
      <h1>{school.headline}</h1>
      <p>{school.intro}</p>
      <ul className="features">
        {features.map((f) => <li key={f}>{f}</li>)}
      </ul>
      <a className="btn" href="#contact">بادر بالحجز الآن</a>
    </section>
  )
}
