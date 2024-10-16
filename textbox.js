/**
 * @property {createjs.Container} box - Object that stores text and rectangle
 */
class TextBox {
    /**
     * 
     * 
     * @param {Array<string>} txtLst - List of dialogues.
     */
    constructor(dialogues,stage){
        this.dialogues= dialogues;
        this.index = 0;
        this.stage = stage;
        this.rectangle = new createjs.Shape();

        // Define the rectangle's fill and outline
        this.rectangle.graphics.beginFill("blue")  // Fill color
                            .setStrokeStyle(2)  // Outline thickness
                            .beginStroke("black")  // Outline color
                            .drawRect(0, 0, 200, 100);  // Draw rectangle (x, y, width, height)

        this.rectangle.x = 0;  // Set x position
        this.rectangle.y = 400;   // Set y position

        // Add the rectangle to the stage
        this.text = new createjs.Text("hiiiii", "36px Arial", "#000000");
        this.text.x = 10;
        this.text.y = 410;

        // Set the position of the container
        this.rectangle.x = 0;
        this.rectangle.y = 100;
        this.stage.addChild(this.rectangle);
        this.stage.addChild(this.text);
        this.stage.update();
    }

    changeText(){
        this.index = (this.index + 1) % this.dialogues.length;
        this.text = this.dialogues[this.index];
        this.stage.update();
    }
}