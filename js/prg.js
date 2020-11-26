let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');

const DOODLE = new Image();
DOODLE.src = "../img/Doodle.png";

const BACKGROUND = new Image();
BACKGROUND.src = "../img/bck.png";

const PLAY_BUTTON = new Image();
PLAY_BUTTON.src = "../img/play-on.png";

const APESANTEUR = 2;
const MAX_SPEED = 15 * APESANTEUR;
const MAX_MOV = 20;
const LARG_PLATFORM = 50;
const HAUT_PLATFORM = 10;

let score = 0;
let mouvement = 0;

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
cnv.addEventListener('click',function(e){
  if (!play){
    if ((e.clientY >= cnv.height/4 && e.clientY <= (cnv.height/4)+75) && (e.clientX >= (cnv.width/2)-75 && e.clientX <= ((cnv.width/2)-75)+150)) {
      play=true;
    }
  }
  else {
    // Ecrire du code pour pouvoir mettre pause dans la partie
  }
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
  return Math.floor(Math.random() * (max - min + 1) + min); /* Obtenir un meilleur rand avec un systeme de flottant -> recuperer la premiere virgule / derniere ? */
}

/* Renvoi un type aleatoire en fonction du score courant et de la rareté d'apparition des types */
const getRandomType = (score) => {
  let type = 0;
  /* --- Mettre les formule pour obtenir la probabilité de chaque type --- */
  return type;
}

/* Renvoi le nouveau nombre total de point */
const updateScore = (point) => {
  score += point;
}

/* Met a jour l'affiche de l'ecran lorsque le personnage depasse une certains hauteur */
const upScreen = () => {
  let moveUp = Math.floor(((perso.y + 250) / 10) / 2); 
  updateScore(moveUp);
  updatePosHighPlatform(moveUp);
  perso.y += moveUp;
}

let play = true;

/* Rafraichis l'image du jeu */
const update = () => {
  let type=0;
	if (true){
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(BACKGROUND, 0, 0, cnv.width, cnv.height);
    evnementClavier();
	  affichePlatform();
    updateAffichagePlatform(5);
	  perso.jump();
    if (perso.y <= 250) { 
      /* Affiche un nombre aleatoire [1-4] de platform a chaque frame ou le personnage fait monter l'ecran */
      type=0;
      for (let i = 0; i < (getRandom(0,50)%6)+1; i++){
        /** Si une platform cassable apparait : prb de distance entre les platform car elle casse et le chemin n'est plus accessible **/
        //type = getRandomType(score);
        createNewPlatform(type);
        type++;
      }
		  upScreen(); 
	  }
  	if (perso.y >= cnv.height) {
  		perso.y=0;
  	}
  }
  else {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(BACKGROUND, 0, 0, cnv.width, cnv.height);
    ctx.drawImage(PLAY_BUTTON, (cnv.width/2)-75, cnv.height/4, 150, 75);
  }
}

/* Programme */
const startGame = () => {
  getAllSprite();
  genStartMap();
  perso.setSpeed(MAX_SPEED);
  setInterval(update,200);
}

startGame();