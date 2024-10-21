<?php
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers:* ");
header("Access-Control-Allow-Methods:* ");

$connect = new PDO("mysql:host=127.0.0.1;dbname=se_1019", "root", "");
$method = $_SERVER['REQUEST_METHOD']; //return GET, POST, PUT, DELETE

if($method === 'GET')
{
	if(isset($_GET['shelf_id']) && isset($_GET['action']) && $_GET['action'] ==='edit')
	{
		//fetch single shelve
		$query = "SELECT * FROM shelves WHERE shelf_id = '".$_GET["shelf_id"]."'";
		$result = $connect->query($query, PDO::FETCH_ASSOC);
		$data = array();

		foreach($result as $row) {
			$data['shelf_name'] = $row['shelf_name'];
			$data['date_added'] = $row['date_added'];
			$data['shelf_id'] = $row['shelf_id'];
		}
		echo json_encode($data);
	} 

	else 	if(isset($_GET['item_id']) && isset($_GET['action']) && $_GET['action'] ==='edit_item')
	{
		//fetch single item
		$query = "SELECT * FROM items WHERE item_id = '".$_GET["item_id"]."'";
		$result = $connect->query($query, PDO::FETCH_ASSOC);
		$data = array();

		foreach($result as $row) {
			$data['item_name'] = $row['item_name'];
			$data['price'] = $row['price'];
		}
		echo json_encode($data);
	}

	else if(isset($_GET['shelf_id']) && isset($_GET['action']) && $_GET['action'] === 'shelf_data') {
		$query = "SELECT * FROM items WHERE shelf_id = '".$_GET["shelf_id"]."'";
		$result = $connect->query($query, PDO::FETCH_ASSOC);
		$data = array();

		foreach ($result as $row) {
				$data[] = [
						'item_id' => $row['item_id'],
						'item_name' => $row['item_name'],
						'shelf_id' => $row['shelf_id'],
						'price' => $row['price'],
						'date_added' => $row['date_added'],

				];
		}
		echo json_encode($data); 
	}
	else 
	{
		//fetch all shelve
		$query = "SELECT * FROM shelves ORDER BY shelf_id DESC";
		$result = $connect->query($query, PDO::FETCH_ASSOC);
		$data = array();
		foreach($result as $row) {
			$data[] = $row;
		}
		echo json_encode($data);
	}	
}

if($method === 'POST')
{
	if(isset($_GET['shelf_id'])) {
		$form_data = json_decode(file_get_contents('php://input'), true);
			$data = array(
					':item_name' => $form_data['item_name'],
					':price'     => $form_data['price'],
					':shelf_id'  => $_GET['shelf_id']
			);

			$query = "INSERT INTO items (item_name, price, shelf_id) VALUES (:item_name, :price, :shelf_id)";
			$statement = $connect->prepare($query);
			$statement->execute($data);
			echo json_encode(["success" => "Item added"]);
	} else {
		$form_data = json_decode(file_get_contents('php://input'));
		$data = array(
			':shelf_name'		=>	$form_data->shelf_name
		);
	
		$query = "
		INSERT INTO shelves (shelf_name) VALUES (:shelf_name);
		";
		$statement = $connect->prepare($query);
		$statement->execute($data);
		echo json_encode(["success" => "done"]);
	}
}

if($method === 'PUT') {
	if(isset($_GET['item_id'])) {
		//Update Item Data
		$form_data = json_decode(file_get_contents('php://input'));
			$data = array(
				':item_name'		=>	$form_data->item_name,
				':price'				=>	$form_data->price,
				':item_id'			=>	$form_data->item_id
			);
	
		$query = "
		UPDATE items 
		SET 
			item_name = :item_name,
			price = :price
		WHERE item_id = :item_id
		";
		$statement = $connect->prepare($query);
		$statement->execute($data);
		echo json_encode(["success" => "done"]);
	} else {
	//Update Shelve Data
	$form_data = json_decode(file_get_contents('php://input'));
		$data = array(
			':shelf_name'		=>	$form_data->shelf_name,
			':shelf_id'			=>	$form_data->shelf_id
		);
	
		$query = "
		UPDATE shelves 
		SET shelf_name = :shelf_name 
		WHERE shelf_id = :shelf_id
		";
		$statement = $connect->prepare($query);
		$statement->execute($data);
		echo json_encode(["success" => "done"]);
	}
}

if($method === 'DELETE')
{
	if(isset($_GET['item_id'])) {
		//Delete Item Data
		$data = array(
			':item_id' => $_GET['item_id']
		);

		$query = "DELETE FROM items WHERE item_id = :item_id";
		$statement = $connect->prepare($query);
		$statement->execute($data);

		echo json_encode(["success" => "done"]);
	} else {
		//Delete Shelve Data
		$data = array(
			':shelf_id' => $_GET['shelf_id']
		);

		$query = "DELETE FROM shelves WHERE shelf_id = :shelf_id";
		$statement = $connect->prepare($query);
		$statement->execute($data);

		echo json_encode(["success" => "done"]);
	}

}
