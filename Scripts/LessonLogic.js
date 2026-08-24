var SelectedTape = "";
var BaseDir = "./Content/Audio/";
var TapeSide = 1;
var SelectedLesson = 1;

var LessonAudio;
var FlipButton, MobileFlipButton;

var LeftColumn;
var RightColumn;
var IframeSheet;


var WorksheetSideOne;
var WorksheetSideTwo;

var LessonJSON;
var LessonTranscript;

var EvalSheet;

window.onload = function() {
	InitializeLessons();
  	console.log("Page fully loaded");
};

var response;

var TimeBegin = -1;
var TimeEnd = -1;

var DynamicMobileButton;
var TempID = "";
var LastIndex = -1;

function InitializeLessons() {
	if(window.location.href.includes('?')){
		const params = new URLSearchParams(window.location.search);
		SelectedLesson = parseInt(params.get('i'));
		console.log("Loading Lesson: " + SelectedLesson);
	}
	else {
		SelectedLesson = 1;
	}

	LessonAudio = document.getElementById('LessonPlayer');
	FlipButton = document.getElementById('TapeSide');
	MobileFlipButton = document.getElementById('TapeSideMobile');
	LeftColumn = document.getElementById('LeftColumn');
	RightColumn = document.getElementById('RightColumn');
	LessonTranscript = document.getElementById('LessonTranscript');
	DynamicMobileButton = document.getElementById('MobileWorkSheetSwitcher');

	WorksheetSideOne = document.getElementById('SideOneContainer');
	WorksheetSideTwo = document.getElementById('SideTwoContainer');

	EvalSheet = document.getElementById('EvaluationSheetFrame');

	LoadLesson();
	ShowFront();	
	if(isMobile()){
		RightColumn.classList.add('non-active');
		LeftColumn.classList.add('active');
		InitializeMobile();
	}
	


	LessonAudio.addEventListener('timeupdate', () => {
	  // Execute code continuously while playing
	  console.log(`Current time: ${LessonAudio.currentTime}`);
	  //Eh, get some of the <p> ids and compare it to time for active boxes
	  for (var i = 0; i < LessonTranscript.childNodes.length; i++) {
	  	if(i != LastIndex) {
	  		LessonTranscript.childNodes[i].classList.remove('ActiveTranscript');
	  		TempID = LessonTranscript.childNodes[i].id;
		  	if(parseInt(TempID.split(':')[0]) == TapeSide){
		  		TempID = TempID.split(':')[1];
	  			TimeBegin = parseFloat(TempID.split('-')[0]);
				  TimeEnd = parseFloat(TempID.split('-')[1]);
				  if(LessonAudio.currentTime >= TimeBegin && LessonAudio.currentTime < TimeEnd && i != LastIndex){
				  	LessonTranscript.childNodes[i].classList.add('ActiveTranscript');
				  	LessonTranscript.childNodes[i].scrollIntoView({ 
						  behavior: 'smooth', 
						  block: 'center',  
						  inline: 'nearest' 
						});
						LastIndex = i;
				  }
		  	}
	  	}
	  }
	});

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
		FlipButton.innerHTML = "Flip Tape: 1";
		MobileFlipButton.innerHTML = "Flip Tape: 1";
	}
	else {
		TapeSide = 1;
		FlipButton.innerHTML = "Flip Tape: 2";
		MobileFlipButton.innerHTML = "Flip Tape: 2";
	}

	LoadTapeAndSide();
}

function LoadTapeAndSide(){
	LessonAudio.src = BaseDir + SelectedTape.replace("_Side_", TapeSide);
	LessonAudio.load();
}

var worksheet = 1;
function ChangeSheetSide() {
	if(worksheet == 1){
		ShowBack();
		worksheet = 2;
	}
	else {
		ShowFront();
		worksheet = 1;
	}
}
















var MobileFunction;

function PressMobileButton(argument) {
	MobileFunction();
}





function InitializeMobile(){
	MobileFunction = ChangeMobileSheetSide;
	ShowFront();
	RightColumn.classList.remove('active');
	RightColumn.classList.add('non-active');

	LeftColumn.classList.remove('non-active');
	LeftColumn.classList.add('active');
	DynamicMobileButton.textContent = "Flip Worksheet: Back";
}

function ChangeMobileSheetSide(){
	ShowBack();
	MobileFunction = ShowMobileTranscript;
	DynamicMobileButton.textContent = "Switch to: Transcript";
}

function ShowMobileTranscript(){
	MobileFunction = InitializeMobile;
	HideFront();
	HideBack();
	RightColumn.classList.remove('non-active');
	RightColumn.classList.add('active');
	LeftColumn.classList.add('non-active');
	LeftColumn.classList.remove('active');
	DynamicMobileButton.textContent = "Go To Worksheet: Front";
}









function isMobile() {
  return window.innerWidth <= 768;
}










async function LoadLesson() {
	LessonTranscript.innerHTML = "";
	response = await fetch('./Content/JSONData/' + SelectedLesson + '.json');

	LessonJSON = await response.json();

	SelectedTape = LessonJSON["FileContents"]["FilePath"];
  for (var i = 0; i < LessonJSON["TextTranscript"].length; i++) {
  	LessonTranscript.innerHTML += `<p id=${LessonJSON["TextTranscript"][i][0]} class=\"TranscriptText\">` + LessonJSON["TextTranscript"][i][1] + "</p>";
  }

  LoadSheetFront();
	LoadSheetBack();

	LoadTapeAndSide();

	EvalSheet.src = "./Content/LessonSheets/" + SelectedLesson + "/EvalSheet.html";
}






function ChangeLesson(lesson){
	window.location.href = "https://xapher.github.io/TruthSeekersExampleSite/lessons.html?i=" + lesson;
}