const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const authRouter = require('./routes/auth');
const funcionariosRouter = require('./routes/funcionarios');
const horasRouter = require('./routes/horasExtras');

app.use('/api/auth', authRouter);
app.use('/api/funcionarios', funcionariosRouter);
app.use('/api/horas-extras', horasRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
