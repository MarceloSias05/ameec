# Prompt: Propuesta de Refactorización Digital — AMEEC

> **Instrucciones de uso:** Copia este prompt completo y pégalo en una IA conversacional (Claude, ChatGPT, Gemini, etc.). La IA generará una propuesta integral de refactorización de la infraestructura web de AMEEC. Si quieres acotar el alcance, edita la sección **"Alcance específico solicitado"** al final antes de enviar.

---

## 🎯 Rol y objetivo

Actúa como un **consultor senior en arquitectura web, UX/UI y transformación digital con IA**, con más de 10 años de experiencia modernizando plataformas para organizaciones sin fines de lucro y proyectos socioambientales. Tu misión es entregar una **propuesta ejecutable de refactorización** del ecosistema digital de la **Asociación Mexicana de Educación Ecológica y Comunitaria (AMEEC)**.

La propuesta debe equilibrar tres ejes:

1. **Viabilidad técnica** (recursos limitados, equipo pequeño, transición desde WordPress).
2. **Impacto comunicacional** (claridad de misión, captación de participantes, donantes y aliados).
3. **Aprovechamiento de IA y automatización** como ventaja competitiva real, no como adorno.

---

## 🌱 Contexto de la organización

AMEEC es una organización enfocada en educación ecológica, bioconstrucción y proyectos comunitarios. Actualmente opera un ecosistema digital fragmentado:

| Dominio / Sitio | Función | Estado |
|---|---|---|
| `ameec.org` | Dominio institucional principal | WordPress con componentes HTML personalizados |
| `ameec.net` | Eventos y herramientas institucionales | WordPress |
| **Olas de Amor** | Proyecto/campaña complementaria | Sitio satélite |
| **Proyecto Bioconstrucción** | Iniciativa temática | Sitio satélite |
| **Sitio de Inducción** | Onboarding de nuevos participantes / voluntarios | Sitio satélite — **prioridad de rediseño** |

**Limitaciones actuales del proyecto:**

- Ajustes temporales en servicios de hosting y administración técnica.
- La fase actual es de **análisis, diseño conceptual y prototipado**, no de despliegue en producción.
- Equipo reducido; se valora la mantenibilidad por personas no técnicas.

---

## 📋 Entregables esperados de tu propuesta

Estructura tu respuesta en las siguientes seis secciones, en este orden:

### 1. Diagnóstico del ecosistema actual

- Riesgos y debilidades probables de tener WordPress fragmentado entre múltiples dominios y subproyectos.
- Implicaciones de SEO, gobernanza de marca, mantenimiento, costos de hosting y experiencia de usuario al navegar entre sitios.
- Tres preguntas clave que deberían responderse antes de tomar decisiones definitivas (qué información falta).

### 2. Análisis comparativo de tecnologías

Genera una **tabla comparativa** evaluando al menos 8 de las siguientes herramientas/stacks, agrupadas por categoría:

- **Desarrollo asistido con IA:** Claude, ChatGPT, Gemini, GitHub Copilot.
- **Constructores no-code / low-code con IA:** Hostinger AI Builder, Framer, Webflow, Bolt.new, Lovable, Firebase Studio.
- **Diseño visual asistido:** Figma AI, Canva AI.
- **Stack actual y compatible:** WordPress + Elementor, headless WordPress.

Criterios de evaluación por columna:

| Herramienta | Curva de aprendizaje | Costo mensual estimado | Capacidad IA | Mantenibilidad no-técnica | SEO | Migración desde WP | Recomendación AMEEC (1-5) |

Cierra el análisis con un **veredicto en prosa** de máximo 150 palabras: cuáles ganan y por qué para este caso.

### 3. Stack tecnológico recomendado

Propón **un stack primario y una alternativa**, justificando cada elección. Para cada uno especifica:

- **CMS / Constructor** (ej. Framer, Webflow, WordPress headless, Astro + CMS).
- **Hosting** (ej. Vercel, Netlify, Hostinger, Cloudflare Pages).
- **Sistema de diseño** (Figma + tokens, Tailwind, biblioteca de componentes).
- **Integraciones IA** (generación de contenido, chatbot, traducción, accesibilidad).
- **Analítica y formularios** (Plausible/GA4, Tally, Formspree, Notion como backend).
- **Flujo de contenido editorial** para que personas no técnicas publiquen.

### 4. Arquitectura de información propuesta

- ¿Conviene **unificar todos los proyectos bajo `ameec.org`** mediante subdirectorios (`/olas-de-amor`, `/bioconstruccion`, `/induccion`) o mantener subdominios? Justifica con criterios de SEO, identidad y autonomía editorial.
- Sitemap propuesto en formato de árbol (texto) para el dominio principal y para el **sitio de inducción** (prioritario).
- Plantillas de página tipo necesarias (home, proyecto, evento, blog, formulario de inscripción, página de donación).

### 5. Plan de modernización por fases

Plan realista en **3 fases con duración estimada** (semanas):

- **Fase 1 — Quick wins:** mejoras inmediatas sin migrar (rendimiento, accesibilidad, copy con IA, formularios).
- **Fase 2 — Rediseño del sitio de inducción** como piloto del nuevo stack.
- **Fase 3 — Migración progresiva** del resto del ecosistema y consolidación.

Para cada fase incluye: objetivos, herramientas, riesgos, indicadores de éxito.

### 6. Oportunidades de automatización con IA

Lista **5 a 7 automatizaciones concretas** que aporten valor medible. Para cada una indica:

- Problema que resuelve.
- Herramientas (ej. Claude API, Zapier, Make, n8n, WordPress AI plugins).
- Esfuerzo de implementación (bajo/medio/alto).
- Ejemplos: generación de descripciones SEO, traducción ES/EN automática, chatbot de inducción, resumen de eventos pasados, generación de imágenes para redes, alt-text accesible automático, newsletter desde contenidos del sitio.

---

## 🎨 Prototipo conceptual del sitio de inducción

Además de las seis secciones anteriores, entrega un **boceto textual + estructura HTML/Tailwind** para una landing page del sitio de inducción con:

- Hero con propuesta de valor clara (¿qué es AMEEC y por qué unirse?).
- Sección de pasos del proceso de inducción.
- Testimonios o casos de impacto.
- Llamada a la acción (CTA) para inscripción.
- Footer con vínculos a los otros proyectos del ecosistema.

Si la IA lo permite, genera el código en un artefacto/canvas renderizable. Define paleta de colores coherente con valores ecológicos (verdes tierra, ocres, no genéricos), tipografía moderna y diseño accesible (contraste AA mínimo).

---

## 📐 Criterios de calidad de tu respuesta

Tu propuesta será evaluada bajo estos criterios — optimiza para todos:

- **Investigación y análisis tecnológico:** evidencia que conoces las herramientas actuales del mercado, no solo las clásicas.
- **Creatividad e innovación:** ideas no obvias, combinaciones inteligentes de herramientas.
- **Aplicación de IA aplicada al desarrollo web:** propuestas concretas, no "usar ChatGPT para escribir textos".
- **Claridad de propuesta:** lenguaje accesible para una junta directiva no técnica.
- **Calidad visual y funcional del prototipo:** código limpio, diseño cuidado.
- **Honestidad sobre limitaciones:** indica qué decisiones requieren información adicional o pruebas con usuarios reales.

---

## ⚙️ Formato y restricciones de salida

- **Idioma:** español, registro profesional pero cercano.
- **Extensión total:** entre 1,500 y 2,500 palabras (sin contar código).
- **Formato:** Markdown con encabezados, tablas y listas. Negritas para conceptos clave.
- **Evita:**
  - Generalidades vacías ("es importante tener buena UX").
  - Recomendaciones sin justificación.
  - Inventar datos de costos sin marcarlos como "estimado aproximado".
- **Incluye:** al menos una recomendación contraintuitiva o un trade-off honesto donde la opción popular no sea la mejor para AMEEC.

---

## 🔧 Alcance específico solicitado

> *Edita esta sección si quieres acotar la propuesta antes de enviarla. Déjala como está para obtener la propuesta completa.*

- [x] Diagnóstico completo del ecosistema actual
- [x] Comparativa tecnológica
- [x] Stack recomendado
- [x] Arquitectura de información
- [x] Plan por fases
- [x] Automatizaciones con IA
- [x] Prototipo del sitio de inducción (código incluido)

**Presupuesto de tiempo del equipo:** 10 horas totales distribuidas así:
- 1 h investigación y análisis
- 2 h exploración de herramientas IA
- 5 h desarrollo de prototipo o muestra
- 2 h presentación y documentación

Ajusta la profundidad de cada sección considerando esta restricción de tiempo: prioriza decisiones accionables sobre exhaustividad académica.

---

**Comienza tu respuesta directamente con la Sección 1 (Diagnóstico). No incluyas preámbulos del tipo "Claro, aquí está mi propuesta…"**
