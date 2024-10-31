<?php

require_once 'dbConfig.php';
require_once 'models.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    handleGet($pdo);
} elseif ($method === 'POST') {
    handlePost($pdo);
} elseif ($method === 'PUT') {
    handlePut($pdo);
} elseif ($method === 'DELETE') {
    handleDelete($pdo);
}

function handleGet($pdo) {
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'edit':
                echo json_encode(fetchShelf($pdo, $_GET['shelf_id']));
                break;
            case 'edit_item':
                echo json_encode(fetchItem($pdo, $_GET['item_id']));
                break;
            case 'shelf_data':
                echo json_encode(fetchItemsByShelf($pdo, $_GET['shelf_id']));
                break;
            case 'logout':
                unset($_SESSION['username']);
                break;
            case 'getAllUsers':
                echo json_encode(getAllUsers($pdo));
                break;
            case 'getUserByID':
                echo json_encode(getUserByID($pdo, $_GET['user_id']));
                break;
            // case 'getSessionData':
            //     echo json_encode([
            //         "username" => $_SESSION['username'] ?? null,
            //     ]);
            //     break;
            default:
                echo json_encode(fetchAllShelves($pdo));
        }
    } else {
        echo json_encode(fetchAllShelves($pdo));
    }
}

function handlePost($pdo) {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data['shelf_name'])) {
        echo json_encode(insertShelf($pdo, $data['shelf_name']));
    } elseif (isset($data['item_name']) && isset($data['shelf_id'])) {
        echo json_encode(insertItem($pdo, $data['item_name'], $data['price'], $data['shelf_id']));
    } else {
        if (isset($_GET['action'])) {
            $username = $data['username'];
            $password = sha1($data['password']);

            switch ($_GET['action']) {
                case 'register':
                    echo json_encode(insertNewUser($pdo, $data['username'], $data['password']));
                    break;
                case 'login':
                    echo json_encode(loginUser($pdo, $data['username'], $data['password']));
                    break;
                default:
                  break;  
            }
        }
    }
    
}

function handlePut($pdo) {
    $data = json_decode(file_get_contents("php://input"));
    if (isset($data->item_id)) {
        echo json_encode(updateItem($pdo, $data->item_id, $data->item_name, $data->price));
    } elseif (isset($data->shelf_id)) {
        echo json_encode(updateShelf($pdo, $data->shelf_id, $data->shelf_name));
    }
}

function handleDelete($pdo) {
    if (isset($_GET['item_id'])) {
        echo json_encode(deleteItem($pdo, $_GET['item_id']));
    } elseif (isset($_GET['shelf_id'])) {
        echo json_encode(deleteShelf($pdo, $_GET['shelf_id']));
    }
}