// التحقق من كل مدخلات المستخدم قبل حفظها — لا نثق بأي بيانات قادمة من المتصفح
const PHONE = /^\+?[\p{Nd}\s\-()]{6,20}$/u
const DATE = /^\d{4}-\d{2}-\d{2}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const GRADES = ['العاشر', 'الحادي عشر', 'البكالوريا']
export const BRANCHES = ['علمي', 'أدبي']

const str = (v) => (typeof v === 'string' ? v.trim() : '')
const bad = (error) => ({ error })

export function validateMessage(body) {
  const b = body ?? {}
  const name = str(b.name)
  const phone = str(b.phone)
  const message = str(b.message)
  if (name.length < 2 || name.length > 80) return bad('الاسم مطلوب (حرفان على الأقل).')
  if (!PHONE.test(phone)) return bad('رقم الهاتف غير صحيح.')
  if (message.length < 3 || message.length > 1000) return bad('الرسالة مطلوبة (حتى 1000 حرف).')
  return { value: { name, phone, message } }
}

export function validateRegistration(body) {
  const b = body ?? {}
  const studentName = str(b.studentName)
  const guardianName = str(b.guardianName)
  const phone = str(b.phone)
  const grade = str(b.grade)
  const branch = str(b.branch)
  const notes = str(b.notes)
  if (studentName.length < 2 || studentName.length > 80) return bad('اسم الطالب مطلوب.')
  if (guardianName.length < 2 || guardianName.length > 80) return bad('اسم ولي الأمر مطلوب.')
  if (!PHONE.test(phone)) return bad('رقم الهاتف غير صحيح.')
  if (!GRADES.includes(grade)) return bad('اختاري الصف.')
  if (branch !== '' && !BRANCHES.includes(branch)) return bad('الفرع غير صحيح.')
  if (notes.length > 500) return bad('الملاحظات طويلة (500 حرف كحد أقصى).')
  return { value: { studentName, guardianName, phone, grade, branch, notes } }
}

export function validateNews(body, today = new Date().toISOString().slice(0, 10)) {
  const b = body ?? {}
  const title = str(b.title)
  const text = str(b.body)
  const date = str(b.date) || today
  if (title.length < 3 || title.length > 150) return bad('عنوان الخبر مطلوب (3 أحرف على الأقل).')
  if (text.length < 3 || text.length > 2000) return bad('نص الخبر مطلوب (حتى 2000 حرف).')
  if (!DATE.test(date) || Number.isNaN(Date.parse(date))) return bad('تاريخ غير صحيح.')
  return { value: { title, body: text, date } }
}

export function validateEmail(body) {
  const email = str(body?.email).toLowerCase()
  if (!EMAIL.test(email) || email.length > 120) return bad('بريد إلكتروني غير صحيح.')
  return { value: { email } }
}
