class Controls{
    constructor(){
        this.leftButton = createSprite(windowWidth/10,windowHeight-windowHeight/6);
        this.rightButton = createSprite(windowWidth/10*2.5,windowHeight-windowHeight/6);
        this.jumpButton = createSprite(windowWidth-windowWidth/10*2.5,windowHeight-windowHeight/6);
        this.blastButton = createSprite(windowWidth-windowWidth/10,windowHeight-windowHeight/6);

        this.lftB_Img = loadImage("OS-Controls/Left.png");
        this.rgtB_Img = loadImage("OS-Controls/Right.png");
        this.jmpB_Img = loadImage("OS-Controls/Jump.png");
        this.blstB_Img = loadImage("OS-Controls/Blast.png");

        this.leftButton.addImage("Main", this.lftB_Img);
        this.rightButton.addImage("Main", this.rgtB_Img);
        this.jumpButton.addImage("Main", this.jmpB_Img);
        this.blastButton.addImage("Main", this.blstB_Img);
        
        this.leftButton.scale = windowWidth/800;
        this.rightButton.scale = windowWidth/800;
        this.jumpButton.scale = windowWidth/800;
        this.blastButton.scale = windowWidth/800;

        this.x=0;
        this.jmp=0;
        this.blst=0;
    }

    display(){


        if(mousePressedOver(this.leftButton)){
            this.x=-1;
        }
        else if (mousePressedOver(this.rightButton)){
            this.x=1;
        }
        else{
            this.x=0;
        }

        if(mousePressedOver(this.jumpButton)){
            this.jmp=1;
        }
        else{
            this.jmp=0;
        }

        if(mousePressedOver(this.blastButton)){
            this.blst=1;
        }
        else{
            this.blst=0;
        }

        console.log(this.x)
    }
}