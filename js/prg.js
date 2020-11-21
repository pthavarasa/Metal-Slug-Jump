let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');

const DOODLE = new Image();
DOODLE.src = "../img/Doodle.png";

const PLATFORM = new Image();
PLATFORM.src = "../img/plateforme.png";

const APESANTEUR = 2;
const MAX_SPEED = 15 * APESANTEUR;
const MAX_MOV = 20;
const LARG_PLATFORM = 100;
const HAUT_PLATFORM = 20;

let point = 0;
let mouvement = 0;
let mouv_prev = 0;

let platformArray = [];

let perso = new Character(Math.floor(cnv.width/2), Math.floor(cnv.height/1.3), 40, 40, DOODLE);


/* Gere les deplacement horizontal */ 
const keydown_fun = e => {
  //console.log(mouvement)
  switch (e.code) {
    case "ArrowRight":
    	mouvement += MAX_MOV; // ESSAYER DE FAIRE QQL CHOSE AVEC MOUV_PREV POUR AUGMENTER MOUVEMENT AVANT LA NEXT FRAME
      	break;
    case "ArrowLeft":
    	mouvement += MAX_MOV*-1;
      	break;
  }
}

/* Attrape tout les evenement de touche presser */
window.addEventListener("keydown", keydown_fun, false);

/* Genere un nombre aleatoire entre min et max */
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* Renvoi le nouveau nombre total de point */
const updatePoint = (bonus) => {
  point += bonus;
}

/* Met a jour l'affiche de l'ecran lorsque le personnage depasse une certains hauteur */
const upScreen = () => {
  let moveUp = Math.floor((perso.y + 250) / 10); // Math.floor((perso.y + 250) / 10); 
  /* En fonction de moveUp : generer un certains nombre de platform */
  updatePoint(moveUp);
  updatePosPlatform(moveUp);
  perso.y += moveUp;
}

run = true;

/* Rafraichis l'image du jeu */
const update = () => {
	if (run){
		ctx.clearRect(0, 0, cnv.width, cnv.height);
		affichePlatform();
		perso.jump();
		if (perso.y <= 250) { // 250 ?
			//upScreen(); // Revoir upScreen
		}
		if (perso.y >= cnv.height) {
			perso.y=0;
		}
    if (perso.y < 0) {
      //perso.y = 0;
    }
  }
}

genStartMap();
perso.setSpeed(MAX_SPEED);
perso.affiche();
setInterval(update,30);
