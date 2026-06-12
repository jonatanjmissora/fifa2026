# Better Auth Patterns — TanStack Start + Drizzle + Neon

> Basado en Better Auth v1.4+, TanStack Start v1.132+, Drizzle ORM v0.45+

## Estructura de archivos

```
src/
  lib/
    auth.ts            # Server: configuración de betterAuth
    auth-client.ts     # Client: createAuthClient
  routes/
    api/auth/$.ts      # Route handler para auth (GET/POST)
server/
  get-session.ts       # Server Function para obtener la sesión
db/
  users/
    schema.ts          # Schemas Drizzle: user, session, account, verification
```

## Variables de entorno (.env)

```env
# Servidor (NO prefijo VITE_) — cambiar por entorno
BETTER_AUTH_BASE_URL=http://localhost:3000
DATABASE_URL=postgresql://...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Cliente (prefijo VITE_) — cambiar por entorno
VITE_BETTER_AUTH_BASE_URL=http://localhost:3000
```

### ⚠️ Importante: cambiar por entorno al deployar

| Variable | Local | Producción |
|---|---|---|
| `BETTER_AUTH_BASE_URL` | `http://localhost:3000` | `https://tudominio.com` |
| `VITE_BETTER_AUTH_BASE_URL` | `http://localhost:3000` | `https://tudominio.com` |
| `DATABASE_URL` | Neon dev branch | Neon prod branch |
| `GOOGLE_CLIENT_ID` | OAuth dev credentials | OAuth prod credentials |
| `GOOGLE_CLIENT_SECRET` | OAuth dev credentials | OAuth prod credentials |

Estas variables se configuran en el panel de tu hosting (Vercel, Netlify, Cloudflare, etc.),
**no** en el `.env` del repositorio. El `.env` local solo sirve para desarrollo.

El `BETTER_AUTH_BASE_URL` debe coincidir con el dominio donde está alojada la app,
de lo contrario los callbacks de OAuth y los cookies de sesión fallarán.

### 🛡️ Guard de producción: detección de localhost olvidado (recomendado)

Añadir esta validación **server-side** en `src/lib/auth.ts`:

```ts
if (process.env.NODE_ENV === "production" && baseURL?.includes("localhost")) {
  console.error(
    "❌ BETTER_AUTH_BASE_URL sigue apuntando a localhost en producción.\n" +
    "   Configúrala en el panel de tu hosting con la URL real del dominio."
  )
}
```

Y esta validación **client-side** en `src/lib/auth-client.ts`:

```ts
if (import.meta.env.PROD && baseURL.includes("localhost")) {
  console.error(
    "❌ VITE_BETTER_AUTH_BASE_URL sigue apuntando a localhost en producción.\n" +
    "   Configúrala en el panel de tu hosting con la URL real del dominio."
  )
}
```

Estos guards lanzan un error visible en consola y un toast persistente en el cliente
si detectan que las URLs siguen en `localhost` estando en producción.

## 1. Server — Auth Config (`src/lib/auth.ts`)

```ts
import { betterAuth } from "better-auth"
import { tanstackStartCookies } from "better-auth/tanstack-start"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "../../db/schema"

const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_BASE_URL,
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [tanstackStartCookies()],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, account, session, verification },
  }),
})
```

### Con fallback si no hay DB (opcional)

Envolver el bloque de base de datos en un condicional:

```ts
if (process.env.DATABASE_URL) {
  const client = neon(databaseUrl)
  const db = drizzle(client, { schema })
  authOptions.database = drizzleAdapter(db, {
    provider: "pg",
    schema: { user, account, session, verification },
  })
}
```

## 2. Client — Auth Client (`src/lib/auth-client.ts`)

```ts
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BETTER_AUTH_BASE_URL,
})
```

### Detección de URL faltante

```ts
if (!import.meta.env.VITE_BETTER_AUTH_BASE_URL) {
  console.warn("⚠️ VITE_BETTER_AUTH_BASE_URL no configurada")
}
```

## 3. Server Function — Session (`server/get-session.ts`)

```ts
import { auth } from "@/lib/auth"
import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"

export const getSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const request = getRequest()
    try {
      return await auth.api.getSession({
        headers: request.headers,
      })
    } catch (error: any) {
      if (error?.code === "42P01" || /relation "session" does not exist/.test(error?.message || "")) {
        throw new Error("DatabaseMissingSessionTable")
      }
      throw error
    }
  }
)
```

## 4. API Route Handler (`src/routes/api/auth/$.ts`)

```ts
import { createFileRoute } from "@tanstack/react-router"
import { auth } from "@/lib/auth"

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => auth.handler(request),
      POST: ({ request }) => auth.handler(request),
    },
  },
})
```

## 5. Drizzle Schemas (`db/users/schema.ts`)

```ts
import { pgTable, text, timestamp, boolean, index } from "drizzle-orm/pg-core"

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
}, table => [index("session_userId_idx").on(table.userId)])

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()).notNull(),
}, table => [index("account_userId_idx").on(table.userId)])

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
}, table => [index("verification_identifier_idx").on(table.identifier)])
```

### Relaciones (opcional)

```ts
import { relations } from "drizzle-orm"

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}))
```

## 6. Uso en componentes

### Sign Up / Sign In

```tsx
import { authClient } from "@/lib/auth-client"

// Sign Up
await authClient.signUp.email({
  email, password, name,
  callbackURL: "/",
})

// Sign In
await authClient.signIn.email({
  email, password,
  callbackURL: "/",
})

// Sign In with Google
await authClient.signIn.social({
  provider: "google",
  callbackURL: "/",
})

// Sign Out
await authClient.signOut()
```

### Sesión en el context del Router (beforeLoad)

La sesión se inyecta en el context de TanStack Router para que esté disponible en todas las rutas:

**`src/router.tsx`** — pasar `session: null` como placeholder:
```ts
const router = createRouter({
  routeTree,
  context: { ...rqContext, session: null },
  // ...
})
```

**`src/routes/__root.tsx`** — definir el tipo del context y obtener la sesión en `beforeLoad`:
```ts
import { createRootRouteWithContext } from "@tanstack/react-router"
import { getSession } from "server/get-session"

export type RouterContext = {
  session: Session | null
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => ({
    session: await getSession(),
  }),
})
```

Esto permite acceder a `session` desde cualquier ruta hija con `Route.useRouteContext()`.

### Session en server function (middleware)

```ts
import { createMiddleware } from "@tanstack/react-start"
import { getSession } from "../server/get-session"

export const authMiddleware = createMiddleware({ type: "function" })
  .server(async ({ next }) => {
    const session = await getSession()
    if (!session) throw redirect({ to: "/" })
    return next({ context: { session } })
  })
```

## Orden de implementación para proyecto nuevo

1. Schemas Drizzle (`db/users/schema.ts`)
2. Exportar schemas desde `db/schema.ts`
3. Server auth (`src/lib/auth.ts`)
4. Client auth (`src/lib/auth-client.ts`)
5. API handler (`src/routes/api/auth/$.ts`)
6. Server session (`server/get-session.ts`)
7. `.env` con las variables necesarias
8. Componentes de login/register usando `authClient`
