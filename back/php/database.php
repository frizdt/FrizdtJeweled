<?php class Database
{
    private static $dbName = 'frizdtjeweled';
    private static $dbHost = 'localhost';
    private static $dbUsername = 'root';
    private static $dbUserPassword = '';
    private static $cont = null;
    public function __construct()
    {
    }
    public function connect()
    {
        if (null == self::$cont) {
            try {
                self::$cont = new PDO("mysql:host=" . self::$dbHost . ";" . "dbname=" . self::$dbName, self::$dbUsername, self::$dbUserPassword);
                self::$cont->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$cont->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                die($e->getMessage());
            }
        }
        return self::$cont;
    }
    public function disconnect()
    {
        self::$cont = null;
    }

    public function query($statement)
    {
        $request = $this->connect()->query($statement);
        $this->disconnect();
        return $request;
    }

    public function myPrepare($statement, $values)
    {
        $request = $this->connect()->prepare($statement);
        $request->execute($values);
        $this->disconnect();
        return $request;
    }
    function countDatabaseValue($connexionBDD, $key, $value)
    {
        $request = "SELECT * FROM users WHERE $key = ?";
        $rowCount = $connexionBDD->prepare($request);
        $rowCount->execute(array($value));
        return $rowCount->rowcount();
    }

    public function myLog($pseudo, $mdp)
    {
        $request = $this->connect()->prepare("SELECT * FROM users WHERE Pseudo = ?");
        $pseudoRequest = $request->execute([$pseudo]);
        $pseudofetch = $request->fetch();
        if ($pseudofetch && $pseudoRequest) {
            $request = $this->connect()->prepare("SELECT PWD FROM users WHERE Pseudo = ?");
            $request->execute([$pseudo]);

            $mdpfetch = $request->fetch();

            return password_verify($mdp, $mdpfetch["PWD"]);
        }
        return false;
    }
}