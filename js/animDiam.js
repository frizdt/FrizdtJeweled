class Jeu {
	constructor(theGrille) {
		this.aColor = ["rouge", "vert", "bleu", "jaune", "violet"];
		this.diam1 = null;
		this.diam2 = null;
		this.diamObj;
		this.grille = theGrille;
		document.querySelectorAll(".zoneJeu").forEach((e) => {
			e.addEventListener("click", (event) => {
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
						// e.removeEventListener("click", arguments.callee);
					} else {
						this.resetDiam();
					}
				}

				return;
			});
			let testKill = true;

			e.addEventListener("transitionend", () => {
				console.log("coucou");
				this.diamObj = this.trieLeft(this.diamObj);
				testKill = this.killKill();
				if (testKill) {
					this.downAnimation();
				}
			});
		});
		this.start(this.grille);
	}

	start(nb = 6) {
		let tabJeu = "";
		let test = true;

		while (test) {
			tabJeu = "";
			for (let i = 0; i < nb; i++) {
				for (let x = 0; x < nb; x++) {
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
			this.sleep(500).then(() => {
				this.animeDiamSelect();
			});
		}
		this.sleep(500).then(() => {
			this.resetDiam();
		});
		return;
	}
	trieLeft(diamObjLeft) {
		let wtfBro = [];
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
				wtfBro.push(test[y]);
			}
		}
		return [...wtfBro];
	}

	trieTop(diamObjTop) {
		let wtfBro = [];
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
				wtfBro.push(test[y]);
			}
		}
		return [...wtfBro];
	}

	addKill(diamObjKill) {
		let test1;
		let test2;
		let test3;
		for (let i = 0; i < this.grille * this.grille; i++) {
			if (
				diamObjKill[i + 1] == undefined ||
				diamObjKill[i - 1] == undefined ||
				i % this.grille == 0 ||
				(i + 1) % this.grille == 0
			) {
			} else {
				test1 = diamObjKill[i].className;
				test2 = diamObjKill[i - 1].className;
				test3 = diamObjKill[i + 1].className;

				test1 = test1.split(" kill").join("");
				test1 = test1.split(" selected").join("");
				test2 = test2.split(" kill").join("");
				test2 = test2.split(" selected").join("");
				test3 = test3.split(" kill").join("");
				test3 = test3.split(" selected").join("");

				if (test1 == test2 && test1 == test3) {
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
			let compterKill = 0;
			for (let y = 0; y < this.grille; y++) {
				compterKill = 0;
				for (let x = 0; x < this.grille; x++) {
					if (this.diamObj[index].classList.contains("kill")) {
						compterKill++;
						document.querySelector(
							".zoneJeu"
						).innerHTML += `<div class = 'diam ${this.createDiamaColor()} compt${compterKill} newDiam'
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

	sleep(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}
}

new Jeu(6);
