import { useEffect, useState } from 'react'
import { motivations } from '../data'

export default function Motivation() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % motivations.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="motivation" aria-live="polite">
      <p key={i}>{motivations[i]}</p>
    </section>
  )
}
