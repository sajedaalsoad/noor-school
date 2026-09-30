const photos = [
  { src: '/school-building.jpg', caption: 'مبنى المدرسة' },
  { src: '/future-vision.jpg', caption: 'تصور فني لما تتطلع إليه المدرسة مستقبلاً — وليست صورة فعلية' },
]

export default function Gallery() {
  return (
    <section className="section">
      <h1>معرض الصور</h1>
      <p className="lead">
        صورة المبنى الأولى أدناه، والثانية تصور فني يعبّر عن طموح المدرسة مستقبلاً.
        سيُستبدل هذا القسم بمزيد من الصور الحقيقية فور توفرها.
      </p>
      <div className="gallery-grid">
        {photos.map((p) => (
          <figure key={p.src}>
            <img src={p.src} alt={p.caption} loading="lazy" />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
