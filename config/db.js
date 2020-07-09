import mysql from "mysql";

export default mysql
	.createConnection({
		host: process.env.HOST,
		user: process.env.USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB,
	})
	.connect((err) => {
		if (err) {
			console.log(err);
		} else {
			console.log(`Connected to database: ${process.env.DB}`);
		}
	});
