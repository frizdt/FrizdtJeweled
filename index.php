<?php
session_start();
require_once "./back/php/database.php";
if (!isset($_SESSION["user"])) {
    header("Location: login.php");
    exit();
}
$database = new Database();
$request = $database->myPrepare("SELECT ID FROM users WHERE Pseudo = ?", [$_SESSION["user"]]);
$id = $request->fetch();
$request = $database->myPrepare("SELECT Score FROM scores WHERE ID_Users = ? ORDER BY Score DESC", [$id["ID"]]);
$score = $request->fetchAll();
?>

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
            <div class="popup">
                <div>Votre score est de </div>
                <form action="./score.php" method="post">
                    <input class="finalscore" name="finalscore" readonly></input>
                    <input class="finalgrille" name="finalgrille" readonly hidden></input>
                    <button class="save" type="submit" name="submit">Save Score</button>
                </form>

                <button class="restart">Recommencer</button>

            </div>
            <div class="zoneJeu"></div>
        </div>

        <div class="side">
            <div class="compte">
                <p>Bienvenu a toi jeune <span><?php echo $_SESSION["user"]; ?></span></p>
                <a href="./login.php?deco=true">Déconnexion</a>
            </div>
            <div class="espaceComun">
                <div class="nb-coup">Nombre de coup restant: <span></span></div>
                <div class="scores">
                    <div class="local">Votre Score: <span></span>
                        <div class="clasLocal">
                            Scores Local:
                            <?php
                            foreach ($score as &$value) {
                                echo "<p>" . $value["Score"] . "</p>";
                            }

                            ?>
                        </div>
                    </div>
                    <div class="mondiale">Top 10 Score Mondial: <span></span></div>
                    <div class="select"></div>
                </div>
                <div class="optJeu">
                    <button class="restart">Recommencer</button>
                    <fieldset class="grille">
                        <legend>Selecttionne la taille de la grille</legend>
                        <p>
                            <label for="6x6">6x6 </label><input type="radio" name="grille" id="6x6" value="6" checked />
                        </p>
                        <p>
                            <label for="8x8">8x8 </label><input type="radio" name="grille" id="8x8" value="8" />
                        </p>
                    </fieldset>
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