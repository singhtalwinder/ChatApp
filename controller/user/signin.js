import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../../model/user";

export default async (req, res) => {
	try {
		const result = await user.getUserByEmail(req.con, req.body.email);
		if (!result.length) {
			return res.status(400).send("Wrong e-mail or password.");
		}

		const validPassword = await bcrypt.compare(
			req.body.password,
			result[0].password
		);

		if (!validPassword) {
			return res.status(400).send("Wrong e-mail or password.");
		}

		const authToken = jwt.sign(
			{
				userId: result[0].userId,
			},
			process.env.AUTH_TOKEN_SECRET,
			{ expiresIn: "1d" }
		);

		return res.status(200).send({
			authToken,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).send("Internal server error");
	}
};
