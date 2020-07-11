import Joi from "@hapi/joi";

export default {
	signup: (data) => {
		const schema = Joi.object({
			fname: Joi.string().min(1).max(20).required(),
			lname: Joi.string().min(1).max(20).required(),
			email: Joi.string().min(6).max(40).required().email(),
			password: Joi.string().min(6).max(20).required(),
			confirmPassword: Joi.string(),
		});
		return schema.validate(data);
	},
};
