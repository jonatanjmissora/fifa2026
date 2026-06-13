const { readFileSync, writeFileSync, readdirSync } = require("fs")
const { join } = require("path")
const { optimize } = require("svgo")

const flagsDir = join(__dirname, "..", "public", "flags")
const files = readdirSync(flagsDir)
	.filter(f => f.endsWith(".svg"))
	.sort()

let symbols = ""
for (const file of files) {
	const content = readFileSync(join(flagsDir, file), "utf-8")
	const id = file.replace(".svg", "")

	const optimized = optimize(content, {
		plugins: [
			"preset-default",
			"removeDimensions",
			"sortAttrs",
		],
	})
	const svg = optimized.data

	const viewBox = svg.match(/viewBox="([^"]+)"/)

	symbols += `\t<symbol id="${id}" viewBox="${viewBox ? viewBox[1] : "0 0 100 100"}">\n`

	const inner = svg
		.replace(/<\?xml[^>]*\?>/g, "")
		.replace(/<!DOCTYPE[^>]*>/g, "")
		.replace(/<svg[^>]*>/, "")
		.replace(/<\/svg>/, "")

	symbols += inner.trim() + "\n"
	symbols += `\t</symbol>\n`
}

const sprite = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none">
${symbols}</svg>
`

writeFileSync(join(__dirname, "..", "public", "flags-sprite.svg"), sprite)
console.log(`Generated public/flags-sprite.svg with ${files.length} symbols (${(Buffer.byteLength(sprite, "utf-8") / 1024).toFixed(1)} KB)`)
