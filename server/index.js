import { join } from 'node:path'
import { openDb } from './db.js'
import { createRepo } from './repo.js'
import { createAuth } from './auth.js'
import { createApp } from './app.js'

const port = Number(process.env.PORT) || 3001
const db = openDb(join(import.meta.dirname, 'data', 'school.db'))
const auth = createAuth({ password: process.env.ADMIN_PASSWORD })

const app = createApp({
  repo: createRepo(db),
  auth,
  distDir: join(import.meta.dirname, '..', 'dist'),
})
if (process.env.TRUST_PROXY) app.set('trust proxy', 1)

app.listen(port, () => {
  console.log(`الخادم يعمل على http://localhost:${port}`)
  if (!auth.enabled) {
    console.warn('تنبيه: لوحة الإدارة معطّلة. أنشئي ملف server/.env وضعي فيه ADMIN_PASSWORD=كلمة-مرور-قوية')
  } else if (process.env.ADMIN_PASSWORD.length < 8) {
    console.warn('تنبيه: كلمة مرور الإدارة قصيرة، استخدمي 8 أحرف على الأقل.')
  }
})
