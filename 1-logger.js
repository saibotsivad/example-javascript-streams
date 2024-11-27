import { appendFile } from 'node:fs'

const LOGFILE = './logfile.log'

setInterval(() => {
	const data = JSON.stringify({
		time: new Date().toISOString(),
		number: Math.random(),
		message: 'hello\nthere',
	})
	appendFile(
		LOGFILE,
		data + '\n',
		'utf8',
		error => {
			console.log(data)
			if (error) console.error('Failed to append to file!', error)
		},
	)
}, 1000)
