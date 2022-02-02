class Player{
    constructor(){
        // Position
        this.x = windowWidth/2;
        this.y = 0;

        // Sprite
        this.sprite = createSprite(this.x,this.y);

        // Flip
        this.facingRight = true;

        // Friction & Collission
        this.friction = 0.05;
        this.isGrounded = false;
        this.groundCheck = createSprite(this.x,this.y+30,10,10);
        this.groundCheck.visible = false;
        this.ground
        this.jumpForce = windowHeight/60;

        // Gravity
        this.gravity = windowHeight/800;

        // Animation
        this.idle = loadAnimation("sprites/Idle.png");
        this.walk = loadAnimation("sprites/Walk1.png","sprites/Walk2.png","sprites/Walk3.png","sprites/Walk4.png","sprites/Walk5.png","sprites/Walk6.png");
        this.walk.frameDelay = 2;
        this.jump = loadAnimation("sprites/Jump.png");
        this.fall = loadAnimation("sprites/Fall2.png","sprites/Fall4.png","sprites/Fall6.png","sprites/Fall8.png");
        this.fall.frameDelay = 1;
        this.dash = loadAnimation("sprites/Dash1.png","sprites/Dash3.png","sprites/Dash5.png","sprites/Dash7.png","sprites/Dash2.png","sprites/Dash4.png","sprites/Dash6.png");
        this.dash.frameDelay = 1;
        this.hurt = loadAnimation("sprites/Hurt.png");
        this.skid = loadAnimation("sprites/Skid.png");

        // SFX
        this.jumpSound = jumpSFX;

        // SFX Bools
        this.jsPlayed = false;
        this.fanPlayed = false;

        // SFX assign
        this.gdSFX = gdSFX;
        this.adSFX = adSFX;

        // Animation assign
        this.sprite.addAnimation("Idle", this.idle);
        this.sprite.addAnimation("Walk", this.walk);
        this.sprite.addAnimation("Jump", this.jump);
        this.sprite.addAnimation("Fall", this.fall);
        this.sprite.addAnimation("Dash", this.dash);
        this.sprite.addAnimation("Hurt", this.hurt);
        this.sprite.addAnimation("Skid", this.skid);

        // Dash bools
        this.dashed = false;
        this.airDashed = false;

        // Scale set
        this.sprite.scale = windowWidth/1600;
        this.sprite.setCollider("rectangle",0,40,95,115);

        // Shield
        this.shield = createSprite(this.x, this.y);
        this.shieldAnim = loadAnimation("sprites/Shield1.png","sprites/Shield2.png","sprites/Shield3.png","sprites/Shield4.png","sprites/Shield5.png","sprites/Shield6.png","sprites/Shield7.png","sprites/Shield8.png");
        this.shieldAnim.frameDelay = 1;
        this.shield.addAnimation("Main", this.shieldAnim);
        this.shield.scale = windowWidth/1600;
        this.shield.visible = false;
        this.shieldTime = 200;
    }

    display(){        
        // Ground Check movement
        this.groundCheck.x = this.sprite.x;
        this.groundCheck.y = this.sprite.y+this.sprite.scale*100;

        this.shield.x = this.sprite.x;
        this.shield.y = this.sprite.y+24;

        // Shield Disappear
        if(this.shield.visible == true){
            this.shieldTime -= 1;
        }
        else{
            this.shieldTime = 200;
        }

        if(this.shieldTime == 0 || this.shieldTime < 0){
            this.shield.visible = false;
        }

        // Collide
        if(gameState === "play" || gameState === "start"){
            this.sprite.collide(mainGround);
        }

        // Limit sprite velocity
        if(this.dashed == false){
            if(this.sprite.velocityX > this.sprite.scale*15){
                this.sprite.velocityX = this.sprite.scale*15;
            }
            else if (this.sprite.velocityX < -this.sprite.scale*15){
                this.sprite.velocityX = -this.sprite.scale*15;
            }
        }
        else{
            if(this.sprite.velocityX > this.sprite.scale*25){
                this.sprite.velocityX = this.sprite.scale*25;
            }
            else if (this.sprite.velocityX < -this.sprite.scale*25){
                this.sprite.velocityX = -this.sprite.scale*25;
            }
        }

        // Limit sprite to canvas
        if(this.sprite.x < 0){
            this.sprite.x = 0;
        }
        if(this.sprite.x > width){
            this.sprite.x = width;
        }
    }

    movement(){
        var playerSprite = this.sprite;

        // Is Grounded
        if(this.groundCheck.isTouching(mainGround)){
            this.isGrounded = true;
        }
        else{
            this.isGrounded = false;
        }

        // Walk
        if(keyDown(RIGHT_ARROW) && !keyDown(LEFT_ARROW) || controls.x > 0){
            playerSprite.velocityX += playerSprite.scale * 3;
        }
        else if(keyDown(LEFT_ARROW) && !keyDown(RIGHT_ARROW) || controls.x < 0){
            playerSprite.velocityX -= playerSprite.scale * 3;
        }

        // Jump
        if(keyDown(32) && this.isGrounded == true && gameState != "end" || controls.jmp > 0 && this.isGrounded == true && gameState != "end"){
            playerSprite.velocityY -= this.jumpForce;
            this.spaceReleased = false;
        }

        // Dash
        if(keyDown(16) && this.dashed == false || controls.blst > 0 && this.dashed == false){
            if(this.facingRight == true){
                playerSprite.velocityX += this.jumpForce;
            }
            else{
                playerSprite.velocityX -= this.jumpForce;
                
            }

            if(this.isGrounded == false){
                playerSprite.velocityY = 0;
            }
            else{
                this.gdSFX.play();
            }

            this.dashed = true;
        }

        // Air Dash
        if(keyDown(16) && this.isGrounded == false && this.airDashed == false || controls.blst > 0 && this.isGrounded == false && this.airDashed == false){
            if(this.facingRight == true){
                playerSprite.velocityX += this.jumpForce;
                playerSprite.velocityY = 0;
                this.adSFX.play();
                this.airDashed = true;
            }
            else{
                playerSprite.velocityX -= this.jumpForce;
                playerSprite.velocityY = 0;
                this.adSFX.play();
                this.airDashed = true;
            }
        }

        // Gravity & Friction
        this.sprite.velocityY += this.gravity;
        this.sprite.velocityX = this.sprite.velocityX * 0.95;

        console.log(this.isGrounded)
    }
    
    animation(){
        // Animations
        if(this.isGrounded == true){
            if(this.sprite.velocityX < this.sprite.scale/10 && this.sprite.velocityX > -this.sprite.scale/10){
                this.sprite.changeAnimation("Idle");
                this.sprite.velocityX = 0;
                this.dashed = false;
            }
            else if (this.sprite.velocityX > this.sprite.scale/10 && this.sprite.velocityX < this.sprite.scale*20 || this.sprite.velocityX < -this.sprite.scale/10 && this.sprite.velocityX > -this.sprite.scale*20){
                this.sprite.changeAnimation("Walk");
            }
            else{
                this.sprite.changeAnimation("Dash");
            }
            this.jsPlayed = false;
            this.airDashed = false;

            if(keyIsDown(RIGHT_ARROW) 
            && this.sprite.velocityX < -0.8 
            && !keyDown(LEFT_ARROW) 
            || keyIsDown(LEFT_ARROW) 
            && this.sprite.velocityX > 0.8 
            && !keyDown(RIGHT_ARROW)){
                this.sprite.changeAnimation("Skid");
            }
        }
        else{
            if(this.jsPlayed == false){
                this.jumpSound.play();
                this.jsPlayed = true;
            }
            
            if(this.dashed == false){
                if(this.sprite.velocityY < 0){
                    this.sprite.changeAnimation("Jump");
                }
                else{
                    this.sprite.changeAnimation("Fall");
                }
            }
            else{
                this.sprite.changeAnimation("Fall");
            }
        }

        // Flip
        if(this.facingRight == true && keyDown(LEFT_ARROW) && !keyDown(RIGHT_ARROW)
        || this.facingRight == true && controls.x < 0){
            this.facingRight = false;
            this.sprite.mirrorX(this.sprite.mirrorX() * -1);
        }
        else if (this.facingRight == false && keyDown(RIGHT_ARROW) && !keyDown(LEFT_ARROW)
        || this.facingRight == false && controls.x > 0){
            this.facingRight = true;
            this.sprite.mirrorX(this.sprite.mirrorX() * -1);
        }
    }

    endGame(){
        this.sprite.changeAnimation("Hurt");
        hurtSFX.play();
        this.sprite.velocityY = -10;
        gameState = "end";
    }

    reset(){
        this.sprite.x = windowWidth/2;
        this.sprite.y = 0;
        this.sprite.velocityY = 10;
        this.sprite.velocityX = 0;
        score = 0;
    }
}