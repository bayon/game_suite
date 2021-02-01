<?php
include_once('../config.php');
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Games</title>
 <script src="../jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="src/game/config.js"></script>
    <script type="text/javascript" src="src/engine/core.js"></script>
    <script type="text/javascript" src="src/game/main.js"></script>
     <script type="text/javascript" src="src/game/lifebars.js"></script>
     	<script src="../fastclick.js"></script>
</head>
<style>
        #return{
            position:fixed;
            top:0%;
            left:85%;
            z-index:999999999;
            text-decoration:none;
            color:#fff;
            font-family:arial;
            font-weight:bold;
            font-size:25px;
            text-shadow: 2px 2px 4px #000;

        }
         #exit-button{
            width:150px !important;
            height:auto;
        }
     </style>
<body style="background-color:#000;">
         <!-- <a id="return" href="< ?php echo(BASE_URL); ?>/index.php"  ><img id="exit-button" src= "media/exit-button.png" ></a> -->
        <script>
            $(function() {
                FastClick.attach(document.body);
            });
        </script>
</body>
</html>
