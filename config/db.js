import mysql from "mysql";

export default mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB,
});
