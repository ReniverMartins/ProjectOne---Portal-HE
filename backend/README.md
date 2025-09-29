# HE Portal 🕒

Um sistema simples para colaboradores registrarem **Horas Extras (HEs)** e gestores acompanharem, aprovarem e visualizarem o custo estimado.  
Construído em **Node.js (Express) + PostgreSQL** no backend e **HTML + CSS + Bootstrap + JS** no frontend. 🚀

---

## 📂 Estrutura do Projeto

e-portal/
│
├── backend/
│   ├── migrations/
│   │   └── init.sql        # Script para criar as tabelas e seeds
│   ├── routes/             # Rotas da API (auth, funcionarios, horasExtras)
│   ├── db.js               # Conexão com o banco
│   ├── server.js           # Servidor Express
│   └── package.json        # Dependências e scripts
│
└── frontend/
├── index.html          # Tela de login
├── form.html           # Formulário de lançamento de HE
├── admin.html          # Portal administrativo
└── js/                 # Scripts de frontend

