document.addEventListener('DOMContentLoaded', function() {
    function main(){
        const stage = new createjs.Stage("Canvas");

        // Image sources
        const background = new Background(["bruh.jpg", "cursed.jpeg"],["hee","hoo"],stage)

        // Add event listener for canvas click to change the image
        stage.on("stagemousedown", background.changeImage.bind(background));

        // Enable tick to keep the stage updated
        createjs.Ticker.framerate = 60;
        createjs.Ticker.addEventListener("tick", stage);

    };    
    main();
});