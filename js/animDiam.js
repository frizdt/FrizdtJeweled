class Jeu {
	constructor(theGrille = 6, coup = 50) {
		this.aColor = ["rouge", "vert", "bleu", "jaune", "violet"];
		this.diam1 = null;
		this.diam2 = null;
		this.diamObj;
		this.grille = theGrille;
		this.score = 0;
		this.combo = 0;
		this.nbCoup = coup;

		document.querySelectorAll(".zoneJeu").forEach((e) => {
			e.addEventListener("click", (event) => {
				this.combo = 0;
				if (
					this.selectDiam(event) &&
					(this.diam1 === null || this.diam2 === null)
				) {
					if (this.diam1 === null) {
						this.diam1 = event.target;
						this.diam1.classList.add("selected");
					} else if (this.diam2 === null) {
						this.diam2 = event.target;
					}
				} else if (this.selectDiam(event) == false) {
					this.resetDiam();
				}
				if (this.diam1 !== null && this.diam2 !== null) {
					if (this.animeDiamSelect()) {
						this.aligner();
					} else {
						this.resetDiam();
					}
				}

				return;
			});
			let testKill = true;
			e.addEventListener("transitionstart", () => {
				document.querySelector(".clicblock").style.display = "flex";
				document.querySelector(".clicblock").style.width =
					this.grille * 100 + "px";
				document.querySelector(".clicblock").style.height =
					this.grille * 100 + "px";
					this.sleep(50).then( () => {
						document.querySelector(".clicblock").style.display = "flex";
						document.querySelector(".clicblock").style.width =
							this.grille * 100 + "px";
						document.querySelector(".clicblock").style.height =
							this.grille * 100 + "px";
					}) ;
			});
			e.addEventListener("transitionend", () => {
				let calcScore = document.querySelectorAll(".kill").length;
				this.diamObj = this.trieLeft(this.diamObj);
				testKill = this.killKill();

				if (testKill) {
					this.combo++;
					if (this.combo == 1) {
						this.nbCoup--;
						document.querySelector(".nb-coup span").innerHTML = this.nbCoup;
					}
					this.score += this.scoring(calcScore);
					document.querySelector(".scores .local span").innerHTML = this.score;
					this.downAnimation();
				} else if (this.nbCoup == 0) {
					document.querySelector(".popup").style.display = "flex";
					document.querySelector(".popup").style.width =
						this.grille * 100 + "px";
					document.querySelector(".popup").style.height =
						this.grille * 100 + "px";
					document.querySelector(
						".finalscore"
					).value = `${this.score} `;
					document.querySelector(
						".finalgrille"
					).value = `${this.grille} `;
				}
				this.sleep(50).then( () => {
					document.querySelector(".clicblock").style.display = "none";
				});
			});
		});
	}

	start(nbGrille = 6, coup = 50) {
		let tabJeu = "";
		let test = true;
		this.score = 0;
		document.querySelector(".clicblock").style.display = "none";
		document.querySelector(".scores .local span").innerHTML = 0;
		this.grille = nbGrille;
		this.nbCoup = coup;
		document.querySelector(".nb-coup span").innerHTML = this.nbCoup;
		document.querySelector(".zoneJeu").style.width = nbGrille * 100 + "px";
		document.querySelector(".zoneJeu").style.height = nbGrille * 100 + "px";
		while (test) {
			tabJeu = "";
			for (let i = 0; i < nbGrille; i++) {
				for (let x = 0; x < nbGrille; x++) {
					tabJeu += `<div class = 'diam ${this.createDiamaColor()}' style='left: ${
						i * 100 + 20
					}px; top: ${x * 100 + 20}px'></div>`;
				}
			}
			document.querySelector(".zoneJeu").innerHTML = tabJeu;
			this.aligner();
			if (document.querySelector(".kill") == null) test = false;
		}
		return;
	}
	resetDiam() {
		if (this.diam1 != null) this.diam1.classList.remove("selected");
		this.diam1 = null;
		this.diam2 = null;
	}
	createDiamaColor() {
		let newDiam = this.aColor[Math.floor(Math.random() * this.aColor.length)];
		return newDiam;
	}

	selectDiam(isIt) {
		let verif = false;
		verif = isIt.target.classList.contains("diam");
		return verif;
	}

	animeDiamSelect() {
		if (this.diam1 == null) return;
		if (
			this.diam1.style.left == this.diam2.style.left &&
			(parseInt(this.diam1.style.top) == parseInt(this.diam2.style.top) + 100 ||
				parseInt(this.diam1.style.top) == parseInt(this.diam2.style.top) - 100)
		) {
			let top1 = this.diam1.style.top;
			let top2 = this.diam2.style.top;

			this.diam1.style.top = top2;
			this.diam2.style.top = top1;
			return true;
		} else if (
			this.diam1.offsetTop == this.diam2.offsetTop &&
			(parseInt(this.diam1.style.left) ==
				parseInt(this.diam2.style.left) + 100 ||
				parseInt(this.diam1.style.left) ==
					parseInt(this.diam2.style.left) - 100)
		) {
			let left1 = this.diam1.style.left;
			let left2 = this.diam2.style.left;

			this.diam1.style.left = left2;
			this.diam2.style.left = left1;
			return true;
		}
		return false;
	}

	aligner() {
		let diam = document.querySelectorAll(".diam");
		this.diamObj = [...diam];
		let diamObj2 = [...diam];

		this.diamObj = this.trieLeft([...this.diamObj]);
		diamObj2 = this.trieTop([...diamObj2]);
		this.addKill([...this.diamObj]);
		this.addKill([...diamObj2]);
		if (document.querySelector(".kill") == null) {
			this.sleep(50).then(() => {
				this.animeDiamSelect();
			});
		}
		this.sleep(50).then(() => {
			this.resetDiam();
		});
		return;
	}
	trieLeft(diamObjLeft) {
		let tableTrie = [];
		let test = [];
		diamObjLeft.sort(function (a, b) {
			if (parseInt(a.style.left) < parseInt(b.style.left)) {
				return -1;
			}
			if (parseInt(b.style.left) > parseInt(a.style.left)) {
				return 1;
			}
			return 0;
		});

		for (let i = 0; i < this.grille; i++) {
			test = diamObjLeft.slice(i * this.grille, (i + 1) * this.grille);

			test.sort(function (a, b) {
				if (parseInt(a.style.top) < parseInt(b.style.top)) {
					return -1;
				}
				if (parseInt(b.style.top) > parseInt(a.style.top)) {
					return 1;
				}
				return 0;
			});

			for (let y = 0; y < this.grille; y++) {
				tableTrie.push(test[y]);
			}
		}
		return [...tableTrie];
	}

	trieTop(diamObjTop) {
		let tableTrie = [];
		let test = [];
		diamObjTop.sort(function (a, b) {
			if (parseInt(a.style.top) < parseInt(b.style.top)) {
				return -1;
			}
			if (parseInt(b.style.top) > parseInt(a.style.top)) {
				return 1;
			}
			return 0;
		});

		for (let i = 0; i < this.grille; i++) {
			test = diamObjTop.slice(i * this.grille, (i + 1) * this.grille);

			test.sort(function (a, b) {
				if (parseInt(a.style.left) < parseInt(b.style.left)) {
					return -1;
				}
				if (parseInt(b.style.left) > parseInt(a.style.left)) {
					return 1;
				}
				return 0;
			});

			for (let y = 0; y < this.grille; y++) {
				tableTrie.push(test[y]);
			}
		}
		return [...tableTrie];
	}

	addKill(diamObjKill) {
		let testDiam1;
		let testDiam2;
		let testDiam3;
		for (let i = 0; i < this.grille * this.grille; i++) {
			if (
				diamObjKill[i + 1] == undefined ||
				diamObjKill[i - 1] == undefined ||
				i % this.grille == 0 ||
				(i + 1) % this.grille == 0
			) {
			} else {
				testDiam1 = diamObjKill[i].className;
				testDiam2 = diamObjKill[i - 1].className;
				testDiam3 = diamObjKill[i + 1].className;

				testDiam1 = testDiam1.split(" kill").join("");
				testDiam1 = testDiam1.split(" selected").join("");
				testDiam2 = testDiam2.split(" kill").join("");
				testDiam2 = testDiam2.split(" selected").join("");
				testDiam3 = testDiam3.split(" kill").join("");
				testDiam3 = testDiam3.split(" selected").join("");

				if (testDiam1 == testDiam2 && testDiam1 == testDiam3) {
					diamObjKill[i - 1].className += " kill";
					diamObjKill[i].className += " kill";
					diamObjKill[i + 1].className += " kill";
				}
			}
		}
	}

	killKill() {
		let haveKill = false;
		document.querySelectorAll(".kill").forEach((e) => {
			e.remove();
			haveKill = true;
		});
		return haveKill;
	}

	downAnimation() {
		let index = 0;

		for (let y = 0; y < this.grille; y++) {
			for (let x = 0; x < this.grille; x++) {
				if (this.diamObj[index].classList.contains("kill")) {
					for (let z = 0; z <= x; z++) {
						this.diamObj[index - z].style.top =
							parseInt(this.diamObj[index - z].style.top) + 100 + "px";
					}
				}
				index++;
			}
		}
		index = 0;
		this.sleep(500).then(() => {
			let compter = 0;
			for (let y = 0; y < this.grille; y++) {
				compter = 0;
				for (let x = 0; x < this.grille; x++) {
					if (this.diamObj[index].classList.contains("kill")) {
						compter++;
						document.querySelector(
							".zoneJeu"
						).innerHTML += `<div class = 'diam ${this.createDiamaColor()} compt${compter} newDiam'
					style='left: ${y * 100 + 20}px; top: ${-50}px'></div>`;
					}
					index++;
				}
			}

			this.sleep(50).then(() => {
				document.querySelectorAll(".newDiam").forEach((e) => {
					if (e.classList.contains("compt1")) {
						e.style.top = "20px";
						e.classList.remove("compt1");
					} else if (e.classList.contains("compt2")) {
						e.style.top = "120px";
						e.classList.remove("compt2");
					} else if (e.classList.contains("compt3")) {
						e.style.top = "220px";
						e.classList.remove("compt3");
					} else if (e.classList.contains("compt4")) {
						e.style.top = "320px";
						e.classList.remove("compt4");
					} else if (e.classList.contains("compt5")) {
						e.style.top = "420px";
						e.classList.remove("compt5");
					} else if (e.classList.contains("compt6")) {
						e.style.top = "520px";
						e.classList.remove("compt6");
					}
					e.classList.remove("newDiam");
				});
			});
			this.sleep(500).then(() => {
				this.aligner();
			});
		});
	}

	scoring(calcScore) {
		switch (calcScore) {
			case 3:
				calcScore = 75;
				break;
			case 4:
				calcScore = 150;
				break;
			case 5:
				calcScore = 300;
				break;
			case 6:
				calcScore = 600;
				break;
			case 7:
				calcScore = 1200;
				break;
			case 8:
				calcScore = 2400;
				break;
			case 9:
				calcScore = 4800;
				break;
			default:
				if (calcScore >= 10) {
					calcScore = 10000;
				}
				break;
		}
		calcScore = calcScore * this.combo;
		return calcScore;
	}

	get getScore() {
		return this.score;
	}

	sleep(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}
}
