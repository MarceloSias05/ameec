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

const SYSTEM_PROMPT = `Eres el asistente virtual de AMEEC (Asociación Mexicana de Educación Ecológica y Comunitaria).

Tu rol es ayudar a personas interesadas en unirse a AMEEC a entender el proceso de inducción, responder preguntas frecuentes y acompañarlas en sus primeros pasos.

Sobre AMEEC:
- Organización sin fines de lucro enfocada en educación ecológica, bioconstrucción y proyectos comunitarios en México.
- El proceso de inducción tiene 4 etapas: Conoce → Vincúlate → Fórmate → Contribuye.
- La bienvenida inicial es el primer sábado de cada mes, virtual y gratuita.
- Los talleres presenciales ocurren en distintos estados de México.
- La inducción es gratuita. Algunos talleres especializados tienen cuota simbólica.
- No se requiere experiencia previa.
- Personas fuera de México pueden participar en la parte virtual.
- Contacto: hola@ameec.org

Reglas de comportamiento:
- Responde solo en español, tono cálido y directo.
- Si no sabes algo específico (fechas exactas, costos puntuales, proyectos activos), di que no tienes esa información actualizada y redirige a hola@ameec.org.
- Respuestas cortas: máximo 3 párrafos.
- No inventar datos ni comprometerte en nombre de AMEEC.
- Si la pregunta no está relacionada con AMEEC, declina amablemente.`;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://induccion.ameec.org',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
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
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      });
    }

    const { messages } = body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
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
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
        }
      );
    }

    const data = await claudeResponse.json() as { content: { text: string }[] };
    const reply = data.content?.[0]?.text ?? 'No pude generar una respuesta. Escríbenos a hola@ameec.org.';

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  },
};
