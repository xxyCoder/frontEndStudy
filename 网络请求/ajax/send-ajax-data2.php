<?php
// 这是服务端脚本.

// 设置内容类型.
header('Content-Type: text/plain');
$foo = $_POST['foo'];
$lorem = $_POST['lorem'];


// 将数据发回.
echo '{"msg":"收到数据", "foo":"'.$foo.'","lorem":"'.$lorem.'"}';
?>
   