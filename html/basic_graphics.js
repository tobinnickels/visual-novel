/**
 * @property {Array} images - Array of image file names as strings.
 * 
 * @property {Array} dialogues - Array of dialogue strings.
 * 
 * @property {Image} img - Image object with current image as source.
 * 
 * @property {createjs.Text} text -  CreateJS Text object with current dialogue. Also use to set
 *                                   font size and color.
 * 
 * @property {Number} index - Current index for images and dialogues.
 * 
 * @method update - Increment index and load next Image.
 */
class BasicGraphics{
    constructor(images, dialogues, stage){
        this._images = images
        this._dialogues= dialogues;
        this._img = new Image();

        this._index = 0;

        // Add Bitmap of img and Text to stage
        // when new Image loads.
        this._img.onload = () => {
            let bitmap = new createjs.Bitmap(this._img);
            bitmap.x = 0;
            bitmap.y = 0;
            this._text = new createjs.Text(this._dialogues[this._index], "16px Arial", "#000000");
            this._text.x = 0;
            this._text.y = 0;
            stage.removeAllChildren();
            stage.addChild(bitmap);
            stage.addChild(this._text)
            stage.update();
        };

        // Set the first image to load initially
        this._img.src = this._images[this._index];
    }

    /**
     * Used with Stage's "mousedown" event to trigger loading
     * next image and text when the Stage is clicked.
     */
    update() {
        this._index = (this._index + 1) % this._images.length;
        this._img.src = this._images[this._index];  // Change the image source and trigger the onload event
    }
}