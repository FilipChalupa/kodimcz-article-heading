// import { storeValueRemotely } from './remoteStore.js'
// Modules not allowed workaround
const storageKey = 'kodim-heading'
const storeValueRemotely = async (newValue) => {
	await fetch(
		`https://key-value-store.deno.dev/?key=${storageKey}&value=${encodeURIComponent(
			newValue,
		)}`,
	)
}

let lastTitleElement = null

const loop = async () => {
	const enabled = (await chrome.storage.local.get('enabled')).enabled
	if (enabled) {
		const titleElement = document.querySelector('body main h2')
		const title = titleElement?.textContent
		if (titleElement !== lastTitleElement && title !== 'Řešení') {
			try {
				await storeValueRemotely(title)
				lastTitleElement = titleElement
			} catch (error) {
				console.error(error)
			}
		}
	}
	setTimeout(loop, 1000)
}
loop()
