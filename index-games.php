 <?php  include_once('config.php'); ?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- , user-scalable=no -->
        <title>Games Kiosk | Home Page</title>
		<link rel="stylesheet" href="style.css" media="all">
		<link rel="stylesheet" href="animate.css" media="all">
		<link href='http://fonts.googleapis.com/css?family=Oswald:400,700,300' rel='stylesheet' type='text/css'>
        <script src="jquery-1.11.2.min.js"></script>
	<script src="fastclick.js"></script>

 

    </head>
	<body  >
    	<div class="container">
            <p> Games Designed for Landscape Layout</p>
        	 <div class="column animated bounceIn">
                <div class="columncontainer">
                    <div class="gameicon">
                        <a href="endlessrunner/index.php"><img src="images/endlessrunner.jpg" height="150px" width="150px"></a>
                    </div>
                    <div class="text">
                        <h1 class="animated fadeIn">JUMPY TIME</h1>
                        <p class="animated fadeIn2">Collect the cash and avoid the traps as you jump your way to a new future.</p>
                    </div>
                </div>
            </div>
            <div class="column animated bounceIn2">
                <div class="columncontainer">
                    <div class="gameicon">
                        <a href="spaceshooter/index.php"><img src="images/spaceshooter.jpg" height="150px" width="150px"></a>
                    </div>
                    <div class="text">
                        <h1 class="animated fadeIn">DAKOTA SKIES</h1>
                        <p class="animated fadeIn2">Turn the enemy planes into cold hard cash to stack up your savings account to victory</p>
                    </div>
                </div>
            </div>
            <div class="column animated bounceIn3">
                <div class="columncontainer">
                    <div class="gameicon">
                        <a href="match3/index.php"><img src="images/match3.jpg" height="150px" width="150px"></a>
                    </div>
                    <div class="text">
                        <h1 class="animated fadeIn">BANK MATCH</h1>
                        <p class="animated fadeIn2">Match the different banking items to score more points. Get three in a row to make the items disappear.</p>
                    </div>
                </div>
            </div>

<!--
            <div class="column animated bounceIn3">
                <div class="columncontainer">
                    <div class="gameicon">
                        <a href="../../landscape-large-format/index.html"><img src="images/first-western-bt-button.jpg" height="150px" width="150px"></a>
                    </div>
                    <div class="text">
                        <h1 class="animated fadeIn">LARGE FORMAT KIOSK</h1>
                        <p class="animated fadeIn2">Explore everything else that First Western Bank & Trust has to offer by clicking through our large format kiosk.</p>
                    </div>
                </div>
            </div>
         -->
		</div>
        <script>
            $(function() {
                FastClick.attach(document.body);
            });
        </script>
	</body>
</html>
