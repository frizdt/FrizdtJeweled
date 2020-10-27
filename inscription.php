<?php 
    session_start();
    include "./back/php/database.php";
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
        <p>Création de votre compte.</p>
        <main>
            <div class="formulaire">
                <form action="./inscription.php" method="post">
                    <div><label for="pseudo">Votre pseudo: </label>
                        <input type="text" placeholder="Pseudo" name="pseudo">
                    </div>
                    <div><label for="mdp">Votre mot de passe: </label>
                        <input type="password" placeholder="Mot de passe" name="mdp">
                    </div>
                    <div><label for="mdpConfirme">Valider votre mot de passe: </label>
                        <input type="password" placeholder="Mot de passe" name="mdpConfirme">
                    </div>
                    <div><label for="email">Votre email: </label>
                        <input type="mail" placeholder="Votre email" name="email">
                    </div>
                    <div><label for="emailConfirme">Valider votre email: </label>
                        <input type="mail" placeholder="Votre email" name="emailConfirme">
                    </div>
                    <button type="submit" name="submit">Créer mon compte</button>
                </form>


            </div>
        </main>

        <?php     
        $database = new Database();
        if(isset($_POST['submit'])){ 
            $pseudo = htmlspecialchars($_POST['pseudo']);
            $mdp = htmlspecialchars($_POST['mdp']);
            $email = htmlspecialchars($_POST['email']);
            $types = 1;
            $option = ['const' => 17];
            $mdpConfirme = $_POST['mdpConfirme'];
            $emailConfirme = $_POST['emailConfirme'];        

            if(!empty($pseudo)&&!empty($mdp)&&!empty($email)&&!empty($mdpConfirme)&&!empty($emailConfirme)){
                if(strlen($pseudo)<= 17){
                    if(filter_var($email, FILTER_VALIDATE_EMAIL) && $email == $emailConfirme){
                        if($mdp == $mdpConfirme){                     
                            $mdp = password_hash($mdp , PASSWORD_BCRYPT,$option);                            
                            $pdo = Database::connect();                      
                            $rowEmail = $database->countDatabaseValue($pdo , 'Email' , $email);
                            if($rowEmail == 0 ){
                                $rowEmail = $database->countDatabaseValue($pdo , 'Pseudo' , $pseudo);
                                if($rowEmail == 0 ){
                                    $insertUser = $database->prepare("INSERT INTO users( Pseudo, PWD, Email, Accreditation) VALUES(?,?,?)" );
                                }
                            }
                        }
                    }
                }
            }
        }
        ?>
    </body>

</html>
