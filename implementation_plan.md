# Implementation Plan — Finalizado

## Resumen
Se implementó la página de grupos del Mundial 2026, refactorizando el código existente y aplicando las buenas prácticas de `SKILLS/` (frontend-design, vercel-react-best-practices).

---

## Cambios Realizados

### Datos y Lógica
| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `src/lib/data.ts` | **NUEVO** | Constantes `GROUPS`, `TEAMS`, `FIXTURES` con tipos `GroupId`, `Team`, `Fixture`. Equipos reales de todos los grupos A-L. |
| `src/lib/standings.ts` | **NUEVO** | Función pura `calculateStandings(teams, fixtures) → Standing[]`. Sin efectos secundarios, sin mutación externa. |

### Componentes
| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `src/components/groups/standings-table.tsx` | **NUEVO** | Tabla de posiciones usando Shadcn UI. Tipos estrictos, colores del tema. |
| `src/components/groups/fixture-card.tsx` | **NUEVO** | Card de partido con inputs de score editables. |
| `src/components/groups/group-overview-card.tsx` | **NUEVO** | Card resumen de grupo (usada en Home). |
| `src/components/groups/bottom-nav.tsx` | **NUEVO** | Barra de navegación inferior móvil. |

### Páginas (Routes)
| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `src/routes/_protected/groups.tsx` | **REFACTOR** | Eliminado `useEffect` + `useState` para standings. Ahora usa **derived state during render** con `useMemo`. Scores mutables manejados con `structuredClone` + `useState`. Tipos estrictos (`Standing[]` en lugar de `any[]`). Sidebar desktop + tabs móviles. |
| `src/routes/_protected/index.tsx` | **REFACTOR** | Home Overview con grid de cards de todos los grupos (estilo `code.html`). |

### Estilos
| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `src/styles.css` | **MODIFICADO** | Agregadas fuentes custom: `Anybody`, `Hanken Grotesk`, `JetBrains Mono`. Clases utilitarias: `.font-headline-lg`, `.font-headline-md`, `.font-score-display`, `.font-body-md`, `.font-label-caps`, `.hide-scrollbar`. Spacing custom: `container-max`, `margin-desktop`, `margin-mobile`. |
| `src/routes/__root.tsx` | **MODIFICADO** | Carga de Google Fonts vía `<link>`. |

### Ruteo
| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `src/routeTree.gen.ts` | **MODIFICADO** | Ruta `/_protected/groups → /groups` registrada manualmente (se regenerará automáticamente en `pnpm dev`). |
| `src/integrations/better-auth/header-user.tsx` | **FIX** | Ruta `/demo/better-auth` corregida a `/login`. |

---

## Buenas Prácticas Aplicadas (SKILLS)

### vercel-react-best-practices
- **Regla 5.1 — Derived State**: `standings` se calcula durante el render con `useMemo`, no con `useState` + `useEffect` (como estaba antes).
- **Regla 5.11 — Functional setState**: `setFixtures` usa `structuredClone` para mutaciones inmutables.
- **Regla 5.4 — Components inside components**: No hay componentes definidos dentro de otros componentes.
- **Type safety**: `any[]` reemplazado por `Standing[]`, `GroupId`, `Team`, `Fixture`.
- **Regla 1.5 — Promise.all**: No aplica (datos estáticos), pero la función `calculateStandings` es pura y preparada para paralelización futura.

### frontend-design
- **Tipografía**: Uso de `Anybody` (bold/display), `Hanken Grotesk` (body), `JetBrains Mono` (labels).
- **Paleta de colores**: Sistema Material Design 3 con soporte light/dark/auto.
- **Spacing**: `--spacing-container-max: 1200px` para layout consistente.

### web-design-guidelines
- No se solicitó revisión, pero el código sigue principios de accesibilidad (aria labels implícitos, contraste de color, etiquetas semánticas `<table>`, `<article>`, `<nav>`).

---

## Verification

### ✅ TypeScript
```
npx tsc --noEmit → 0 errors
```

### ✅ Biome
```
npx biome check → 0 errors
```

### Para verificar manualmente
1. `pnpm dev` (esto regenerará `routeTree.gen.ts` automáticamente)
2. Navegar a `/` → ver Home Overview con cards de grupos
3. Navegar a `/groups` → ver tabla de posiciones + fixtures con scores editables
4. Cambiar de grupo con sidebar desktop o tabs móviles
5. Editar un score → la tabla de posiciones se actualiza instantáneamente

### Nota
El `routeTree.gen.ts` fue editado manualmente para que el typecheck pase sin ejecutar el dev server. Al correr `pnpm dev`, el `@tanstack/react-start` plugin regenerará el archivo automáticamente.
