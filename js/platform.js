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
	constructor (x, y, width, height, type, src, img) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.type = type;
		this.src = src;
		this.img = img;
	}

	/* Affiche la platforme courante dans le canvas */
	affiche = () => {
		ctx.drawImage(this.img, this.x, this.y);
	};

	/* Renvoi si l'obj est dans l'intervalle de l'espace de la platform */
	IsInInterval = (obj_x_min, obj_x_max) => {
		let obj_x = [obj_x_min, obj_x_max];
		for (let i = 0; i < 2; i++) {
			if (obj_x[i] >= this.x && obj_x[i] <= this.x+this.width){
				return 1;
			}
		}
		return 0;
	};

	/* Renvoi 1 si il y a une collision avec l'obj */
	IsInCollision = (obj) => {
		/* On verifie la largeur */
		if ((obj.x >= this.x && obj.x <= this.x + this.width) || (obj.x + obj.width > this.x) && (obj.x + obj.width <= this.x + this.width)) {
		//if (IsInInterval(obj.x,obj.x+obj.width)) {

			/* On verifie la hauteur */ 
			if ((obj.y + obj.height >= this.y) && (obj.y + obj.height <= this.y + this.height)) {
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
		if (platformArray[i].IsInCollision(character) && character.speed < 0){
			/* Si c'est une platforme qui se brise */
			if (platformArray[i].type == 3) {
				/* Supprimer la platforme */
				platformArray.splice(i,1);
			}
			else {
				/* Definis le deplacement vers le haut */
				character.setSpeed(MAX_SPEED);
				//return 1;
			}
		}
	}
	//return 0;
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
	let larg = 100; 
	let haut = 21;

	let type = 1; 

	let x = getRandom(0,cnv.width-larg);
	let y = dy

	platformArray.push(new Platform(x,y,larg,haut,type,PLATFORM.src,PLATFORM));
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