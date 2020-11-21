class Character {
	constructor (x, y, width, height, src) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = 0;
		this.src = src;
	}

	/* Definis la vitesse de deplacement de l'obj courant */
	setSpeed = (speed) => {
		this.speed = speed;
	};

	/* Affiche l'obj courant */
	affiche = () => {
		ctx.drawImage(this.src, this.x, this.y, this.width, this.height);
	};

	/* Definis la position de l'obj courant */
	setPos = (nx, ny) => {
		this.x = nx;
		this.y = ny;
	};

	/* Si trop a droite, passage a gauche / Si trop a gauche, passe a droite */
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
				if (collision(this)) break;
			}
		}
		this.setPos(this.x + mouvement, this.y);
	}

	/* Gere l'animation et l'affichage de l'obj */
	jump = () => {
		this.setPosFall(); // Faire augmenter de facon lineaire la vitesse pour une impression d'acceleration et de fluidité du personnage 
		this.managePos();
		mouvement = 0;
		if (this.speed != MAX_SPEED*-1) {
			/* Limite la vitesse de la chute au negatif de la vitesse de chute maximal */
			this.speed -= APESANTEUR; 
		}
		this.affiche();
	};
}