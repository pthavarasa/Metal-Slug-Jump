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
		ctx.drawImage(this.src, this.x, this.y);
	};

	setPos = (nx, ny) => {
		this.x = nx;
		this.y = ny;
	};

	jump = () => {
		//this.move( , this.y - this.speed);
		collision(this);
		this.speed -= APENSANTEUR;
		this.affiche();
	};

}