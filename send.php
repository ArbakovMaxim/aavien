<?php
$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"] ?? '';
$company = $data["company"] ?? '';
$phone = $data["phone"] ?? '';
$email = $data["email"] ?? '';
$description = $data["description"] ?? '';

$date = date("j F Y");

$to = "aavien.intl@aavienintl.com";
$subject = "New {$company} Enquiry {$date}";
$body = "Name: $name\nCompany: $company\nPhone: $phone\nEmail: $email\n\nMessage:\n$description";

$fromName = "Website Contact Form";
$fromEmail = "Info@aavienintl.com";
$headers = "From: $fromName <$fromEmail>\r\n";
$headers .= "Reply-To: $email\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "mail() failed"]);
}
