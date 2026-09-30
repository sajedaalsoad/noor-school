// دالة موحّدة للتواصل مع الخادم
export async function api(path, { method = 'GET', body, token } = {}) {
  const headers = {}
  if (body) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    // الرد ليس JSON
  }

  if (!res.ok) {
    const err = new Error(data?.error || 'تعذّر الاتصال بالخادم.')
    err.status = res.status
    throw err
  }
  if (data === null) {
    // رد ناجح لكنه ليس من خادمنا (مثلاً موقع منشور بدون باك إند)
    const err = new Error('الخادم غير متاح حالياً.')
    err.status = 502
    throw err
  }
  return data
}

// هل الخطأ بسبب عدم توفر الخادم (وليس بسبب خطأ في بيانات المستخدم)؟
export const isServerDown = (err) => !err.status || err.status >= 500
