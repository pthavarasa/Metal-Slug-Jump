let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');

const DOODLE = new Image();
DOODLE.src = "../img/Doodle.png";

const APENSANTEUR = 2;
const MAX_SPEED = 30;

let point = 0;

let perso = new Character(cnv.width/2, cnv.height/4, 0, 0, DOODLE);
perso.affiche();
let platformArray = [];

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
  let moveUp = perso.y-(height/2); // Math.floor((perso.y + 250) / 10); 
  /* En fonction de moveUp : generer un certains nombre de platform */
  updatePoint(moveUp);
  updatePosPlatform(moveUp)
  perso.setPos(0,moveUp);
}

/* Rafraichis l'image du jeu */
const update = () => {
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  affichePlatform();
  perso.jump();
  if (perso.y <= 250) { // 250 ?
  	upScreen();
  }
}

perso.jump(MAX_SPEED);
//setInterval(update,20);
