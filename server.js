import express from "express";
import "./config/dotenv";
import con from "./config/db";

const app = express();

app.use(function (req, res, next) {
	req.con = con;
	next();
});

app.listen(process.env.PORT, () =>
	console.log(`Running http://localhost:${process.env.PORT}`)
);
