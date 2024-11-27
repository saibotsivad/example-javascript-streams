/*

TODO this is not tested but should baaaasically be right

*/

const UPSTREAM = 'http://localhost:3000'

export default {
	async fetch(request) {
		const upstreamResponse = await fetch(UPSTREAM)
		if (!upstreamResponse.ok) {
			return new Response(`Upstream error: ${upstreamResponse.status}`, {
				status: upstreamResponse.status,
			})
		}
		const stream = new ReadableStream({
			async start(controller) {
				const reader = upstreamResponse.body.getReader()
				while (true) {
					const { value, done } = await reader.read()
					if (done) {
						controller.close()
						break
					}
					controller.enqueue(value)
				}
			},
		})
		return new Response(stream, {
			headers: { 'Content-Type': 'application/octet-stream' },
		})
	},
}
