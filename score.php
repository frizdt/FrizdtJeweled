<?php
session_start();
require_once "./back/php/database.php";
// echo "<pre>";
if (isset($_SESSION["user"])) {
    $database = new Database();
    $request = $database->myPrepare("SELECT ID FROM users WHERE Pseudo = ?", [$_SESSION["user"]]);
    $id = $request->fetch();
    // var_dump($id);
    $request = $database->myPrepare("SELECT ID FROM grille WHERE GrilleName = ? ", [$_POST["finalgrille"]]);
    $idGrille = $request->fetch();
    $request = $database->myPrepare("SELECT ID , Score FROM scores WHERE ID_Users = ? AND ID_Grille = ? ORDER BY Score ASC", [$id["ID"],intval($idGrille["ID"])]);
    $testScore = $request->fetchAll();
    // var_dump($testScore);
    // var_dump(count($testScore));
    
  
    if (count($testScore) >= 10) {
        // var_dump($testScore[0]["Score"]);
        $request = $database->myPrepare("DELETE FROM scores WHERE ID_Users = ? AND Score = ?", [$id["ID"], $testScore[0]["Score"]]);
    }
    if (isset($_POST['submit'])) {
        $score = htmlspecialchars($_POST['finalscore']);
        $database->myPrepare("INSERT INTO scores( Score , ID_Users , ID_Grille ) VALUES(?,?,?)", [$score, $id["ID"],$idGrille["ID"]]);
    }
}
// echo "</pre>";
header("Location: ./index.php");
exit();
