<?php

    $numero = $_GET["numero"];
    $texto = "";
    for( $i = 1; $i <= $numero; $i++){
        $texto = $texto."<br>".$i;
    }
    echo $texto;

?>