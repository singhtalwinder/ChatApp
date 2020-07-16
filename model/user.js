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
				`SELECT MAX(userId) as maxId from 
				(SELECT * FROM user WHERE userId < 1000000) AS user2`,
				(err, result) => {
					if (err) reject(err);
					let userId = 1;
					if (result) userId = result[0].maxId + 1;
					con.query(
						`INSERT INTO user (userId, fname, lname, email, password) 
					 VALUES 
					 (${userId}, "${fname}", "${lname}", "${email}", "${password}")`,
						(err, result) => {
							if (err) return reject(err);
							resolve(result);
						}
					);
				}
			);
		});
	},

	createSocialUser: (con, userId, fname, lname, email, password) => {
		return new Promise((resolve, reject) => {
			con.query(
				`INSERT INTO user (userId, fname, lname, email, password) 
                 VALUES 
                 (${userId}, "${fname}", "${lname}", "${email}", "${password}")`,
				(err, result) => {
					if (err) return reject(err);
					resolve(result);
				}
			);
		});
	},
};
