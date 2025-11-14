import { Database } from "bun:sqlite"

const db = new Database("campaignManager.sqlite")

// db.run(`CREATE TABLE user (
// 	id INTEGER PRIMARY KEY AUTOINCREMENT,
// 	username TEXT NOT NULL
// );`)
//
// db.run(`CREATE TABLE campaign (
// 	id INTEGER PRIMARY KEY AUTOINCREMENT,
// 	name TEXT NOT NULL,
// 	owner_id INTEGER NOT NULL,
// 	description TEXT,
// 	notes TEXT,
// 	parent_id INTEGER,
// 	UNIQUE(name, owner_id),
// 	FOREIGN KEY (owner_id) 
// 		REFERENCES user(id) 
// 		ON DELETE RESTRICT
// );`)
//
// db.run(`CREATE TABLE tag (
// 	id INTEGER PRIMARY KEY AUTOINCREMENT,
// 	name TEXT NOT NULL UNIQUE
// );`)
//
// db.run(`CREATE TABLE campaign_tag (
// 	campaign_id INTEGER NOT NULL,
// 	tag_id      INTEGER NOT NULL,
//
// 	PRIMARY KEY (campaign_id, tag_id),
//
// 	FOREIGN KEY (campaign_id)
// 		REFERENCES campaign(id)
// 		ON DELETE CASCADE,
//
// 	FOREIGN KEY (tag_id)
// 		REFERENCES tag(id)
// 		ON DELETE CASCADE
// );`)


//db.run(`INSERT INTO user (username) VALUES ("test1")`)

console.log(db.query(`SELECT * FROM user`).get())
