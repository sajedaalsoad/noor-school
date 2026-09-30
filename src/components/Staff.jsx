import { principal, teachers } from '../data'

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
      <h2>الكادر التدريسي والأكاديمي</h2>
      <div className="principal">
        <Person {...principal} />
      </div>
      <div className="staff">
        {teachers.map((t) => <Person key={t.name} {...t} />)}
      </div>
    </section>
  )
}
