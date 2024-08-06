// Loading function
$(function () {
    // end drag for all images
    $('img').on('dragstart', function (event) { event.preventDefault(); });

    // creation all sounds for game 
    setInterval(function () {
        var bgSound = document.querySelector(".bgSound");
        bgSound.play();
    }, 1000);

    localStorageItem = JSON.parse(localStorage.getItem("dataOfUser"));
    score = document.getElementById("sc");
    playerName = localStorageItem[0];
    level = localStorageItem[1];
    playTime=localStorageItem[2];
    breakTime=localStorageItem[3];
    flyingSpeed = 60;
    $("#levelLable").text(level);
    Swal.fire({
        title: 'Hello ' + playerName,
        html: `
        <p>Play Time: ${playTime} seconds</p>
        <p>Break Time: ${breakTime} seconds</p>
        <p>Have a Nice Game.</p><br>
        <h3>How to Play?</h3>
        <ul>
        
        
            <p>Hit Blue Increase  +5 </p>
            <p>Hit Black Lose by   -10</p>
            <p>Gold One is a Bonus.</p>
            
           
        </ul>
    `,
        imageUrl: '../images/gold2.gif',
        imageWidth: 170,
        imageHeight: 100,
        imageAlt: 'Custom image',
        allowOutsideClick: false
    });
    $(".swal2-confirm").on("click", startGame); // the game will start when click on "OK" on the popup
});// Loading

let isGamePaused = false;
let playInterval;
let breakInterval;
let playTimeRemaining = 30;
let breakTimeRemaining = 60;
let timerDisplay = $('<div id="timerDisplay"></div>').css({
    position: 'fixed',
    top: '10px',
    right: '10px',
    fontSize: '20px',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '10px',
    borderRadius: '5px'
}).appendTo('body');

function startGame() {
    startPlayInterval();

    if (level == "Hard") {
        bombID = setInterval(function () {
            if (!isGamePaused) {
                $("body").append('<div class="area"><img class="bomb" src="../images/bomb.png"> </div>');
                $('.area').css({
                    top: -600,
                    left: Math.random() * ($(window).height()) + 'px'
                });
                bombDown = document.querySelector(".bombDown");
                bombDown.currentTime = 1.2;
                bombDown.play();
            }
        }, 20000);

        // moving the bomb and handling its event
        setInterval(function () {
            if (!isGamePaused) {
                $(".area").css({ "top": "+=10px" });
                $(".bomb").on("click", function (e) {
                    $(this).attr("src", "../images/explosion.gif");
                    bombSound = document.querySelector(".bomb");
                    bombSound.play();
                    bombDown.currentTime = 8;
                    setTimeout(function () {
                        $(".area").remove();
                    }, 700);
                    if (parseInt($(".allBirds").last().css("left")) + parseInt($(".allBirds").last().css("width")) > parseInt($(".area").css("left")) && parseInt($(".allBirds").last().css("left")) < parseInt($(".area").css("left")) + parseInt($(".area").css("width"))) {
                        $(".allBirds").last().click().remove();
                    }

                    if (parseInt($(".allBirds").first().css("left")) + parseInt($(".allBirds").first().css("width")) > parseInt($(".area").css("left")) && parseInt($(".allBirds").first().css("left")) < parseInt($(".area").css("left")) + parseInt($(".area").css("width"))) {
                        $(".allBirds").first().click().remove();
                    }
                });
            }
        }, 100);
        // change speed 
        flyingSpeed = 40;
    }

    $("body").on("click", function () {
        if (!isGamePaused) {
            var shot = document.querySelector(".shotGun");
            shot.currentTime = 0;
            shot.play();
        }
    });

    // method for creation of normal birds in random locations 
    function normalBird() {
        if (!isGamePaused) {
            let img1 = new Image(200, 200);
            img1.src = "../images/normal2.gif";
            $("body").append(img1);
            $('img').last().css({
                top: Math.random() * ($(window).height() - $('img').last().height()) + 'px',
            }).addClass("allBirds").addClass("normalBirds");
            $('img').last().on('dragstart', function (event) { event.preventDefault(); });
        }
    }
    normalBird();
    normalBird();

    /////////////////////// handling the timer 
    decreaseProgress = 200;
    timerID = setInterval(function () {
        if (!isGamePaused) {
            if (decreaseProgress < 0) {
                decreaseProgress = 0;
                loseEndGame(); // calling end game function when the time is out
            } else {
                $(".move_progress").css("width", decreaseProgress + '%').text(decreaseProgress + " Sec");
            }
            decreaseProgress -= 1;
            if (decreaseProgress < 50) { // the timer background color will be orange if the half time passes
                $(".move_progress").css({ backgroundColor: "orange" });
            }
            if (decreaseProgress < 25) {
                $(".move_progress").css({ backgroundColor: "red" });
            }
        }
    }, 700);

    ///// creation of black birds
    blackID = setInterval(function () {
        if (!isGamePaused) {
            let img1 = new Image(200, 200);
            img1.src = "../images/black.gif";
            $("body").append(img1);
            $('img').last().css({
                top: Math.random() * ($(window).height() - $('img').last().height()) + 'px',
            }).addClass("allBirds").addClass("blackBirds");
            $('img').last().on('dragstart', function (event) { event.preventDefault(); });
        }
    }, 4000);

    // creation of normal birds by calling the function 
    normalID = setInterval(function () {
        normalBird();
    }, 2500);

    ///// creation of gold birds
    goldID = setInterval(function () {
        if (!isGamePaused) {
            let img1 = new Image(200, 200);
            img1.src = "../images/gold.gif";
            $("body").append(img1);
            $('img').last().css({
                top: Math.random() * ($(window).height() - $('img').last().height()) + 'px',
            }).addClass("flipBird").addClass("allBirds").addClass("goldBirds");
            $('img').last().on('dragstart', function (event) { event.preventDefault(); });
        }
    }, 3000);

    // moving all birds
    flyingIntervalID = setInterval(function () {
        if (!isGamePaused) {
            $(".allBirds").css({ "left": "+=20px" });

            if (parseInt($(".allBirds").css("left")) > window.innerWidth) {
                $(".allBirds").first().remove();
            }
        }
    }, flyingSpeed);

    // score 
    livesCounter = 30;
    totalscore = 0;
    $("body").on("click", ".allBirds", function (e) {
        if (!isGamePaused) {
            bird = event.target.classList.value;
            // hunted birds
            dieDuck = document.querySelector(".dieDuck");
            dieDuck.currentTime = .4;
            dieDuck.play();
            setTimeout(function () {
                dieDuck.currentTime = 9;
            }, 500);
            $(this).attr("src", "../images/feather.png");
            setTimeout(() => {
                $(this).remove();
            }, 200);

            if (bird == ("allBirds normalBirds")) {
                totalscore += 5;
                score.innerText = totalscore;
                livesCounter -= 1;
            }
            else if (bird == ("allBirds blackBirds")) {
                totalscore -= 10;
                score.innerText = totalscore;
            } else if (bird == ("allBirds goldBirds")) {
                totalscore += 10;
                score.innerText = totalscore;
                livesCounter -= 1;
            } else { // the score for all bird when hitting a bomb
                totalscore += 5;
                score.innerText = totalscore;
                livesCounter -= 1;
            }
            if (livesCounter > 0) {
                $("#LivesLable").text("Lives = " + livesCounter);

            } else {
                $("#LivesLable").text("Lives = " + 0);
                winEndGame();
            }
        }
    });
}

function startPlayInterval() {
    localStorageItem = JSON.parse(localStorage.getItem("dataOfUser"));
    
    playTimeRemaining =localStorageItem[2];
    isGamePaused = false;
    updateTimerDisplay();
    playInterval = setInterval(function () {
        if (playTimeRemaining <= 0) {
            clearInterval(playInterval);
            startBreakInterval();
        } else {
            playTimeRemaining--;
            updateTimerDisplay();
        }
    }, 1000);
}

function startBreakInterval() {
    localStorageItem = JSON.parse(localStorage.getItem("dataOfUser"));
    
    breakTimeRemaining =localStorageItem[3];
    isGamePaused = true;
    updateTimerDisplay();
    Swal.fire({
        title: 'Break Time!',
        html: '<p>Game will resume after the break.</p>',
        timer: breakTimeRemaining * 1000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
        },
        willClose: () => {
            clearInterval(breakInterval);
            startPlayInterval();
        },
        allowOutsideClick: false
    });
    breakInterval = setInterval(function () {
        if (breakTimeRemaining <= 0) {
            clearInterval(breakInterval);
            Swal.close();
            startPlayInterval();
        } else {
            breakTimeRemaining--;
            updateTimerDisplay();
        }
    }, 1000);
}

function updateTimerDisplay() {
    if (isGamePaused) {
        timerDisplay.text('Break Time Remaining: ' + breakTimeRemaining + ' seconds');
    } else {
        timerDisplay.text('Play Time Remaining: ' + playTimeRemaining + ' seconds');
    }
}

function winEndGame() {
    clearInterval(timerID);
    clearInterval(blackID);
    clearInterval(goldID);
    clearInterval(normalID);
    clearInterval(flyingIntervalID);
    clearTimeout(playInterval);
    clearTimeout(breakInterval);
    if (localStorageItem[1] == "Hard") {
        clearInterval(bombID);
    }
    Swal.fire({
        title: 'Congratulations',
        icon: 'success',
        html: 'Thanks for this Game',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Play Again',
        cancelButtonText: 'Back',
        allowOutsideClick: false
    });
    $(".swal2-confirm").on("click", function () {
        location.href = "gamePage.html";
    });

    $(".swal2-cancel").on("click", function () {
        location.href = "home.html";
    });
}

function loseEndGame() {
    clearInterval(timerID);
    clearInterval(blackID);
    clearInterval(goldID);
    clearInterval(normalID);
    clearInterval(flyingIntervalID);
    clearTimeout(playInterval);
    clearTimeout(breakInterval);
    if (localStorageItem[1] == "Hard") {
        clearInterval(bombID);
    }
    Swal.fire({
        title: 'Game Over',
        icon: 'error',
        html: 'Ooops you lose this Game!',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Play Again',
        cancelButtonText: 'Back',
        allowOutsideClick: false
    });
    $(".swal2-confirm").on("click", function () {
        location.href = "../gameHTML/gamePage.html";
    });

    $(".swal2-cancel").on("click", function () {
        location.href = "../home.html";
    });
}
