-- Schema for backend database

CREATE TABLE users (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  email text NOT NULL UNIQUE,
  nome text NOT NULL UNIQUE,
  phone character varying,
  isadmin boolean DEFAULT false,
  mensalidade date DEFAULT CURRENT_DATE,
  senhahash character varying NOT NULL,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE turmas (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  nome text NOT NULL UNIQUE,
  horario text,
  tipo_data text DEFAULT 'Constante'::text,
  dia_especifico date,
  dias text[] DEFAULT ARRAY[]::text[],
  CONSTRAINT turmas_pkey PRIMARY KEY (id)
);

CREATE TABLE checkins (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  nome text NOT NULL,
  user_id integer NOT NULL,
  turma_id integer,
  checkinstatus character varying NOT NULL,
  criado_em timestamp with time zone,
  CONSTRAINT checkins_pkey PRIMARY KEY (id),
  CONSTRAINT checkins_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_turmas FOREIGN KEY (turma_id) REFERENCES turmas(id),
  CONSTRAINT fk_user_nome FOREIGN KEY (nome) REFERENCES users(nome)
);