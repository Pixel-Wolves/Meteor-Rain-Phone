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
            alpha = Math.round(event.alpha);
            beta = Math.round(event.beta);
            gamma = Math.round(event.gamma);
            this.x=beta;
            this.y=gamma;
            this.z=alpha;
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