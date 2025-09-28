const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login com senha e JWT
router.post('/login', async (req, res) => {
  const { login, senha } = req.body;
  const q = 'SELECT * FROM usuarios WHERE login=$1';
  const result = await db.query(q, [login]);
  if(result.rows.length === 0) return res.status(401).json({ error: 'Credenciais inválidas' });
  const user = result.rows[0];
  const valid = await bcrypt.compare(senha, user.senha_hash);
  if(!valid) return res.status(401).json({ error: 'Credenciais inválidas' });

  const token = jwt.sign({ id: user.id, login: user.login, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, user: { id: user.id, login: user.login, role: user.role } });
});

module.exports = router;
