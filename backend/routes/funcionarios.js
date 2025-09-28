const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM funcionarios ORDER BY nome_completo');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { nc, nome_completo, funcao, salario, centro_custo, coordenador, gerente, head } = req.body;
  const q = `INSERT INTO funcionarios (nc, nome_completo, funcao, salario, centro_custo, coordenador, gerente, head)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
  const values = [nc, nome_completo, funcao, salario, centro_custo, coordenador, gerente, head];
  const result = await db.query(q, values);
  res.status(201).json(result.rows[0]);
});

module.exports = router;
