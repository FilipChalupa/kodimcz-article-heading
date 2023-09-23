let lastTitleElement = null

const storageKey = 'kodim-heading'

const loop = async () => {
	const enabled = (await chrome.storage.local.get('enabled')).enabled
	if (enabled) {
		const titleElement = document.querySelector('body main h2')
		const title = titleElement?.textContent
		if (titleElement !== lastTitleElement && title !== 'Řešení') {
			lastTitleElement = titleElement
			try {
				await fetch(
					`https://key-value-store.deno.dev/?key=${storageKey}&value=${encodeURIComponent(
						title,
					)}`,
				)
			} catch (error) {
				console.error(error)
			}
		}
	}
	setTimeout(loop, 1000)
}
loop()
