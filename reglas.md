en /db/reportes tengo las funciones que consultan a la base de datos utilizando drizzle.
ejemplo de get-reportes-db.ts (siempre el sufijo -db para saber que pertenece a dicha carpeta):
export async function getReportesDB(userId: string) {
	try {
		await delay()
		return await db
			.select()
			.from(reportes_iluminacion)
			.where(eq(reportes_iluminacion.userId, userId))
	} catch (error) {
		console.error(
			"ERROR obteniendo reportes de iluminacion:",
			error instanceof Error ? error.message : error
		)
		return []
	}
}

get-reporte-db.ts
========================
export async function getReporteDB(userId: string, id: string) {
	try {
		await delay()
		const result = await db.query.reportes_iluminacion.findFirst({
			where: and(
				eq(reportes_iluminacion.id, id),
				eq(reportes_iluminacion.userId, userId)
			),
			with: {
				empresa: true,
				instrumento: true,
				tecnico: true,
			},
		})
		return result ?? null
	} catch (error) {
		console.error(
			"ERROR leyendo reporte:",
			error instanceof Error ? error.message : error
		)
		return null
	}
}

create-reporte-db.ts
========================
export async function createReporteDB(newReport: ReporteIluminacionType) {
	try {
		await delay()
		return await db.insert(reportes_iluminacion).values(newReport).returning()
	} catch (error) {
		console.error(
			"ERROR insertando reporte:",
			error instanceof Error ? error.message : error
		)
	}
}

update-reporte-db.ts
========================
export async function updateReporteDB(id: string, updatedReporteNuevo: ReporteIluminacionType) {
	try {
		await delay()
		const result = await db
			.update(reportes_iluminacion)
			.set(updatedReporteNuevo)
			.where(eq(reportes_iluminacion.id, updatedReporteNuevo.id))
			.returning()

		return result[0]
	} catch (error) {
		console.error(
			"ERROR actualizando informe nuevo:",
			error instanceof Error ? error.message : error
		)
	}
}

delete-reporte-db.ts
========================
export async function deleteReporteDB(id: string, userId: string) {
	try {
		await delay()
		return await db
			.delete(reportes_iluminacion)
			.where(
				and(
					eq(reportes_iluminacion.id, id),
					eq(reportes_iluminacion.userId, userId)
				)
			)
			.returning()
	} catch (error) {
		console.error(
			"ERROR eliminando reporte:",
			error instanceof Error ? error.message : error
		)
	}
}

Luego en la carpeta /server/reportes coloco todas las createServerFn que utiliza Tanstack Start

get-reportes-server.ts
========================
export const getReportesServer = createServerFn().handler(async () => {
	const request = getRequest()
	const session = await protectedServerFn(request)

	return await getReportesDB(session.user.id)
})

get-reporte-server.ts
========================
export const getReporteServer = createServerFn()
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => {
		const request = getRequest()
		const session = await protectedServerFn(request)

		return await getReporteDB(session.user.id, data.id)
	})

create-reporte-server.ts
========================
export const createReporteNuevoServer = createServerFn({ method: "POST" })
	.inputValidator(reporteServerValidator)
	.handler(async ({ data }) => {
		const request = getRequest()
		const session = await protectedServerFn(request)
		const newReport = {
			...data,
		}

		const result = await createReporteNuevoDB(newReport)
		if (!result) {
			throw new Error("Failed to create report")
		}
		return result[0]
	})

update-reporte-server.ts
========================
export const updateReporteServer = createServerFn({ method: "POST" })
	.inputValidator(updateReporteServerValidator)
	.handler(async ({ data }) => {
		const request = getRequest()
		const session = await protectedServerFn(request)
		if (session.user.id !== data.userId) {
			throw new Response("Unauthorized", { status: 401 })
		}

		return await updateReporteDB({
			...data,
			finishedAt: data.finishedAt || null,
		})
	})

delete-reporte-server.ts
========================
export const deleteReporteServer = createServerFn({ method: "POST" })
	.inputValidator(reporteIluminacionIdValidator)
	.handler(async ({ data }) => {
		const request = getRequest()
		const session = await protectedServerFn(request)

		const result = await deleteReporteDB(data.id, session.user.id)

		if (!result) {
			throw new Error("Reporte not found or could not be deleted")
		}

		return result
	})

Luego en la carpeta /queries/reportes coloco todo lo relacionado a tanstack query.
reportes-queries.ts
========================
export const reportesQueryOptions = queryOptions({
	queryKey: ["reportes-iluminacion"],
	queryFn: () => getReportesServer(),
})

export const reporteQueryOptions = ({ id }: { id: string }) => {
	return queryOptions({
		queryKey: ["reporte-iluminacion", id],
		queryFn: () => getReporteServer({ data: { id } }),
	})
}

use-create-reporte.ts
========================
export function useCreateReporte() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createReporteNuevoServer,
		onSuccess: data => {
			queryClient.setQueryData<ReporteIluminacionType>(
				["reporte-iluminacion-nuevo"],
				data
			)
			queryClient.setQueryData<ReporteIluminacionType[]>(
				["reportes-iluminacion"],
				oldData => {
					if (!oldData) return oldData
					return sortedByDate([data, ...oldData])
				}
			)
		},
	})
}

use-update-reporte.ts
========================
export function useUpdateReporte() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: updateReporteServer,

		onSuccess: data => {
			if (!data) return
			queryClient.setQueryData<ReporteIluminacionType>(
				["reporte-iluminacion", data.id],
				data
			)
			queryClient.setQueryData<ReporteIluminacionType[]>(
				["reportes-iluminacion"],
				oldData => {
					if (!oldData) return oldData
					const oldReporte = oldData.find(
						oldReporte => oldReporte.id === data.id
					)
					if (!oldReporte) return oldData
					return oldData.map(oldReporte =>
						oldReporte.id === data.id ? data : oldReporte
					)
				}
			)
		},
	})
}

use-delete-reporte.ts
========================
export function useDeleteReporte(reportId: string) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ data }: { data: { id: string } }) =>
			deleteReporteServer({ data }),
		onSuccess: () => {
			queryClient.removeQueries({
				queryKey: ["reporte-iluminacion", reportId],
			})
			queryClient.setQueryData<ReporteIluminacionType[]>(
				["reportes-iluminacion"],
				oldData => {
					if (!oldData) return oldData
					return oldData.filter(item => item.id !== reportId)
				}
			)
		},
	})
}

Como se ve, no utilizo el optimistic update, porque prefiero que haya un "isPending" que le informe al usuario que algo está pasando, antes de que suceda. Y me gusta actualizar el query con un setQueryData o removeQueries.
El schema y los validadores se encuentran en /db/reportes
Esta es mi forma de trabajar, separar en tres carpetas lo que hace drizzle con la base de datos, lo que hace Tanstack con las funciones del servidor y la actualizacion de las queries de Tanstack Query

En los componentes que manejan interaccion con el usuario, sobre todo en los formularios, utilizo Tanstack Form + Shadcn + zod + shema validators.
Te paso ejemplos de como creo, actualizo o borro un reporte. Para crear o editar, tambien traigo otras queries que necesito para el formulario. Observa como utilizo el Suspense + useSuspenseQuery.
create-reporte-form.tsx
========================
export default function CreateReporteForm() {
	return (
		<Suspense
			fallback={
				<Loading
					text="cargando datos del usuario..."
					className="scale-50 justify-start  max-h-[50svh] "
				/>
			}
		>
			<ReporteNuevoForm />
		</Suspense>
	)
}

function ReporteNuevoForm() {
	useScrollTop()
	const { data: tecnico } = useSuspenseQuery(tecnicoQueryOptions)
	const { data: empresas } = useSuspenseQuery(empresasQueryOptions)
	const { data: instrumentos } = useSuspenseQuery(instrumentosQueryOptions)
	const navigate = useNavigate()

	const {
		mutateAsync: createReporteNuevo,
		isPending,
		error,
	} = useCreateReporteNuevo()
	const form = useForm({
		defaultValues: defaultReporteData,
		validators: {
			onSubmit: reporteNuevoFormValidator,
		},
		onSubmit: async ({ value }) => {
			if (!tecnico || !empresas || !instrumentos) return

			const title = getTitle(value.empresaId, empresas)

			const newReport = {
				...value,
				tecnicoId: tecnico.id,
				title,
			}
			const result = await createReporteNuevo({ data: newReport })
			if (!result) {
				console.error("Error al crear el reporte", error)
			}
			console.log("Reporte creado exitosamente")
			navigate({
				to: "/iluminacion/reportes/$id/areas",
				params: {
					id: result.id,
				},
			})
		},
	})
	if (!tecnico || !empresas?.length || !instrumentos?.length)
		return (
			<article className="w-full flex flex-col justify-center items-center min-h-[30svh] gap-10">
				<span className="text-foreground/50 text-sm italic text-center w-5/6 mx-auto">
					Debe completar los datos del técnico, empresa o instrumento en su
					perfil primero.
				</span>
				<Link to="/perfil/tecnicos" className="w-1/2 mx-auto">
					<Button className="w-full py-4">Ir al perfil</Button>
				</Link>
			</article>
		)

	return (
		<form
			id="create-form"
			onSubmit={e => {
				e.preventDefault()
				form.handleSubmit()
			}}
			className="w-3/4 sm:w-1/2 mx-auto flex flex-col gap-8 relative"
		>
			<FieldGroup className="gap-5">
				<form.Field
					name="empresaId"
					children={field => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid

						return (
							<Field data-invalid={isInvalid} className="relative gap-1">
								<FieldLabel
									htmlFor={field.name}
									className="flex items-center gap-3 textL"
								>
									<Warehouse className="size-6" />
									Empresa receptora
								</FieldLabel>

								<Select
									value={field.state.value || ""}
									onValueChange={value => field.handleChange(value)}
								>
									<SelectTrigger
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										aria-invalid={isInvalid}
										className="w-full justify-end"
									>
										<SelectValue placeholder="Seleccione Empresa" />
									</SelectTrigger>

									<SelectContent position="popper">
										<SelectGroup>
											<SelectLabel>Empresas</SelectLabel>

											{sortedByRazonSocial(empresas)?.map(empresa => (
												<SelectItem
													key={empresa.id}
													value={empresa.id}
													className="justify-center"
												>
													{empresa.razonSocial.toUpperCase()} -{" "}
													{empresa.direccion.toUpperCase()}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								{isInvalid && (
									<FieldError
										errors={field.state.meta.errors}
										className="text-xs 2xl:text-sm absolute -bottom-4 left-0 text-right"
									/>
								)}
							</Field>
						)
					}}
				/>

				<form.Field
					name="instrumentoId"
					children={field => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid

						return (
							<Field data-invalid={isInvalid} className="relative gap-1">
								<FieldLabel
									htmlFor={field.name}
									className="flex items-center gap-3 textL"
								>
									<Cpu className="size-6" /> Instrumento utilizado
								</FieldLabel>

								<Select
									value={field.state.value || ""}
									onValueChange={value => field.handleChange(value)}
								>
									<SelectTrigger
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										aria-invalid={isInvalid}
										className="w-full justify-end"
									>
										<SelectValue placeholder="Seleccione Instrumento" />
									</SelectTrigger>

									<SelectContent position="popper">
										<SelectGroup>
											<SelectLabel>Instrumentos</SelectLabel>

											{sortedByName(instrumentos)?.map(instrumento => (
												<SelectItem
													key={instrumento.id}
													value={instrumento.id}
													className="justify-center"
												>
													{instrumento.nombre.toUpperCase()} -{" "}
													{instrumento.marca.toUpperCase()}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								{isInvalid && (
									<FieldError
										errors={field.state.meta.errors}
										className="text-xs 2xl:text-sm absolute -bottom-4 left-0  text-right"
									/>
								)}
							</Field>
						)
					}}
				/>

				<form.Field
					name="clima[0]"
					children={field => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid

						return (
							<Field data-invalid={isInvalid} className="relative gap-1">
								<FieldLabel
									htmlFor={field.name}
									className="flex items-center gap-3 textL"
								>
									Clima
								</FieldLabel>

								<Select
									value={field.state.value || ""}
									onValueChange={value =>
										field.handleChange(value as EstadoType)
									}
								>
									<SelectTrigger
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										aria-invalid={isInvalid}
										className="w-full justify-end"
									>
										<SelectValue placeholder="Seleccione Clima" />
									</SelectTrigger>

									<SelectContent position="popper">
										<SelectGroup>
											<SelectLabel>Clima</SelectLabel>

											{ESTADO?.map(clima => (
												<SelectItem
													key={clima}
													value={clima}
													className="justify-center"
												>
													{clima.toUpperCase()}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								{isInvalid && (
									<FieldError
										errors={field.state.meta.errors}
										className="text-xs 2xl:text-sm absolute -bottom-4 left-0"
									/>
								)}
							</Field>
						)
					}}
				/>

				<form.Field
					name="clima[1]"
					children={field => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid

						return (
							<Field data-invalid={isInvalid} className="relative gap-1">
								<FieldLabel
									htmlFor={field.name}
									className="flex items-center gap-3 textL"
								>
									Humedad
								</FieldLabel>

								<Select
									value={field.state.value || ""}
									onValueChange={value =>
										field.handleChange(value as HumedadType)
									}
								>
									<SelectTrigger
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										aria-invalid={isInvalid}
										className="w-full justify-end"
									>
										<SelectValue placeholder="Seleccione Humedad" />
									</SelectTrigger>

									<SelectContent position="popper">
										<SelectGroup>
											<SelectLabel>Humedad</SelectLabel>

											{HUMEDAD?.map(humedad => (
												<SelectItem
													key={humedad}
													value={humedad}
													className="justify-center"
												>
													{humedad.toUpperCase()}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								{isInvalid && (
									<FieldError
										errors={field.state.meta.errors}
										className="text-xs 2xl:text-sm absolute -bottom-4 left-0"
									/>
								)}
							</Field>
						)
					}}
				/>

				<form.Field
					name="clima[2]"
					children={field => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid

						return (
							<Field data-invalid={isInvalid} className="relative gap-1">
								<FieldLabel
									htmlFor={field.name}
									className="flex items-center gap-3 textL"
								>
									Temperatura
								</FieldLabel>

								<Select
									value={field.state.value || ""}
									onValueChange={value =>
										field.handleChange(value as TemperaturaType)
									}
								>
									<SelectTrigger
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										aria-invalid={isInvalid}
										className="w-full justify-end"
									>
										<SelectValue placeholder="Seleccione Temperatura" />
									</SelectTrigger>

									<SelectContent position="popper">
										<SelectGroup>
											<SelectLabel>Temperatura</SelectLabel>

											{TEMPERATURA?.map(temperatura => (
												<SelectItem
													key={temperatura}
													value={temperatura}
													className="justify-center"
												>
													{temperatura.toUpperCase()}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								{isInvalid && (
									<FieldError
										errors={field.state.meta.errors}
										className="text-xs 2xl:text-sm absolute -bottom-4 left-0"
									/>
								)}
							</Field>
						)
					}}
				/>

				<Field className="flex flex-col justify-center gap-4 sm:gap-10 items-center w-full sm:w-1/2 mx-auto mt-20">
					<Button type="submit" disabled={isPending} className="flex-1 py-3">
						{isPending ? (
							<div className="flex gap-2 w-full justify-center items-center">
								Guardando... <Loader className="animate-spin size-4"></Loader>
							</div>
						) : (
							<div className="flex gap-2 w-full justify-center items-center">
								Siguiente <ChevronRight className="size-6" />
							</div>
						)}
					</Button>
				</Field>

				{error && <p>{error.message}</p>}

				<form.Subscribe
					selector={state => state.errors}
					children={errors =>
						errors.length > 0 && (
							<span className="text-red-500/70 italic w-full text-center ">
								Faltan campos por completar
							</span>
						)
					}
				/>
			</FieldGroup>
		</form>
	)
}

update-reporte-form.tsx
==================
export default function UpdateReporteForm() {
	return (
		<Suspense
			fallback={
				<Loading
					text="cargando datos del usuario..."
					className="scale-50 justify-start  max-h-[50svh] "
				/>
			}
		>
			<EditReporteGeneralSuspense />
		</Suspense>
	)
}

function EditReporteGeneralSuspense({
	setOpen,
	setIsMenuOpen,
	reporte,
}: {
	setOpen: (value: boolean) => void
	setIsMenuOpen: (value: boolean) => void
	reporte: ReporteIluminacionType
}) {
	const { data: empresas } = useSuspenseQuery(empresasQueryOptions)
	const { data: instrumentos } = useSuspenseQuery(instrumentosQueryOptions)

	if (!empresas || !instrumentos) return

	return (
		<EditReporteGeneralForm
			setOpen={setOpen}
			setIsMenuOpen={setIsMenuOpen}
			reporte={reporte}
			empresas={empresas}
			instrumentos={instrumentos}
		/>
	)
}

function EditReporteGeneralForm({
	setOpen,
	setIsMenuOpen,
	reporte,
	empresas,
	instrumentos,
}: {
	setOpen: (value: boolean) => void
	setIsMenuOpen: (value: boolean) => void
	reporte: ReporteIluminacionType
	empresas: EmpresaType[]
	instrumentos: InstrumentoType[]
}) {
	useScrollTop()

	const queryClient = useQueryClient()
	const { mutateAsync: editReport, isPending, error } = useUpdateReporte()
	const form = useForm({
		defaultValues: {
			empresaId: reporte.empresaId,
			instrumentoId: reporte.instrumentoId,
			clima: reporte.clima,
		},
		validators: {
			onSubmit: reporteNuevoFormValidator,
		},
		onSubmit: async ({ value }) => {
			if (
				checkReporteGeneralDifferences(
					{
						empresaId: reporte.empresaId,
						instrumentoId: reporte.instrumentoId,
						clima: reporte.clima,
					},
					value
				)
			) {
				setIsMenuOpen(false)
				return
			}

			const newReport = {
				...reporte,
				empresaId: value.empresaId,
				instrumentoId: value.instrumentoId,
				clima: value.clima,
			}

			if (reporte.empresaId !== value.empresaId) {
				newReport.title = getTitle(value.empresaId, empresas)
			}

			const result = await editReport({ data: newReport })
			if (!result) {
				console.error("Error al editar el reporte", error)
			}
			console.log("Reporte editado exitosamente")
			// queryClient.invalidateQueries({
			// 	queryKey: ["reporte-iluminacion", reporte.id],
			// })
			// // Also invalidate list queries
			// queryClient.invalidateQueries({ queryKey: ["reportes-iluminacion"] })
			// // Invalidate any pending new report query
			// queryClient.invalidateQueries({ queryKey: ["reporte-iluminacion-nuevo"] })
			setIsMenuOpen(false)
		},
	})

	return (
		<form
			id="create-form"
			onSubmit={e => {
				e.preventDefault()
				form.handleSubmit()
			}}
			className="w-2/3 sm:w-1/2 mx-auto flex flex-col gap-8 relative"
		>
			<FieldGroup className="gap-5">
				<form.Field
					name="empresaId"
					children={field => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid

						return (
							<Field data-invalid={isInvalid} className="relative gap-1">
								<FieldLabel
									htmlFor={field.name}
									className="flex items-center gap-3 textL"
								>
									<Warehouse className="size-6" />
									Empresa receptora
								</FieldLabel>

								<Select
									value={field.state.value || ""}
									onValueChange={value => field.handleChange(value)}
								>
									<SelectTrigger
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										aria-invalid={isInvalid}
										className="w-full justify-end"
									>
										<SelectValue placeholder="Seleccione Empresa" />
									</SelectTrigger>

									<SelectContent position="popper">
										<SelectGroup>
											<SelectLabel>Empresas</SelectLabel>

											{empresas?.map(empresa => (
												<SelectItem
													key={empresa.id}
													value={empresa.id}
													className="justify-center"
												>
													{empresa.razonSocial.toUpperCase()}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								{isInvalid && (
									<FieldError
										errors={field.state.meta.errors}
										className="text-xs 2xl:text-sm absolute -bottom-4 left-0 text-right"
									/>
								)}
							</Field>
						)
					}}
				/>

				<form.Field
					name="instrumentoId"
					children={field => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid

						return (
							<Field data-invalid={isInvalid} className="relative gap-1">
								<FieldLabel
									htmlFor={field.name}
									className="flex items-center gap-3 textL"
								>
									<Cpu className="size-6" /> Instrumento utilizado
								</FieldLabel>

								<Select
									value={field.state.value || ""}
									onValueChange={value => field.handleChange(value)}
								>
									<SelectTrigger
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										aria-invalid={isInvalid}
										className="w-full justify-end"
									>
										<SelectValue placeholder="Seleccione Instrumento" />
									</SelectTrigger>

									<SelectContent position="popper">
										<SelectGroup>
											<SelectLabel>Instrumentos</SelectLabel>

											{instrumentos?.map(instrumento => (
												<SelectItem
													key={instrumento.id}
													value={instrumento.id}
													className="justify-center"
												>
													{instrumento.nombre.toUpperCase()}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								{isInvalid && (
									<FieldError
										errors={field.state.meta.errors}
										className="text-xs 2xl:text-sm absolute -bottom-4 left-0  text-right"
									/>
								)}
							</Field>
						)
					}}
				/>

				<form.Field
					name="clima[0]"
					children={field => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid

						return (
							<Field data-invalid={isInvalid} className="relative gap-1">
								<FieldLabel
									htmlFor={field.name}
									className="flex items-center gap-3 textL"
								>
									Clima
								</FieldLabel>

								<Select
									value={field.state.value || ""}
									onValueChange={value =>
										field.handleChange(value as EstadoType)
									}
								>
									<SelectTrigger
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										aria-invalid={isInvalid}
										className="w-full justify-end"
									>
										<SelectValue placeholder="Seleccione Clima" />
									</SelectTrigger>

									<SelectContent position="popper">
										<SelectGroup>
											<SelectLabel>Clima</SelectLabel>

											{ESTADO?.map(clima => (
												<SelectItem
													key={clima}
													value={clima}
													className="justify-center"
												>
													{clima.toUpperCase()}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								{isInvalid && (
									<FieldError
										errors={field.state.meta.errors}
										className="text-xs 2xl:text-sm absolute -bottom-4 left-0"
									/>
								)}
							</Field>
						)
					}}
				/>

				<form.Field
					name="clima[1]"
					children={field => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid

						return (
							<Field data-invalid={isInvalid} className="relative gap-1">
								<FieldLabel
									htmlFor={field.name}
									className="flex items-center gap-3 textL"
								>
									Humedad
								</FieldLabel>

								<Select
									value={field.state.value || ""}
									onValueChange={value =>
										field.handleChange(value as HumedadType)
									}
								>
									<SelectTrigger
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										aria-invalid={isInvalid}
										className="w-full justify-end"
									>
										<SelectValue placeholder="Seleccione Humedad" />
									</SelectTrigger>

									<SelectContent position="popper">
										<SelectGroup>
											<SelectLabel>Humedad</SelectLabel>

											{HUMEDAD?.map(humedad => (
												<SelectItem
													key={humedad}
													value={humedad}
													className="justify-center"
												>
													{humedad.toUpperCase()}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								{isInvalid && (
									<FieldError
										errors={field.state.meta.errors}
										className="text-xs 2xl:text-sm absolute -bottom-4 left-0"
									/>
								)}
							</Field>
						)
					}}
				/>

				<form.Field
					name="clima[2]"
					children={field => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid

						return (
							<Field data-invalid={isInvalid} className="relative gap-1">
								<FieldLabel
									htmlFor={field.name}
									className="flex items-center gap-3 textL"
								>
									Temperatura
								</FieldLabel>

								<Select
									value={field.state.value || ""}
									onValueChange={value =>
										field.handleChange(value as TemperaturaType)
									}
								>
									<SelectTrigger
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										aria-invalid={isInvalid}
										className="w-full justify-end"
									>
										<SelectValue placeholder="Seleccione Temperatura" />
									</SelectTrigger>

									<SelectContent position="popper">
										<SelectGroup>
											<SelectLabel>Temperatura</SelectLabel>

											{TEMPERATURA?.map(temperatura => (
												<SelectItem
													key={temperatura}
													value={temperatura}
													className="justify-center"
												>
													{temperatura.toUpperCase()}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								{isInvalid && (
									<FieldError
										errors={field.state.meta.errors}
										className="text-xs 2xl:text-sm absolute -bottom-4 left-0"
									/>
								)}
							</Field>
						)
					}}
				/>

				<Field className="flex flex-col justify-center gap-4 sm:flex-row items-center w-full mx-auto sm:w-full mt-10">
					<Button
						variant="outline"
						onClick={() => {
							setOpen(false)
							if (setIsMenuOpen) setIsMenuOpen(false)
						}}
						type="button"
						disabled={isPending}
						className="flex-1 py-4"
					>
						Cancelar
					</Button>
					<Button type="submit" disabled={isPending} className="flex-1 py-4">
						{isPending ? (
							<div className="flex gap-2 w-full justify-center">
								Editando... <Loader className="animate-spin size-4"></Loader>
							</div>
						) : (
							"Guardar"
						)}
					</Button>
				</Field>

				{error && <p>{error.message}</p>}

				<form.Subscribe
					selector={state => state.errors}
					children={errors =>
						errors.length > 0 && (
							<span className="text-red-500/70 italic w-full text-center ">
								Faltan campos por completar
							</span>
						)
					}
				/>
			</FieldGroup>
		</form>
	)
}

delete-reporte-form.tsx
==================
export default function DeleteReporte({
    reporte,
    setIsMenuOpen,
}: {
    reporte: ReporteIluminacionType
    setIsMenuOpen?: (open: boolean) => void
}) {
    const [open, setOpen] = useState(false)

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild className="hover:bg-accent">
                <div className="w-full flex items-center gap-2 justify-center p-4">
                    <Trash2 size={14} className="text-destructive-foreground" />
                    Borrar
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-8 sm:p-20 sm:py-15 2xl:py-20 bg-accent/80 backdrop-blur-xl w-full sm:w-1/2 min-h-[50dvh]">
                <AlertDialogTitle className="h-max sm:text-lg 2xl:text-2xl font-semibold tracking-wider py-2 border-b border-foreground/20 w-full mb-10">
                    Eliminar Informe
                </AlertDialogTitle>
                <AlertDialogDescription asChild>
                    <div className="text-center">
                        <DeleteReporteForm
                            reporte={reporte}
                            setOpen={setOpen}
                            setIsMenuOpen={setIsMenuOpen}
                        />
                    </div>
                </AlertDialogDescription>
            </AlertDialogContent>
        </AlertDialog>
    )
}

function DeleteReporteForm({
    reporte,
    setOpen,
    setIsMenuOpen,
}: {
    reporte: ReporteIluminacionType
    setOpen: (open: boolean) => void
    setIsMenuOpen?: (open: boolean) => void
}) {
    const navigate = useNavigate()
    const {
        mutateAsync: deleteReporteMutation,
        error,
        isPending,
    } = useDeleteReporte(reporte.id)

    const form = useForm({
        defaultValues: {
            id: reporte.id,
        },
        validators: {
            onSubmit: reporteIluminacionIdValidator,
        },
        onSubmit: async ({ value }) => {
            const result = await deleteReporteMutation({ data: { id: value.id } })

            if (!result) {
                console.error("Error al eliminar el reporte", error)
            }
            if (setIsMenuOpen) setIsMenuOpen(false)
            setOpen(false)
            console.log("Reporte eliminado exitosamente")
            navigate({ to: "/iluminacion/reportes" })
        },
    })

    return (
        <form
            id="create-form"
            className="flex flex-col items-center justify-center gap-6"
            onSubmit={e => {
                e.preventDefault()
                form.handleSubmit()
            }}
        >
            <p className="text-center sm:text-lg 2xl:text-2xl font-semibold">
                ¿Estás seguro de borrar {reporte.title.toUpperCase()} del {reporte.finishedAt ? reporte.finishedAt.toLocaleDateString("it-IT") : "(En curso)"}?
            </p>

            <p className="text-center opacity-50 sm:text-sm 2xl:text-base text-pretty w-3/4 mb-8">
                Esta acción no se puede deshacer. Esto eliminará permanentemente el dato
                de nuestros servidores.
            </p>

            <div className="flex justify-center items-center gap-4 flex-col sm:flex-row w-full">
                <Button
                    variant={"outline"}
                    type="button"
                    onClick={() => {
                        setOpen(false)
                        if (setIsMenuOpen) setIsMenuOpen(false)
                    }}
                    className="flex-1 w-full"
                >
                    Cancelar
                </Button>
                <Button type="submit" disabled={isPending} className="flex-1 w-full">
                    {isPending ? (
                        <div className="flex gap-2 items-center justify-center">
                            Eliminando... <Loader className="animate-spin size-4"></Loader>
                        </div>
                    ) : (
                        "Eliminar"
                    )}
                </Button>
            </div>
            {error && (
                <p className="text-red-500 text-xs">Error al eliminar el reporte</p>
            )}
        </form>
    )
}

Me interesa utilizar una confirmacion para borrar un elemento, por lo que utilizo tambien el componente de Shadcn AlertDialog.

