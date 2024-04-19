<?php

namespace App\Helpers;
use Exception;
use PHPMailer\PHPMailer\PHPMailer;


class MailHelper
{
    public static function sendEmail($to, $subject, $body)
{
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();

        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 

        $mail->SMTPAuth = true;
        $mail->Username = 'elmahi.achraf9@gmail.com';
        $mail->Password = 'rwgouofltjaiolyb';

        $mail->setFrom('Hrdream@gmail.com', 'HrDream');

        $mail->addAddress($to);

        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->isHTML(true);

        $mail->send();
    } catch (Exception $e) {
        echo 'Error sending email: ' . $mail->ErrorInfo;
    }
}

}