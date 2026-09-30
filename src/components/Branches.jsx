import { useState } from 'react'
import { branches } from '../data'

export default function Branches() {
  const [active, setActive] = useState('علمي')
  const branch = branches[active]

  return (
    <section className="section" id="branches">
      <h2>الفرعان الدراسيان</h2>
      <div className="tabs" role="tablist">
        {Object.keys(branches).map((name) => (
          <button
            key={name}
            role="tab"
            aria-selected={active === name}
            className={active === name ? 'tab on' : 'tab'}
            onClick={() => setActive(name)}
          >
            الفرع {name}
          </button>
        ))}
      </div>
      <div className="panel" role="tabpanel">
        <p>{branch.text}</p>
        <ul>
          {branch.subjects.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>
    </section>
  )
}
