import { randomBytes, timingSafeEqual, createHash } from 'node:crypto'

// مصادقة بسيطة للوحة الإدارة: كلمة مرور من ملف .env، وجلسة مؤقتة برمز عشوائي
export function createAuth({ password, ttlMs = 8 * 60 * 60 * 1000 }) {
  const sessions = new Map()
  const hash = (s) => createHash('sha256').update(s).digest()
  const passHash = password ? hash(password) : null

  return {
    enabled: Boolean(passHash),
    login(candidate) {
      if (!passHash || typeof candidate !== 'string') return null
      if (!timingSafeEqual(hash(candidate), passHash)) return null
      const token = randomBytes(32).toString('hex')
      sessions.set(token, Date.now() + ttlMs)
      return token
    },
    verify(token) {
      const expires = sessions.get(token)
      if (!expires) return false
      if (expires < Date.now()) {
        sessions.delete(token)
        return false
      }
      return true
    },
    logout(token) {
      sessions.delete(token)
    },
  }
}
