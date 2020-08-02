import user from "../../model/user";

export default async (req, res) => {
	try {
		const result = await user.getOnlineUsers(req.con, req.user.userId);
		res.status(200).send({ onlineUsers: result });
	} catch (err) {
		console.log(err);
		return res.status(500).send({ msg: "Internal server error" });
	}
};
