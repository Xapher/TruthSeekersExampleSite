var DownloadJSON;
var DownloadContainer;



window.onload = function() {
	DownloadContainer = document.getElementById('DownloadPreviews');
  	console.log("Page fully loaded");
};

function LoadDownloads(argument){
	RequestJSON(argument);
}

var SelectedLesson = 0;
async function RequestJSON(argument) {
	SelectedLesson = argument;
	//fetch content/downloads/1.json
	response = await fetch("./Content/JSONData/Downloads/" + argument + ".json");
	DownloadJSON = await response.json();
	PopulateDownloads();
}

function ClickDownload() {
	// body...
}

function PopulateDownloads(){
	//populate preview with containers
	//Diagram, Evaluation, TapeFront, TapeBack
	//FullLesson
	DownloadContainer.innerHTML = "";
	DownloadContainer.innerHTML += "<button onclick=\"this.children[0].click()\" class=\"DownloadCard\"><a download style=\"display:none;\" href=\"" + DownloadJSON["FullLesson"] + "\">Download Full Pack</a><p>Complete Lesson: #" + SelectedLesson + "</p><img src=\"./Content/Images/FullDownload.png\"><img src=\"./Content/Images/DownloadButton.png\"></button>";
	DownloadContainer.innerHTML += "<button onclick=\"this.children[0].click()\" class=\"DownloadCard\"><a download style=\"display:none;\" href=\"" + DownloadJSON["Diagram"] + "\">Download Diagrams</a><p>Diagram: #" + SelectedLesson + "</p><img src=\"./Content/Images/DiagramIcon.png\"><img src=\"./Content/Images/DownloadButton.png\"></button>";
	DownloadContainer.innerHTML += "<button onclick=\"this.children[0].click()\" class=\"DownloadCard\"><a download style=\"display:none;\" href=\"" + DownloadJSON["Evaluation"] + "\">Download Eval Sheets</a><p>Evaluation Sheet: #" + SelectedLesson + "</p><img src=\"./Content/Images/EvalDownload.png\"><img src=\"./Content/Images/DownloadButton.png\"></button>";
	DownloadContainer.innerHTML += "<button onclick=\"this.children[0].click()\" class=\"DownloadCard\"><a download style=\"display:none;\" href=\"" + DownloadJSON["TapeFront"] + "\">Download Audio Part One</a><p>Audio Part One: #" + SelectedLesson + "</p><img src=\"./Content/Images/DownloadAudio.png\"><img src=\"./Content/Images/DownloadButton.png\"></button>";
	DownloadContainer.innerHTML += "<button onclick=\"this.children[0].click()\" class=\"DownloadCard\"><a download style=\"display:none;\" href=\"" + DownloadJSON["TapeBack"] + "\">Download Audio Part Two</a><p>Audio Part Two: #" + SelectedLesson + "</p><img src=\"./Content/Images/DownloadAudio.png\"><img src=\"./Content/Images/DownloadButton.png\"></button>";
}

function QuickDownloadAll() {
    document.getElementById('HiddenDownloadButton').click();
}