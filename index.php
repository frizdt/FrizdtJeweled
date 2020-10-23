<!DOCTYPE html>
<html lang="fr">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="./css/style.css?t=<?php echo time(); ?>" />

        <link rel="shortcut icon" href="./img/Diamond.png" type="image/x-icon" />
        <title>Frizdtjeweled</title>
    </head>

    <body>
        <header>
            <h1>FrizdtJeweled</h1>
        </header>
        <main>
            <div><span class="clicblock"></span>
                <span class="popup">
                    <p></p>
                    <button class="restart">Recommencer</button>
                    <button class="save">Save Score</button>
                </span>
                <div class="zoneJeu"></div>
            </div>

            <div class="side">
                <div class="compte">
                    <div class="deco">
                        <p>Pseudo: <input type="text" name="log" id="log" /></p>
                        <p>Mot de passe: <input type="password" name="mdp" id="mdp" /></p>
                        <a href="./inscription.php" target="_blank">Nouveau compte.</a>
                    </div>
                    <div class="co">
                        <p>Bienvenu a toi jeune <span></span></p>
                    </div>
                </div>
                <div class="espaceComun">
                    <div class="nb-coup">Nombre de coup restant: <span></span></div>
                    <div class="scores">
                        <div class="local">Votre Score Local: <span></span></div>
                        <div class="mondiale">Votre Score Mondial: <span></span></div>
                        <div class="select"></div>
                    </div>
                    <div class="optJeu">
                        <button class="restart">Recommencer</button>
                        <div class="grille">
                            <p>
                                <label for="6x6">6x6 </label><input type="radio" name="grille" id="6x6" value="6"
                                    checked />
                            </p>
                            <p>
                                <label for="8x8">8x8 </label><input type="radio" name="grille" id="8x8" value="8" />
                            </p>
                        </div>
                        <p>aide</p>
                    </div>
                    <div class="optGlobal">

                    </div>
                </div>
            </div>
            <script src="./js/animDiam.js"></script>
            <script src="./js/script.js"></script>
        </main>
    </body>

</html>
