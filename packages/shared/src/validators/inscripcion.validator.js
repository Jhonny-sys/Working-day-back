import { z } from 'zod';

export const createInscripcionSchema = z.object({
  nombreCompleto: z.string().min(1).max(255),
  tipoDocumento: z.string().min(1).max(20),
  numeroDocumento: z.string().min(1).max(50),
  correo: z.string().email().max(255),
});

export const inscripcionIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const jornadaIdParamSchema = z.object({
  id: z.string().uuid(),
});
