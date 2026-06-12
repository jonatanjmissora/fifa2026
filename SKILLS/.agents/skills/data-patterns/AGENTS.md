# Patrones de Capa de Datos — Drizzle + TanStack Start + Query + Form

## Estructura de Archivos

```
db/
  <entidad>/
    schema.ts                # Schema Drizzle + tipos + validadores
    <accion>-<entidad>-db.ts # Funciones Drizzle (sufijo -db)

server/
  <entidad>/
    <accion>-<entidad>-server.ts # Server Functions (sufijo -server)

queries/
  <entidad>/
    <entidad>-queries.ts         # queryOptions
    use-create-<entidad>.ts      # useMutation hooks
    use-update-<entidad>.ts
    use-delete-<entidad>.ts
```

## 1. Capa DB (`/db/<entidad>/`)

### Convenciones
- Archivos con sufijo `-db.ts`
- `try/catch` siempre
- `delay()` simulado (opcional)
- Error logging: `error instanceof Error ? error.message : error`
- Listas: retornar `[]` en error
- Singles: retornar `null` en error

### Get list
```ts
export async function getEntidadesDB(userId: string) {
  try {
    await delay()
    return await db
      .select()
      .from(tabla)
      .where(eq(tabla.userId, userId))
  } catch (error) {
    console.error("ERROR obteniendo entidades:", error instanceof Error ? error.message : error)
    return []
  }
}
```

### Get single (con relaciones)
```ts
export async function getEntidadDB(userId: string, id: string) {
  try {
    await delay()
    const result = await db.query.tabla.findFirst({
      where: and(eq(tabla.id, id), eq(tabla.userId, userId)),
      with: { relacion: true },
    })
    return result ?? null
  } catch (error) {
    console.error("ERROR leyendo entidad:", error instanceof Error ? error.message : error)
    return null
  }
}
```

### Create
```ts
export async function createEntidadDB(data: TipoEntidad) {
  try {
    await delay()
    return await db.insert(tabla).values(data).returning()
  } catch (error) {
    console.error("ERROR insertando entidad:", error instanceof Error ? error.message : error)
  }
}
```

### Update
```ts
export async function updateEntidadDB(id: string, data: TipoEntidad) {
  try {
    await delay()
    const result = await db
      .update(tabla)
      .set(data)
      .where(eq(tabla.id, id))
      .returning()
    return result[0]
  } catch (error) {
    console.error("ERROR actualizando entidad:", error instanceof Error ? error.message : error)
  }
}
```

### Delete (con userId guard)
```ts
export async function deleteEntidadDB(id: string, userId: string) {
  try {
    await delay()
    return await db
      .delete(tabla)
      .where(and(eq(tabla.id, id), eq(tabla.userId, userId)))
      .returning()
  } catch (error) {
    console.error("ERROR eliminando entidad:", error instanceof Error ? error.message : error)
  }
}
```

## 2. Capa Server (`/server/<entidad>/`)

### Convenciones
- Archivos con sufijo `-server.ts`
- Usar `protectedServerFn` para auth (ver abajo)
- GET sin method (default GET)
- POST con `{ method: "POST" }`
- Siempre `.inputValidator()` para tipar input

### Helper de auth (en `/server/helpers.ts` o similar)
```ts
import { getRequest } from "@tanstack/react-start/server"
import { auth } from "@/lib/auth"

export async function protectedServerFn(request?: Request) {
  const req = request ?? getRequest()
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) throw new Response("Unauthorized", { status: 401 })
  return session
}
```

### Get list
```ts
export const getEntidadesServer = createServerFn().handler(async () => {
  const request = getRequest()
  const session = await protectedServerFn(request)
  return await getEntidadesDB(session.user.id)
})
```

### Get single
```ts
export const getEntidadServer = createServerFn()
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const request = getRequest()
    const session = await protectedServerFn(request)
    return await getEntidadDB(session.user.id, data.id)
  })
```

### Create
```ts
export const createEntidadServer = createServerFn({ method: "POST" })
  .inputValidator(createValidator)
  .handler(async ({ data }) => {
    const request = getRequest()
    const session = await protectedServerFn(request)
    const result = await createEntidadDB({ ...data })
    if (!result) throw new Error("Failed to create")
    return result[0]
  })
```

### Update
```ts
export const updateEntidadServer = createServerFn({ method: "POST" })
  .inputValidator(updateValidator)
  .handler(async ({ data }) => {
    const request = getRequest()
    const session = await protectedServerFn(request)
    return await updateEntidadDB({ ...data })
  })
```

### Delete
```ts
export const deleteEntidadServer = createServerFn({ method: "POST" })
  .inputValidator(idValidator)
  .handler(async ({ data }) => {
    const request = getRequest()
    const session = await protectedServerFn(request)
    const result = await deleteEntidadDB(data.id, session.user.id)
    if (!result) throw new Error("Entidad not found or could not be deleted")
    return result
  })
```

## 3. Capa Queries (`/queries/<entidad>/`)

### Convenciones
- `queryOptions` para reads (factory function cuando necesita params)
- Custom hooks `useCreateX`, `useUpdateX`, `useDeleteX` para mutations
- **No optimistic updates** — usar `isPending` para UI loading
- Actualizar cache con `setQueryData` / `removeQueries`
- Usar `useQueryClient()` al inicio del hook

### ⚠️ Estrategia de cache en mutaciones

Al implementar mutation hooks, preguntar al usuario qué escenario aplica:

**A) Single user** — 1 sola persona modifica los datos.
- Usar `setQueryData` / `removeQueries` sin invalidar (ahorra peticiones).

**B) Multi user** — varios usuarios modifican la misma data.
- Usar `setQueryData` + `invalidateQueries` con `refetchType: "active"` para asegurar consistencia.

```ts
// Ejemplo multi user: setQueryData instantáneo + invalidación en background
onSuccess: data => {
  queryClient.setQueryData(["entidad", data.id], data)
  queryClient.setQueryData(["entidades"], old => /* actualizar */)
  queryClient.invalidateQueries({ queryKey: ["entidades"], refetchType: "active" })
}
```

### queryOptions
  queryKey: ["entidades"],
  queryFn: () => getEntidadesServer(),
})

export const entidadQueryOptions = ({ id }: { id: string }) => {
  return queryOptions({
    queryKey: ["entidad", id],
    queryFn: () => getEntidadServer({ data: { id } }),
  })
}
```

### useCreate
```ts
export function useCreateEntidad() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createEntidadServer,
    onSuccess: data => {
      queryClient.setQueryData<TipoEntidad>(["entidad", data.id], data)
      queryClient.setQueryData<TipoEntidad[]>(["entidades"], oldData => {
        if (!oldData) return oldData
        return [data, ...oldData]
      })
    },
  })
}
```

### useUpdate
```ts
export function useUpdateEntidad() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateEntidadServer,
    onSuccess: data => {
      if (!data) return
      queryClient.setQueryData<TipoEntidad>(["entidad", data.id], data)
      queryClient.setQueryData<TipoEntidad[]>(["entidades"], oldData => {
        if (!oldData) return oldData
        return oldData.map(item => item.id === data.id ? data : item)
      })
    },
  })
}
```

### useDelete
```ts
export function useDeleteEntidad(entidadId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteEntidadServer,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["entidad", entidadId] })
      queryClient.setQueryData<TipoEntidad[]>(["entidades"], oldData => {
        if (!oldData) return oldData
        return oldData.filter(item => item.id !== entidadId)
      })
    },
  })
}
```

## 4. Capa Formularios (Componentes)

### Convenciones
- TanStack Form + Shadcn UI + Zod validators
- **Suspense wrapper** + componente interno con `useSuspenseQuery`
- `useScrollTop()` en el formulario
- `mutateAsync` + `await`
- `isPending` para botón submit (NO optimistic updates)
- Navegar después de éxito

### Create Form
```tsx
export default function CreateEntidadForm() {
  return (
    <Suspense fallback={<Loading text="cargando..." />}>
      <EntidadNewForm />
    </Suspense>
  )
}

function EntidadNewForm() {
  const { data: dependencia } = useSuspenseQuery(dependenciaQueryOptions)
  const navigate = useNavigate()
  const { mutateAsync: create, isPending, error } = useCreateEntidad()
  const form = useForm({
    defaultValues: { /* ... */ },
    validators: { onSubmit: formValidator, onBlur: formValidator },
    onSubmit: async ({ value }) => {
      const result = await create({ data: value })
      if (!result) { console.error("Error", error); return }
      navigate({ to: "/ruta/$id", params: { id: result.id } })
    },
  })

  if (!dependencia?.length) return <EmptyState />

  return (
    <form onSubmit={e => { e.preventDefault(); form.handleSubmit() }}>
      <form.Field name="campo" children={field => {
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel>Campo</FieldLabel>
            <Input value={field.state.value} onChange={e => field.handleChange(e.target.value)} onBlur={field.handleBlur} />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }} />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Guardando..." : "Guardar"}
      </Button>
      {error && <p>{error.message}</p>}
      <form.Subscribe selector={s => s.errors} children={errors => errors.length > 0 && <span>Faltan campos</span>} />
    </form>
  )
}
```

### Update Form
Igual que create pero:
- `defaultValues` inicializados desde `reporte` existente
- Validar si hay cambios antes de enviar
- `queryClient` opcional si se necesita invalidación manual

### Delete (con confirmación AlertDialog)
```tsx
export default function DeleteEntidad({ entidad }: { entidad: TipoEntidad }) {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Borrar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Eliminar</AlertDialogTitle>
        <AlertDialogDescription asChild>
          <DeleteForm entidad={entidad} setOpen={setOpen} />
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function DeleteForm({ entidad, setOpen }: { entidad: TipoEntidad; setOpen: (v: boolean) => void }) {
  const navigate = useNavigate()
  const { mutateAsync: deleteMutation, isPending, error } = useDeleteEntidad(entidad.id)
  const form = useForm({
    defaultValues: { id: entidad.id },
    validators: { onSubmit: idValidator },
    onSubmit: async ({ value }) => {
      const result = await deleteMutation({ data: value })
      if (!result) { console.error("Error", error); return }
      setOpen(false)
      navigate({ to: "/ruta" })
    },
  })

  return (
    <form onSubmit={e => { e.preventDefault(); form.handleSubmit() }}>
      <p>¿Estás seguro de borrar {entidad.nombre}?</p>
      <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancelar</Button>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Eliminando..." : "Eliminar"}
      </Button>
      {error && <p>Error al eliminar</p>}
    </form>
  )
}
```

## Orden de implementación para entidad nueva

1. Schema + tipos + validadores en `/db/<entidad>/schema.ts`
2. Funciones DB (`-db.ts`) en `/db/<entidad>/`
3. Server Functions (`-server.ts`) en `/server/<entidad>/`
4. `queryOptions` + hooks mutation en `/queries/<entidad>/`
5. Formularios con Suspense + useSuspenseQuery
