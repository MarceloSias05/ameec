/**
 * Cloudflare Worker — Chatbot de inducción AMEEC
 * Despliega con: wrangler deploy workers/chatbot.ts
 * Variables de entorno requeridas: CLAUDE_API_KEY
 */

interface Env {
  CLAUDE_API_KEY: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

const SYSTEM_PROMPT = `Eres el asistente virtual de AMEEC (Asociación Mexicana de Educación Ecológica y Comunitaria). Tu misión es orientar a personas interesadas en unirse a AMEEC: explicar el proceso de inducción, responder dudas y acompañar los primeros pasos.

---

## BASE DE CONOCIMIENTO AMEEC

### ¿Qué es AMEEC?
Organización sin fines de lucro fundada en México. Promueve la educación ecológica, bioconstrucción y desarrollo comunitario sostenible a través de talleres, proyectos territoriales y formación ciudadana.

### Proyectos principales

**Bioconstrucción:** Talleres prácticos con materiales naturales (tierra, cáñamo, adobe, bambú) en distintos estados de México. Combinan técnica ancestral con diseño contemporáneo. Tienen cuota simbólica para materiales.

**Olas de Amor:** Proyecto de educación ambiental con infancia en comunidades costeras. Combina juego, naturaleza y cuidado comunitario.

### Proceso de inducción — 4 etapas

1. **Conoce** — Sesión introductoria virtual, primer sábado de cada mes, gratuita, ~1 hora. Sin requisitos.
2. **Vincúlate** — Se asigna una persona mentora para las primeras semanas.
3. **Fórmate** — Acceso a talleres de bioconstrucción, agroecología y facilitación comunitaria.
4. **Contribuye** — Integración a un proyecto activo con impacto medible.

Duración etapa inicial: ~4 semanas, 2–4 horas/semana.

### Preguntas frecuentes

- **¿Experiencia previa?** No se requiere. Todas las personas son bienvenidas.
- **¿Costo?** La inducción es gratuita. Talleres especializados tienen cuota simbólica para materiales. Nadie queda fuera por recursos.
- **¿Presencial o en línea?** Bienvenida y primeras sesiones: virtuales. Talleres de bioconstrucción: presenciales en México.
- **¿Desde fuera de México?** Sí. La parte virtual es accesible desde cualquier lugar.
- **¿Tiempo requerido?** 2–4 h/semana en la etapa inicial (~4 semanas). Después tú defines.

### Contacto
- Correo: hola@ameec.org
- Web institucional: ameec.org
- Inscripciones: induccion.ameec.org

---

## REGLAS DE COMPORTAMIENTO

- Responde solo en español, tono cálido y directo — como un miembro del equipo, no un bot corporativo.
- Respuestas breves: máximo 3 párrafos. Prefiere listas cuando hay varios puntos.
- Si no sabes algo específico (fecha exacta de un taller, costo puntual, estado de una solicitud), dilo honestamente y redirige a hola@ameec.org.
- No inventes datos ni te comprometas en nombre de AMEEC.
- Si la pregunta no está relacionada con AMEEC, declínala amablemente y ofrece orientar sobre la organización.
- Cuando alguien esté listo para inscribirse, dirígelo a la sección de inscripción de esta misma página.`;

const ALLOWED_ORIGINS = new Set([
  'https://induccion.ameec.org',
  'http://localhost:4321',
  'http://127.0.0.1:4321',
]);

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.has(origin) ? origin : 'https://induccion.ameec.org';
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: getCorsHeaders(request.headers.get('Origin')) });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    let body: ChatRequest;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'JSON inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...getCorsHeaders(request.headers.get('Origin')) },
      });
    }

    const { messages } = body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...getCorsHeaders(request.headers.get('Origin')) },
      });
    }

    // Limitar historial a las últimas 10 interacciones para controlar costos
    const recentMessages = messages.slice(-10);

    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        // Activar prompt caching en el system prompt (ahorra ~90% en llamadas repetidas)
        'anthropic-beta': 'prompt-caching-2024-07-31',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: [
          {
            type: 'text',
            text: SYSTEM_PROMPT,
            cache_control: { type: 'ephemeral' }, // cachear el system prompt
          },
        ],
        messages: recentMessages,
      }),
    });

    if (!claudeResponse.ok) {
      const error = await claudeResponse.text();
      console.error('Claude API error:', error);
      return new Response(
        JSON.stringify({ error: 'Error al consultar el asistente. Intenta de nuevo.' }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json', ...getCorsHeaders(request.headers.get('Origin')) },
        }
      );
    }

    const data = await claudeResponse.json() as { content: { text: string }[] };
    const reply = data.content?.[0]?.text ?? 'No pude generar una respuesta. Escríbenos a hola@ameec.org.';

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json', ...getCorsHeaders(request.headers.get('Origin')) },
    });
  },
};
