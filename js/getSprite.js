const repositoryArray = ["hole", "monster1", "monster2", "platform_base", "platform_break", "platform_weak", "trampoline"];
let mapSpritesheet = new Map();
let i = 0;

/* Recupere les sprites d'un fichier puis les place dans l'array global */
function loadFile() {
    if (this.status == 200) {
      	let json, img, arraySprite;
        arraySprite = [];
        json = JSON.parse(this.responseText);
        img = new Image();
        img.src = window.location.pathname+"img/"+repositoryArray[i]+"/spritesheet.png";
        img.onload = () => {
        	let canvas, context, canvas2, context2;
        	let w, h, x, y;
        	let canvasImageData;

        	canvas = document.createElement('canvas');
        	canvas.height = json["meta"]["size"]["h"];
        	canvas.width = json["meta"]["size"]["w"];
        	context = canvas.getContext('2d');
            context.drawImage(img,0,0);

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
        mapSpritesheet.set(repositoryArray[i], arraySprite);
    }
}

/* Recupere les sprite de tout les fichier des dossier dans l'array global des noms de fichier */
const getAllSprite = () => {
    let path;
	repositoryArray.forEach(repository => {
        let xobj = new XMLHttpRequest();
		xobj.onload = loadFile;
		xobj.overrideMimeType("application/json");
        path = "./img/" + repository + "/spritesheet.json";
		/*** Remettre en asynchrone pour + de performance ***/
        xobj.open("GET", path, false); 
		xobj.send();
        i++;
	});
}
