const fs = require('fs')

fs.copyFile('_redirects', 'dist/_redirects', err => {
	if (err) console.log(err)
	console.log('_redirects was successfully copied')
})
