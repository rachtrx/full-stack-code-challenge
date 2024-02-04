<?php
session_start();

$firstNameErr = $lastNameErr = $contactNumberErr = $emailErr = $websiteURLErr = "";
$firstName = $lastName = $contactNumber = $email = $websiteURL = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // First Name Validation
    if (empty($_POST["firstName"])) {
        $firstNameErr = "First Name is required";
    } else {
        $firstName = test_input($_POST["firstName"]);
        if (!preg_match("/^[a-zA-Z-' ]*$/", $firstName)) {
            $firstNameErr = "Only letters and white space allowed";
        }
    }

    // Last Name Validation
    if (empty($_POST["lastName"])) {
        $lastNameErr = "Last Name is required";
    } else {
        $lastName = test_input($_POST["lastName"]);
        if (!preg_match("/^[a-zA-Z-' ]*$/", $lastName)) {
            $lastNameErr = "Only letters and white space allowed";
        }
    }

    // Contact Number Validation
    if (empty($_POST["contactNumber"])) {
        $contactNumberErr = "Contact Number is required";
    } else {
        $contactNumber = test_input($_POST["contactNumber"]);
        if (!preg_match("/^[+]?[0-9\- ]{8,}$/", $contactNumber)) {
            $contactNumberErr = "Invalid contact number format";
        }
    }

    // Email Validation
    if (empty($_POST["email"])) {
        $emailErr = "Email is required";
    } else {
        $email = test_input($_POST["email"]);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $emailErr = "Invalid email format";
        }
    }

    // Website/LinkedIn Profile URL Validation
    if (empty($_POST["websiteURL"])) {
        $websiteURLErr = "Website is required";
    } else {
        $websiteURL = test_input($_POST["websiteURL"]);
        if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|](?:\.[a-z]{2,})/i", $websiteURL)) {
            $websiteURLErr = "Invalid URL";
        }
    }

    // If there are no errors, proceed to store or display the submission
    if (empty($firstNameErr) && empty($lastNameErr) && empty($contactNumberErr) && empty($emailErr) && empty($websiteURLErr)) {
        $_SESSION['submissionDetails'] = [
            'firstName' => $firstName,
            'lastName' => $lastName,
            'contactNumber' => $contactNumber,
            'email' => $email,
            'websiteURL' => $websiteURL,
        ];
        header('Location: result.php');
        exit;
    } else {
        $_SESSION['errors'] = [
            'firstName' => $firstName,
            'lastName' => $lastName,
            'contactNumber' => $contactNumber,
            'email' => $email,
            'websiteURL' => $websiteURL,
            'firstNameErr' => $firstNameErr,
            'lastNameErr' => $lastNameErr,
            'contactNumberErr' => $contactNumberErr,
            'emailErr' => $emailErr,
            'websiteURLErr' => $websiteURLErr,
        ];
        header('Location: index.php');
        exit;
    }
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
?>