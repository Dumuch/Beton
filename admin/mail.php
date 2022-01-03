<?php
require_once '../phpmailer/Exception.php';
require '../phpmailer/PHPMailer.php';
require '../phpmailer/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
// Файлы phpmailer

$switch_Products_select = function($products_select) {
  switch ($products_select) {
    case "concrete":
    $products_select = 'Бетон (БСГ)';
    break;
    case "sand_concrete":
    $products_select = 'Пескобетон (раствор)';
    break;
    case "blocks_fbs":
    $products_select = 'Блоки ФБС';
    break;
    case "road_curb":
    $products_select = 'Бордюр дорожный';
    break;
    case "sidewalk_curb":
    $products_select = 'Бордюр тротуарный';
    break;
    case "сrushed_stone":
    $products_select = 'Щебень';
    break;
    case "screening_out":
    $products_select = 'Отсев';
    break;
    case "sand":
    $products_select = 'Песок';
    break;
    case "masonry_sand":
    $products_select = 'Песок кладочный';
    break;
  }

  return $products_select;
};

$switch_Brand_select = function($brand_select) {
  switch ($brand_select) {
    case "concrete_М100":
      $brand_select = 'М100 (В7,5)';
      break;
    case "concrete_М150":
      $brand_select = 'М150 (В12,5)';
      break;
      case "concrete_М200":
        $brand_select = 'М200 (В15)';
        break;
      case "concrete_М250":
        $brand_select = 'М250 (В20)';
        break;
      case "concrete_М300":
        $brand_select = 'М300 (В22,5)';
        break;
      case "concrete_М350":
        $brand_select = 'М350 (В25)';
        break;
      case "concrete_М400":
        $brand_select = 'М400 (B30)';
        break;
      case "sand_concrete_В7":
        $brand_select = '(В7,5) М100';
        break;
      case "sand_concrete_В12":
        $brand_select = '(В12,5) М150';
        break;
      case "sand_concrete_В15":
        $brand_select = '(В15) М200';
        break;
      case "sand_concrete_В20":
        $brand_select = '(В20) М250';
        break;
      case "sand_concrete_В22":
        $brand_select = '(В22,5) М300';
        break;
      case "sand_concrete_В25":
        $brand_select = '(В25) М350';
        break;
  }

  return $brand_select;
};


$name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
$modalForm = filter_var(trim($_POST['modal_form']), FILTER_SANITIZE_STRING);



if($modalForm == 'modal_light') {

  $phone = filter_var(trim($_POST['phone']), FILTER_SANITIZE_STRING);
  $products_select = filter_var(trim($_POST['products_select']), FILTER_SANITIZE_STRING);

  $products_select = $switch_Products_select($products_select);

  $title = "Заявка на ФБС блоки бордюры и нерудные материалы ";
  $body = "
    <b>Имя: </b> $name<br>
    <b>Телефон: </b> $phone<br>
    <b>Продукция: </b> $products_select<br>
  ";

} elseif ($modalForm == 'modal_full') {

  $phone = filter_var(trim($_POST['phone']), FILTER_SANITIZE_STRING);
  $products_select = filter_var(trim($_POST['products_select']), FILTER_SANITIZE_STRING);
  $brand_select = filter_var(trim($_POST['brand_select']), FILTER_SANITIZE_STRING);

  $products_select = $switch_Products_select($products_select);
  $brand_select = $switch_Brand_select($brand_select);

  $title = "Заявка на расчет ";
  $body = "
    <b>Имя: </b> $name<br>
    <b>Телефон: </b> $phone<br>
    <b>Продукция: </b> $products_select<br>
    <b>Марка: </b> $brand_select<br>
  ";

} elseif ($modalForm == 'main-footer__form') {

  $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_STRING);

  $title = "Подписка на акции";
  $body = "
    <b>Имя: </b> $name<br>
    <b>Email: </b> $email<br>
  ";

} elseif ($modalForm == 'modal_user') {
  $phone = filter_var(trim($_POST['phone']), FILTER_SANITIZE_STRING);

  $title = "Заявка на обратный звонок";
  $body = "
    <b>Имя: </b> $name<br>
    <b>Телефон: </b> $phone<br>

  ";

} else {

  $phone = filter_var(trim($_POST['phone']), FILTER_SANITIZE_STRING);
  $products_select = filter_var(trim($_POST['products_select']), FILTER_SANITIZE_STRING);

  $products_select = $switch_Products_select($products_select);

  $title = "Заявка на расчет";
  $body = "
    <b>Имя: </b> $name<br>
    <b>Телефон: </b> $phone<br>
    <b>Продукция: </b> $products_select<br>
  ";

}


// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.yandex.ru';
    $mail->Username   = 'test@yandex.ru';
    $mail->Password   = 'test';
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('test@yandex.ru', 'Заявка с Бетон +');
    $mail->addAddress('test@yandex.ru');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  // Проверяем отравленность сообщения
  if ($mail->send()) {
    $result = "success";
  } else {
    $result = "error";
  }

} catch (Exception $e) {
  $result = "error";
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

}
?>
