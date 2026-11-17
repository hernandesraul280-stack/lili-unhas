import express from 'express';
import pg from 'pg';

const { Pool } = pg;
const port = Number(process.env.API_PORT ?? 3001);

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const schema = `
  CREATE TABLE IF NOT EXISTS appointment_requests (
    id serial PRIMARY KEY,
    name text NOT NULL,
    whatsapp text NOT NULL,
    service text,
    preferred_date date,
    notes text,
    status text NOT NULL DEFAULT 'novo',
    created_at timestamptz NOT NULL DEFAULT now()
  )
`;

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/appointment-requests', async (req, res) => {
  const { name, whatsapp, service, preferred_date, notes } = req.body ?? {};
  const cleanName = typeof name === 'string' ? name.trim() : '';
  const cleanPhone = typeof whatsapp === 'string' ? whatsapp.trim() : '';
  const cleanDate = typeof preferred_date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(preferred_date)
    ? preferred_date
    : null;

  if (cleanName.length < 2 || !/^\+[1-9]\d{9,14}$/.test(cleanPhone)) {
    res.status(422).json({ error: 'invalid_request' });
    return;
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO appointment_requests (name, whatsapp, service, preferred_date, notes)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, created_at`,
      [
        cleanName,
        cleanPhone,
        typeof service === 'string' && service.trim() ? service.trim() : null,
        cleanDate,
        typeof notes === 'string' && notes.trim() ? notes.trim() : null,
      ]
    );
    res.status(201).json({ id: rows[0].id, created_at: rows[0].created_at });
  } catch (error) {
    console.error('Failed to store appointment request', error);
    res.status(500).json({ error: 'server_error' });
  }
});

async function start() {
  await pool.query(schema);
  app.listen(port, '0.0.0.0', () => {
    console.log(`API listening on http://0.0.0.0:${port}`);
  });
}

start().catch((error) => {
  console.error('API failed to start', error);
  process.exit(1);
});
