const DEFAULT_RECONNECT_DELAY = 3000

const normalizeWebSocketMessage = event => {
	const receivedAt = new Date().toISOString()
	const rawData = event?.data ?? null

	try {
		const payload = typeof rawData === 'string' ? JSON.parse(rawData) : rawData

		return {
			type: payload?.type ?? 'message',
			payload,
			rawData,
			receivedAt,
		}
	} catch {
		return {
			type: 'message',
			payload: rawData,
			rawData,
			receivedAt,
		}
	}
}

export const createWebSocketMessageReceiver = ({
	url,
	reconnectDelay = DEFAULT_RECONNECT_DELAY,
	onError,
	onMessage,
	onReconnect,
} = {}) => {
	if (!url) {
		throw new Error('WebSocket url is required.')
	}

	let socket = null
	let reconnectTimer = null
	let reconnectPending = false
	let manuallyDisconnected = false
	let status = 'idle'

	const clearReconnectTimer = () => {
		if (!reconnectTimer) {
			return
		}

		clearTimeout(reconnectTimer)
		reconnectTimer = null
	}

	const scheduleReconnect = () => {
		if (manuallyDisconnected || reconnectTimer) {
			return
		}

		reconnectTimer = setTimeout(() => {
			reconnectTimer = null
			reconnectPending = true
			status = 'reconnecting'
			connect()
		}, reconnectDelay)
	}

	const connect = () => {
		if (socket && socket.readyState !== WebSocket.CLOSED) {
			return socket
		}

		manuallyDisconnected = false
		clearReconnectTimer()
		status = 'connecting'
		socket = new WebSocket(url)

		socket.onopen = event => {
			const isReconnect = reconnectPending
			reconnectPending = false
			status = 'open'

			if (isReconnect) {
				onReconnect?.(event)
			}
		}

		socket.onmessage = event => {
			onMessage?.(normalizeWebSocketMessage(event))
			if (event.data)
				console.info(event.data)
		}

		socket.onclose = () => {
			status = 'closed'
			socket = null
			scheduleReconnect()
		}

		socket.onerror = event => {
			status = 'error'
			onError?.(event)
		}

		return socket
	}

	const disconnect = () => {
		manuallyDisconnected = true
		clearReconnectTimer()

		if (!socket) {
			status = 'closed'
			return
		}

		socket.close()
		socket = null
		status = 'closed'
	}

	return {
		connect,
		disconnect,
		getSocket: () => socket,
		getStatus: () => status,
	}
}

export default createWebSocketMessageReceiver
