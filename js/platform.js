/* -- TYPE DE PLATFORME -- 
 *
 * 1) VERT : REBOND NORMAL
 *
 * 2) BLEU : REBOND NORMAL + DEPLACEMENT HORIZONZAL
 *
 * 3) MARRON : PAS DE REBOND + SE CASSE A LA COLLISION
 *
 */

/* Structure d'une platforme */
class Platform {
	constructor (x, y, width, height, type, img) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.type = type;
		this.img = img;
		this.src = img.src;
	}

	/* Affiche la platforme courante dans le canvas */
	affiche = () => {
		ctx.drawImage(this.img, this.x, this.y);
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
			if (platformArray[i].type == 3) {
				/* Supprimer la platforme */
				platformArray.splice(i,1);
			}
			else {
				/* Definis le deplacement vers le haut */
				character.setSpeed(MAX_SPEED);
				return 1;
			}
		}
	}
	return 0;
}

/* Met a jour les positions des platform */
const updatePosPlatform = (speed) => {
	/* Change la hauteur des platforme (+ largeur pour le type 2) */
	for (let platform of platformArray) {
		if (platform.type == 2) {
			platform.x += speed;
			if (platform.x >= cnv.width) platform.x = 0;
		}
		platform.y += speed;
	}
	/* Supprime les platforme qui depasse du canvas */
	for (let i = 0; i < platformArray.length; i++){
		if (platformArray[i].y >= cnv.height) {
			platformArray.splice(i,1);
		}
	}
}

/* Creation d'une nouvelle platform a la hauteur dx */
const createNewPlatform = (dy) => {
	let larg = LARG_PLATFORM; 
	let haut = HAUT_PLATFORM;

	let type = 1; 

	let x = getRandom(0,cnv.width-larg);
	let y = dy

	platformArray.push(new Platform(x,y,larg,haut,type,PLATFORM));
}

/* Genere les premiere platforme du jeu */
const genStartMap = () => {
	let y = 0;
	let nbPlatformStart = 10;

	/* Genere 10 plateforme pour le debut de la partie */
	for (let i = 0; i < nbPlatformStart; i++){
		createNewPlatform(y);
		y += cnv.height/nbPlatformStart;
	}
}