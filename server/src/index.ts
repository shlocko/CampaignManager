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
	let campaigns = db.query("SELECT * FROM campaign;").all()
	res.send(campaigns)
})

app.get("/campaign/:campaignId", (req, res) => {
	let query = db.query("SELECT * FROM campaign WHERE id = $campaignId")
	let campaign = query.get({ $campaignId: req.params.campaignId })
	if (campaign) {
		res.send(campaign)
	} else {
		res.send("No campaign")
	}
})

app.post("/campaign", (req, res) => {
	let query = db.query("INSERT INTO campaign (name, owner_id, description, notes) VALUES ($name, $owner_id, $description, $notes);")
	query.run({
		$name: req.body.name,
		$owner_id: req.body.owner_id,
		$description: req.body.description,
		$notes: req.body.notes,
	})
	res.send("campaign added")
})

app.get("/users", (_req, res) => {
	let users = db.query("SELECT * FROM user;").all()
	res.send(users)
})

app.post("/user", (req, res) => {
	let query = db.query("INSERT INTO user (username) VALUES ($username);")
	query.run({ $username: req.body.username })
	res.send("user added")
})

app.get("/user/:userId", (req, res) => {
	let query = db.query("SELECT * FROM user WHERE id = $userId;")
	let user = query.get({ $userId: req.params.userId })
	if (user) {
		res.send(user)
	} else {
		res.send("No user")
	}
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})

