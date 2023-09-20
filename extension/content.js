let lastTitleElement = null
const loop = async () => {
	const titleElement = document.querySelector('body main h2')
	const title = titleElement?.innerText
	if (titleElement !== lastTitleElement && title !== 'Řešení') {
		lastTitleElement = titleElement
		try {
			await fetch(
				`https://key-value-store.deno.dev/?key=kodim-heading&value=${encodeURIComponent(
					title,
				)}`,
			)
		} catch (error) {
			console.error(error)
		}
	}
	setTimeout(loop, 1000)
}
loop()
