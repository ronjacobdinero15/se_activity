<?php  

require_once 'dbConfig.php';

function getAllUsers($pdo) {
	$sql = "SELECT * FROM user_passwords";
	$stmt = $pdo->prepare($sql);
	$executeQuery = $stmt->execute();

	if ($executeQuery) {
		return $stmt->fetchAll();
	}
}

function getUserByID($pdo, $user_id) {
	$sql = "SELECT * FROM user_passwords WHERE user_id = ?";
	$stmt = $pdo->prepare($sql);
	$executeQuery = $stmt->execute([$user_id]);
	if ($executeQuery) {
		return $stmt->fetch();
	}
}


function insertNewUser($pdo, $username, $password) {

    $checkUserSql = "SELECT * FROM user_passwords WHERE username = ?";
    $checkUserSqlStmt = $pdo->prepare($checkUserSql);
    $checkUserSqlStmt->execute([$username]);

    if ($checkUserSqlStmt->rowCount() == 0) {

        $sql = "INSERT INTO user_passwords (username,password) VALUES(?,?)";
        $stmt = $pdo->prepare($sql);
        $executeQuery = $stmt->execute([$username, $password]);

        if ($executeQuery) {
            $_SESSION['message'] = "User successfully inserted";
            return true;
        }
        else {
            $_SESSION['message'] = "An error occured from the query";
        }
    }
    else {
        $_SESSION['message'] = "User already exists";
    }
}

function loginUser($pdo, $username, $password) {
	$sql = "SELECT * FROM user_passwords WHERE username=?";
	$stmt = $pdo->prepare($sql);
	$stmt->execute([$username]); 

	if ($stmt->rowCount() == 1) {
		$userInfoRow = $stmt->fetch();
		$usernameFromDB = $userInfoRow['username']; 
		$passwordFromDB = $userInfoRow['password'];

		if ($password == $passwordFromDB) {
			$_SESSION['username'] = $usernameFromDB;
            return [
                "success" => true, 
                "message" => "Login successful!", 
                "username" => $usernameFromDB];
		}
		else {
            return [
                "success" => false, 
                "message" => "Password is invalid, but user exists"];
		}
	}

	
	if ($stmt->rowCount() == 0) {
        return [
            "success" => false, 
            "message" => "Username doesn't exist. Consider registering first."];
    }
}

function insertShelf($pdo, $shelf_name) {
    $sql = "INSERT INTO shelves (shelf_name) VALUES (?)";
    $stmt = $pdo->prepare($sql);
    $executeQuery = $stmt->execute([$shelf_name]);

    if ($executeQuery) {
        return true;
    }
}

function insertItem($pdo, $item_name, $price, $shelf_id) {
    $sql = "INSERT INTO items (item_name, price, shelf_id) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $executeQuery = $stmt->execute([$item_name, $price, $shelf_id]);

    if ($executeQuery) {
        return true;
    }
}

function fetchShelf($pdo, $shelf_id) {
    $sql = "SELECT * FROM shelves WHERE shelf_id = ?";
    $stmt = $pdo->prepare($sql);
    $executeQuery = $stmt->execute([$shelf_id]);
        
    if ($executeQuery) {
        return $stmt->fetch();
    }
}

function fetchItem($pdo, $item_id) {
    $sql = "SELECT * FROM items WHERE item_id = ?";
    $stmt = $pdo->prepare($sql);
    $executeQuery = $stmt->execute([$item_id]);

    if ($executeQuery) {
        return $stmt->fetch();
    }
}

function fetchAllShelves($pdo) {
    $sql = "SELECT * FROM shelves ORDER BY shelf_id DESC";
    $stmt = $pdo->prepare($sql);
    $executeQuery = $stmt->execute();

    if ($executeQuery) {
        return $stmt->fetchAll();
    }

}

function fetchItemsByShelf($pdo, $shelf_id) {
    $sql = "SELECT * FROM items WHERE shelf_id = ?";
    $stmt = $pdo->prepare($sql);
    $executeQuery = $stmt->execute([$shelf_id]);
    
    if ($executeQuery) {
        return $stmt->fetchAll();
    }
}

function updateShelf($pdo, $shelf_id, $shelf_name) {
    $sql = "UPDATE shelves SET shelf_name = ? WHERE shelf_id = ?";
    $stmt = $pdo->prepare($sql);
    $executeQuery = $stmt->execute([$shelf_name, $shelf_id]);

    if ($executeQuery) {
    return true;
    }
}

function updateItem($pdo, $item_id, $item_name, $price) {
    $sql = "UPDATE items SET item_name = ?, price = ? WHERE item_id = ?";
    $stmt = $pdo->prepare($sql);
    $executeQuery = $stmt->execute([$item_name, $price, $item_id]);

    if ($executeQuery) {
    return true;
    }
}

function deleteShelf($pdo, $shelf_id) {
    $sql = "DELETE FROM shelves WHERE shelf_id = ?";
    $stmt = $pdo->prepare($sql);
    $executeQuery = $stmt->execute([$shelf_id]);

    if ($executeQuery) {
        return true;
    }
}

function deleteItem($pdo, $item_id) {
    $sql = "DELETE FROM items WHERE item_id = ?";
    $stmt = $pdo->prepare($sql);
    $executeQuery = $stmt->execute([$item_id]);

    if ($executeQuery) {
    return true;
    }
}