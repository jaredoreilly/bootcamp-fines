var express = require('express');
var app = express();
app.use(express.json());
var port = process.env.PORT || 4000;

var assert = require('assert');

const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL || "postgres://ngvprpzhfruykh:28297b44d5b851c2c7afdcbbb49a78680812c4cc1d1985ffaafb04fad31f41c6@ec2-79-125-93-182.eu-west-1.compute.amazonaws.com:5432/darqu86ut075r6",
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


var jaredRequestCounter = 0;
function start(req, res)
{
	//client.connect();
	jaredRequestCounter += 1;
	req.jaredRequestCounter = jaredRequestCounter;
	console.log(req.jaredRequestCounter + ": " + req.url + " started");
}
function finish(req, res)
{
	//client.end();
	console.log(req.jaredRequestCounter + ": " + req.url + " ended");
	res.end();
}

function checkType(value, type)
{
	switch(type)
	{
		case "num":
			assert(Number(value) === value);
			break;
			
		case "int":
			checkType(value, "num");
			assert(Number.isInteger(value));
			break;
		case "id":
			checkType(value, "int");
			assert(value > 0);
			break;
			
		case "string":
			assert(typeof value === 'string');
			assert(value.length <= 2000);
			break;
		case "string_ne":
			checkType(value, "string");
			assert(value.length > 0);
			break;
		default:
	}
}


app.get('/resetTables', (req, res) => 
{
	start(req, res);
    resetTables(req, res);
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
	try
	{
		var result = await client.query("SELECT * FROM entelectual WHERE userID = $1;", [userID]);
		result = result.rows[0];
		return result;
	}
	catch(err)
	{
		console.log(err);
		return {};
	}
}
async function selectReasonById(reasonID)
{
	try
	{
		var result = await client.query("SELECT * FROM reason WHERE reasonID = $1;", [reasonID]);
		result = result.rows[0];
		return result;
	}
	catch(err)
	{
		console.log(err);
		return {};
	}
}
async function selectFineById(fineID)
{
	try
	{
		var result = await client.query("SELECT * FROM fine WHERE fineID = $1;", [fineID]);
		result = result.rows[0];
		return result;
	}
	catch(err)
	{
		console.log(err);
		return {};
	}
}
async function selectReasonVoteById(mixID)
{
	try
	{
		var result = await client.query("SELECT * FROM reasonvote WHERE mixID = $1;", [mixID]);
		result = result.rows[0];
		return result;
	}
	catch(err)
	{
		console.log(err);
		return {};
	}
}
async function selectNumReasonVoteByOther(reasonID, voterID)
{
	try
	{
		var result = await client.query("SELECT * FROM reasonvote WHERE reasonID = $1 AND voterID = $2;", [reasonID, voterID]);
		result = result.rows.length;
		return result;
	}
	catch(err)
	{
		console.log(err);
		return 0;
	}
}
async function selectFineVoteById(mixID)
{
	try
	{
		var result = await client.query("SELECT * FROM finevote WHERE mixID = $1;", [mixID]);
		result = result.rows[0];
		return result;
	}
	catch(err)
	{
		console.log(err);
		return {};
	}
}
async function selectNumFineVoteByOther(fineID, voterID)
{
	try
	{
		var result = await client.query("SELECT * FROM finevote WHERE fineID = $1 AND voterID = $2;", [fineID, voterID]);
		result = result.rows.length;
		return result;
	}
	catch(err)
	{
		console.log(err);
		return 0;
	}
}



async function selectAllEntelectuals()
{
	try
	{
		var result = await client.query("SELECT * FROM entelectual;");
		result = result.rows;
		return result;
	}
	catch(err)
	{
		console.log(err);
		return [];
	}
}
async function selectAllReasons()
{
	try
	{
		var result = await client.query("SELECT * FROM reason;");
		result = result.rows;
		return result;
	}
	catch(err)
	{
		console.log(err);
		return [];
	}
}
async function selectAllFines()
{
	try
	{
		var result = await client.query("SELECT * FROM fine;");
		result = result.rows;
		return result;
	}
	catch(err)
	{
		console.log(err);
		return [];
	}
}
async function selectAllReasonVotes()
{
	try
	{
		var result = await client.query("SELECT * FROM reasonvote;");
		result = result.rows;
		return result;
	}
	catch(err)
	{
		console.log(err);
		return [];
	}
}
async function selectAllFineVotes()
{
	try
	{
		var result = await client.query("SELECT * FROM finevote;");
		result = result.rows;
		return result;
	}
	catch(err)
	{
		console.log(err);
		return [];
	}
}



async function insertEntelectual(email, name, salt, hash)
{
	try
	{
		var result = await client.query("INSERT INTO entelectual (email, name, salt, hash) VALUES ($1, $2, $3, $4) RETURNING *;", [email, name, salt, hash]);
		result = result.rows[0];
		return result;
	}
	catch(err)
	{
		console.log(err);
		return {};
	}
}
async function insertReason(creatorID, nominationID, description)
{
	try
	{
		var result = await client.query("INSERT INTO reason (creatorID, nominationID, description) VALUES ($1, $2, $3) RETURNING *;", [creatorID, nominationID, description]);
		result = result.rows[0];
		return result;
	}
	catch(err)
	{
		console.log(err);
		return {};
	}
}
async function insertFine(reasonID, creatorID, description)
{
	try
	{
		var result = await client.query("INSERT INTO fine (reasonID, creatorID, description) VALUES ($1, $2, $3) RETURNING *;", [reasonID, creatorID, description]);
		result = result.rows[0];
		return result;
	}
	catch(err)
	{
		console.log(err);
		return {};
	}
}
async function insertReasonVote(reasonID, voterID, vote)
{
	try
	{
		var result = await client.query("INSERT INTO reasonvote (reasonID, voterID, vote) VALUES ($1, $2, $3) RETURNING *;", [reasonID, voterID, vote]);
		result = result.rows[0];
		return result;	
	}
	catch(err)
	{
		console.log(err);
		return {};
	}
}
async function insertFineVote(fineID, voterID, vote)
{
	try
	{
		var result = await client.query("INSERT INTO finevote (fineID, voterID, vote) VALUES ($1, $2, $3) RETURNING *;", [fineID, voterID, vote]);
		result = result.rows[0];
		return result;
	}
	catch(err)
	{
		console.log(err);
		return {};
	}
}



async function updateReasonDescription(reasonID, description)
{
	try
	{
		var result = await client.query("UPDATE reason SET description = $1 WHERE reasonID = $2;", [description, reasonID]);
		return "Updated.";
	}
	catch(err)
	{
		console.log(err);
		return "Failed.";
	}
}
async function updateFineDescription(fineID, description)
{
	try
	{
		var result = await client.query("UPDATE fine SET description = $1 WHERE fineID = $2;", [description, fineID]);
		return "Updated.";
	}
	catch(err)
	{
		console.log(err);
		return "Failed.";
	}
}



async function deleteReasonVote(reasonID, voterID)
{
	try
	{
		var result = await client.query("DELETE FROM reasonvote WHERE reasonID = $1 and voterID = $2;", [reasonID, voterID]);
		return "Deleted";
	}
	catch(err)
	{
		console.log(err);
		return "Failed.";
	}
}
async function deleteFineVote(fineID, voterID)
{
	try
	{
		var result = await client.query("DELETE FROM finevote WHERE fineID = $1 and voterID = $2;", [fineID, voterID]);
		return "Deleted";
	}
	catch(err)
	{
		console.log(err);
		return "Failed.";
	}
}



app.get('/fetchEntelectual', (req, res) => 
{
	start(req, res);
	fetchEntelectual(req, res);
});
async function fetchEntelectual(req, res)
{
	try
	{
		var userID = req.body["userID"];
		checkType(userID, "id");
		
		var entelectual = await selectEntelectualById(userID);
		delete entelectual["salt"];
		delete entelectual["hash"];
		
		res.send({"data": entelectual});
	}
	catch(err)
	{
		console.log(err);
		res.send({"data": {}});
	}
	finally
	{
		finish(req, res);
	}
}

app.get('/fetchAllEntelectuals', (req, res) => 
{
	start(req, res);
	fetchAllEntelectuals(req, res);
});


async function fetchAllEntelectuals(req, res)
{	
	try
	{
		var entelectuals = await selectAllEntelectuals();
		for(var i = 0; i < entelectuals.length; i++)
		{
			delete entelectuals[i]["salt"];
			delete entelectuals[i]["hash"];
		}
		
		res.send({"data": entelectuals});
	}
	catch(err)
	{
		console.log(err);
		res.send({"data": []});
	}
	finally
	{
		finish(req, res);
	}
}


app.post('/addEntelectual', (req, res) => 
{
	start(req, res);
	addEntelectual(req, res);
});
async function addEntelectual(req, res)
{
	try
	{
		var email = req.body["email"];
		checkType(email, "string_ne");
		var name = req.body["name"];
		checkType(name, "string_ne");
		var salt = "123";
		var hash = "123";
		
		email = email.trim();
		name = name.trim();
		
		var entelectual = await insertEntelectual(email, name, salt, hash);
		delete entelectual["salt"];
		delete entelectual["hash"];
		
		res.send(({"data": entelectual}));
	}
	catch(err)
	{
		console.log(err);
		res.send({"data": {}});
	}
	finally
	{
		finish(req, res);
	}
}




app.get('/fetchAllReasonData', (req, res) => 
{
	start(req, res);
	fetchAllReasonData(req, res);
});
async function fetchAllReasonData(req, res)
{
	try
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
	}
	catch(err)
	{
		console.log(err);
		res.send({"data": []});
	}
	finally
	{
		finish(req, res);
	}
}


app.post('/addReason', (req, res) => 
{
	start(req, res);
	addReason(req, res);
});
async function addReason(req, res)
{
	try
	{
		var creatorID = req.body["creatorID"];
		checkType(creatorID, "id");
		var nominationID = req.body["nominationID"];
		checkType(nominationID, "id");
		var description = req.body["description"];
		checkType(description, "string_ne");
		
		description = description.trim();
		
		var reason = await insertReason(creatorID, nominationID, description);
		res.send(reason);
	}
	catch(err)
	{
		console.log(err);
		res.send({});
	}
	finally
	{
		finish(req, res);
	}
}


app.post('/addFineToReason', (req, res) => 
{
	start(req, res);
	addFineToReason(req, res);
});
async function addFineToReason(req, res)
{
	try
	{
		var reasonID = req.body["reasonID"];
		checkType(reasonID, "id");
		var creatorID = req.body["creatorID"];
		checkType(creatorID, "id");
		var description = req.body["description"];
		checkType(description, "string_ne");
		
		description = description.trim();
		
		var fine = await insertFine(reasonID, creatorID, description);
		res.send(fine);
	}
	catch(err)
	{
		console.log(err);
		res.send({});
	}
	finally
	{
		finish(req, res);
	}
}



app.post('/toggleReasonVote', (req, res) => 
{
	start(req, res);
	toggleReasonVote(req, res);
});
async function toggleReasonVote(req, res)
{
	try
	{
		var reasonID = req.body["reasonID"];
		checkType(reasonID, "id");
		var voterID = req.body["voterID"];
		checkType(voterID, "id");
		
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
	}
	catch(err)
	{
		console.log(err);
		res.send({"status":"failed"});
	}
	finally
	{
		finish(req, res);
	}
}




app.post('/toggleFineVote', (req, res) => 
{
	start(req, res);
	toggleFineVote(req, res);
});
async function toggleFineVote(req, res)
{
	try
	{
		var fineID = req.body["fineID"];
		checkType(fineID, "id");
		var voterID = req.body["voterID"];
		checkType(voterID, "id");
		
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
	}
	catch(err)
	{
		console.log(err);
		res.send({"status":"failed"});
	}
	finally
	{
		finish(req, res);
	}
}




app.post('/changeReasonDescription', (req, res) => 
{
	start(req, res);
	changeReasonDescription(req, res);
});
async function changeReasonDescription(req, res)
{
	try
	{
		var reasonID = req.body["reasonID"];
		checkType(reasonID, "id");
		var newDescription = req.body["newDescription"];
		checkType(newDescription, "string_ne");
		
		newDescription = newDescription.trim();
		
		var result = await updateReasonDescription(reasonID, newDescription);
		res.send({"status":"updated"});
	}
	catch(err)
	{
		console.log(err);
		res.send({"status":"failed"});
	}
	finally
	{
		finish(req, res);
	}
}


app.post('/changeFineDescription', (req, res) => 
{
	start(req, res);
	changeFineDescription(req, res);
});
async function changeFineDescription(req, res)
{
	try
	{
		var fineID = req.body["fineID"];
		checkType(fineID, "id");
		var newDescription = req.body["newDescription"];
		checkType(newDescription, "string_ne");
		
		newDescription = newDescription.trim();
		
		var result = await updateFineDescription(fineID, newDescription);
		res.send({"status":"updated"});
	}
	catch(err)
	{
		console.log(err);
		res.send({"status":"failed"});
	}
	finally
	{
		finish(req, res);
	}
}


app.listen(port, () =>
{
	console.log(`App listening on port ${port}`);
});