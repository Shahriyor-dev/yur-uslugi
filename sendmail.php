<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);

$mail->CharSet = "UTF-8";
$mail->setLanguage('ru', 'PHPMailer/language');
$mail->isHTML(true);

//Recipients
// От кого письмо
$mail->setFrom('from@example.com');
// Кому отправить
$mail->addAddress('shodik91@gmail.com'); 

if(trim(!empty($_POST['name']))) {
  $body.='<p><strong>Имя:</strong>' .$_POST['name']. '</p>';
};

if(trim(!empty($_POST['phone']))) {
  $body.='<p><strong>Телефон:</strong>' .$_POST['phone']. '</p>';
};

if(trim(!empty($_POST['email']))) {
  $body.='<p><strong>Эл-почта:</strong>' .$_POST['email']. '</p>';
};

$body.='<p><strong>Ответы:</strong></p>';

if(trim(!empty($_POST['sfera']))) {
  $body.='<p><strong>Сфера деятельности вашей компании:</strong>' .$_POST['sfera']. '</p>';
};

if(trim(!empty($_POST['sanksy']))) {
  $body.='<p><strong>Каким образом санкции повлияли на вашу финансово-хозяйственную деятельность?:</strong>' .$_POST['sanksy']. '</p>';
};

if(trim(!empty($_POST['gosuchast']))) {
  $body.='<p><strong>Государсивенное участие в компании?:</strong>' .$_POST['gosuchast']. '</p>';
};

if(trim(!empty($_POST['sanksykomp']))) {
  $body.='<p><strong>Под действие санкции каких стран попала ваша компания?:</strong>' .$_POST['sanksykomp']. '</p>';
};

if(trim(!empty($_POST['scheta']))) {
  $body.='<p><strong>Есть ли заблокированные счета за рубежом?:</strong>' .$_POST['scheta']. '</p>';
};

$mail->Subject = 'План вывода компании из кризиса';
$mail->Body    = $body;

if(!$mail->send()) {
  $message = 'Ошибка';
} else {
  $message = 'Данные отправлены!';
};

$response = ['message' => $message];

header('Content-Type: application/json');
echo json_encode($response);