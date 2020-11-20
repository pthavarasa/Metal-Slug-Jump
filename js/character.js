class Character {
	constructor (x, y, width, height, src) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = 0;
		this.src = src;
	}

	setSpeed = (speed) => {
		this.speed = speed;
	};

	affiche = () => {
		ctx.drawImage(this.src, this.x, this.y, this.width, this.height);
	};

	setPos = (nx, ny) => {
		this.x = nx;
		this.y = ny;
	};

	managePos = () => {
		if (this.x < -this.width/2) this.setPos(cnv.width-this.width,this.y);
		if (this.x >= cnv.width) this.setPos(0, this.y);
	};

	setPosFall = () => {
		for (let i = 0; i < this.speed; i+=5) {
			this.setPos(this.x , this.y - i); // this.y = i : x.66666 !?
			//if (collision(this)) {console.log("collision"); break;}
		}
	}

	jump = () => {
		this.setPos(this.x + mouvement , this.y - this.speed); // Faire augmenter de facon lineaire la vitesse pour une impression d'acceleration et de fluidité du personnage 
		//this.setPosFall();
		this.managePos();
		mouvement = 0;
		if (this.speed != MAX_SPEED*-1) {
			/* Limite la vitesse de la chute au negatif de la vitesse de chute maximal */
			this.speed -= APENSANTEUR; 
		}
		collision(this);
		this.affiche();
	};
}