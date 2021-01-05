<?php
session_start();
include "./back/php/database.php";

if (isset($_SESSION["user"])) {
    if ($_GET["deco"] == "true") {
        session_destroy();
        header("Location: ./login.php");
    }
    header("Location: ./index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/login.css">
    <link rel="shortcut icon" href="./img/Diamond.png" type="image/x-icon" />
    <title>Inscription</title>
</head>

<body>

    <h1>FrizdtJeweled</h1>
    <main>
        <div class="formulaire">
            <form action="./login.php" method="post">
                <div>
                    <label for="log"> Pseudo: </label>
                    <input type="text" name="log" id="log" />
                </div>
                <div>
                    <label for="mdp"> Mot de passe: </label>
                    <input type="password" name="mdp" id="mdp" />
                </div>
                <div> <a href="./inscription.php">Nouveau compte.</a><button type="submit" name="submit">login</button>
                </div>
                <!-- <input type="submit" name="submit">login</input> -->
            </form>

        </div>
    </main>
    <?php
    $database = new Database();
    if (isset($_POST['submit'])) {
        $username = htmlspecialchars($_POST['log']);
        $mdp = htmlspecialchars($_POST['mdp']);
        if ($database->myLog($username, $mdp)) {
            echo "helo";
            $_SESSION['user'] = $username;
            header("Location: ./index.php");
            exit();
        } else {
            echo "pseudo ou mot de passe incorrect";
        }
    }
    ?>
</body>

</html>