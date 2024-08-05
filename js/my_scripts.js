
$(document).ready(function(){
    // Loading footer info
    $("#footer").load("load.html");

    // Event for when "Start!"" button is clicked
    $("#start_button").click(function(){
        startGame();
        $("#start_button").off("click");
    });

    // Changing button style
    $("#start_button").css({
        "background-color": "#dcdac1",
        "color": "#ca633e",
        "font-size": "25px",
        "width": "120px",
        "height": "50px",
        "border-radius": "10px",
        "border": "2px solid #ca633e",
    });

    // When image is clicked inside gamespace, it adds to score and hides image
    $("#gamespace").on("click", ".image", function(){
        scoreIncrement();
        $(this).hide();
    });
});

// Returns a random number for the popup image height
function randomHeight() {
    const height = Math.floor(Math.random() * 200);
    return height;
};

// Returns a random number for the popup image width
function randomWidth() {
    const width = Math.floor(Math.random() * 450);
    return width;
};

// Declaring global variable for score
let score = 0;

// Increases score variable by 1
function scoreIncrement() {
    score ++;
    $("#score").html(`${score} pts`);
};

function startGame() {

    // Displays timer upon page load
    $("#timer").show();
    
    // Function that makes timer count down
    countdown();

    // Function that adds image to gamespace
    addImage();

}

// Declaring global variable for timer
let timer;
let timeLeft = 30;
let imageInterval;

// Countdown timer
function countdown() {

    // Clears existing code
    clearTimeout(timer);
    clearTimeout(imageInterval);

    timeLeft = 30;
    $("#timer").html(`${timeLeft} seconds left`);

    // Timer counts down from 30 to 0 and stops at 0
    timer = setInterval(function() {
        timeLeft--;
        $("#timer").html(`${timeLeft} seconds left`);
        if (timeLeft <= 0) {
            clearTimeout(timer);
            clearTimeout(imageInterval);
            
            endGame();
        }
    }, 1000);

    // Images appear at random intervals
    function setDynamicInterval() {
        clearInterval(imageInterval);
        imageInterval = setInterval(function() {
            addImage();
            setDynamicInterval();
        }, randInterval());
    }

    setDynamicInterval();
}

// Global variables for addImage() function
let extra;
let count = 0;
let imgId = `imageA${count}`;

// Adds image to gamespace
function addImage() {
    let xPos = randomWidth();
    let yPos = randomHeight();
    $("#gamespace").append(`<img class='image' id='${imgId}' src='img/jae_jazzy_jabamole.png' style='left: ${xPos}px; top: ${yPos}px;'/>`);

    // Images disappear at random intervals
    setTimeout(() => removeImage(imgId), disappearInterval());

    // Generates random IDs for images
    count++;
    clearTimeout();
}

// Creates a random interval for images to appear at
function randInterval() {
    return Math.floor(Math.random() * 2001);
}

// Creates random interval for images to disappear at (must be onscreen between 0.5 and 1.2 seconds)
function disappearInterval() {
    return Math.floor(Math.random() * 1201) + 501;
}

// Makes images disappear from gamespace
function removeImage() {
    $(`#${imgId}`).remove();
}

/* Once the timer hits 0, the game is done.
The player will get an alert stating their score and
the game will be able to be played again. The score
is reset to 0. */
function endGame() {
    alert(`Congratulations! Your score was ${score}.`);
    score = 0;
    $("#score").html(`${score} pts`);
    $("#start_button").on("click", function(){
        startGame();
        $("#start_button").off("click");
    });
}