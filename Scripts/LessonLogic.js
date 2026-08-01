var SelectedTape = "Peter Merrick - The Imcomparable Book (Lesson One) side _Side_.mp3";
var BaseDir = "./Content/Audio/";
var FileBase = "Peter Merrick - ";
var TapeSide = 1;

var Lessons =["The Imcomparable Book (Lesson One) side _Side_.mp3", "A Relationship Broken (Lesson 2) side _Side_.mp3"];

var LessonAudio;
var FlipButton;

var LeftColumn;
var RightColumn;

window.onload = function() {
	InitializeLessons();
  	console.log("Page fully loaded");
};



function InitializeLessons() {
	//Load the URL ? = 1, 2, 3, 4, 5
	LessonAudio = document.getElementById('LessonPlayer');
	FlipButton = document.getElementById('TapeSide');
	LeftColumn = document.getElementById('LeftColumn');
	RightColumn = document.getElementById('RightColumn');
	if(isMobile()){
		RightColumn.classList.add('non-active');
		LeftColumn.classList.add('active');
		InitializeMobile();
	}
	LoadTapeAndSide();

	LoadLesson();
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
	console.log(LessonAudio);
	LessonAudio.src = BaseDir + SelectedTape.replace("_Side_", TapeSide);
	LessonAudio.load();
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
	//LeftColumn = first page
}

function ChangeMobileSheetSide(){
	MobileFunction = ShowMobileTranscript;
	//LeftColumn = second page
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
	fetch('./Contnt/JSONData/LessonOne.json')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
}