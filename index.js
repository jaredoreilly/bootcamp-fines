var express = require('express');
var app = express();
app.use(express.json());
var port = process.env.PORT || 4000;

const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();


app.get('/', (req, res) => 
{
	res.sendFile(__dirname + '/home.html');
});
app.get('/home.html', (req, res) => 
{
    res.sendFile(__dirname + '/home.html');
});
app.get('/home.js', (req, res) => 
{
    res.sendFile(__dirname + '/home.js');
});


function start(req, res)
{
	//client.connect();
}

function finish(req, res)
{
	//client.end();
	res.end();
}



app.get('/resetTables', (req, res) => 
{
	start(req.body, res);
    resetTables(req.body, res);
});
async function resetTables(req, res)
{
	// var result = await client.query("ALTER TABLE reason ADD COLUMN createdTime TIMESTAMP DEFAULT NOW();");
	// console.log(result);
	// var result = await client.query("ALTER TABLE fine ADD COLUMN createdTime TIMESTAMP DEFAULT NOW();");
	// console.log(result);
	
	// var result = await client.query("DROP TABLE IF EXISTS reasonvote;");
	// console.log(result);
	// var result = await client.query("DROP TABLE IF EXISTS finevote;");
	// console.log(result);
	// var result = await client.query("DROP TABLE IF EXISTS fine;");
	// console.log(result);
	// var result = await client.query("DROP TABLE IF EXISTS reason;");
	// console.log(result);
	// var result = await client.query("DROP TABLE IF EXISTS entelectual;");
	// console.log(result);
	
	// var result = await client.query("CREATE TABLE entelectual (userID SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT NOT NULL, salt VARCHAR(10) NOT NULL, hash VARCHAR(256) NOT NULL);");
	// console.log(result);
	// var result = await client.query("CREATE TABLE reason (reasonID SERIAL PRIMARY KEY, creatorID INTEGER NOT NULL, nominationID INTEGER NOT NULL, description TEXT NOT NULL, createdTime TIMESTAMP DEFAULT NOW(), FOREIGN KEY (creatorID) REFERENCES entelectual (userID), FOREIGN KEY (nominationID) REFERENCES entelectual (userID));");
	// console.log(result);
	// var result = await client.query("CREATE TABLE fine (fineID SERIAL PRIMARY KEY, reasonID INTEGER NOT NULL, creatorID INTEGER NOT NULL, description TEXT NOT NULL, createdTime TIMESTAMP DEFAULT NOW(), FOREIGN KEY (reasonID) REFERENCES reason (reasonID), FOREIGN KEY (creatorID) REFERENCES entelectual (userID));");
	// console.log(result);
	// var result = await client.query("CREATE TABLE reasonvote (mixID SERIAL PRIMARY KEY, reasonID INTEGER NOT NULL, voterID INTEGER NOT NULL, vote TEXT NOT NULL, FOREIGN KEY (reasonID) REFERENCES reason (reasonID), FOREIGN KEY (voterID) REFERENCES entelectual (userID));");
	// console.log(result);
	// var result = await client.query("CREATE TABLE finevote (mixID SERIAL PRIMARY KEY, fineID INTEGER NOT NULL, voterID INTEGER NOT NULL, vote TEXT NOT NULL, FOREIGN KEY (fineID) REFERENCES fine (fineID), FOREIGN KEY (voterID) REFERENCES entelectual (userID));");
	// console.log(result);
	
	// var user1 = await insertEntelectual("jared.oreilly@entelect.co.za", "Jared OReilly", "123", "123");
	// console.log(user1);
	// var user2 = await insertEntelectual("jarred.fourie@entelect.co.za", "Jarred Fourie", "456", "456");
	// console.log(user2);
	// var user3 = await insertEntelectual("cool.guy@entelect.co.za", "Cool Guy", "789", "789");
	// console.log(user3);
	
	// var reason1 = await insertReason(user2["userid"], user1["userid"], "Jared sent out the final FRS documents to the presenters just before our meeting with our mentor Ryan. We made shitloads of changes in the meeting. He had to send another email with the new version of the FRS. Poor form.")
	// console.log(reason1);
	// var reason2 = await insertReason(user2["userid"], user1["userid"], "Didn't pull before pushing")
	// console.log(reason2);
	
	// var fine1 = await insertFine(reason1["reasonid"], user3["userid"], "Down two beers");
	// console.log(fine1);
	// var fine2 = await insertFine(reason1["reasonid"], user2["userid"], "Do random Linkedin skill assessment");
	// console.log(fine2);
	// var fine3 = await insertFine(reason2["reasonid"], user1["userid"], "Handstand for 20 seconds");
	// console.log(fine3);
	
	
	// var reasonvote1 = await insertReasonVote(reason1["reasonid"], user1["userid"], "up")
	// console.log(reasonvote1);
	// var reasonvote2 = await insertReasonVote(reason1["reasonid"], user2["userid"], "up")
	// console.log(reasonvote2);
	// var reasonvote3 = await insertReasonVote(reason1["reasonid"], user3["userid"], "down")
	// console.log(reasonvote3);
	// var reasonvote4 = await insertReasonVote(reason2["reasonid"], user1["userid"], "up")
	// console.log(reasonvote4);
	// var reasonvote5 = await insertReasonVote(reason2["reasonid"], user2["userid"], "down")
	// console.log(reasonvote5);
	// var reasonvote6 = await insertReasonVote(reason2["reasonid"], user3["userid"], "down")
	// console.log(reasonvote6);
	
	
	// var finevote1 = await insertFineVote(fine1["fineid"], user1["userid"], "up");
	// console.log(finevote1);
	// var finevote2 = await insertFineVote(fine1["fineid"], user2["userid"], "down");
	// console.log(finevote2);
	// var finevote3 = await insertFineVote(fine2["fineid"], user1["userid"], "up");
	// console.log(finevote3);
	// var finevote4 = await insertFineVote(fine2["fineid"], user3["userid"], "up");
	// console.log(finevote4);
	// var finevote5 = await insertFineVote(fine3["fineid"], user2["userid"], "down");
	// console.log(finevote5);
	// var finevote6 = await insertFineVote(fine3["fineid"], user3["userid"], "up");
	// console.log(finevote6);
	
	
	res.send("Reset.");
	
	finish(req, res);
}


async function selectEntelectualById(userID)
{
	var result = await client.query("SELECT * FROM entelectual WHERE userID = $1;", [userID]);
	result = result.rows[0];
	return result;
}
async function selectReasonById(reasonID)
{
	var result = await client.query("SELECT * FROM reason WHERE reasonID = $1;", [reasonID]);
	result = result.rows[0];
	return result;
}
async function selectFineById(fineID)
{
	var result = await client.query("SELECT * FROM fine WHERE fineID = $1;", [fineID]);
	result = result.rows[0];
	return result;
}
async function selectReasonVoteById(mixID)
{
	var result = await client.query("SELECT * FROM reasonvote WHERE mixID = $1;", [mixID]);
	result = result.rows[0];
	return result;
}
async function selectNumReasonVoteByOther(reasonID, voterID)
{
	var result = await client.query("SELECT * FROM reasonvote WHERE reasonID = $1 AND voterID = $2;", [reasonID, voterID]);
	result = result.rows.length;
	return result;
}
async function selectFineVoteById(mixID)
{
	var result = await client.query("SELECT * FROM finevote WHERE mixID = $1;", [mixID]);
	result = result.rows[0];
	return result;
}
async function selectNumFineVoteByOther(fineID, voterID)
{
	var result = await client.query("SELECT * FROM finevote WHERE fineID = $1 AND voterID = $2;", [fineID, voterID]);
	result = result.rows.length;
	return result;
}


async function selectAllEntelectuals()
{
	var result = await client.query("SELECT * FROM entelectual;");
	result = result.rows;
	return result;
}
async function selectAllReasons()
{
	var result = await client.query("SELECT * FROM reason;");
	result = result.rows;
	return result;
}
async function selectAllFines()
{
	var result = await client.query("SELECT * FROM fine;");
	result = result.rows;
	return result;
}
async function selectAllReasonVotes()
{
	var result = await client.query("SELECT * FROM reasonvote;");
	result = result.rows;
	return result;
}
async function selectAllFineVotes()
{
	var result = await client.query("SELECT * FROM finevote;");
	result = result.rows;
	return result;
}


async function insertEntelectual(email, name, salt, hash)
{
	var result = await client.query("INSERT INTO entelectual (email, name, salt, hash) VALUES ($1, $2, $3, $4) RETURNING *;", [email, name, salt, hash]);
	result = result.rows[0];
	return result;
}
async function insertReason(creatorID, nominationID, description)
{
	var result = await client.query("INSERT INTO reason (creatorID, nominationID, description) VALUES ($1, $2, $3) RETURNING *;", [creatorID, nominationID, description]);
	result = result.rows[0];
	return result;
}
async function insertFine(reasonID, creatorID, description)
{
	var result = await client.query("INSERT INTO fine (reasonID, creatorID, description) VALUES ($1, $2, $3) RETURNING *;", [reasonID, creatorID, description]);
	result = result.rows[0];
	return result;
}
async function insertReasonVote(reasonID, voterID, vote)
{
	var result = await client.query("INSERT INTO reasonvote (reasonID, voterID, vote) VALUES ($1, $2, $3) RETURNING *;", [reasonID, voterID, vote]);
	result = result.rows[0];
	return result;
}
async function insertFineVote(fineID, voterID, vote)
{
	var result = await client.query("INSERT INTO finevote (fineID, voterID, vote) VALUES ($1, $2, $3) RETURNING *;", [fineID, voterID, vote]);
	result = result.rows[0];
	return result;
}


async function deleteReasonVote(reasonID, voterID)
{
	var result = await client.query("DELETE FROM reasonvote WHERE reasonID = $1 and voterID = $2;", [reasonID, voterID]);
	return "Deleted";
}
async function deleteFineVote(fineID, voterID)
{
	var result = await client.query("DELETE FROM finevote WHERE fineID = $1 and voterID = $2;", [fineID, voterID]);
	return "Deleted";
}



app.get('/fetchEntelectual', (req, res) => 
{
	start(req.body, res);
	fetchEntelectual(req.body, res);
});
async function fetchEntelectual(req, res)
{
	var userID = 1;
	
	var entelectual = await selectEntelectualById(userID);
	delete entelectual["salt"];
	delete entelectual["hash"];
	
	res.send({"entelectual": entelectual});
	
	finish(req, res);
}

app.get('/fetchAllEntelectuals', (req, res) => 
{
	start(req.body, res);
	fetchAllEntelectuals(req.body, res);
});
async function fetchAllEntelectuals(req, res)
{	
	var entelectuals = await selectAllEntelectuals();
	for(var i = 0; i < entelectuals.length; i++)
	{
		delete entelectuals[i]["salt"];
		delete entelectuals[i]["hash"];
	}
	
	res.send({"data": entelectuals});
	
	finish(req, res);
}

app.post('/addEntelectual', (req, res) => 
{
	start(req.body, res);
	console.log(req.body);
	addEntelectual(req.body, res);
});
async function addEntelectual(req, res)
{
	console.log(req);
	var email = req["email"].trim();
	var name = req["name"].trim();
	var salt = "123";
	var hash = "123";
	
	var entelectual = await insertEntelectual(email, name, salt, hash);
	delete entelectual["salt"];
	delete entelectual["hash"];
	
	res.send(({"data": entelectual}));
	
	finish(req, res);
}




app.get('/fetchAllReasonData', (req, res) => 
{
	start(req.body, res);
	fetchAllReasonData(req.body, res);
});
async function fetchAllReasonData(req, res)
{
	var reasons = await selectAllReasons();
	var fines = await selectAllFines();
	var reasonvotes = await selectAllReasonVotes();
	var finevotes = await selectAllFineVotes();
	
	var reasonObj = {};
	for(var i = 0; i < reasons.length; i++)
	{
		var reasonID = reasons[i]["reasonid"];
		reasonObj[reasonID] = {};
		reasonObj[reasonID]["reason"] = reasons[i];
		reasonObj[reasonID]["votes"] = [];
		reasonObj[reasonID]["fines"] = [];
	}
	for(var i = 0; i < reasonvotes.length; i++)
	{
		var reasonID = reasonvotes[i]["reasonid"];
		reasonObj[reasonID]["votes"].push(reasonvotes[i]);
	}
	
	var fineObj = {};
	for(var i = 0; i < fines.length; i++)
	{
		var fineID = fines[i]["fineid"];
		fineObj[fineID] = {};
		fineObj[fineID]["fine"] = fines[i];
		fineObj[fineID]["votes"] = [];
	}
	for(var i = 0; i < finevotes.length; i++)
	{
		var fineID = finevotes[i]["fineid"];
		fineObj[fineID]["votes"].push(finevotes[i]);
	}
	
	for(var key in fineObj)
	{
		var fine = fineObj[key];
		var reasonID = fine["fine"]["reasonid"];
		reasonObj[reasonID]["fines"].push(fine);
	}
	
	var built = [];
	for(var key in reasonObj)
	{
		var reason = reasonObj[key];
		built.push(reason);
	}
	
	res.send({"data": built});
	
	finish(req, res);
}


app.post('/addReason', (req, res) => 
{
	start(req.body, res);
	addReason(req.body, res);
});
async function addReason(req, res)
{
	var creatorID = req["creatorID"];
	var nominationID = req["nominationID"];
	var description = req["description"];
	
	var reason = await insertReason(creatorID, nominationID, description);
	res.send(reason);
	
	finish(req, res);
}


app.post('/addFineToReason', (req, res) => 
{
	start(req.body, res);
	addFineToReason(req.body, res);
});
async function addFineToReason(req, res)
{
	var reasonID = req["reasonID"];
	var creatorID = req["creatorID"];
	var description = req["description"];
	
	var fine = await insertFine(reasonID, creatorID, description);
	res.send(fine);
	
	finish(req, res);
}


app.post('/toggleReasonVote', (req, res) => 
{
	start(req.body, res);
	toggleReasonVote(req.body, res);
});
async function toggleReasonVote(req, res)
{
	var reasonID = req["reasonID"];
	var voterID = req["voterID"];
	
	var length = await selectNumReasonVoteByOther(reasonID, voterID);
	if(length == 0)
	{
		var reasonvote = await insertReasonVote(reasonID, voterID, "up");
		res.send(reasonvote);
	}
	else
	{
		var deletor = await deleteReasonVote(reasonID, voterID);
		res.send({"status":"deleted"});
	}
	
	
	finish(req, res);
}




app.post('/toggleFineVote', (req, res) => 
{
	start(req.body, res);
	toggleFineVote(req.body, res);
});
async function toggleFineVote(req, res)
{
	var fineID = req["fineID"];
	var voterID = req["voterID"];
	
	var length = await selectNumFineVoteByOther(fineID, voterID);
	if(length == 0)
	{
		var finevote = await insertFineVote(fineID, voterID, "up");
		res.send(finevote);
	}
	else
	{
		var deletor = await deleteFineVote(fineID, voterID);
		res.send({"status":"deleted"});
	}
	
	
	finish(req, res);
}


app.listen(port, () =>
{
	console.log(`App listening on port ${port}`);
});