<?php
// Включает строгий режим проверки типов
declare(strict_types=1);

// безопасно получает значение из POST‑запроса, если ключа нет — подставляет пустую строку;
$user_phone = trim((string)($_POST['userphone'] ?? ''));
$user_mail  = trim((string)($_POST['usermail'] ?? ''));


// полный путь к файлу .env
$envPath = __DIR__ . DIRECTORY_SEPARATOR . '.env';
// проверяем существует ли файл .env gполучаем данные из файла если нет возвращаем пустой массив
$env = is_file($envPath) ? (array)parse_ini_file($envPath, false, INI_SCANNER_RAW) : [];

$token = trim((string)($env['TOKEN'] ?? ''));
$chat_id = trim((string)($env['CHAT_ID'] ?? ''));


// Если токен или ID чата не заданы — возвращает HTTP‑код 500 Internal Server Error
if ($token === '' || $chat_id === '') {
  http_response_code(500);
  exit('Server misconfigured');
}

// создаем пустой массив строк
$lines = [];
// если поле не пустое
if ($user_phone !== '') {
  // формируем строку
  $lines[] = 'Телефон: <b>' . htmlspecialchars($user_phone, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . '</b>';
}
// если поле не пустое
if ($user_mail !== '') {
  // формируем строку
  $lines[] = 'Почта: <b>' . htmlspecialchars($user_mail, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . '</b>';
}

// параметры для запроса к Telegram API
$params = [
  'chat_id' => $chat_id,
  'text' => implode("\n", $lines),
  'parse_mode' => 'HTML',
];

// отправляем запроса через cURL
$sendToTelegram = curl_init("https://api.telegram.org/bot{$token}/sendMessage");
// параметры дял запроса через cURL
curl_setopt_array($sendToTelegram, [
  CURLOPT_POST => true, /*  запрос должен быть выполнен методом POST */
  CURLOPT_POSTFIELDS => http_build_query($params), /* тело POST‑запроса — данные, которые будут отправлены на сервер */
  CURLOPT_RETURNTRANSFER => true, /* определяет что ответ с сервера возвращается как строка */
  CURLOPT_TIMEOUT => 10, /*  максимальное время ожидания ответа от сервера в секундах */
]);

// выполняет запрос
$response = curl_exec($sendToTelegram);
// получение ответа
$httpCode = (int)curl_getinfo($sendToTelegram, CURLINFO_HTTP_CODE);
curl_close($sendToTelegram);


// проверка результата вывода ответа
// если ответ не вернул ошибку и диапазон ответа соответствует
if ($response !== false && $httpCode >= 200 && $httpCode < 300) {
  // выводим
  echo 'Success';
} else {
  // если условие не выполнено
  http_response_code(502);
  echo 'Error';
}