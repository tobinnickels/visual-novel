/**
 * @property {createjs.Bitmap} bitmap - Bitmap that is displayed
 */
class Background{
    constructor(images,stage){
        this.images = images
        this.img = new Image();
        this.currentImageIndex = 0;

        // Function to handle image loading
        this.img.onload = () => {
            let bitmap = new createjs.Bitmap(this.img);
            bitmap.x = 0;
            bitmap.y = 0;
            stage.removeAllChildren();  // Clear the previous image
            stage.addChild(bitmap);
            stage.update();
        };

        // Set the first image to load initially
        this.img.src = this.images[this.currentImageIndex];
    }

    changeImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.img.src = this.images[this.currentImageIndex];  // Change the image source and trigger the onload event
    }
}