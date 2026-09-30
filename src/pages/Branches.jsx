import { useState } from 'react'
import { branches } from '../data'

export default function Branches() {
  const [active, setActive] = useState('علمي')
  const [shown, setShown] = useState(null)
  const branch = branches[active]

  const switchBranch = (name) => {
    setActive(name)
    setShown(null)
  }

  return (
    <section className="section" id="branches">
      <h1>الفروع الدراسية</h1>
      <p className="lead">تستقبل المدرسة طلاب الصف العاشر والحادي عشر والبكالوريا، بفرعيها العلمي والأدبي.</p>
      <div className="tabs" role="tablist">
        {Object.keys(branches).map((name) => (
          <button
            key={name}
            role="tab"
            aria-selected={active === name}
            className={active === name ? 'tab on' : 'tab'}
            onClick={() => switchBranch(name)}
          >
            الفرع {name}
          </button>
        ))}
      </div>
      <div className="panel" role="tabpanel">
        <p>{branch.text}</p>
        <div className="subjects">
          {branch.subjects.map((s) => {
            const open = shown === s.name
            return (
              <div className={open ? 'subject open' : 'subject'} key={s.name}>
                <h3>{s.name}</h3>
                <button
                  className="teacher-btn"
                  aria-expanded={open}
                  onClick={() => setShown(open ? null : s.name)}
                >
                  {open ? 'إخفاء' : s.teachers.length > 1 ? 'عرض الأساتذة' : 'عرض الأستاذ'}
                </button>
                {open && (
                  <p className="teacher-name">
                    {s.teachers.map((t) => `أ. ${t}`).join(' ، ')}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
