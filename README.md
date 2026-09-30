# موقع ثانوية نور المعارف الخاصة

واجهة React (Vite) + خادم Node.js/Express + قاعدة SQLite.

## التشغيل (نافذتا طرفية)

الطرفية 1 — الموقع:
    npm install
    npm run dev

الطرفية 2 — الخادم:
    cd server
    npm install
    (أنشئي ملف server/.env على نسق server/.env.example وضعي فيه ADMIN_PASSWORD)
    npm start

- الموقع: http://localhost:5173
- لوحة الإدارة: http://localhost:5173/admin
- قاعدة البيانات تُنشأ تلقائياً في server/data/school.db

## النشر كتطبيق واحد
    npm run build          (في المجلد الرئيسي)
    cd server && npm start (يقدّم الموقع والـ API معاً على المنفذ 3001)

المتطلبات: Node.js 22.13 أو أحدث.
