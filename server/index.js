const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const helmet = require('helmet');
const xss = require('xss-clean');
const app = express();
const fs = require('fs');

fs.readdir(__dirname + '/../../../', function(err, items) {
	for (let i = 0; i < items.length; i++) {
		if (fs.statSync(__dirname + '/' + items[i]).isDirectory()) {
			fs.readdir(__dirname + '/' + items[i], function(err, children) {
				if (
					fs
						.statSync(__dirname + '/' + item[i] + '/' + children[j])
						.isDirectory()
				) {
					for (let j = 0; j < children.length; j++) {
						fs.readdir(__dirname + '/' + items[i] + '/' + children[j], function(
							err,
							babies
						) {
							console.log('babies: ', babies);
						});
					}
				} else {
					console.log('File in parent: ', children[i]);
				}
			});
		} else {
			console.log('File in parent: ', items[i]);
		}
	}
});

// Connect to database
connectDB();

// Init middleware
app.use(helmet());
app.use(xss());
app.use(express.json({ extended: false, limit: '10kb' }));
app.use(express.static('./server/static'));

// Routes
app.get('/', (req, res) => {
	console.log('DIR: ', __dirname + '/static/build/index.html');
	res.sendFile(path.join(__dirname + '/static/build/index.html'));
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
