import { Database } from "bun:sqlite"

const db = new Database("campaignManager.sqlite")

db.run(`CREATE TABLE user (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	username TEXT NOT NULL
);`)

db.run(`CREATE TABLE campaign (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	owner_id INTEGER NOT NULL,
	description TEXT,
	notes TEXT,
	UNIQUE(name, owner_id),
	FOREIGN KEY (owner_id) 
		REFERENCES user(id) 
		ON DELETE RESTRICT
);`)

db.run(`CREATE TABLE area (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	campaign_id INTEGER NOT NULL,
	map_img INTEGER,
	notes TEXT,
	grid_cols INTEGER,
	grid_rows INTEGER,
	FOREIGN KEY (campaign_id)
		REFERENCES campaign(id)
		ON DELETE CASCADE,
	FOREIGN KEY (map_img)
		REFERENCES image(id)
		ON DELETE RESTRICT
);`)

db.run(`CREATE TABLE player (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL
);`)

db.run(`CREATE TABLE campaign_player (
	player_id INTEGER,
	campaign_id INTEGER,
	sprite TEXT,
	notes TEXT,
	PRIMARY KEY (player_id, campaign_id),
	FOREIGN KEY (player_id)
		REFERENCES player(id)
		ON DELETE CASCADE,
	FOREIGN KEY (campaign_id)
		REFERENCES campaign(id)
		ON DELETE CASCADE
)`)

db.run(`CREATE TABLE area_player (
	player_id INTEGER,
	area_id INTEGER,
	notes TEXT,
	pos_x INTEGER NOT NULL,
	pos_y INTEGER NOT NULL,
	PRIMARY KEY (player_id, area_id),
	FOREIGN KEY (player_id)
		REFERENCES player(id)
		ON DELETE CASCADE,
	FOREIGN KEY (area_id)
		REFERENCES area(id)
		ON DELETE CASCADE
);`)

db.run(`CREATE TABLE image (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	file_name TEXT NOT NULL,
	width INTEGER NOT NULL,
	height INTEGER NOT NULL
)`)

//db.run(`INSERT INTO user (username) VALUES ("test1")`)

console.log(db.query(`SELECT * FROM user`).get())
