class Form{
    constructor(){
        this.start = createButton("START");
        this.start.style('height','60px');
        this.help = createButton("HELP");
        this.help.style('height','60px');
        this.options = createButton("OPTIONS");
        this.options.style('height','60px');
        this.miniGames = createButton("MINI GAMES");
        this.miniGames.style('height','60px');
        this.miniGames.style('font-size','17px');
    }
    display(){
        this.start.position(250,200);
        this.help.position(270,265);
        this.options.position(290,330);
        this.miniGames.position(310,395)
        //this.miniGames.hide();
        
        this.start.mousePressed(()=>{
         if(assembled === false){
             gameState = "assemble";
             this.hide();
             componentG.setVisibleEach(true);
             dark.visible = true;
             ground.visible = true;
             document.getElementById("name").style.display = "none";
            }else if(landed === true){
                tutorial.style.display = "none";
                speechBubble.visible = false;
                gameState = "landed";
                this.hide();
                document.getElementById("name").style.display = "none";
            } else {
             this.hide();
             rocket.visible = true;
             gameState = "tutorial";
             document.getElementById("name").style.display = "none";
            }
        });
    

        this.help.mousePressed(()=>{
         this.hide();
        });

        this.options.mousePressed(()=>{
         this.hide();
         gameState = "options";

        });
        

        if(gameState === "options"){
         background(bg2);
         fill(255);
         textSize(25);
         stroke(255);
         text("VOLUME",400,200);
         text("TUTORIALS",400,300);

         var k=document.getElementById("sl");
         k.style.display = "inline-block";

         var l = document.getElementsByClassName("switch");
         l[0].style.display = "inline-block";
         
         isChecked = document.getElementById("check").checked;
         
         if(isChecked === true){
             speechState = 0;
         } else {
             speechState = 31;
         }

        }else{
         var k=document.getElementById("sl");
         k.style.display = "none";

         var l = document.getElementsByClassName("switch");
         l[0].style.display = "none";
        }

        this.miniGames.mousePressed(()=>{
            
            this.hide();
            gameState = "mini-games";
            
        });



    }

    hide(){
        this.start.hide();
        this.help.hide();
        this.options.hide();
        this.miniGames.hide();
    }
}