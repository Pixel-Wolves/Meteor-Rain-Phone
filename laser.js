class Laser{
    constructor(harmGroup){
        this.sprite = createSprite(random(0,canvas.width),canvas.height/2);
        this.spAnim = loadAnimation("sprites/Laser1.png", "sprites/Laser2.png", "sprites/Laser3.png");
        this.spAnim.looping = false;
        this.spAnim.frameDelay = 1;
        this.spAnim.height = canvas.height;
        this.sprite.addAnimation("Main", this.spAnim);
        laserSFX.play();
        this.sprite.scale = canvas.width/400;
        this.sprite.setCollider("rectangle", 0, 0, 10, canvas.height);
        this.harmGroup = harmGroup;
        this.harmGroup.add(this.sprite);
        this.sprite.lifetime = 5;
    }
}