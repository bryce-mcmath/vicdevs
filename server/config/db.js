const mongoose = require('mongoose');
require('dotenv').config({ path: '.' });
const db = process.env.mongoURI;
console.log('process.env: ', process.env);
console.log('db: ', db);
const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			// Avoiding deprecation warnings
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		console.log('MongoDB connected...');
		console.log(__dirname);
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
};

module.exports = connectDB;
