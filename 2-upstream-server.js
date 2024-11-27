import { createServer } from 'node:http'
import { spawn } from 'node:child_process'

const PORT = 3000

const server = createServer((req, res) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
	res.writeHead(200, {
		'Content-Type': 'text/plain',
		'Transfer-Encoding': 'chunked',
	})

	const child = spawn('tail', ['-f', './logfile.log'])
	child.stdout.on('data', chunk => res.write(chunk))
	child.on('error', error => {
		console.error('Child process error:', error)
		res.writeHead(500)
		res.end('____END____')
	})
	child.on('close', code => {
		console.log('Child process exited:', code)
		res.writeHead(200)
		res.end('____END____')
	})
})

server.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
