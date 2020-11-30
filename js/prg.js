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
let monsterArray = [];

let etatCle = {}; // tous les clé clavier ("true" si elle est appuyée)

let perso = new Character(Math.floor(cnv.width/2), Math.floor(cnv.height/1.3));

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
},true);

/* Gere les deplacement horizontal */
const eventKeyboard = () => {
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

const getRandomCoef = (spec) => {
  let i, sum=0, r=Math.random();
  for (i in spec) {
    sum += spec[i];
    if (r <= sum) return i;
  }
}

const getProb = (objet) => {
  //objet=='Monster'?
}

/* Renvoi un type aleatoire en fonction du score courant et de la rareté d'apparition des types */
const getRandomType = (score, objet) => {
  /* Changer les probabilité en fonction du score */
  const probPlatform = {0:0.35, 1:0.2, 2:0.1, 3:0.1, 4:0.05, 5:0.2};
  const probMonster = {0:0.98, 1:0.01, 2:0.01};
  let prob;
  objet=="Monster"?prob=getRandomCoef(probMonster):prob=getRandomCoef(probPlatform);
  return prob;
}

/* Renvoi le nouveau nombre total de point */
const updateScore = (point) => {
  score += point;
}

/* Met a jour l'affiche de l'ecran lorsque le personnage depasse une certains hauteur */
const upScreen = () => {
  let moveUp = Math.floor(((perso.y + 250) / 10) / 2); 
  updateScore(moveUp);
  updatePosHigh(moveUp,platformArray);
  updatePosHigh(moveUp,monsterArray);
  perso.y += moveUp;
}

/* Affiche le score */
const drawScore = () => {
  ctx.font = '30px serif';
  ctx.fillText("Score : " + Math.floor(score/10), 10, 30);
}

let play = false;

/* Rafraichis l'image du jeu */
const update = () => {
  let type=0;
	if (true){
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(BACKGROUND, 0, 0, cnv.width, cnv.height);
    drawScore()
    eventKeyboard();
	  affichePlatform();
    afficheMonster();
    perso.jump();
    if (perso.y <= 250) { 
      for (let i = 0; i < (getRandom(0,50)%3)+1; i++){
        type = getRandomType(score,'Platform');
        createNewPlatform(type);
      }
      type=getRandomType(score,'Monster');
      type--;
      if (type!=-1) createNewMonster(1);
		  upScreen(); 
	  }
  	else if (perso.y >= cnv.height || collisionMonster(perso)) {
  		perso.y=0;
  	}
    updateAffichagePlatform(5);
    updateAffichageMonster(5);
  }
  else {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(BACKGROUND, 0, 0, cnv.width, cnv.height);
    drawScore();
    ctx.drawImage(PLAY_BUTTON, (cnv.width/2)-75, cnv.height/4, 150, 75);
  }
}

/* Programme */
const startGame = () => {
  getAllSprite();
  genStartMap();
  perso.setSpeed(MAX_SPEED);
  setInterval(update,30);
}

let tab = [0,0,0];

for (let i =  0; i <100; i++){
  tab[getRandomType(641,"Monster")]++;
}
//console.log(tab);

//console.log(getRandomType(641,"Monster"));

startGame();