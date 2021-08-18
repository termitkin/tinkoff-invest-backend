const app = require('express');
const router = app.Router();

router.all('*', (req, res) => res.status(404).json({ ok: false, data: '404 Not Found' }));

module.exports = router;
