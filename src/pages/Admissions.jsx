import { admissions } from '../data'
import RegistrationForm from '../components/RegistrationForm'

export default function Admissions() {
  return (
    <section className="section">
      <h1>القبول والتسجيل</h1>
      <p className="lead">{admissions.intro}</p>

      <h2>خطوات التسجيل</h2>
      <ol className="steps">
        {admissions.steps.map((s) => <li key={s}>{s}</li>)}
      </ol>

      <h2>الوثائق المطلوبة</h2>
      <ul className="docs">
        {admissions.documents.map((d) => <li key={d}>{d}</li>)}
      </ul>

      <RegistrationForm />
    </section>
  )
}
