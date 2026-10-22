import { Link } from 'react-router-dom'
import { school, features } from '../data'
import Motivation from '../components/Motivation'
import Stats from '../components/Stats'

export default function Home() {
  return (
    <>
      <section className="hero" id="top">
        <div className="beam" aria-hidden="true" />
        <h1>{school.headline}</h1>
        <p>{school.intro}</p>
        <ul className="features">
          {features.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <div className="hero-actions">
          <Link className="btn" to="/admissions">القبول والتسجيل</Link>
          <Link className="btn ghost" to="/about">لماذا نحن</Link>
        </div>
      </section>

      <Stats />
      <Motivation />

      <section className="section cta-split">
        <div>
          <h2>فرعان، طريق واحد نحو النجاح</h2>
          <p>اختاري ما يناسب طموحك: العلمي نحو الطب والهندسة، أو الأدبي نحو الحقوق والآداب والإعلام.</p>
          <Link className="btn" to="/branches">تفاصيل الفروع</Link>
        </div>
        <div>
          <h2>كادر تدريسي متكامل</h2>
          <p>أساتذة متخصصون في كل مادة، بإشراف أكاديمي مباشر من إدارة المدرسة.</p>
          <Link className="btn" to="/staff">تعرّفي على الكادر</Link>
        </div>
        <div>
          <h2>عام دراسي أول مليء بالفرص</h2>
          <p>انطلاقة جديدة تعني اهتماماً أكبر بكل طالب، وفرصة لكِ لتكوني جزءاً من قصة نجاح المدرسة الأولى.</p>
          <Link className="btn" to="/activities">الأنشطة والفعاليات</Link>
        </div>
      </section>
    </>
  )
}
