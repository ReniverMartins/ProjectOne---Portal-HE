const express = require('express');
const db = require('../db');
const router = express.Router();

function calcHoras(horaInicio, horaFim) {
  const [hiH, hiM] = horaInicio.split(':').map(Number);
  const [hfH, hfM] = horaFim.split(':').map(Number);
  const inicio = hiH + hiM/60;
  const fim = hfH + hfM/60;
  let diff = fim - inicio;
  if(diff < 0) diff = 0;
  return Math.round(diff * 100) / 100;
}

router.post('/', async (req, res) => {
  const { funcionario_id, nome_colaborador, login_colaborador, nc, data_he, hora_inicio, hora_fim, motivo, centro_custo } = req.body;
  const qtd_horas = calcHoras(hora_inicio, hora_fim);
  const q = `INSERT INTO horas_extras (funcionario_id, nome_colaborador, login_colaborador, nc, data_he, hora_inicio, hora_fim, qtd_horas, motivo, centro_custo)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`;
  const values = [funcionario_id, nome_colaborador, login_colaborador, nc, data_he, hora_inicio, hora_fim, qtd_horas, motivo, centro_custo];
  const result = await db.query(q, values);
  res.status(201).json(result.rows[0]);
});

router.get('/', async (req, res) => {
  const { status, from, to } = req.query;
  let q = 'SELECT * FROM horas_extras WHERE 1=1';
  const params = [];
  if(status) { params.push(status); q += ` AND status = $${params.length}`; }
  if(from) { params.push(from); q += ` AND data_he >= $${params.length}`; }
  if(to) { params.push(to); q += ` AND data_he <= $${params.length}`; }
  q += ' ORDER BY data_he DESC';
  const result = await db.query(q, params);
  res.json(result.rows);
});

router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, aprovado_por } = req.body;
  const q = 'UPDATE horas_extras SET status=$1, aprovado_por=$2 WHERE id=$3 RETURNING *';
  const result = await db.query(q, [status, aprovado_por, id]);
  res.json(result.rows[0]);
});

module.exports = router;
