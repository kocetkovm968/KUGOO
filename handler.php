<?php
$user_phone = htmlspecialchars($_POST["userphone"]);
$user_mail = htmlspecialchars($_POST["usermail"]);

$token = "8315061604:AAG6cZnb1sL-i9JbpbWqIHL0sxGx7qgChjU"; //токен телеграм бота
$chat_id = "-4991292408"; //id чата с эти ботом

//массив для данных формы
$formData = array(
  "Телефон: " => $user_phone,
  "Телефон: " => $user_mail
);

//перебираем наш массив как пару ключ=>значение
foreach($formData as $key => $value) {
  //создай переменную $text к которой будешь добавлять(.=)
  $text .= $key . "<b>" . urlencode($value) . "</b>" . "%0A";
}

//Открыть адрес черзе бота с уникальным токеном/выполнить функцию для отправки текстовых сообщений с параметрами"?...&...&"
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&text={$text}&parse_mode=html", "r");

if ($sendToTelegram) {
  echo "Success";
} else {
  echo "Error";
}

