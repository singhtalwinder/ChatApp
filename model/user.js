export default {
	getUserById: (con, userId) => {
		return new Promise((resolve, reject) => {
			con.query(`SELECT * FROM user WHERE userId=${userId}`, (err, result) => {
				if (err) return reject(err);
				resolve(result);
			});
		});
	},

	getUserByEmail: (con, email) => {
		return new Promise((resolve, reject) => {
			con.query(`SELECT * FROM user WHERE email="${email}"`, (err, result) => {
				if (err) return reject(err);
				resolve(result);
			});
		});
	},

	createUser: (con, fname, lname, email, password) => {
		return new Promise((resolve, reject) => {
			con.query(
				`INSERT INTO user (fname, lname, email, password) 
                 VALUES 
                 ("${fname}", "${lname}", "${email}", "${password}")`,
				(err, result) => {
					if (err) return reject(err);
					resolve(result);
				}
			);
		});
	},
};
