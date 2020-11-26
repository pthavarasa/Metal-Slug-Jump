/* 
 *             -- TYPE DE PLATFORME -- 
 *
 * 0) VERT : REBOND NORMAL
 *
 * 1) BLEU : REBOND NORMAL + DEPLACEMENT HORIZONZAL
 *
 * 2) AUTRE_BLEU : ????
 *
 * 3) BLANC : ????
 *
 * 4) MARRON : PAS DE REBOND + SE CASSE A LA COLLISION
 *
 * 5) YELLOW : REBOND NORMAL + AFFAIBLISSEMENT A CHAQUE INTERACTION
 *
 */

/* Structure d'une platforme */
class Platform {
	constructor (x, y, width, height, type, img, dir, state) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.type = type;
		this.img = img;
		this.dir = dir;
		this.state = state;
	};

	/* Affiche la platforme courante dans le canvas */
	affiche = () => {
		try {
			ctx.drawImage(this.img, this.x, this.y);
		}
		catch (err) {
			play = false;
		}
	};

	/* Renvoi 1 si l'obj est dans l'intervalle de la largeur de la platform */
	isInInterval_X = (obj_x_min, obj_x_max) => {
		let obj_x = [obj_x_min, obj_x_max];
		for (let i = 0; i < 2; i++) {
			if (obj_x[i] >= this.x && obj_x[i] <= this.x+this.width){
				return 1;
			}
		}
		return 0;
	};

	/* Renvoi 1 si l'obj est dans l'intervalle de la hauteur de la platform */
	isInInterval_Y = (obj_y) => {
		if (obj_y >= this.y && obj_y <= this.y+this.height){
			return 1;
		}
		return 0;
	};

	/* Renvoi 1 si il y a une collision avec l'obj */
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

/* Affiche toute les platforme */
const affichePlatform = () => { 
	for (let platform of platformArray) {
		platform.affiche();
	}
}

/* Gere les potentiel collision */
const collision = (character) => {
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

/* Met a jour les positions des platform */
const updatePosHighPlatform = (speed) => {
	/* Change la hauteur des platforme */
	for (let platform of platformArray) {
		platform.y += speed;
	}
	/* Supprime les platforme qui depasse du canvas */
	for (let i = 0; i < platformArray.length; i++){
		if (platformArray[i].y >= cnv.height) {
			platformArray.splice(i,1);
		}
	}
}

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
	const direction = [-1,1];

	let dir=0;

	if (type==1 || type==2){dir = direction[getRandom(1,50)%2];}

	let img;

	if (type==4){img = mapSpritesheet.get('platform_break')[0];}
	else if (type==5){img = mapSpritesheet.get('platform_weak')[0];}
	else {img = mapSpritesheet.get('platform_base')[type];}
	

	let larg = LARG_PLATFORM; 
	let haut = HAUT_PLATFORM;

	// 240

	let max;

	let min;

	let x = getRandom(0,cnv.width-larg);

	let y;

	if (type==4){
		/* Si c'est une platform cassable : change les distance d'apparition */
		y = platformArray[platformArray.length-1].y - getRandom(10,30);
	}
	else {
		if (platformArray[platformArray.length-1].type==4){

		}
		y = platformArray[platformArray.length-1].y - getRandom(50,150);
	}

	platformArray.push(new Platform(x,y,larg,haut,type,img,dir,0));
}

/* Genere les premiere platforme du jeu */
const genStartMap = () => {
	const nbPlatformStart = 9;

	/* Platform de depart pour poser toutes les autre */
	platformArray.push(new Platform(
		getRandom(0,cnv.width-LARG_PLATFORM),
		cnv.height-80,
		LARG_PLATFORM,
		HAUT_PLATFORM,
		0,
		mapSpritesheet.get('platform_base')[0],
		0,
		0));

	/* Genere 10 plateforme pour le debut de la partie */
	for (let i = 0; i < nbPlatformStart; i++){createNewPlatform(0);}
	setInterval(update,30);
}