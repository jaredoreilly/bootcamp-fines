var express = require('express');
var app = express();
app.use(express.json());
var port = process.env.PORT || 4000;

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
	var result = await client.query("DROP TABLE IF EXISTS entelectuals;");
	console.log(result);
	var result = await client.query("DROP TABLE IF EXISTS reason;");
	console.log(result);
	var result = await client.query("DROP TABLE IF EXISTS fine;");
	console.log(result);
	var result = await client.query("DROP TABLE IF EXISTS reasonvote;");
	console.log(result);
	var result = await client.query("DROP TABLE IF EXISTS finevote;");
	console.log(result);
	
	var result = await client.query("CREATE TABLE entelectuals (userID SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, salt VARCHAR(10) NOT NULL, hash VARCHAR(256) NOT NULL);");
	console.log(result);
	
	var result = await client.query("CREATE TABLE reason (reasonID SERIAL PRIMARY KEY, creatorID INTEGER NOT NULL, nominationID INTEGER NOT NULL, description TEXT NOT NULL, FOREIGN KEY (creatorID) REFERENCES entelectuals (userID), FOREIGN KEY (nominationID) REFERENCES entelectuals (userID));");
	console.log(result);
	
	var result = await client.query("CREATE TABLE fine (fineID SERIAL PRIMARY KEY, reasonID INTEGER NOT NULL, creatorID INTEGER NOT NULL, description TEXT NOT NULL, FOREIGN KEY (reasonID) REFERENCES reason (reasonID), FOREIGN KEY (creatorID) REFERENCES entelectuals (userID));");
	console.log(result);
	
	var result = await client.query("CREATE TABLE reasonvote (mixID SERIAL PRIMARY KEY, reasonID INTEGER NOT NULL, voterID INTEGER NOT NULL, vote TEXT NOT NULL, FOREIGN KEY (reasonID) REFERENCES reason (reasonID), FOREIGN KEY (voterID) REFERENCES entelectuals (userID));");
	console.log(result);
	
	var result = await client.query("CREATE TABLE finevote (mixID SERIAL PRIMARY KEY, fineID INTEGER NOT NULL, voterID INTEGER NOT NULL, vote TEXT NOT NULL, FOREIGN KEY (fineID) REFERENCES fine (fineID), FOREIGN KEY (voterID) REFERENCES entelectuals (userID));");
	console.log(result);
	
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
async function selectFineVoteById(mixID)
{
	var result = await client.query("SELECT * FROM finevote WHERE mixID = $1;", [mixID]);
	result = result.rows[0];
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
async function selectAllFinesVotes()
{
	var result = await client.query("SELECT * FROM finevote;");
	result = result.rows;
	return result;
}


async function insertEntelectual(email, salt, hash)
{
	var result = await client.query("INSERT INTO entelectual (email, salt, hash) VALUES ($1, $2, $3) RETURNING *;", [email, salt, hash]);
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
	
	res.send(entelectual);
	
	finish(req, res);
}


app.get('/addEntelectual', (req, res) => 
{
	start(req.body, res);
	addEntelectual(req.body, res);
});
async function addEntelectual(req, res)
{
	var email = "jared.oreilly@entelect.co.za";
	var password = "pass";
	var salt = "123";
	var hash = password + "123";
	
	var entelectual = await insertUser(email, salt, hash);
	delete entelectual["salt"];
	delete entelectual["hash"];
	
	res.send(entelectual);
	
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
	
	res.send({"reasons": reasons, "fines": fines});
	
	finish(req, res);
}


app.get('/addReason', (req, res) => 
{
	start(req.body, res);
	addReason(req.body, res);
});
async function addReason(req, res)
{
	var creatorID = 1;
	var nominationID = 1;
	var description = "Testing reason";
	
	var reason = await insertReason(creatorID, nominationID, description);
	res.send(reason);
	
	finish(req, res);
}


app.get('/addFineToReason', (req, res) => 
{
	start(req.body, res);
	addFineToReason(req.body, res);
});
async function addFineToReason(req, res)
{
	var reasonID = 1;
	var creatorID = 1;
	var description = "Testing fine";
	
	var fine = await insertFine(reasonID, creatorID, description);
	res.send(fine);
	
	finish(req, res);
}


app.post('/upvoteReason', (req, res) => 
{
	start(req.body, res);
	upvoteReason(req.body, res);
});
async function upvoteReason(req, res)
{
	var reasonID = 1;
	var voterID = 1;
	var vote = "up";
	
	var deleter = await deleteReasonVote(reasonID, voterID);
	var reasonvote = await insertReasonVote(reasonID, voterID, vote);
	res.send(reasonvote);
	
	finish(req, res);
}


app.post('/downvoteReason', (req, res) => 
{
	start(req.body, res);
	downvoteReason(req.body, res);
});
async function downvoteReason(req, res)
{
	var reasonID = 1;
	var voterID = 1;
	var vote = "down";
	
	var deleter = await deleteReasonVote(reasonID, voterID);
	var reasonvote = await insertReasonVote(reasonID, voterID, vote);
	res.send(reasonvote);
	
	finish(req, res);
}

app.listen(port, () =>
{
	console.log(`App listening on port ${port}`);
});