// كل استعلامات قاعدة البيانات هنا — كلها محضّرة (prepared) لمنع حقن SQL
export function createRepo(db) {
  const q = {
    addMessage: db.prepare('INSERT INTO messages (name, phone, message) VALUES (?, ?, ?)'),
    listMessages: db.prepare('SELECT * FROM messages ORDER BY id DESC'),
    deleteMessage: db.prepare('DELETE FROM messages WHERE id = ?'),

    addRegistration: db.prepare(
      'INSERT INTO registrations (student_name, guardian_name, phone, grade, branch, notes) VALUES (?, ?, ?, ?, ?, ?)'
    ),
    listRegistrations: db.prepare('SELECT * FROM registrations ORDER BY id DESC'),
    deleteRegistration: db.prepare('DELETE FROM registrations WHERE id = ?'),

    addSubscriber: db.prepare('INSERT OR IGNORE INTO subscribers (email) VALUES (?)'),
    listSubscribers: db.prepare('SELECT * FROM subscribers ORDER BY id DESC'),
    deleteSubscriber: db.prepare('DELETE FROM subscribers WHERE id = ?'),

    addNews: db.prepare('INSERT INTO news (title, body, date) VALUES (?, ?, ?)'),
    listNews: db.prepare('SELECT id, title, body, date FROM news ORDER BY date DESC, id DESC'),
    deleteNews: db.prepare('DELETE FROM news WHERE id = ?'),
  }

  return {
    addMessage: (m) => Number(q.addMessage.run(m.name, m.phone, m.message).lastInsertRowid),
    listMessages: () => q.listMessages.all(),
    deleteMessage: (id) => q.deleteMessage.run(id).changes > 0,

    addRegistration: (r) =>
      Number(q.addRegistration.run(r.studentName, r.guardianName, r.phone, r.grade, r.branch, r.notes).lastInsertRowid),
    listRegistrations: () => q.listRegistrations.all(),
    deleteRegistration: (id) => q.deleteRegistration.run(id).changes > 0,

    addSubscriber: (email) => q.addSubscriber.run(email).changes > 0,
    listSubscribers: () => q.listSubscribers.all(),
    deleteSubscriber: (id) => q.deleteSubscriber.run(id).changes > 0,

    addNews: (n) => Number(q.addNews.run(n.title, n.body, n.date).lastInsertRowid),
    listNews: () => q.listNews.all(),
    deleteNews: (id) => q.deleteNews.run(id).changes > 0,
  }
}
