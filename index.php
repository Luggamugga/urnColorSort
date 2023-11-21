<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
    <script src="colorSort.js"></script>
    <title>Color Sort</title>
</head>
<body>
    <div class="mainContainer">
        <div class="colorSortGrid">
            <?php for($i = 0;$i<14;$i++){
                echo "<div class='urnContainer'>";
                for($j = 0;$j<4;$j++){
                    echo "<div class='urnColor'></div>";
                }
                echo "</div>";
            } ?>
        </div>
        <div class="buttonContainer">
            <button type="button" id="butt">Solve</button>
            <button type="button" id="stop">Stop</button>
        </div>
    </div>
</body>
</html>