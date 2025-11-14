import express from "express";
import { Database } from "bun:sqlite"

const app = express()
const port = 3000

const db = new Database("campaignManager.sqlite")

//middleware
app.use(express.json())

app.get("/", (_req, res) => {
	res.send("Hello Campaign!")
})

app.get("/campaigns", (_req, res) => {
	let campaigns = db.query("SELECT * FROM campaign;").get()
	res.send(campaigns)
})

app.post("/campaign", (req, res) => {
	let query = db.query("INSERT INTO campaign (name, owner_id, description, notes, parent_id) VALUES ($name, $owner_id, $description, $notes, $parent_id);")
	query.run({
		$name: req.body.name,
		$owner_id: req.body.owner_id,
		$description: req.body.description,
		$notes: req.body.notes,
		$parent_id: req.body.parent_id,
	})
	res.send("campaign added")
})

app.get("/users", (_req, res) => {
	let users = db.query("SELECT * FROM user;").get()
	res.send(users)
})

app.post("/user", (req, res) => {
	let query = db.query("INSERT INTO user (username) VALUES ($username);")
	query.run({ $username: req.body.username })
	res.send("user added")
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})

