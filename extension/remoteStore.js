const storageKey = 'kodim-heading'

export const storeValueRemotely = async (newValue) => {
	await fetch(
		`https://key-value-store.deno.dev/?key=${storageKey}&value=${encodeURIComponent(
			newValue,
		)}`,
	)
}

export const remoteStoreWatchUrl = `https://key-value-store.deno.dev/watch?key=${storageKey}`
