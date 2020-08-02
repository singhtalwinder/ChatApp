import express from "express";
import jwt from "jsonwebtoken";
import userController from "../controller/user";

const router = express.Router();

const verifyAuthToken = async (req, res, next) => {
	try {
		const verified = jwt.verify(
			req.headers.authtoken,
			process.env.AUTH_TOKEN_SECRET
		);
		req.user = verified;
		next();
	} catch (err) {
		console.log(err);
		return res.status(401).send("Invalid token!");
	}
};

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/signin-with-google", userController.signinWithGoogle);
router.patch("/signout", verifyAuthToken, userController.signout);
router.get("/online-users", verifyAuthToken, userController.onlineUsers);

export default router;
