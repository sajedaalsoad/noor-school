import { values, school, vision, mission, principalMessageDraft } from '../data'
import VisionGallery from '../components/VisionGallery'

export default function About() {
  return (
    <section className="section">
      <h1>لماذا نحن</h1>
      <p className="lead">{school.name} ليست مجرد مكان لتلقّي الدروس، بل بيئة متكاملة تُعِدّ الطالب لمرحلة الجامعة بثقة واستعداد حقيقي.</p>

      <div className="vm">
        <article>
          <h3>رؤيتنا</h3>
          <p>{vision}</p>
        </article>
        <article>
          <h3>رسالتنا</h3>
          <p>{mission}</p>
        </article>
      </div>

      <div className="values">
        {values.map((v) => (
          <article key={v.title}>
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </article>
        ))}
      </div>

      <h2>إلى أين نتطلع</h2>
      <VisionGallery />

      <div className="principal-note">
        <h2>كلمة الإدارة</h2>
        <blockquote>{principalMessageDraft}</blockquote>
      </div>
    </section>
  )
}
