const { readFileSync, writeFileSync, readdirSync } = require("fs")
const { join } = require("path")

const flagsDir = join(__dirname, "..", "public", "flags")
const files = readdirSync(flagsDir).filter(f => f.endsWith(".svg"))

let output = `// Auto-generated. Run: node scripts/encode-flags.cjs

const flagData: Record<string, string> = {
`

for (const file of files) {
	const content = readFileSync(join(flagsDir, file), "utf-8")
	const base64 = Buffer.from(content, "utf-8").toString("base64")
	const key = file.replace(".svg", "")
	output += `	"${key}": "data:image/svg+xml;base64,${base64}",\n`
}

output += `}

export function getFlag(path: string): string {
	const key = path.replace("/flags/", "").replace(".svg", "")
	return flagData[key] ?? path
}
`

writeFileSync(join(__dirname, "..", "src", "lib", "flag-data.ts"), output)
console.log(`Generated src/lib/flag-data.ts with ${files.length} flags`)
