var DownloadJSON;
var DownloadContainer;



window.onload = function() {
	DownloadContainer = document.getElementById('DownloadPreviews');
  	console.log("Page fully loaded");
};

function LoadDownloads(argument){
	RequestJSON(argument);
}


async function RequestJSON(argument) {
	//fetch content/downloads/1.json
	response = await fetch("./Content/JSONData/Downloads/" + argument + ".json");
	DownloadJSON = await response.json();
	PopulateDownloads();
}

function PopulateDownloads(){
	//populate preview with containers
	//Diagram, Evaluation, TapeFront, TapeBack
	//FullLesson
	DownloadContainer.innerHTML = "";
	DownloadContainer.innerHTML += "<div><a download href=\"" + DownloadJSON["Diagram"] + "\">Download Diagrams</a></div>";
	DownloadContainer.innerHTML += "<div><a download href=\"" + DownloadJSON["Evaluation"] + "\">Download Eval Sheets</a></div>";
	DownloadContainer.innerHTML += "<div><a download href=\"" + DownloadJSON["FullLesson"] + "\">Download Full Pack</a></div>";
	DownloadContainer.innerHTML += "<div><a download href=\"" + DownloadJSON["TapeFront"] + "\">Download Audio Part One</a></div>";
	DownloadContainer.innerHTML += "<div><a download href=\"" + DownloadJSON["TapeBack"] + "\">Download Audio Part Two</a></div>";
}

function QuickDownloadAll() {
    document.getElementById('HiddenDownloadButton').click();
}