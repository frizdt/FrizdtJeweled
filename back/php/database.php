<?php class Database{
        private static $dbName = 'yourDBName';
        private static $dbHost = 'your host';
        private static $dbUsername = 'your login phpmyadmin or other';
        private static $dbUserPassword = 'your pass word';
        private static $cont = null;
        public function __construct()
        {
            
        }
        public static function connect()
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
        public static function disconnect()
        {
            self::$cont = null;
        }
        
        public function query($statement){
            $request = $this->connect()->query($statement);
        $this->disconnect();
        return $request;
        }

        public function prepare($statement, $values){
            $request = $this->connect()->prepare($statement);
            $request->execute($values);
            $this->disconnect();
            return $request;
        }
        function countDatabaseValue($connexionBDD, $key, $value){
            $request = "SELECT * FROM users WHERE $key = ?";
            $rowCount = $connexionBDD->prepare($request);
            $rowCount->execute(array($value));
            return $rowCount->rowcount();
        }
     
    }  
?>
