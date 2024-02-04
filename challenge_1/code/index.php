<?php
session_start(); 

$firstName = $lastName = $contactNumber = $email = $websiteURL = "";
$firstNameErr = $lastNameErr = $contactNumberErr = $emailErr = $websiteURLErr = "";

if (isset($_SESSION['errors'])) {
    $firstName = $_SESSION['errors']['firstName'];
    $lastName = $_SESSION['errors']['lastName']; 
    $contactNumber = $_SESSION['errors']['contactNumber']; 
    $email = $_SESSION['errors']['email'];
    $websiteURL = $_SESSION['errors']['websiteURL']; 
    $firstNameErr = $_SESSION['errors']['firstNameErr']; 
    $lastNameErr = $_SESSION['errors']['lastNameErr']; 
    $contactNumberErr = $_SESSION['errors']['contactNumberErr']; 
    $emailErr = $_SESSION['errors']['emailErr'];
    $websiteURLErr = $_SESSION['errors']['websiteURLErr'];

    unset($_SESSION['errors']);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Contact Form</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<form action="submit.php" method="post" class="contact-form">
    <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" value="<?php echo $firstName; ?>">
        <span class="error"><?php echo $firstNameErr; ?></span>
    </div>
    <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" value="<?php echo $lastName; ?>">
        <span class="error"><?php echo $lastNameErr; ?></span>
    </div>
    <div class="form-group">
        <label for="contactNumber">Contact Number:</label>
        <input type="text" id="contactNumber" name="contactNumber" value="<?php echo $contactNumber; ?>">
        <span class="error"><?php echo $contactNumberErr; ?></span>
    </div>
    <div class="form-group">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" value="<?php echo $email; ?>">
        <span class="error"><?php echo $emailErr; ?></span>
    </div>
    <div class="form-group">
        <label for="websiteURL">Website/LinkedIn Profile URL:</label>
        <input type="text" id="websiteURL" name="websiteURL" value="<?php echo $websiteURL; ?>">
        <span class="error"><?php echo $websiteURLErr; ?></span>
    </div>
    <input type="submit" value="Submit" class="submit-button">
</form>

</body>
</html>
