let mygame = new Jeu();
mygame.start(6, 3);

document.querySelectorAll(".restart").forEach((e) => {
	e.addEventListener("click", () => {
		document.querySelector(".popup").style.display = "none";
		let test = document.querySelectorAll('input[name="grille"]');
		let checked = 0;
		for (let i = 0; i < test.length; i++) {
			if (test[i].checked) {
				checked = test[i].value;
			}
		}
		mygame.start(checked);
	});
});
