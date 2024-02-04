<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Safely retrieve form data, ensuring no null values are passed to htmlspecialchars
    $firstName = isset($_POST['firstName']) ? htmlspecialchars($_POST['firstName']) : '';
    $lastName = isset($_POST['lastName']) ? htmlspecialchars($_POST['lastName']) : '';
    $contactNumber = isset($_POST['contactNumber']) ? htmlspecialchars($_POST['contactNumber']) : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $websiteURL = isset($_POST['websiteURL']) ? htmlspecialchars($_POST['websiteURL']) : '';

    // Display the form inputs nicely
    echo "<h2>Submission Details</h2>";
    echo "<p><strong>First Name:</strong> $firstName</p>";
    echo "<p><strong>Last Name:</strong> $lastName</p>";
    echo "<p><strong>Contact Number:</strong> $contactNumber</p>";
    echo "<p><strong>Email:</strong> $email</p>";
    echo "<p><strong>Website/LinkedIn Profile URL:</strong> <a href='$websiteURL'>$websiteURL</a></p>";

    // Optionally, process the form data (e.g., validate, save to database, etc.)

} else {
    // If the form is not submitted, redirect back to the form
    header('Location: index.php');
}
?>
