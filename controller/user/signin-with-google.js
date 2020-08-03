import { OAuth2Client } from "google-auth-library";
import user from "../../model/user";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.CLIENT_ID);

const signWithGoogle = async (req, res) => {
	try {
		const ticket = await client.verifyIdToken({
			idToken: req.body.token,
			audience: process.env.CLIENT_ID,
		});
		const payload = ticket.getPayload();

		const authToken = jwt.sign(
			{
				userId: payload["sub"],
			},
			process.env.AUTH_TOKEN_SECRET,
			{ expiresIn: process.env.AUTH_TOKEN_EXPIRATION }
		);

		const result = await user.getUserById(req.con, payload["sub"]);

		if (!result.length) {
			await user.createSocialUser(
				req.con,
				payload["sub"],
				payload["given_name"],
				payload["family_name"],
				payload["email"],
				"google"
			);
		}

		await user.markOnline(req.con, payload["sub"]);

		res.status(200).send({
			userId: payload["sub"],
			fname: payload["given_name"],
			lname: payload["family_name"],
			authToken,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).send("Internal server error");
	}
};

export default signWithGoogle;
