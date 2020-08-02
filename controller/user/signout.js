import user from "../../model/user";

export default async (req, res) => {
	try {
		await user.markOffline(req.con, req.user.userId);
		return res.status(200).send("signout successful");
	} catch (err) {
		console.log(err);
		return res.status(500).send({ msg: "Internal server error" });
	}
};
