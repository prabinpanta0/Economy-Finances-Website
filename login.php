<?php
// Assuming you have a MySQL database with a table named "login" containing columns "username" and "password"

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get username and password from the form
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Connect to the database (replace with your database credentials)
    $servername = "localhost";
    $dbusername = "root";
    $dbpassword = "";
    $dbname = "users";

    $conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and execute a query to check if the provided username and password match a record in the database
    $sql = "SELECT * FROM login WHERE username = '$username' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Authentication successful
        echo '<script>alert("Login successful!");</script>';
        header("Location: index.html");
    } else {
        // Authentication failed
        echo '<script>alert("Login failed. Please check your username and password.");</script>';   
    }

    // Close the database connection
    $conn->close();
}
?>
