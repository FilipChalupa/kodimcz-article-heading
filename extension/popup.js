import { remoteStoreWatchUrl } from './remoteStore.js'

const toggle = document.querySelector('#toggle')

let enabled = false

const updateState = async () => {
	enabled = (await chrome.storage.local.get('enabled')).enabled

	chrome.action.setBadgeText({
		text: enabled ? 'on' : '',
	})
	toggle.textContent = enabled ? 'Disable' : 'Enable'
}
updateState()

toggle.addEventListener('click', () => {
	chrome.storage.local.set({ enabled: !enabled })
	updateState()
})

const watch = document.querySelector(`#watch`)
watch.href = remoteStoreWatchUrl
