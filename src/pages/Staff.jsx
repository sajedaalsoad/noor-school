import { principal, administrator, teachers } from '../data'
import Reveal from '../components/Reveal'

function Person({ name, role, photo }) {
  return (
    <div className="person">
      {photo && <img src={photo} alt={name} />}
      <h3>أ. {name}</h3>
      <p>{role}</p>
    </div>
  )
}

export default function Staff() {
  return (
    <section className="section" id="staff">
      <h1>الكادر التدريسي والأكاديمي</h1>
      <div className="principal">
        <Person {...principal} />
        <Person {...administrator} />
      </div>
      <Reveal as="div" className="staff">
        {teachers.map((t) => <Person key={t.name} {...t} />)}
      </Reveal>
    </section>
  )
}
