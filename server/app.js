import express from 'express'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { validateMessage, validateRegistration, validateNews, validateEmail } from './validate.js'
import { rateLimit } from './rateLimit.js'

export function createApp({ repo, auth, distDir }) {
  const app = express()
  app.disable('x-powered-by')
  app.use(express.json({ limit: '20kb' }))

  const publicLimit = rateLimit({ max: 10, windowMs: 10 * 60 * 1000, message: 'محاولات كثيرة، حاولي بعد قليل.' })
  const loginLimit = rateLimit({ max: 10, windowMs: 15 * 60 * 1000, message: 'محاولات دخول كثيرة، حاولي لاحقاً.' })

  const parseId = (req, res) => {
    const id = Number(req.params.id)
    if (!Number.isInteger(id) || id < 1) {
      res.status(400).json({ error: 'معرّف غير صحيح.' })
      return null
    }
    return id
  }

  // ---------- واجهات عامة ----------
  app.get('/api/health', (req, res) => res.json({ ok: true }))

  app.get('/api/news', (req, res) => res.json(repo.listNews()))

  app.post('/api/messages', publicLimit, (req, res) => {
    const { error, value } = validateMessage(req.body)
    if (error) return res.status(400).json({ error })
    repo.addMessage(value)
    res.status(201).json({ ok: true })
  })

  app.post('/api/registrations', publicLimit, (req, res) => {
    const { error, value } = validateRegistration(req.body)
    if (error) return res.status(400).json({ error })
    repo.addRegistration(value)
    res.status(201).json({ ok: true })
  })

  app.post('/api/subscribe', publicLimit, (req, res) => {
    const { error, value } = validateEmail(req.body)
    if (error) return res.status(400).json({ error })
    const added = repo.addSubscriber(value.email)
    res.status(201).json({ ok: true, alreadySubscribed: !added })
  })

  // ---------- لوحة الإدارة ----------
  app.post('/api/admin/login', loginLimit, (req, res) => {
    if (!auth.enabled) {
      return res.status(503).json({ error: 'لوحة الإدارة غير مفعّلة: عيّني ADMIN_PASSWORD في ملف server/.env' })
    }
    const token = auth.login(req.body?.password)
    if (!token) return res.status(401).json({ error: 'كلمة المرور غير صحيحة.' })
    res.json({ token })
  })

  const requireAdmin = (req, res, next) => {
    const match = /^Bearer (.+)$/.exec(req.get('authorization') || '')
    if (!match || !auth.verify(match[1])) return res.status(401).json({ error: 'غير مصرّح.' })
    req.token = match[1]
    next()
  }

  app.post('/api/admin/logout', requireAdmin, (req, res) => {
    auth.logout(req.token)
    res.json({ ok: true })
  })

  app.get('/api/admin/messages', requireAdmin, (req, res) => res.json(repo.listMessages()))
  app.delete('/api/admin/messages/:id', requireAdmin, (req, res) => {
    const id = parseId(req, res)
    if (id === null) return
    if (!repo.deleteMessage(id)) return res.status(404).json({ error: 'غير موجود.' })
    res.json({ ok: true })
  })

  app.get('/api/admin/registrations', requireAdmin, (req, res) => res.json(repo.listRegistrations()))
  app.delete('/api/admin/registrations/:id', requireAdmin, (req, res) => {
    const id = parseId(req, res)
    if (id === null) return
    if (!repo.deleteRegistration(id)) return res.status(404).json({ error: 'غير موجود.' })
    res.json({ ok: true })
  })

  app.get('/api/admin/subscribers', requireAdmin, (req, res) => res.json(repo.listSubscribers()))
  app.delete('/api/admin/subscribers/:id', requireAdmin, (req, res) => {
    const id = parseId(req, res)
    if (id === null) return
    if (!repo.deleteSubscriber(id)) return res.status(404).json({ error: 'غير موجود.' })
    res.json({ ok: true })
  })

  app.post('/api/admin/news', requireAdmin, (req, res) => {
    const { error, value } = validateNews(req.body)
    if (error) return res.status(400).json({ error })
    const id = repo.addNews(value)
    res.status(201).json({ id })
  })
  app.delete('/api/admin/news/:id', requireAdmin, (req, res) => {
    const id = parseId(req, res)
    if (id === null) return
    if (!repo.deleteNews(id)) return res.status(404).json({ error: 'غير موجود.' })
    res.json({ ok: true })
  })

  app.use('/api', (req, res) => res.status(404).json({ error: 'غير موجود.' }))

  // عند النشر: الخادم يقدّم الموقع المبني (npm run build) من مجلد dist
  if (distDir && existsSync(join(distDir, 'index.html'))) {
    app.use(express.static(distDir))
    app.use((req, res) => res.sendFile(join(distDir, 'index.html')))
  }

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err.status && err.status < 500) return res.status(err.status).json({ error: 'طلب غير صالح.' })
    console.error(err)
    res.status(500).json({ error: 'خطأ في الخادم.' })
  })

  return app
}
