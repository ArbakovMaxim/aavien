<?php
$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"] ?? '';
$company = $data["company"] ?? '';
$phone = $data["phone"] ?? '';
$email = $data["email"] ?? '';
$description = $data["description"] ?? '';

$to = "info@aavienintl.com";
$subject = "New contact form submission";
$body = "Name: $name\nCompany: $company\nPhone: $phone\nEmail: $email\n\nMessage:\n$description";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "mail() failed"]);
}
