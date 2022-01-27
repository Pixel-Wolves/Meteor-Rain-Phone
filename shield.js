class Shield{
    constructor(){
        this.sprite = createSprite(round(random(0,canvas.width)));
        this.mainAnim = loadAnimation("sprites/Shield1.png","sprites/Shield2.png","sprites/Shield3.png","sprites/Shield4.png","sprites/Shield5.png","sprites/Shield6.png","sprites/Shield7.png","sprites/Shield8.png");
        this.mainAnim.frameDelay = 1;
        this.sprite.addAnimation("Main", this.mainAnim);
        this.sprite.scale = canvas.width/1600;
        this.sprite.velocityY = fallSpeed;
        shieldGroup.add(this.sprite);
        this.sprite.lifetime = 200;
    }
}