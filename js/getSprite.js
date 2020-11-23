/* Recupere toute les sprites */

let arraySpritesheet = [];
let i=0;
let repositoryArray = ["hole/", "monster1/", "monster2/", "platform_base/", "platform_break/", "platform_weak/", "trampoline/"];

const loadFile = () => {
  if (this.status == 200) {
    console.log("rentrer");
  	let json, img, arraySprite;
    arraySprite = [];
    json = JSON.parse(this.responseText);
    img = new Image();
    img.src = window.location.pathname+"img/"+repositoryArray[i]+"spritesheet.png";
    img.onload = () => {
    	let canvas, context, canvas2, context2;
    	let w, h, x, y;
    	let canvasImageData;

    	canvas = document.createElement('canvas');
    	canvas.height = json["meta"]["size"]["h"];
    	canvas.width = json["meta"]["size"]["w"];
    	context = canvas.getContext('2d');

    	for (let i=0, sprite = json[i.toString()+".png"]; sprite!=undefined; i++){
    		w = sprite["sourceSize"]["w"];
    		h = sprite["sourceSize"]["h"];
    		x = sprite["frame"]["x"];
    		y = sprite["frame"]["y"];
    		canvas2 = document.createElement('canvas'); 
    		canvas2.height = h;
    		canvas2.width = w;
    		context2 = canvas2.getContext('2d');
    		canvasImageData = context.getImageData(x, y, w, h);
    		arraySprite.push(canvas2);
    	}
    }
    arraySpritesheet.push(arraySprite);
  }
}

const getAllSprite = () => {
	let xobj = new XMLHttpRequest();
	repositoryArray.forEach(repository => {
		xobj.onload = loadFile;
		xobj.overrideMimeType("application/json");
        console.log(window.location.pathname + "img/" + repository + "spritesheet.json");
		xobj.open("GET", window.location.pathname + "img/" + repository + "spritesheet.json", true);
		xobj.send();
		i++;
	});
}

getAllSprite();

console.log(arraySpritesheet);