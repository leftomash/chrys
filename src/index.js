const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
console.log('Request for ' + request.url + ' by method ' + request.method);
	
	if(request.method == 'GET') {
		let fileURL;

		if(request.url == '/')
			fileURL = '/pages/index.html';
		else if(request.url == '/projects')
			fileURL = '/pages/projects.html';
		else if(request.url == '/about')
			fileURL = '/pages/about.html';
		else if(request.url == '/favicon.ico')
			fileURL = '/images/favicon.ico';
		else
			fileURL = request.url;

		let filePath = path.resolve('./public' + fileURL);
		let fileExtension = path.extname(filePath);
		
		fs.stat(filePath, (err, stat) => {
			if(err == null) {
				if(fileExtension == '.html' || fileExtension == '.css') {
					response.statusCode = 200;
					response.setHeader('Content-Type', 'text/' + fileExtension.substring(1));
					fs.createReadStream(filePath).pipe(response);
				}
				else if(fileExtension == '.png' || fileExtension == '.ico') {
					response.statusCode = 200;
					response.setHeader('Content-Type', 'image/' + fileExtension.substring(1));
					fs.createReadStream(filePath).pipe(response);
				}
				else if(fileExtension == '.svg') {
					response.statusCode = 200;
					response.setHeader('Content-Type', 'image/svg+xml');
					fs.createReadStream(filePath).pipe(response);
				}
			}
			else {
				filePath = path.resolve('./public/pages/404.html');
				response.statusCode = 404;
				response.setHeader('Content-Type', 'text/html');
				fs.createReadStream(filePath).pipe(response);
				return;
			}
		});
	}
	else {
		filePath = path.resolve('./public/404.html');
		response.statusCode = 400;
		response.setHeader('Content-Type', 'text/html');
		fs.createReadStream(filePath).pipe(response);
	}
});

server.listen(process.env.PORT || 5500);

console.log('Server running at http://' + process.env.PORT + ':' + 5500 + '/');