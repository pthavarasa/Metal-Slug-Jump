let mapSpritesheet = new Map();
let arraySpritesheet = [];
let i = 0;
let repository_current;
let repositoryArray = ["hole", "monster1", "monster2", "platform_base", "platform_break", "platform_weak", "trampoline"];

/* Recupere les sprites d'un fichier puis les place dans l'array global */
function loadFile() {
    if (this.status == 200) {
      	let json, img, arraySprite;
        arraySprite = [];
        json = JSON.parse(this.responseText);
        img = new Image();
        img.src = window.location.pathname+"img/"+repository_current+"/spritesheet.png";
        img.onload = () => {
        	let canvas, context, canvas2, context2;
        	let w, h, x, y;
        	let canvasImageData;

        	canvas = document.createElement('canvas');
        	canvas.height = json["meta"]["size"]["h"];
        	canvas.width = json["meta"]["size"]["w"];
        	context = canvas.getContext('2d');

        	for (let i=0; json["frames"][i.toString()+".png"]!==undefined; i++){
                /*** Mettre le "sprite =" dans le setup ne fonctionne pas ***/
                sprite = json["frames"][i.toString()+".png"]
        		w = sprite["sourceSize"]["w"];
        		h = sprite["sourceSize"]["h"];
        		x = sprite["frame"]["x"];
        		y = sprite["frame"]["y"];
        		canvas2 = document.createElement('canvas'); 
        		canvas2.height = h;
        		canvas2.width = w;
        		context2 = canvas2.getContext('2d');
        		canvasImageData = context.getImageData(x, y, w, h);
                context2.putImageData(canvasImageData,0,0);
        		arraySprite.push(canvas2);
       	    }
        }   
        //arraySpritesheet.set(repositoryArray[i++].toString(), i.toString());
        arraySpritesheet.push(arraySprite);
    }
}

/* Recupere les sprite de tout les fichier des dossier dans l'array global des noms de fichier */
const getAllSprite = () => {
    let path;
	repositoryArray.forEach(repository => {
        let xobj = new XMLHttpRequest();
		xobj.onload = loadFile;
        repository_current=repository;
		xobj.overrideMimeType("application/json");
        path = "./img/" + repository + "/spritesheet.json";
		xobj.open("GET", path, true);
		xobj.send();
	});
}

const arrayToMap = () => {
    let size = repositoryArray.length;
    for (let i = 0; i < size; i++){
        mapSpritesheet.set(repositoryArray[i],arraySpritesheet[i]);
    }
    console.log(mapSpritesheet);
    return ;
}