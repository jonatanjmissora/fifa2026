import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function capitalize(name: string) {
	const names = name.split(" ")
	return names
		.map(name => name.charAt(0).toUpperCase() + name.slice(1))
		.join(" ")
}
