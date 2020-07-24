import bcrypt from "bcryptjs";
import user from "../../model/user";
import validation from "./validation";

export default async (req, res) => {
	const { fname, lname, email, password, confirmPassword } = req.body;
	const { error } = validation.signup(req.body);
	if (error) {
		if (error.details[0].context.label === "confirmPassword") {
			error.details[0].message = `Password doesn't match`;
		}
		return res.status(406).send({
			field: error.details[0].context.label,
			msg: error.details[0].message,
		});
	}

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		await user.createUser(req.con, fname, lname, email, hashedPassword);

		return res.status(201).send({ msg: "User has been created." });
	} catch (err) {
		if (err.errno === 1062) {
			return res.status(400).send({
				field: "email",
				msg: "User with the same email already exists",
			});
		}

		console.log(err);
		return res.status(500).send({ msg: "Internal server error" });
	}
};
