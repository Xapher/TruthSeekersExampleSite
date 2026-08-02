var SelectedTape = "The Imcomparable Book (Lesson One) side _Side_.mp3";
var BaseDir = "./Content/Audio/";
var FileBase = "Peter Merrick - ";
var TapeSide = 1;
var SelectedLesson = 1;

var Lessons =["", "A Relationship Broken (Lesson 2) side _Side_.mp3"];

var LessonAudio;
var FlipButton;

var LeftColumn;
var RightColumn;
var IframeSheet;


var WorksheetSideOne;
var WorksheetSideTwo;

var LessonJSON;
var LessonTranscript;

window.onload = function() {
	InitializeLessons();
  	console.log("Page fully loaded");
};

var response;


function InitializeLessons() {
	//Load the URL ? = 1, 2, 3, 4, 5

	LessonAudio = document.getElementById('LessonPlayer');
	FlipButton = document.getElementById('TapeSide');
	LeftColumn = document.getElementById('LeftColumn');
	RightColumn = document.getElementById('RightColumn');
	IframeSheet = document.getElementById('SheetContainer');
	LessonTranscript = document.getElementById('LessonTranscript');


	WorksheetSideOne = document.getElementById('SideOneContainer');
	WorksheetSideTwo = document.getElementById('SideTwoContainer');


	LoadSheetFront();
	LoadSheetBack();
	ShowFront();	

  

	if(isMobile()){
		RightColumn.classList.add('non-active');
		LeftColumn.classList.add('active');
		InitializeMobile();
	}
	LoadLesson();
	LoadTapeAndSide();
	
}



async function LoadSheetFront() {
  response = await fetch("./Content/LessonSheets/" + SelectedLesson + "/front.html");
	WorksheetSideOne.innerHTML = await response.text()
}

async function LoadSheetBack() {
	response = await fetch("./Content/LessonSheets/" + SelectedLesson + "/back.html");
  WorksheetSideTwo.innerHTML = await response.text()
}


function ShowFront(){
	WorksheetSideOne.classList.remove('non-active');
	HideBack();
}

function ShowBack(){
	WorksheetSideTwo.classList.remove('non-active');
	HideFront();
}


function HideFront() {
	WorksheetSideOne.classList.add('non-active');
}

function HideBack(){
	WorksheetSideTwo.classList.add('non-active');
}






function SwitchSides(){
	if (TapeSide == 1) {
		TapeSide = 2;
		FlipButton.innerHTML = "Switch to Side: 1";
	}
	else {
		TapeSide = 1;
		FlipButton.innerHTML = "Switch to Side: 2";
	}

	LoadTapeAndSide();
}

function LoadTapeAndSide(){
	LessonAudio.src = BaseDir + FileBase + SelectedTape.replace("_Side_", TapeSide);
	LessonAudio.load();
}

var worksheet = 1;
function ChangeSheetSide() {
	if(worksheet == 1){
		IframeSheet.src = "./Content/LessonSheets/LessonOneSideTwo.html";
		worksheet = 2;
	}
	else {
		IframeSheet.src = "./Content/LessonSheets/LessonOneSideOne.html";
		worksheet = 1;
	}
}



function LoadSheet(){
	//fetch the html
	//
}
















var MobileFunction;

function PressMobileButton(argument) {
	MobileFunction();
}





function InitializeMobile(){
	MobileFunction = ChangeMobileSheetSide;
	LeftColumn.classList.remove('non-active');
	RightColumn.classList.remove('active');

	RightColumn.classList.add('non-active');
	LeftColumn.classList.add('active');
	IframeSheet.src = "./Content/LessonSheets/LessonOneSideOne.html";
	//LeftColumn = first page
}

function ChangeMobileSheetSide(){
	MobileFunction = ShowMobileTranscript;
	//LeftColumn = second page
	IframeSheet.src = "./Content/LessonSheets/LessonOneSideTwo.html";
}

function ShowMobileTranscript(){
	MobileFunction = InitializeMobile;
	//Show Transcript
	RightColumn.classList.remove('non-active');
	LeftColumn.classList.remove('active');

	LeftColumn.classList.add('non-active');
	RightColumn.classList.add('active');
}









function isMobile() {
  return window.innerWidth <= 768;
}










function LoadLesson() {
	LessonTranscript.innerHTML = "";
	fetch('./Content/JSONData/LessonOne.json')
  .then(response => response.json())
  .then(data => {
  	LessonJSON = data;
  	SelectedTape = LessonJSON["FileContents"]["FilePath"];
  
	  for (var i = 0; i < LessonJSON["TextTranscript"].length; i++) {
	  	LessonTranscript.innerHTML += "<p class=\"TranscriptText\">" + LessonJSON["TextTranscript"][i] + "</p>";
	  }
  })
  .catch(error => console.error('Error:', error));


  
}