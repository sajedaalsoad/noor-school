// حدّ للطلبات لكل عنوان IP لمنع الرسائل المزعجة وتخمين كلمة المرور
export function rateLimit({ max, windowMs, message }) {
  const hits = new Map()
  const timer = setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of hits) if (entry.reset < now) hits.delete(key)
  }, windowMs)
  timer.unref()

  return (req, res, next) => {
    const now = Date.now()
    const key = req.ip
    const entry = hits.get(key)
    if (!entry || entry.reset < now) {
      hits.set(key, { count: 1, reset: now + windowMs })
      return next()
    }
    entry.count += 1
    if (entry.count > max) return res.status(429).json({ error: message })
    next()
  }
}
