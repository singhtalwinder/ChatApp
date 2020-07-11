import bcrypt from "bcryptjs";
import user from "../../model/user";
import validation from "./validation";

export default async (req, res) => {
	const { fname, lname, email, password, confirmPassword } = req.body;
	const { error } = validation.signup(req.body);
	if (error) return res.status(406).send(error.details[0].message);
	if (password !== confirmPassword) {
		return res
			.status(406)
			.send('"Password" and "Confirm Password" fileds must be same');
	}

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		await user.createUser(req.con, fname, lname, email, hashedPassword);

		return res.status(201).send("User has been created.");
	} catch (err) {
		if (err.errno === 1062) {
			return res.status(400).send("User with the same email already exists");
		}

		console.log(err);
		return res.status(500).send("Internal server error");
	}
};
