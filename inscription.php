<?php
session_start();
require_once "./back/php/database.php";

if (isset($_SESSION["user"])) {
    header("Location: ./index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/inscription.css">
    <link rel="shortcut icon" href="./img/Diamond.png" type="image/x-icon" />
    <title>Inscription</title>
</head>

<body>


    <h1>FrizdtJeweled</h1>

    <main>
        <div class="formulaire">

            <form action="./inscription.php" method="post">
                <h2>Création de votre compte.</h2>
                <div>
                    <label for="pseudo">Votre pseudo: </label>
                    <input type="text" name="pseudo" placeholder="Pseudo" id="pseudo">
                </div>
                <div>
                    <label for="mdp">Votre mot de passe: </label>
                    <input type="password" placeholder="Mot de passe" name="mdp" id="mdp">
                </div>
                <div>
                    <label for="mdpConfirme">Valider votre mot de passe: </label>
                    <input type="password" placeholder="Mot de passe" name="mdpConfirme" id="mdpConfirme">
                </div>
                <div>
                    <label for="email">Votre email: </label>
                    <input type="mail" placeholder="Votre email" name="email" id="email">
                </div>
                <div>
                    <label for="emailConfirme">Valider votre email: </label>
                    <input type="mail" placeholder="Votre email" name="emailConfirme" id="emailConfirme">
                </div>
                <div>
                    <button name="conect">Se connecter</button>
                    <button type="submit" name="submit">Créer mon compte</button>
                </div>
            </form>
        </div>
    </main>

    <?php
    if (isset($_POST["conect"])) {
        header("Location: ./login.php");
        exit();
    }
    $database = new Database();
    if (isset($_POST['submit'])) {
        $pseudo = htmlspecialchars($_POST['pseudo']);
        $mdp = htmlspecialchars($_POST['mdp']);
        $email = htmlspecialchars($_POST['email']);
        $types = 1;
        $option = ['const' => 17];
        $mdpConfirme = $_POST['mdpConfirme'];
        $emailConfirme = $_POST['emailConfirme'];

        if (!empty($pseudo) && !empty($mdp) && !empty($email) && !empty($mdpConfirme) && !empty($emailConfirme)) {
            if (strlen($pseudo) <= 17) {
                if (filter_var($email, FILTER_VALIDATE_EMAIL) && $email == $emailConfirme) {
                    if ($mdp == $mdpConfirme) {
                        $mdp = password_hash($mdp, PASSWORD_BCRYPT, $option);
                        $pdo = $database->connect();
                        $rowEmail = $database->countDatabaseValue($pdo, 'Email', $email);
                        if ($rowEmail == 0) {
                            $rowEmail = $database->countDatabaseValue($pdo, 'Pseudo', $pseudo);
                            if ($rowEmail == 0) {
                                $insertUser = $database->myPrepare("INSERT INTO users( Pseudo, PWD, Email, Accreditation) VALUES(?,?,?,?)", [$pseudo, $mdp, $email, 1]);
                                header("Location: ./login.php");
                                exit();
                            }
                        }
                    } else echo "mdp";
                } else echo "email";
            } else echo "trop long";
        } else echo "remplir tous les champ";
    }
    ?>
</body>

</html>