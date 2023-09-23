import { storeValueRemotely } from './remoteStore.js'

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
