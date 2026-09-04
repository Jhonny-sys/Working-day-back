import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const app = express();
const PORT = process.env.GATEWAY_PORT || 3000;

const JORNADAS_URL = process.env.JORNADAS_SERVICE_URL || 'http://localhost:3001';
const INSCRIPCIONES_URL = process.env.INSCRIPCIONES_SERVICE_URL || 'http://localhost:3002';

app.use(cors());

app.get('/health', (_req, res) => {
  res.json({ service: 'gateway', status: 'ok' });
});

function createProxy(target) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (_path, req) => req.originalUrl.replace(/^\/api/, ''),
  });
}

// Rutas más específicas primero
app.use('/api/jornadas/:id/inscripciones', createProxy(INSCRIPCIONES_URL));
app.use('/api/jornadas', createProxy(JORNADAS_URL));
app.use('/api/inscripciones', createProxy(INSCRIPCIONES_URL));
app.use('/api/metricas', createProxy(INSCRIPCIONES_URL));

app.use((_req, res) => {
  res.status(404).json({ error: { message: 'Ruta no encontrada', code: 'NOT_FOUND' } });
});

app.listen(PORT, () => {
  console.log(`[gateway] Puerto ${PORT}`);
  console.log(`  -> jornadas: ${JORNADAS_URL}`);
  console.log(`  -> inscripciones: ${INSCRIPCIONES_URL}`);
});
