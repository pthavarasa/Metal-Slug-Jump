/* 
 *             -- TYPE DE PLATFORME -- 
 *
 * 0) VERT : REBOND NORMAL
 *
 * 1) BLEU : REBOND NORMAL + DEPLACEMENT HORIZONZAL
 *
 * 2) AUTRE_BLEU : ????
 *
 * 3) BLANC : REBOND + DISPARITION
 *
 * 4) MARRON : PAS DE REBOND + SE CASSE A LA COLLISION
 *
 * 5) YELLOW : REBOND NORMAL + AFFAIBLISSEMENT A CHAQUE INTERACTION
 *
 *             -- TYPE DE MONSTRE -- 
 */

const direction = [-1,1];

/* Structure d'un objet */
class Objet {
	constructor (x, y, width, height, type, img, dir) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.type = type;
		this.img = img;
		this.dir = dir;
		this.state = 0;
	};

	/* Affiche l'element courant dans le canvas */
	affiche = () => {
		try {
			ctx.drawImage(this.img, this.x, this.y);
		}
		catch (err) {
			play = false;
		}
	};

	/* Renvoi 1 si l'obj est dans l'intervalle de la largeur de l'element courant */
	isInInterval_X = (obj_x_min, obj_x_max) => {
		let obj_x = [obj_x_min, obj_x_max];
		for (let i = 0; i < 2; i++) {
			if (obj_x[i] >= this.x && obj_x[i] <= this.x + this.width){
				return 1;
			}
		}
		return 0;
	};

	/* Renvoi 1 si l'obj est dans l'intervalle de la hauteur de l'element courant */
	isInInterval_Y = (obj_y) => {
		if (obj_y >= this.y && obj_y <= this.y + this.height){
			return 1;
		}
		return 0;
	};

	/* Renvoi 1 si il y a une collision avec l'element courant */
	isInCollision = (obj) => {
		/* On verifie la largeur */
		if (this.isInInterval_X(obj.x,obj.x+obj.width)) {
			/* On verifie la hauteur */ 
			if (this.isInInterval_Y(obj.y+obj.height)) {
				return 1;
			}
		}
		return 0;
	};
}

/* Met a jour les positions des obj du tableau en hauteur */
const updatePosHigh = (speed,array) => {
	/* Change la hauteur des platforme */
	for (let obj of array) {
		obj.y += speed;
	}
	/* Supprime les platforme qui depasse du canvas */
	for (let i = 0; i < array.length; i++){
		if (array[i].y >= cnv.height) {
			array.splice(i,1);
		}
	}
}

/************************/
/*** --- PLATFORM --- ***/
/************************/

/* Affiche toute les platforme */
const affichePlatform = () => { 
	for (let platform of platformArray) {
		platform.affiche();
	}
}

/* Gere les potentiel collision avec des platform*/
const collisionPlatform = (character) => {
	for (let i = 0; i < platformArray.length; i++) {
		/* Si je rentre en collision en descente */
		if (platformArray[i].isInCollision(character) && character.speed <= 0){
			/* Si c'est une platforme qui se brise */
			if (platformArray[i].type == 4) {
				/* Definis le nouvel etat :  */
				platformArray[i].state=1;
				return 0;
			}
			else {
				if (platformArray[i].type == 5) {
					if (platformArray[i].state <= 3) {platformArray[i].img = mapSpritesheet.get('platform_weak')[++platformArray[i].state];}
					else {platformArray.splice(i,1);}
				}
				else if (platformArray[i].type == 3) {
					platformArray.splice(i,1);
				}
				/* Definis le deplacement vers le haut */
				character.setSpeed(MAX_SPEED);
				return 1;
			}
		}
	}
	return 0;
}

/* Met a jour l'affichage des platform (non hauteur) */
const updateAffichagePlatform = (speed) => {
	for (let i = 0; i < platformArray.length; i++){
		/* Si c'est une platform mouvante */
		if (platformArray[i].type==1){
			platformArray[i].x += speed * platformArray[i].dir;
			/* Si la platform sort de l'ecran : change la direction */
			if ((platformArray[i].x > cnv.width-platformArray[i].width && platformArray[i].dir === 1) || (platformArray[i].x < 0 && platformArray[i].dir === -1)) {
				platformArray[i].dir *= -1;
			}
		}

		/* Si c'est une platform qui se casse */
		else if (platformArray[i].type==4 && platformArray[i].state != 0){
			/* Si je n'ai pas atteind le dernier sprite de l'animation de la cassure de la platform : j'affiche le sprite suivant */
			if (platformArray[i].state <= 3) {platformArray[i].img = mapSpritesheet.get('platform_break')[platformArray[i].state++];}
			else {platformArray.splice(i,1);}
		}
	}
}

/* Creation d'une nouvelle platform a la hauteur dx */
const createNewPlatform = (type) => {
	let dir=0;

	if (type==1 || type==2){dir = direction[getRandom(1,50)%2];}

	let img;

	if (type==4){img = mapSpritesheet.get('platform_break')[0];}
	else if (type==5){img = mapSpritesheet.get('platform_weak')[0];}
	else {img = mapSpritesheet.get('platform_base')[type];}
	

	let larg = LARG_PLATFORM; 
	let haut = HAUT_PLATFORM;

	let x = getRandom(0,cnv.width-larg);
	let y = platformArray[platformArray.length-1].y - getRandom(50,150);

	if (type==4){
		if (platformArray[platformArray.length-1].type==4){type=0; y = platformArray[platformArray.length-1].y - getRandom(50,150);}
		else{y = platformArray[platformArray.length-1].y - getRandom(20,50);}
	}

	platformArray.push(new Objet(x,y,larg,haut,type,img,dir));
}

/* Genere les premiere platforme du jeu */
const genStartMap = () => {
	const nbPlatformStart = 9;

	/* Platform de depart pour poser toutes les autre */
	platformArray.push(new Objet(
		getRandom(0,cnv.width-LARG_PLATFORM),
		cnv.height-80,
		LARG_PLATFORM,
		HAUT_PLATFORM,
		0,
		mapSpritesheet.get('platform_base')[0],
		0));

	/* Genere 10 plateforme pour le debut de la partie */
	for (let i = 0; i < nbPlatformStart; i++){createNewPlatform(0);}
}


/***********************/
/*** --- MONSTRE --- ***/
/***********************/

/* Affiche tout les element du tableau des monstres */
const afficheMonster = () => {
	for (let monster of monsterArray) {
		monster.affiche();
	}
}

/* Gere les potentiel collision avec des monstres*/
const collisionMonster = (character) => {
	for (let monster of monsterArray) {
		/* Si je rentre en collision avec un monstre */
		if (monster.isInCollision(character)){return 1;}
	}
	return 0;
}

/* Met a jour l'affichage des platform (non hauteur) */
const updateAffichageMonster = (speed) => {
	let index;
	for (let monster of monsterArray){
		/* Si c'est un monstre mouvant */
		if (monster.type==1){
			monster.x += speed * monster.dir;
			/* Si le monstre sort de l'ecran : change la direction */
			if ((monster.x > cnv.width-monster.width && monster.dir === 1) || (monster.x < 0 && monster.dir === -1)) {
				monster.dir *= -1;
				if (monster.dir==-1) index=1;
				else index=0;
				monster.img = mapSpritesheet.get('monster'+monster.type)[index];
			}
		}

		else if (monster.type==2){
			// Ecrire le patern de deplacement du monster 2
		}
	}
}

/* Ajout au tableau des monstres un nouvel element en fonction du type en parametre */
const createNewMonster = (type) => {
	let dir=0;

	if (type==1 || type==2) {dir = direction[getRandom(1,50)%2];}

	let width = 50;
	let height = 50;

	let x = getRandom(0,cnv.width-width);
	let y = getRandom(0,150);

	let img;

	if (type==0){img = mapSpritesheet.get('hole')[0];}
	else {img = mapSpritesheet.get('monster'+type)[0];}

	monsterArray.push(new Objet(x,y,width,height,type,img,dir));	
}