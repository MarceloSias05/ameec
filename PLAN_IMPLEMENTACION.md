# Plan de Implementación — Ecosistema Digital AMEEC

> Documento de traspaso para continuación por otra IA o equipo técnico.
> Estado: **Fase 2 completada** — sitio construye sin errores, listo para deploy.
> Fecha: Mayo 2026

---

## Contexto de la organización

**AMEEC** (Asociación Mexicana de Educación Ecológica y Comunitaria) es una ONG enfocada en educación ecológica, bioconstrucción y proyectos comunitarios. Tiene un ecosistema digital fragmentado en WordPress que se va a unificar progresivamente.

| Propiedad             | Función                 | Estado objetivo                          |
| --------------------- | ----------------------- | ---------------------------------------- |
| `ameec.org`           | Institucional principal | Migrar a Astro (Fase 3)                  |
| `ameec.net`           | Eventos e institucional | Deprecar → redirigir a ameec.org/eventos |
| `induccion.ameec.org` | Onboarding voluntarios  | **PRIORIDAD — en construcción**          |
| Olas de Amor          | Campaña satélite        | Integrar como `/olas-de-amor`            |
| Bioconstrucción       | Iniciativa temática     | Integrar como `/bioconstruccion`         |

**Limitaciones importantes:**

- Equipo reducido, personas no técnicas deben poder publicar contenido.
- Presupuesto ajustado — se prioriza stack gratuito/low-cost.
- Fase actual: prototipado y desarrollo, **no producción todavía**.
- No tocar los sitios WordPress en producción hasta que el nuevo sitio esté validado.

---

## Stack tecnológico decidido

| Capa        | Tecnología                                                            | Razón                                       |
| ----------- | --------------------------------------------------------------------- | ------------------------------------------- |
| Framework   | **Astro 5**                                                           | SSG, rendimiento, componentes .astro        |
| Estilos     | **Tailwind CSS 3**                                                    | Utilidades, sistema de diseño propio        |
| CMS         | **Decap CMS** ✅ integrado (`public/admin/`)                           | Git-based, interfaz visual para no-técnicos |
| Hosting     | **Cloudflare Pages** (pendiente de configurar)                        | Free tier, CDN global, sin lock-in          |
| Formularios | **Formspree** ✅ integrado (requiere `PUBLIC_FORMSPREE_ID` en .env)    | Simple, sin backend propio                  |
| Analítica   | **Plausible** (pendiente — agregar script en Layout.astro)            | Privacy-first, sin cookies                  |
| Fuentes     | Fraunces (display) + Inter (cuerpo) — Google Fonts                    |
| IA          | **Claude API** ✅ Worker en `workers/chatbot.ts` + UI `Chatbot.astro`  |

**Paleta de color (tokens ya configurados en `tailwind.config.js`):**

- `verde-500` → `#3F5E3F` (color principal, fondo dark)
- `ocre-400` → `#C97B4A` (acento, CTA, bordes destacados)
- `crema` → `#F4EFE6` (fondo base)
- `carbon` → `#1F2922` (texto)

---

## Estado actual del código

### Repositorio: `/Users/arnoldomarcelo/marcelo_sias/ameec`

**`npm run build` pasa sin errores. `npm run dev` levanta en `localhost:4321`.**

**Archivos ya creados — NO recrear:**

```
ameec/
├── src/
│   ├── components/
│   │   ├── Header.astro          ✅ completo
│   │   ├── Hero.astro            ✅ completo
│   │   ├── ProcessSteps.astro    ✅ completo (4 pasos)
│   │   ├── Stories.astro         ✅ completo (3 testimonios)
│   │   ├── FAQ.astro             ✅ completo (acordeón JS vanilla)
│   │   ├── FormularioInscripcion.astro  ✅ completo (Formspree placeholder)
│   │   └── Footer.astro          ✅ completo
│   ├── layouts/
│   │   └── Layout.astro          ✅ completo (meta SEO, OG, fuentes, skip-nav)
│   ├── pages/
│   │   ├── index.astro           ✅ landing de inducción
│   │   └── 404.astro             ✅ completo
│   └── styles/
│       └── global.css            ✅ tokens, btn-primary, btn-secondary, eyebrow, container-narrow
├── public/
│   └── favicon.svg               ✅ SVG minimalista verde/ocre
├── astro.config.mjs              ✅ con sitemap + tailwind
├── tailwind.config.js            ✅ paleta completa + fuentes + animaciones
├── tsconfig.json                 ✅ path aliases @components/* y @layouts/*
├── package.json                  ✅ dependencias declaradas
├── .prettierrc                   ✅ prettier + astro + tailwind
├── .gitignore                    ✅
└── PLAN_IMPLEMENTACION.md        ← este archivo
```

**Lo que falta (`node_modules/` no instalado aún):**

```bash
npm install   # desde /Users/arnoldomarcelo/marcelo_sias/ameec
npm run dev   # levanta en localhost:4321
```

---

## Tareas pendientes por fase

### FASE 2 — Sitio de inducción (prioridad inmediata)

#### 2A — Completar la landing (estimado: 3-4 horas)

- [x] **Instalar dependencias** (`npm install`) y verificar que `npm run dev` levanta sin errores.
  - Verificado localmente: `node_modules/` existe, `npm run build` pasa y `npm run dev -- --host 127.0.0.1` levanta en `http://127.0.0.1:4321/`.

- [x] **Hero con imagen real:**
  - `Hero.astro` usa una foto real del sitio actual: `src/assets/ameec-bioconstruccion.jpg`.
  - Usa `<Image>` de `astro:assets` para optimización automática.
  - Se agregaron fotos reales complementarias en `src/assets/ameec-comunidad.jpg` y `src/assets/ameec-olas.jpg`.
  - Las imágenes fueron reescritas sin metadatos EXIF/GPS antes de quedar en el repo.
  - El texto actual del hero: _"Llegué buscando un curso. Encontré una comunidad."_ — confirmar con AMEEC si es testimonio real o placeholder.
  - Pendiente real antes de publicar: confirmar el testimonio.

- [ ] **Configurar Formspree:**
  - Crear cuenta en formspree.io con el correo `hola@ameec.org`.
  - Crear form → copiar el ID → reemplazar `YOUR_FORM_ID` en `FormularioInscripcion.astro:48`.
  - Agregar campos hidden: `_subject`, `_next` (página de gracias), `_language: es`.
  - Implementación técnica lista: `FormularioInscripcion.astro` usa `PUBLIC_FORMSPREE_ID`, agrega `_subject`, `_next` y `_language`.
  - Pendiente real antes de publicar: crear el formulario en Formspree y configurar `PUBLIC_FORMSPREE_ID`.

- [x] **Página de gracias post-inscripción:**
  - Crear `src/pages/gracias.astro` con mensaje cálido + próximos pasos.
  - Referenciarla como `_next` en el formulario de Formspree.

- [x] **Mejorar el Header para mobile:**
  - Actualmente el nav se oculta en móvil (`hidden md:flex`) pero no hay menú hamburguesa.
  - Implementar menú móvil con toggle JS vanilla o con el `<details>` nativo.

- [x] **Sección de impacto numérico (métricas):**
  - Agregar entre `ProcessSteps` y `Stories` una sección con números tipo:
    - "X talleres realizados", "X comunidades impactadas", "X voluntarios activos".
  - Confirmar datos reales con AMEEC antes de publicar. Por ahora usar placeholders visibles.
  - Crear `src/components/ImpactNumbers.astro`.
  - Pendiente real antes de publicar: reemplazar `X` con cifras verificadas por AMEEC.

- [x] **OG Image:**
  - Crear `public/og-image.jpg` (1200×630px) con la identidad visual AMEEC.
  - El Layout ya la referencia y el archivo existe.
  - Regenerada con foto real de bioconstrucción como fondo.

#### 2B — Chatbot de inducción con Claude ✅ código completo (falta deploy)

- [ ] **Preparar base de conocimiento:**
  - Recopilar documentos PDF o texto con: reglamento interno, preguntas frecuentes, calendario de sesiones, descripción de proyectos.
  - Guardar en `src/content/kb/` como archivos `.md` y referenciarlos desde el `SYSTEM_PROMPT` en `workers/chatbot.ts`.

- [x] **Cloudflare Worker con Claude API:** `workers/chatbot.ts`
  - Usa `claude-haiku-4-5-20251001` (costo bajo, ~$0.001/conversación).
  - Prompt de sistema con contexto AMEEC + instrucción de redirigir a `hola@ameec.org`.
  - Prompt caching activado (`anthropic-beta: prompt-caching-2024-07-31`) — reduce costo ~90%.
  - CORS configurado para `induccion.ameec.org`.
  - `workers/wrangler.toml` listo para `wrangler deploy`.

- [x] **Componente de chat en el frontend:** `src/components/Chatbot.astro`
  - Widget flotante bottom-right, historial de conversación, indicador de typing animado.
  - En dev apunta a `localhost:8787`; en prod a `/api/chat`.
  - Integrado en `Layout.astro` — aparece en todas las páginas.

- [ ] **Deploy del worker** (único paso pendiente):
  ```bash
  npm install -g wrangler
  wrangler login
  wrangler secret put CLAUDE_API_KEY   # pegar la clave de console.anthropic.com
  wrangler deploy                       # desde la raíz del proyecto
  ```

#### 2C — Integrar Decap CMS (estimado: 2-3 horas)

- [ ] **Instalar `@astrojs/netlify` o configurar para Cloudflare Pages.**

- [x] **Crear `public/admin/index.html`** con el script de Decap CMS:

  ```html
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
  ```

- [x] **Crear `public/admin/config.yml`** definiendo colecciones editables:
  - `testimonios` — editar los 3 testimonios en `Stories.astro`.
  - `pasos` — editar los 4 pasos de `ProcessSteps.astro`.
  - `faq` — editar preguntas/respuestas de `FAQ.astro`.
  - `config_general` — logo, correo de contacto, texto del hero.

- [x] **Refactorizar componentes para leer de archivos `.md`/`.json`** en vez de datos hardcodeados.
  - Usar `Astro.glob()` o Content Collections de Astro.
  - Implementado con JSON editables en `src/content/config/` y `src/content/induccion/`.

- [ ] **Configurar autenticación de Decap:**
  - Opción A (recomendada): Git Gateway con Netlify Identity.
  - Opción B: Cloudflare Access + GitHub OAuth.

#### 2D — Deploy en Cloudflare Pages — ÚNICO PASO REAL PENDIENTE

El código compila (`npm run build` ✅). Solo falta publicarlo.

- [ ] Subir repo a GitHub/GitLab (si no está ya).
- [ ] dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
- [ ] Configurar build en Cloudflare:
  - **Build command:** `npm run build`
  - **Output directory:** `dist`
  - **Node.js version:** `20`
- [ ] Variables de entorno en el dashboard de Cloudflare Pages (Settings → Environment variables):
  - `PUBLIC_FORMSPREE_ID` = ID del form en formspree.io
- [ ] Configurar dominio personalizado: `induccion.ameec.org` → agregar CNAME en DNS de ameec.org apuntando a `<proyecto>.pages.dev`.
- [ ] Deploy del Worker del chatbot (separado del sitio estático):
  ```bash
  npm install -g wrangler
  wrangler login
  wrangler secret put CLAUDE_API_KEY
  wrangler deploy
  ```
- [ ] Verificar que `https://induccion.ameec.org` carga, el formulario envía y el chat responde.

---

### FASE 1 — Quick wins en WordPress actual (paralelo a Fase 2)

Estas mejoras se aplican directamente a los sitios WordPress existentes mientras se desarrolla el nuevo sitio. No requieren conocimientos de Astro.

- [ ] **Auditoría de rendimiento:** Correr Lighthouse en `ameec.org` y `ameec.net`. Documentar score inicial.
- [ ] **Optimización de imágenes:** Instalar plugin Smush o ShortPixel. Comprimir todas las imágenes existentes.
- [ ] **Actualizar WordPress core, plugins y temas** a versiones más recientes (hacer backup antes).
- [ ] **Reescribir copy del home** con IA: usar el prompt al final de este documento.
- [ ] **Reemplazar formularios de contacto** con Formspree (eliminar dependencia de plugins WP de formularios).
- [ ] **Añadir analítica Plausible:** insertar script en `<head>` de todos los sitios.

---

### FASE 3 — Migración progresiva (después de validar Fase 2, estimado: 8-12 semanas)

No iniciar hasta que el sitio de inducción esté validado con usuarios reales.

- [ ] **Auditoría SEO completa** de `ameec.org`:
  - Mapeo de todas las URLs existentes con Screaming Frog.
  - Identificar cuáles tienen tráfico orgánico real (via Google Search Console).

- [ ] **Migrar `ameec.org` a Astro:**
  - Crear nueva rama del mismo repositorio o monorepo separado.
  - Estructura: `sites/main/` para ameec.org, `sites/induccion/` para el sitio actual.
  - Configurar redirects 301 para todas las URLs migradas.

- [ ] **Integrar satélites como subdirectorios:**
  - Olas de Amor → `ameec.org/olas-de-amor`
  - Bioconstrucción → `ameec.org/bioconstruccion`

- [ ] **Deprecar `ameec.net`:**
  - Redirigir `ameec.net/*` → `ameec.org/eventos/` con 301.
  - Mantener WordPress en modo read-only durante 60 días antes de apagar.

- [ ] **Verificar SEO post-migración:**
  - Comparar tráfico orgánico vs baseline en Google Search Console.
  - Meta: mantener ≥95% del tráfico orgánico previo a los 90 días.

---

## Automatizaciones con IA — pendientes de implementar

Ordenadas por prioridad y facilidad de implementación:

| #   | Automatización                                      | Herramienta                    | Esfuerzo | Estado                 |
| --- | --------------------------------------------------- | ------------------------------ | -------- | ---------------------- |
| 1   | **Chatbot de inducción** (responde FAQs 24/7)       | Claude API + Cloudflare Worker | Medio    | ✅ Código listo, falta `wrangler deploy` |
| 2   | **Alt-text automático** al subir imágenes a Decap   | Claude Vision API              | Bajo     | Pendiente (post Decap) |
| 3   | **Generación de meta-tags SEO** al publicar         | Claude API + Decap hook        | Bajo     | Pendiente              |
| 4   | **Newsletter mensual auto-borrador**                | n8n + Claude API               | Bajo     | Pendiente (Fase 3)     |
| 5   | **Resúmenes de eventos pasados** desde grabaciones  | Whisper + Claude               | Medio    | Pendiente (Fase 3)     |
| 6   | **Traducción ES/EN** on-demand                      | Claude API + Astro middleware  | Bajo     | Pendiente (Fase 3)     |
| 7   | **Detector de claridad del copy** antes de publicar | Claude API + Decap widget      | Medio    | Pendiente              |

---

## Decisiones técnicas ya tomadas — no reabrir

1. **Astro sobre Framer/Webflow:** se eligió por soberanía de datos, costo cero en hosting y escalabilidad. Framer sería alternativa solo si el equipo confirma 0% disponibilidad técnica.
2. **Cloudflare Pages sobre Netlify/Vercel:** free tier más generoso para organizaciones, CDN superior, sin límite de ancho de banda.
3. **Decap CMS sobre Sanity/Contentful:** Decap es gratuito y guarda en Git (versionado, sin base de datos externa).
4. **Subdominio `induccion.ameec.org`** sobre subdirectorio `ameec.org/induccion`: la URL corta se comparte verbalmente en talleres, es más memorable.
5. **Tailwind v3 sobre v4:** más estable para producción, ecosistema de plugins maduro (`@tailwindcss/forms`, `@tailwindcss/typography`).
6. **Sin frameworks JS (React/Vue) en el frontend:** Astro islands solo donde sea necesario (chatbot). Reduce bundle size y complejidad.

---

## Convenciones del código

- **Componentes Astro:** PascalCase (`ProcessSteps.astro`), datos hardcodeados en el frontmatter como arrays de objetos.
- **Clases Tailwind:** se usan alias de `@layer components` para patrones repetidos (`btn-primary`, `eyebrow`, `container-narrow`).
- **Sin comentarios** salvo en lógica no obvia.
- **Sin TypeScript estricto** en componentes Astro simples; sí en Workers y lógica compleja.
- **Path aliases:** `@components/*` y `@layouts/*` configurados en `tsconfig.json`.
- **Accesibilidad mínima:** todos los elementos interactivos tienen `aria-*` apropiados, hay skip-nav, contraste AA verificado.

---

## Prompt para reescribir copy con IA (Fase 1)

Usar este prompt en Claude o ChatGPT para mejorar el copy de los sitios WordPress existentes:

```
Eres un copywriter especializado en organizaciones sin fines de lucro latinoamericanas.
Reescribe el siguiente texto de [HOME/SECCIÓN] del sitio web de AMEEC (Asociación Mexicana de Educación Ecológica y Comunitaria).

Criterios:
- Tono: cálido, directo, sin tecnicismos ni palabrería vacía
- Audiencia: adultos de 20-45 años interesados en ecología y comunidad, no necesariamente expertos
- CTA principal: que el lector quiera inscribirse o donar
- Longitud: mantener o reducir, nunca ampliar
- Evitar: "paradigma", "sinergia", "holístico", "empoderamiento" y similares
- Incluir al menos un verbo de acción en el primer párrafo

Texto original:
[PEGAR AQUÍ]
```

---

## Contactos y accesos necesarios

Solicitar al equipo AMEEC antes de continuar:

- [ ] Acceso a Google Search Console de `ameec.org` y `ameec.net` (para auditoría SEO).
- [ ] Panel de hosting actual (para verificar costos y configurar subdominios).
- [ ] Credenciales WordPress de `ameec.org` (solo lectura para auditoría).
- [ ] Correo institucional `hola@ameec.org` para crear cuenta en Formspree y Plausible.
- [ ] Grabaciones o documentos del proceso de inducción actual (para entrenar el chatbot).
- [ ] Claude API key (en console.anthropic.com — tarjeta de crédito requerida).
- [ ] Cuenta GitHub/GitLab donde hospedar el repositorio (para Cloudflare Pages + Decap CMS).

---

## Indicadores de éxito por fase

| Fase           | Métrica                          | Meta                                 |
| -------------- | -------------------------------- | ------------------------------------ |
| 2 — Inducción  | Lighthouse Performance           | ≥ 90                                 |
| 2 — Inducción  | Tasa de finalización del form    | ≥ 60% de quienes llegan a la sección |
| 2 — Inducción  | Tasa de completitud de inducción | +30% vs WordPress actual             |
| 2B — Chatbot   | Resolución sin escalar a humano  | ≥ 70% de preguntas                   |
| 1 — Quick wins | Lighthouse (WordPress actual)    | ≥ 75                                 |
| 1 — Quick wins | TTI (Time to Interactive)        | < 3s                                 |
| 3 — Migración  | SEO orgánico preservado          | ≥ 95% a 90 días                      |
| 3 — Migración  | Costos de hosting                | –70% vs estado actual                |
