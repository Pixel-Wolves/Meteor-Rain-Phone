class Meteor{
    constructor(harmGroup, fallingVelocity){
        this.sprite = createSprite(random(0,canvas.width),-50);
        this.mainImage = loadAnimation("sprites/Meteor1.png", "sprites/Meteor2.png");
        this.mainImage.frameDelay = 2;
        this.sprite.addAnimation("Main", this.mainImage);
        this.fallingVelocity = fallingVelocity;
        this.sprite.velocityY = this.fallingVelocity;
        this.harmGroup = harmGroup;
        this.harmGroup.add(this.sprite);
        this.sprite.scale = canvas.width/2800;
        this.sprite.setCollider("circle", 0, 0, 192/2);
        this.sprite.lifetime = 200;
    }
}