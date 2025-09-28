-- funcionarios
CREATE TABLE IF NOT EXISTS funcionarios (
  id SERIAL PRIMARY KEY,
  nc VARCHAR(50) UNIQUE NOT NULL,
  nome_completo VARCHAR(200) NOT NULL,
  funcao VARCHAR(100),
  salario NUMERIC(12,2),
  centro_custo VARCHAR(50),
  coordenador VARCHAR(200),
  gerente VARCHAR(200),
  head VARCHAR(200)
);

-- usuarios (para login)
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  login VARCHAR(100) UNIQUE NOT NULL,
  senha_hash VARCHAR(200) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'COLAB'
);

-- horas_extras
CREATE TABLE IF NOT EXISTS horas_extras (
  id SERIAL PRIMARY KEY,
  funcionario_id INTEGER REFERENCES funcionarios(id) ON DELETE SET NULL,
  nome_colaborador VARCHAR(200),
  login_colaborador VARCHAR(100),
  nc VARCHAR(50),
  data_he DATE,
  hora_inicio TIME,
  hora_fim TIME,
  qtd_horas NUMERIC(6,2),
  motivo TEXT,
  centro_custo VARCHAR(50),
  status VARCHAR(20) DEFAULT 'PENDENTE',
  aprovado_por VARCHAR(200),
  created_at TIMESTAMP DEFAULT now()
);


-- Usuários seed
INSERT INTO usuarios (login, senha_hash, role)
VALUES 
('admin', '$2b$12$qcD6sWQJWeS3jt.FCU2YAuvy565eFSPNyA89xqyVOjNY.X8iIANG.', 'ADMIN'),
('colab', '$2b$12$qcD6sWQJWeS3jt.FCU2YAuvy565eFSPNyA89xqyVOjNY.X8iIANG.', 'COLAB')
ON CONFLICT (login) DO NOTHING;
