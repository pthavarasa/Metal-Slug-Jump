
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

