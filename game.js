$(document).ready(function () {
    var gamePattern = [];
    var userClickedPattern = [];
    var buttonColors = ["red", "blue", "green", "yellow"];

    var level = 0;
    var started = false;

    $(document).keydown(function() {
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    });

    // Spiellogik für die nächste Sequenz
    function nextSequence() {
        userClickedPattern = [];
        level++;
        $("#level-title").text("Level " + level);

        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);

        playPattern(gamePattern);
    }

    // Wiedergabe des vorgegebenen Musters
    function playPattern(pattern) {
        var i = 0;
        var interval = setInterval(function() {
            $("#" + pattern[i]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(pattern[i]);

            i++;
            if (i >= pattern.length) {
                clearInterval(interval);
            }
        }, 1000); // Intervall zwischen den Farben
    }

    // Click
    $(".btn").click(function() {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        var lastIndex = userClickedPattern.length - 1;
        checkAnswer(lastIndex);
    });

    // Überprüfen der Benutzerantwort
    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
        } else {
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");

            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);

            startOver();
        }
    }

    // Spiel zurücksetzen
    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }

    // Sound-Animationseffekte
    function playSound(name) {
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }

    function animatePress(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function() {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    }
});
