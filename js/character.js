let animeId = 0;
const animeIdMax = 5; // nombre de l'image pour l'animation '0 inclus'
let animeCount = 0;
const animeDelay = 4; // delay entre chaque changement d'animation depend de nombre itération de fonction
const characterZoom = 10;
let lookDirection = "right";

class Character {
	constructor (x, y, width, height, img) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.img = img;
		this.speed = 0;
		this.state = 0;
	}

	/* Definis la vitesse de deplacement de l'obj courant */
	setSpeed = (speed) => {
		this.speed = speed;
	};

	/* Affiche l'obj courant */
	affiche = () => {
		if (etatCle[37] || etatCle[65]) lookDirection = "left";
		if (etatCle[39] || etatCle[68]) lookDirection = "right";
		this.width = mapSpritesheet.get("character_jump_bottom_"+lookDirection)[animeId].width + characterZoom;
		this.height= mapSpritesheet.get("character_jump_bottom_"+lookDirection)[animeId].height + characterZoom;
		ctx.drawImage(mapSpritesheet.get("character_jump_bottom_"+lookDirection)[animeId], this.x, this.y, this.width, this.height);
		ctx.drawImage(mapSpritesheet.get("character_jump_top_"+lookDirection)[animeId], this.x-4, this.y-this.height, this.width+4, this.height+4);
	};

	/* Definis la position de l'obj courant */
	setPos = (nx, ny) => {
		this.x = nx;
		this.y = ny;
	};

	/* Si le personnage sort de l'écran par la droite, il revient par la gauche [vice versa] */
	managePos = () => {
		if (this.x < -this.width/2) this.setPos(cnv.width-this.width,this.y);
		if (this.x >= cnv.width) this.setPos(0, this.y);
	};

	/* Gere les changement de position pendant */
	setPosFall = () => {
		let dir = this.speed >= 0 ? -1 : 1;
		for (let i = this.speed; i != 0; i+=APESANTEUR*dir) {
			this.setPos(this.x , this.y + APESANTEUR*dir);
			if (this.speed <= 0){
				if (collisionPlatform(this)){
					animeId = 0;
					break;
				}
			}
		}
		if(animeCount == animeDelay) animeCount=0;
		if(!(animeCount%animeDelay)){
			animeId++;
			if(animeId > animeIdMax) animeId = animeIdMax;
		}
		this.setPos(this.x + mouvement, this.y);
		animeCount +=1;
	};

	/* Gere l'animation et l'affichage de l'obj */
	jump = () => {
		this.setPosFall();
		this.managePos();
		mouvement = 0;
		if (this.speed != MAX_SPEED*-1) {
			/* Limite la vitesse de la chute au negatif de la vitesse de chute maximal */
			this.speed -= APESANTEUR; 
		}
		this.affiche();
	};
}
