let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');

const DOODLE = new Image();
DOODLE.src = "../img/Doodle.png";

const PLATFORM = new Image();
PLATFORM.src = "../img/plateforme.png";

const PLATFORM_ = new Image();
PLATFORM_.src = window.location.pathname+"img/hole/spritesheet.json";

console.log(PLATFORM_);

const APESANTEUR = 2;
const MAX_SPEED = 15 * APESANTEUR;
const MAX_MOV = 20;
const LARG_PLATFORM = 100;
const HAUT_PLATFORM = 20;

let point = 0;
let mouvement = 0;
let mouv_prev = 0;

let platformArray = [];

let etatCle = {}; // tous les clé clavier ("true" si elle est appuyée)

let perso = new Character(Math.floor(cnv.width/2), Math.floor(cnv.height/1.3), 40, 40, DOODLE);


/* Attrape tout les evenement de touche presser et libérer */
window.addEventListener('keyup',function(e){
  etatCle[e.keyCode || e.which] = false;
},true);
window.addEventListener('keydown',function(e){
  etatCle[e.keyCode || e.which] = true;
},true);

/* Gere les deplacement horizontal */
const evnementClavier = () => {
  if (etatCle[37] || etatCle[65]){
    mouvement += MAX_MOV*-1;
  }
  if (etatCle[39] || etatCle[68]){
    mouvement += MAX_MOV;
  }
}

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
    evnementClavier();
	affichePlatform();
	perso.jump();
    if (perso.y <= 250) { 
    	createNewPlatform(0);
		upScreen(); 
	}
	if (perso.y >= cnv.height) {
		perso.y=0;
	}
  }
}

genStartMap();
perso.setSpeed(MAX_SPEED);
perso.affiche();
setInterval(update,30);
