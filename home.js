
var entelectuals = null;
var reasons = null;

window.onload = function()
{
	var email = localStorage.getItem("email");
	if(email === null)
	{
		$("#login").html('Login <i class="glyphicon glyphicon-user"></i>');
	}
	else
	{
		$("#login").html(email + ' <i class="glyphicon glyphicon-user"></i>');
	}
	
	refreshFromServer();
}

function refreshFromServer()
{
	$.get("/fetchAllEntelectuals",
	function(data)
	{
		entelectuals = data["data"];
		console.log(entelectuals);
		initEntelectualHashMap();
		
		$.get("/fetchAllReasonData",
		function(data)
		{
			reasons = data["data"];
			console.log(reasons);
			
			renderReasons();
		});
	});
}

var entelectualsHashMap = {};
function initEntelectualHashMap()
{
	for(var i = 0; i < entelectuals.length; i++)
	{
		var entelectual = entelectuals[i];
		var userID = entelectual["userid"];
		entelectualsHashMap[userID] = entelectual;
	}
	console.log(entelectualsHashMap);
}

function transformTimestamp(timestamp)
{
	var newT = new Date(timestamp);
	newT.setTime(newT.getTime() + (2*60*60*1000));
	newT = newT.toISOString();
	newT = newT.replaceAll("T"," ");
	newT = newT.substring(0, newT.length-8);
	return newT;
}

function renderFine(fine)
{
	var myID = getIDOfEmail(localStorage.getItem("email"));
	var reasonID = fine["fine"]["reasonid"];
	var fineID = fine["fine"]["fineid"];
	var timestamp = transformTimestamp(fine["fine"]["createdtime"]);
	var creatorID = fine["fine"]["creatorid"];
	var creator = entelectualsHashMap[creatorID];
	var desc = fine["fine"]["description"];
	var votes = fine["votes"];
	var numUp = votes.length, buttonClass = "btn-default";
	for(var i = 0; i < votes.length; i++)
	{
		if(votes[i]["voterid"] == myID)
		{
			buttonClass = "btn-primary";
		}
	}
	
	var html = '<div class="row">';
	html += '	<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 left" style="padding-top:8px">'
	html += '		<strong>' + creator["name"] + '</strong> at <i>' + timestamp + '</i> ';
	html += '	</div>';
	html += '	<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 right">';
	if(creatorID == myID)
	{
		html += '		<button id="edf' + fineID + '" class="btn btn-default editor" onclick="editFine()">Edit <i id="eef' + fineID + '" class="glyphicon glyphicon-edit"></i></button>';
	}
	html += '		<button id="upf' + fineID + '" class="btn ' + buttonClass + ' voter" onclick="toggleFineVote()">' + numUp + ' <i id="iif' + fineID + '" class="glyphicon glyphicon-arrow-up"></i></button>';
	html += '	</div>';
	html += '</div>';
	html += '<div class="row">';
	html += '	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 left">'
	html += '		<div class="form-group" style="margin-top:10px">';
	html += '			<textarea id="fin' + fineID + '"class="form-control" style="background-color:white" disabled>' + desc + '</textarea>';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';
	return html;
}

function renderReason(reason)
{
	var html = '<li class="list-group-item">';
	
	var myID = getIDOfEmail(localStorage.getItem("email"));
	var reasonID = reason["reason"]["reasonid"];
	var timestamp = transformTimestamp(reason["reason"]["createdtime"]);
	var creatorID = reason["reason"]["creatorid"];
	var creator = entelectualsHashMap[creatorID];
	var nominationID = reason["reason"]["nominationid"];
	var nomination = entelectualsHashMap[nominationID];
	var votes = reason["votes"];
	var numUp = votes.length, buttonClass = "btn-default";
	for(var i = 0; i < votes.length; i++)
	{
		if(votes[i]["voterid"] == myID)
		{
			buttonClass = "btn-danger";
		}
	}
	
	html += '<div class="row">';
	html += '	<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 left" style="padding-top:8px">'
	html += '		<strong>' + creator["name"] + '</strong> nominated <strong>' + nomination["name"] + '</strong> at <i>' + timestamp + '</i> ';
	html += '	</div>';
	html += '	<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 right">';
	if(creatorID == myID)
	{
		html += '		<button id="edr' + reasonID + '" class="btn btn-default editor" onclick="editReason()">Edit <i id="eer' + reasonID + '" class="glyphicon glyphicon-edit"></i></button>';
	}
	html += '		<button id="upr' + reasonID + '" class="btn ' + buttonClass + ' voter" onclick="toggleReasonVote()">' + numUp + ' <i id="iir' + reasonID + '" class="glyphicon glyphicon-arrow-up"></i></button>';
	html += '	</div>';
	html += '</div>';
	html += '<div class="row">';
	html += '	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 left">'
	html += '		<div class="form-group" style="margin-top:10px">';
	html += '			<textarea id="rea' + reasonID + '" class="form-control" style="background-color:white" disabled>' + reason["reason"]["description"] + '</textarea>';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';
	html += '<div class="row">';
	html += '	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 left" style="padding-left:40px">'
	
	var fines = reason["fines"];
	fines.sort((a, b) => (a["votes"].length < b["votes"].length) ? 1 : -1);
	for(var i = 0; i < fines.length; i++)
	{
		var fine = fines[i];
		var fineHtml = renderFine(fine);
		html += fineHtml;
		
	}
	
	html += '		<div class="row" style="margin-top:5px;margin-bottom:10px">';
	html += '			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 left">'
	html += '				<button id="f' + reasonID + '" class="btn btn-success" onclick="addFine()">Fine <i id="i' + reasonID + '"class="glyphicon glyphicon-plus"></i></button>';
	html += '			</div>';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';
	
	html += '</li>';
	return html;
}

function renderReasons()
{
	$("#reasons").empty();
	console.log(reasons);
	
	reasons.sort((a, b) => (a["votes"].length < b["votes"].length) ? 1 : -1);
	
	for(var i = 0; i < reasons.length; i++)
	{
		var reason = reasons[i];
		console.log(reason);
		var html = renderReason(reason);
		$("#reasons").append(html);
	}
}


function login()
{
	$(".firstLogin").hide();
	$("#email").val("");
	$("#name").val("");
	$("#loginModal").modal('show');
}

function goodLogin(email)
{
	localStorage.setItem("email", email);
	$("#login").html(email + ' <i class="glyphicon glyphicon-user"></i>');
	
	window.location.href = "home.html";
}

function checkIfExistsLogin()
{
	$("#checkIfExistsLogin").attr("disabled", true);
	
	var email = $("#email").val().trim();
	console.log("email", email);
	var name = $("#name").val().trim();
	console.log("name", name);
	
	if(!email.endsWith("@entelect.co.za"))
	{
		alert("Invalid email.");
		$("#checkIfExistsLogin").attr("disabled", false);
		return;
	}
	
	for(var i = 0; i < entelectuals.length; i++)
	{
		var thisEmail = entelectuals[i]["email"];
		if(thisEmail == email)
		{
			goodLogin(email);
			return;
		}
	}
	
	$(".firstLogin").show();
	$("#checkIfExistsLogin").attr("disabled", false);
	
	if(name != "")
	{
		$.ajax({
			url: '/addEntelectual',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ email: email, name: name }),
			dataType: 'json',
			success: function(data)
			{
				console.log(data);
				goodLogin(email);
			}
		});
	}
	
	
}


function addReason()
{
	$("#reasonFill").val("");
	$("#nominatePerson").empty();
	
	var copied = JSON.parse(JSON.stringify(entelectuals));
	
	copied.sort((a, b) => (a["name"] > b["name"]) ? 1 : -1);
	
	for(var i = 0; i < copied.length; i++)
	{
		var ent = copied[i];
		if(ent["email"] == localStorage.getItem("email"))
		{
			continue;
		}
		$("#nominatePerson").append('<option value="' + ent["userid"] + '">' + ent["name"] + '</option>');
	}
	
	
	
	$("#addReasonModal").modal('show');
}

function getIDOfEmail(email)
{
	for(var i = 0; i < entelectuals.length; i++)
	{
		if(entelectuals[i]["email"] == email)
		{
			return entelectuals[i]["userid"];
		}
	}
}

function reallyAddReason()
{
	$("#addReason").attr("disabled", true);
	
	var creatorID = getIDOfEmail(localStorage.getItem("email"));
	console.log(creatorID);
	var nominationID = $("#nominatePerson").val();
	console.log(nominationID);
	var description = $("#reasonFill").val();
	console.log(description);
	
	if(description == "")
	{
		alert("Enter a reason.");
		$("#addReason").attr("disabled", false);
		return;
	}
	
	$.ajax({
		url: '/addReason',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({ creatorID: creatorID, nominationID: nominationID, description: description }),
		dataType: 'json',
		success: function(data)
		{
			console.log(data);
			window.location.href = "home.html";
		}
	});
}


var reasonForFine = null;
function addFine()
{
	console.log(event.target.id);
	reasonForFine = parseInt(event.target.id.substring(1));
	console.log(reasonForFine);
	$("#fineFill").val("");
	$("#addFineModal").modal('show');
}


function reallyAddFine()
{
	$("#addFine").attr("disabled", true);
	
	var reasonID = reasonForFine;
	console.log(reasonID);
	var creatorID = getIDOfEmail(localStorage.getItem("email"));
	console.log(creatorID);
	var description = $("#fineFill").val();
	console.log(description);
	
	if(description == "")
	{
		alert("Enter a fine.");
		$("#addFine").attr("disabled", false);
		return;
	}
	
	$.ajax({
		url: '/addFineToReason',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({ reasonID: reasonID, creatorID: creatorID, description: description }),
		dataType: 'json',
		success: function(data)
		{
			console.log(data);
			window.location.href = "";
		}
	});
}



function toggleReasonVote()
{
	$(".voter").attr("disabled", true);
	console.log(event.target.id);
	var reasonID = parseInt(event.target.id.substring(3));
	console.log(reasonID);
	var voterID = getIDOfEmail(localStorage.getItem("email"));
	console.log(voterID);
	
	$.ajax({
		url: '/toggleReasonVote',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({ reasonID: reasonID, voterID: voterID }),
		dataType: 'json',
		success: function(data)
		{
			console.log(data);
			refreshFromServer();
		}
	});
}



function toggleFineVote()
{
	$(".voter").attr("disabled", true);
	console.log(event.target.id);
	var fineID = parseInt(event.target.id.substring(3));
	console.log(fineID);
	var voterID = getIDOfEmail(localStorage.getItem("email"));
	console.log(voterID);
	
	$.ajax({
		url: '/toggleFineVote',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({ fineID: fineID, voterID: voterID }),
		dataType: 'json',
		success: function(data)
		{
			console.log(data);
			refreshFromServer();
		}
	});
}

var reasonToEdit = null;
function editReason()
{
	console.log(event.target.id);
	reasonToEdit = parseInt(event.target.id.substring(3));
	console.log(reasonToEdit);
	var current = $("#rea"+reasonToEdit).val();
	$("#reasonFillEdit").val(current);
	$("#editReasonModal").modal('show');
}

function reallyEditReason()
{
	$("#editReason").attr("disabled", true);
	var reasonID = reasonToEdit;
	var newDesc = $("#reasonFillEdit").val();
	
	$.ajax({
		url: '/changeReasonDescription',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({ reasonID: reasonID, newDescription: newDesc }),
		dataType: 'json',
		success: function(data)
		{
			console.log(data);
			refreshFromServer();
			$("#editReasonModal").modal('hide');
			$("#editReason").attr("disabled", false);
		}
	});
}

var fineToEdit = null;
function editFine()
{
	console.log(event.target.id);
	fineToEdit = parseInt(event.target.id.substring(3));
	console.log(fineToEdit);
	var current = $("#fin"+fineToEdit).val();
	$("#fineFillEdit").val(current);
	$("#editFineModal").modal('show');
}

function reallyEditFine()
{
	$("#editFine").attr("disabled", true);
	var fineID = fineToEdit;
	var newDesc = $("#fineFillEdit").val();
	
	$.ajax({
		url: '/changeFineDescription',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({ fineID: fineID, newDescription: newDesc }),
		dataType: 'json',
		success: function(data)
		{
			console.log(data);
			refreshFromServer();
			$("#editFineModal").modal('hide');
			$("#editFine").attr("disabled", false);
		}
	});
}