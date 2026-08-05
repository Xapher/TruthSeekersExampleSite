var DownloadJSON;

async function LoadDownloads(argument) {
	//fetch content/downloads/1.json
	response = await fetch('./Content/JSONData/Downloads/" + argument + ".json');
	DownloadJSON = await response.json();
}

function PopulateDownloads(){
	
}