<?php

if(isset($_POST['submit'])){
    $name = $_POST['name'];
    $subject = $_POST['subject'];
    $mailFrom = $_POST['mail'];
    $message = $_POST['message'];

    $mailTo = "daniel@danielswim.com";
    $headers = "From: ".$mailFrom;
    $txt = "You have received an email from: ".$mailFrom . ".\n\n".$message;
    mail($mailTo, $subject, $txt, $headers);
    header("Location: index.php?mailsent");
}
