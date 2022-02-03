class Controls{
    constructor(){
        this.x=0;
        this.y=0;
        this.z=0;
        this.jmp=0;
        this.blst=0;
    }

    display(){
        window.addEventListener("deviceorientation",function(event) {
            this.x=Math.round(event.beta);
            this.y=Math.round(event.gamma);
            this.z=Math.round(event.alpha);
        }, true);

        if(touches.lenght != 0){
            this.jmp=1;
        }
        else{
            this.jmp=0;
        }

        if(this.z != 0){
            this.blst=1;
        }
        else{
            this.blst=0;
        }
    }
}