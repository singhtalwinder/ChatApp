import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../../model/user";

export default async (req, res) => {
	try {
		const result = await user.getUserByEmail(req.con, req.body.email);
		if (!result.length) {
			return res.status(406).send({
				field: "email",
				msg: "User with same E-mail doesn't exist",
			});
		}

		const validPassword = await bcrypt.compare(
			req.body.password,
			result[0].password
		);

		if (!validPassword) {
			return res.status(406).send({
				field: "password",
				msg: "Incorrect password",
			});
		}

		const authToken = jwt.sign(
			{
				userId: result[0].userId,
			},
			process.env.AUTH_TOKEN_SECRET,
			{ expiresIn: process.env.AUTH_TOKEN_EXPIRATION }
		);

		return res.status(200).send({
			fname: result[0].fname,
			lname: result[0].lname,
			authToken,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).send({ msg: "Internal server error" });
	}
};
