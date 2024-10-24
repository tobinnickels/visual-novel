document.addEventListener('DOMContentLoaded', function() {
    function main(){
        const stage = new createjs.Stage("Canvas");

        const bg = new BasicGraphics(["bruh.jpg", "cursed.jpeg"],["hee","hoo"],stage)

        // Add event listener for canvas click to change the image
        stage.on("stagemousedown", bg.changeImage.bind(bg));

        // Enable tick to keep the stage updated
        createjs.Ticker.framerate = 60;
        createjs.Ticker.addEventListener("tick", stage);

    };    
    main();
});