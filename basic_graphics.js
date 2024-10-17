/**
 * @property {createjs.Bitmap} bitmap - Bitmap that is displayed
 */
class Background{
    constructor(images, dialogues, stage){
        this.images = images
        this.dialogues= dialogues;
        this.img = new Image();

        this.index = 0;

        // Function to handle image loading
        this.img.onload = () => {
            let bitmap = new createjs.Bitmap(this.img);
            bitmap.x = 0;
            bitmap.y = 0;
            this.text = new createjs.Text(this.dialogues[this.index], "16px Arial", "#000000");
            this.text.x = 0;
            this.text.y = 0;
            stage.removeAllChildren();  // Clear the previous image
            stage.addChild(bitmap);
            stage.addChild(this.text)
            stage.update();
        };

        // Set the first image to load initially
        this.img.src = this.images[this.index];
    }

    changeImage() {
        this.index = (this.index + 1) % this.images.length;
        this.img.src = this.images[this.index];  // Change the image source and trigger the onload event
    }
}