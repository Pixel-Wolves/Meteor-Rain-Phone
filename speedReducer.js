class SR{
    constructor(){
        this.sprite = createSprite(random(0,canvas.width),-50);
        this.mainAnim = loadAnimation("sprites/SR1.png", "sprites/SR2.png");
        this.mainAnim.frameDelay = 3;
        this.sprite.addAnimation("Main", this.mainAnim);
        this.sprite.velocityY = fallSpeed;
        this.sprite.scale = canvas.width/2800;
        this.sprite.lifetime = 200;
        srGroup.add(this.sprite);
    }
}