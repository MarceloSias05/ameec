# Análisis Tecnológico — Ecosistema Digital AMEEC
**Versión:** 1.0 · **Fecha:** Mayo 2026 · **Preparado por:** Equipo de Desarrollo Digital

---

## Resumen Ejecutivo

AMEEC opera actualmente con sitios web desactualizados construidos sobre plataformas propietarias (Canva Sites, Wix, o similares) que limitan su autonomía editorial, escalabilidad y presencia digital institucional. Este documento propone la migración a un ecosistema moderno, de código abierto y bajo costo operativo, centrado en rendimiento, accesibilidad y capacidad de automatización.

**Diagnóstico rápido:**
- Sitios actuales: difíciles de actualizar sin conocimiento técnico especializado
- Sin estrategia de SEO estructurada
- Sin sistema de gestión de contenidos (CMS) unificado
- Sin presencia de IA o automatización de atención
- Costo oculto alto en plataformas propietarias a largo plazo

**Propuesta central:** Migrar a un stack JAMstack moderno (Astro + Tailwind CSS + Decap CMS + Cloudflare) que permite a AMEEC gestionar su contenido de forma autónoma, desplegar sin costos de servidor y escalar hacia automatización con IA.

---

## 1. Stack Tecnológico Recomendado

### Capa de Presentación (Frontend)

| Tecnología | Rol | Justificación |
|---|---|---|
| **Astro 5** | Framework principal | Genera HTML estático puro; máximo rendimiento sin JavaScript innecesario |
| **Tailwind CSS 3** | Sistema de diseño | Utilidades atómicas; diseño consistente sin CSS personalizado complejo |
| **Fraunces + Inter** | Tipografía | Serif cálido (display) + sans neutral (cuerpo); identidad visual fuerte |
| **Google Fonts** | Hosting de fuentes | CDN gratuito, cargado con `display=swap` para no bloquear render |

### Capa de Contenido (CMS)

| Tecnología | Rol | Justificación |
|---|---|---|
| **Decap CMS** | Editor visual | Git-based; el contenido vive en el repositorio; sin base de datos; gratuito |
| **GitHub** | Repositorio + backend CMS | Versionado, historial de cambios, colaboración; gratuito para OSS y ONGs |
| **JSON / Markdown** | Formato de contenido | Legible por humanos; editado por Decap CMS; compatible con Astro Content Collections |

### Capa de Infraestructura (Hosting)

| Tecnología | Rol | Justificación |
|---|---|---|
| **Cloudflare Pages** | Hosting estático | Gratuito, CDN global, HTTPS automático, deploys en <60s desde GitHub |
| **Cloudflare Workers** | Backend serverless | Funciones edge para formularios, chatbot, webhooks; plan gratuito generoso |
| **Cloudflare DNS** | Gestión de dominios | Control centralizado de ameec.org, ameec.net y subdominios |

### Capa de Automatización e IA

| Tecnología | Rol | Justificación |
|---|---|---|
| **Claude API (Haiku 4.5)** | Chatbot de atención | Modelo más económico de Anthropic; ideal para FAQ y orientación de nuevos voluntarios |
| **Formspree** | Manejo de formularios | Recibe envíos de formularios sin backend propio; plan gratuito hasta 50 envíos/mes |
| **Plausible Analytics** | Métricas de visitas | Privacy-first; sin cookies; cumple RGPD; alternativa ética a Google Analytics |
| **GitHub Actions** | CI/CD y automatización | Workflows gratuitos para deploys automáticos, validaciones y notificaciones |

---

## 2. Justificación Técnica

### ¿Por qué Astro y no WordPress, Wix o Squarespace?

```
WordPress / Wix / Squarespace:
  ✗ Requiere servidor activo (PHP, MySQL) → costo mensual obligatorio
  ✗ Superficie de ataque amplia (plugins desactualizados → hackeos)
  ✗ Rendimiento limitado (Time to First Byte alto)
  ✗ Dependencia de plataforma propietaria

Astro (JAMstack):
  ✓ Genera archivos HTML estáticos → sin servidor, sin base de datos
  ✓ Cero superficie de ataque dinámica → más seguro por diseño
  ✓ Lighthouse score 95-100 out of the box
  ✓ Código fuente propiedad de AMEEC, hosteable en cualquier CDN
```

### ¿Por qué Cloudflare Pages y no Vercel o Netlify?

| Criterio | Cloudflare Pages | Vercel | Netlify |
|---|---|---|---|
| Ancho de banda gratis | Ilimitado | 100 GB/mes | 100 GB/mes |
| Workers (backend) | Incluido, mismo proveedor | Funciones separadas | Funciones separadas |
| DNS integrado | Sí (si dominio en CF) | No | No |
| Latencia global | Red Anycast 300+ ciudades | ~15 regiones | ~6 regiones |
| Costo estimado AMEEC | $0/mes | $0–20/mes | $0–19/mes |

**Conclusión:** Para una ONG con dominio ya en Cloudflare, Pages es la opción naturalmente más económica y mejor integrada.

### ¿Por qué Decap CMS y no Contentful, Sanity o Strapi?

- **Contentful / Sanity:** Planes gratuitos limitados; costosos al escalar; requieren API key management
- **Strapi:** Requiere servidor Node.js corriendo → costo mensual
- **Decap CMS:** El contenido vive como archivos JSON/Markdown en GitHub; sin costo adicional; edición visual para no-técnicos; historial de cambios automático por Git

---

## 3. Ventajas y Limitaciones

### Ventajas del Stack Propuesto

**Económicas:**
- Costo operativo proyectado: **$0–5 USD/mes** (solo dominio ameec.org si ya existe)
- Sin licencias de software ni suscripciones obligatorias
- Escala sin costo adicional (Cloudflare absorbe el tráfico)

**Técnicas:**
- Sitios con puntuación Lighthouse > 95 (impacta SEO directamente)
- HTTPS automático y renovación de certificados sin intervención
- Deploys automáticos al hacer commit en GitHub (CI/CD)
- Sin base de datos → sin riesgo de SQL injection, sin backups manuales

**Editoriales:**
- Coordinadores pueden actualizar contenido desde navegador (Decap CMS)
- Historial completo de quién cambió qué y cuándo (Git)
- Posibilidad de revisar cambios antes de publicar (Pull Requests)

**Estratégicas:**
- Independencia total de proveedores (el código es de AMEEC)
- Puede migrar de hosting sin reescribir nada
- Extensible: agregar páginas, idiomas, módulos sin refactorizar

### Limitaciones y Mitigaciones

| Limitación | Impacto | Mitigación |
|---|---|---|
| Curva de aprendizaje inicial para el equipo técnico | Medio | Documentación interna + capacitación de 1 sesión |
| Decap CMS requiere configuración inicial para cada colección | Bajo | Ya configurado en `public/admin/config.yml` |
| Formularios con Formspree limitados a 50/mes en plan free | Bajo-Medio | Upgrade a $8/mes si el volumen lo justifica; o usar Worker propio |
| Claude API tiene costo por tokens | Bajo | Haiku es ~$0.25/MTok; con caché de prompt el costo real es mínimo |
| Sin búsqueda nativa (sitio estático) | Medio | Integrar Pagefind (biblioteca de búsqueda estática, gratuita) |
| CMS visual solo para contenido definido; cambios de estructura requieren código | Bajo | Es una limitación inherente a cualquier CMS estructurado |

---

## 4. Estructura de Renovación de Sitios Institucionales

### Arquitectura de Dominios Propuesta

```
ameec.org                    ← Sitio institucional principal
  /                          ← Home: quiénes somos, misión, proyectos
  /proyectos/               ← Portafolio de proyectos activos
  /equipo/                  ← Directorio del equipo
  /transparencia/           ← Informes anuales, financieros
  /contacto/                ← Formulario + mapa

induccion.ameec.org          ← Portal de inducción (YA EN DESARROLLO)
  /                          ← Landing de bienvenida
  /modulos/induccion/       ← Módulo 1: Qué es AMEEC
  /modulos/herramientas/    ← Módulo 2: Discord, Trello, Classroom
  /modulos/derechos/        ← Módulo 3: Derechos y Obligaciones
  /admin/                   ← Decap CMS (protegido)

voluntariado.ameec.org       ← (Futuro) Portal de voluntariado externo
  /                          ← Convocatorias abiertas
  /postular/                ← Formulario de postulación
  /proyectos/               ← Dónde se puede contribuir

blog.ameec.org               ← (Futuro) Blog editorial / noticias
  /                          ← Feed de artículos
  /categoria/               ← Por tema: bioconstrucción, educación, etc.
```

### Fases de Renovación

**Fase 1 — Inducción (Actual, Mayo 2026)**
- `induccion.ameec.org` completo con todos los módulos
- Chatbot de orientación con Claude Haiku
- Formulario de inscripción funcional
- CMS para que coordinadores actualicen contenido

**Fase 2 — Institucional (Junio–Agosto 2026)**
- Rediseño de `ameec.org` bajo el mismo sistema de diseño
- Migración de contenido actual (proyectos, equipo, historia)
- SEO estructurado (sitemap, robots.txt, meta tags, schema.org)
- Analytics con Plausible

**Fase 3 — Escalado (Septiembre–Diciembre 2026)**
- Portal de voluntariado con formularios multi-paso
- Blog editorial con CMS completo
- Newsletter (integración con Mailchimp o Brevo gratuito)
- Dashboard interno de métricas para coordinadores

---

## 5. Ideas de Automatización y Mejora con IA

### 5.1 Chatbot de Orientación (Implementado)
**Estado:** En desarrollo activo  
**Descripción:** Asistente inteligente que responde preguntas frecuentes de nuevos prestadores de servicio social. Disponible 24/7, reduce la carga del equipo coordinador.  
**Mejoras futuras:**
- Conectar con Google Calendar para agendar entrevistas automáticamente
- Integrar con Trello API para crear tarjetas de seguimiento desde el chat
- Historial de conversaciones en localStorage para continuidad entre sesiones

### 5.2 Resumen Automático de Retroalimentación
**Descripción:** Cada mes, un GitHub Action extrae los formularios de retroalimentación recibidos y usa Claude API para generar un resumen ejecutivo en Markdown, guardado automáticamente en el repositorio.  
**Beneficio:** Coordinadores reciben insights accionables sin leer formularios individuales.

### 5.3 Generación de Fichas de Proyecto
**Descripción:** A partir de un formulario simple (nombre del proyecto, objetivos, beneficiarios, logros), Claude genera automáticamente el contenido completo de la página del proyecto en el sitio web.  
**Flujo:**
```
Coordinador llena formulario → Worker llama Claude API → 
Genera JSON/Markdown del proyecto → Pull Request en GitHub → 
Coordinador aprueba → Deploy automático
```

### 5.4 Moderación de Aplicaciones de Voluntariado
**Descripción:** Al recibir una postulación, Claude analiza el formulario y genera una evaluación inicial (puntos fuertes, áreas de mejora, perfil recomendado) para que el coordinador tome decisiones más rápido.

### 5.5 SEO Automatizado
**Descripción:** GitHub Action que analiza semanalmente las páginas con Lighthouse CI, genera un reporte de oportunidades de mejora y abre un issue en GitHub con recomendaciones específicas.

### 5.6 Traducciones Automáticas
**Descripción:** Para futuros proyectos con comunidades indígenas o internacionales, integrar la API de DeepL o Claude para generar versiones en inglés, náhuatl u otras lenguas de las páginas principales.

### 5.7 Newsletter Inteligente
**Descripción:** Cada bimestre, GitHub Action + Claude API genera automáticamente un borrador de newsletter con los últimos proyectos, logros e impacto, enviado via Brevo (ex-Sendinblue, plan gratuito hasta 300 emails/día).

---

## 6. Comparación de Stacks Alternativos

| Stack | Costo/mes | Complejidad | Autonomía editorial | IA-ready | Recomendado |
|---|---|---|---|---|---|
| **Astro + CF Pages + Decap** | $0 | Media | Alta | Sí | ✅ **SÍ** |
| Next.js + Vercel + Contentful | $20–80 | Alta | Alta | Sí | Para teams técnicos grandes |
| WordPress + Hosting | $5–30 | Baja | Alta | Limitada | No para ONGs con recursos limitados |
| Wix / Squarespace | $15–45 | Muy baja | Media | No | No (dependencia de plataforma) |
| Canva Sites (actual) | $0–13 | Muy baja | Baja | No | No (limitaciones severas) |
| Hugo + Netlify | $0 | Media | Media | Limitada | Alternativa válida, menos ecosistema |

---

## 7. Proyección de Costos

### Escenario Actual (Canva / Plataformas propietarias)
| Ítem | Costo estimado/año |
|---|---|
| Canva Pro (diseño + sites) | $120–240 USD |
| Dominio ameec.org | $15 USD |
| Hosting adicional (si aplica) | $60–180 USD |
| **Total estimado** | **$195–435 USD/año** |

### Escenario Propuesto (Stack JAMstack)
| Ítem | Costo/año |
|---|---|
| Dominio ameec.org | $15 USD |
| Cloudflare Pages | $0 |
| Cloudflare Workers | $0 (plan gratuito) |
| Decap CMS | $0 |
| GitHub | $0 (organizaciones OSS/ONG) |
| Claude API (chatbot) | ~$5–20 USD estimado |
| Plausible Analytics | $9/mes = $108 USD (opcional) |
| Formspree (si > 50/mes) | $0–96 USD |
| **Total mínimo** | **~$20–35 USD/año** |
| **Total con todos los extras** | **~$140–230 USD/año** |

**Ahorro estimado: 50–90% vs. plataformas propietarias**

---

## 8. Entregables de Este Proyecto

| Entregable | Estado | Descripción |
|---|---|---|
| Boceto funcional | ✅ Completado | `mockup-induccion.html` — HTML autocontenido, Tailwind CDN, 9 secciones |
| Sitio Astro completo | ✅ En desarrollo | `src/` con todos los componentes, páginas y módulos |
| Sistema de diseño | ✅ Completado | Tailwind config + paleta + tipografía AMEEC |
| CMS editorial | ✅ Configurado | Decap CMS en `public/admin/` con colecciones definidas |
| Chatbot IA | ✅ Implementado | Worker Cloudflare + Claude Haiku + caché de prompt |
| Plan de implementación | ✅ Completado | `PLAN_IMPLEMENTACION.md` con fases y checklist |
| Análisis tecnológico | ✅ Este documento | Stack, justificación, costos, automatización |
| Deploy en producción | ⏳ Pendiente | Requiere: Formspree ID, CLAUDE_API_KEY, CNAME DNS |

---

## 9. Recomendaciones Inmediatas

1. **Aprobar el stack** — Astro + Cloudflare Pages + Decap CMS es la combinación óptima para AMEEC en 2026
2. **Configurar GitHub Organization** — Centralizar todos los repositorios bajo `github.com/ameec`
3. **Obtener CLAUDE_API_KEY** — Registrar cuenta en console.anthropic.com (tarjeta de crédito, costo real < $5/mes)
4. **Configurar Formspree** — Crear cuenta gratuita en formspree.io, copiar el ID al `.env`
5. **Conectar GitHub a Cloudflare Pages** — 10 minutos, primer deploy automático
6. **Capacitar a 1–2 coordinadores** — Sesión de 1 hora para usar Decap CMS y editar contenido
7. **Definir métricas reales** — Reemplazar "X" en impact.json con números verificados de AMEEC

---

## Conclusión

El ecosistema digital propuesto posiciona a AMEEC como una organización moderna, transparente y autónoma en su gestión digital. La combinación de tecnologías open-source, hosting gratuito de clase mundial y automatización con IA permite a AMEEC operar con una infraestructura equivalente a la de organizaciones con presupuestos mucho mayores, a una fracción del costo.

El código fuente pertenece completamente a AMEEC, el contenido es editable sin conocimientos técnicos, y la arquitectura escala sin costos adicionales conforme crece la comunidad.

---

*Documento generado en el contexto del proyecto de modernización digital de AMEEC · Mayo 2026*  
*Stack de referencia: Astro 5 · Tailwind CSS 3 · Decap CMS · Cloudflare Pages + Workers · Claude Haiku API*
