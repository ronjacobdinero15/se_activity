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
        return $stmt->fetch(PDO::FETCH_ASSOC);
	}
}

function getCurrentUser() { 
    return [
        "username" => $_SESSION['username'] ?? null
    ];
}


function insertNewUser($pdo, $username, $password, $email, $first_name, $last_name, $address, $age) {

    $checkUserSql = "SELECT * FROM user_passwords WHERE username = ?";
    $checkUserSqlStmt = $pdo->prepare($checkUserSql);
    $checkUserSqlStmt->execute([$username]);

    if ($checkUserSqlStmt->rowCount() == 0) {
        $sql = "INSERT INTO user_passwords (username,password,email,first_name,last_name,address,age) VALUES(?,?,?,?,?,?,?)";
        $stmt = $pdo->prepare($sql);
        $executeQuery = $stmt->execute([$username, $password, $email, $first_name, $last_name, $address, $age]);

        if ($executeQuery) {
            return [
                "success" => true, 
                "message" => "User successfully registered!" 
            ];
        }
        else {
            return [
                "success" => false, 
                "message" => "An error occured from the query" 
            ];
        }
    }
    else {
        return [
            "success" => false, 
            "message" => "User already exists" 
        ];
    }
}

function loginUser($pdo, $username, $password) {
	$sql = "SELECT * FROM user_passwords WHERE username = ?";
	$stmt = $pdo->prepare($sql);
	$stmt->execute([$username]); 

	if ($stmt->rowCount() == 1) {
		$userInfoRow = $stmt->fetch();
		$userIDFromDB = $userInfoRow['user_id']; 
		$usernameFromDB = $userInfoRow['username']; 
		$passwordFromDB = $userInfoRow['password'];

		if ($password == $passwordFromDB) {
			$_SESSION['username'] = $usernameFromDB;
            return [
                "success" => true, 
                "message" => "Login successful!",
                "id"      =>  $userIDFromDB,
                "username" => $usernameFromDB
            ];
		}
		else {
            return [
                "success" => false, 
                "message" => "Password is invalid, but user exists"
            ];
		}
	}

	
	if ($stmt->rowCount() == 0) {
        return [
            "success" => false, 
            "message" => "Username doesn't exist. Consider registering first."
        ];
    }
}


function insertShelf($pdo, $shelf_name, $currentUser) {
    $sql = "INSERT INTO shelves (shelf_name, added_by) VALUES (?,?)";
    $stmt = $pdo->prepare($sql);
    $executeQuery = $stmt->execute([$shelf_name, $currentUser]);

    if ($executeQuery) {
        return [
            "success" => true,
            "message" => "Shelf created successfully"
        ];
    }
    return [
        "success" => false,
        "message" => "Failed to create shelf"
    ];
}

function insertItem($pdo, $item_name, $price, $shelf_id, $currentUser) {
    $sql = "INSERT INTO items (item_name, price, shelf_id, added_by) VALUES (?,?,?,?)";
    $stmt = $pdo->prepare($sql);
    $executeQuery = $stmt->execute([$item_name, $price, $shelf_id, $currentUser]);

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

function updateShelf($pdo, $shelf_id, $shelf_name, $updatedBy) {
    $sql = "UPDATE shelves SET shelf_name = ?, updated_by = ?, last_updated = NOW() WHERE shelf_id = ?";
    $stmt = $pdo->prepare($sql);
    $executeQuery = $stmt->execute([$shelf_name, $updatedBy, $shelf_id]);

    if ($executeQuery) {
        return true;
    }
}

function updateItem($pdo, $item_id, $item_name, $price, $updatedBy) {
    $sql = "UPDATE items SET item_name = ?, price = ?, updated_by = ?, last_updated = NOW() WHERE item_id = ?";
    $stmt = $pdo->prepare($sql);
    $executeQuery = $stmt->execute([$item_name, $price, $updatedBy, $item_id]);

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