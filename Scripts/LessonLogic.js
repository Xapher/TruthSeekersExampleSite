var SelectedTape = "";
var BaseDir = "./Content/Audio/";
var TapeSide = 1;
var SelectedLesson = 1;

var LessonAudio;
var FlipButton, MobileFlipButton;

var LeftColumn;
var RightColumn;
var IframeSheet;

var LessonJSON;
var LessonTranscript;
var DiagramIndex = 0;
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


async function SetupDiagrams() {
	for (var i = 0; i < LessonJSON["FileContents"]["Diagrams"].length; i++) {
		var Temp = `<div id=\"Diagram-${i}\"></div>`;
		LeftColumn.innerHTML = LeftColumn.innerHTML + Temp;
		Temp = document.getElementById(`Diagram-${i}`);
		Temp.classList.add('ZoomOut')
		response = await fetch("./Content/LessonSheets/" + SelectedLesson + "/" + LessonJSON["FileContents"]["Diagrams"][i]);
		Temp.innerHTML = await response.text();
		Temp.classList.add('non-active');
	}

	document.getElementById(`Diagram-0`).classList.remove('non-active');
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
		worksheet = 2;
	}
	else {
		worksheet = 1;
	}
}








function CycleSheets() {
	for (const node of LeftColumn.childNodes) {
	  node.classList.add('non-active');
	}
	DiagramIndex++;
	if(DiagramIndex >= LeftColumn.childNodes.length){
		if(isMobile()){
			DiagramIndex = -1;
			ShowMobileTranscript();
		}
		else {
			DiagramIndex = 0;
		}
	}

	document.getElementById(`Diagram-${DiagramIndex}`).classList.remove('non-active');
}



function ShowMobileTranscript(){
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

	SetupDiagrams();
	SelectedTape = LessonJSON["FileContents"]["FilePath"];
	if(!SelectedTape.includes("_Side_")){
		MobileFlipButton.disabled = true;
	}
  for (var i = 0; i < LessonJSON["TextTranscript"].length; i++) {
  	LessonTranscript.innerHTML += `<p id=${LessonJSON["TextTranscript"][i][0]} class=\"TranscriptText\">` + LessonJSON["TextTranscript"][i][1] + "</p>";
  }
	LoadTapeAndSide();

	EvalSheet.src = "./Content/LessonSheets/" + SelectedLesson + "/EvalSheet.html";
}






function ChangeLesson(lesson){
	window.location.href = "https://xapher.github.io/TruthSeekersExampleSite/lessons.html?i=" + lesson;
}