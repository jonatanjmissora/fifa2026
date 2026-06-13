import { cn } from "@/lib/utils"

function getFlagId(path: string): string {
	return path.replace("/flags/", "").replace(".svg", "")
}

type FlagProps = {
	src: string
	alt?: string
	className?: string
}

export function Flag({ src, alt, className }: FlagProps) {
	const id = getFlagId(src)
	return (
		<svg
			className={cn("inline-block shrink-0", className)}
			aria-label={alt}
			role="img"
		>
			<use href={`/flags-sprite.svg#${id}`} />
		</svg>
	)
}
