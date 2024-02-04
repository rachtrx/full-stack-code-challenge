<?php
session_start(); // Ensure session is started

// Check if the submission details are set in the session
if (isset($_SESSION['submissionDetails'])) {
    $details = $_SESSION['submissionDetails'];
} else {
    // If no submission details found, set a flag or default message
    $noDetails = "No submission details to display.";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Submission Details</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<div class="details-container">
    <?php if (isset($noDetails)): ?>
        <p class="no-details"><?php echo $noDetails; ?></p>
    <?php else: ?>
        <h2>Submission Details</h2>
        <p><strong>First Name:</strong> <?php echo htmlspecialchars($details['firstName']); ?></p>
        <p><strong>Last Name:</strong> <?php echo htmlspecialchars($details['lastName']); ?></p>
        <p><strong>Contact Number:</strong> <?php echo htmlspecialchars($details['contactNumber']); ?></p>
        <p><strong>Email:</strong> <?php echo htmlspecialchars($details['email']); ?></p>
        <p><strong>Website/LinkedIn Profile URL:</strong> <a href="<?php echo htmlspecialchars($details['websiteURL']); ?>" target="_blank"><?php echo htmlspecialchars($details['websiteURL']); ?></a></p>
    <?php endif; ?>
</div>

</body>
</html>

<?php
// Optionally, clear the session data after displaying
if (isset($_SESSION['submissionDetails'])) {
    unset($_SESSION['submissionDetails']);
}
?>