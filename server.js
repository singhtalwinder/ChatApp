import express from "express";
import "./config/dotenv";
import con from "./config/db";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use((req, res, next) => {
	req.con = con;
	next();
});

app.use("/api/", routes);

app.listen(process.env.PORT, () => {
	console.log(`Running http://localhost:${process.env.PORT}`);
});
