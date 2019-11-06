// the actual experiment
var informativeness = {
  // Parameters for this sequence.
  trial: ["filler1","filler2",1,2,3,4,5],
  agents: ["Monkey_filler","Frog_filler","Bunny","Cat","Dog","Frog","Monkey"],
  back: [2,7,4,9,6,1,8],
  trees: ["tree1","tree2","tree3","tree4","tree5","tree6","tree7"],
  agentOrient:    [
    ["straight","point","down"],
    ["straight","point","down"],
    ["straight","point","down"],
    ["straight","point","down"],
    ["straight","point","down"],
    ["straight","point","down"],
    ["straight","point","down"]],
  leftFruit: ["t11","t12","t13","t14","t15","t16","t17"],
  rightFruit: ["t18","t19","t20","t36","t37","t38","t39"],
  inf: ["left","right","left","left","right","left","right"],
  data: [],
  targetPosition: ["inner","outer","inner","outer","inner","outer","inner"],
targetSwitch: ["stay","switch","switch","stay","switch","stay","stay"],

    
    
// end of the experiment
  end: function() {
    // Show the finish slide.
    showSlide("select");
        $(".table_l").show();
    	$(".table_r").show();  
    setTimeout(function() { turk.submit(informativeness) }, 500);
  },
    
  
// what happens between trials - display agent from previous trial and click on it to move on to the next trial    
   eat: function(event) {

       
    showSlide("eat");
    
    background("images/back"+informativeness.back[0]+".jpg");

    showEat(informativeness.agents[0])
   
    $(".agent_eat").click(informativeness.newtrial); 
       

       sourceSound("sound/end.mp3");
       playSound();

       $("#fruit_inf_l").css({opacity: '1'})
       $("#fruit_inf_l2").css({opacity: '1'})
       $("#fruit_inf_r").css({opacity: '1'})
       $("#fruit_inf_r2").css({opacity: '1'})
       $("#tree_r").css({opacity: '1'})
       $("#tree_l").css({opacity: '1'})
         
  },
 
 
// unbind and shif variables between trials      
 newtrial: function() {
     
     $(".selector_l").css("border","none")
     
     $(".selector_r").css("border","none")
     
     $(".fruit_inf_l").css("border","none")
    $(".fruit_inf_l2").css("border","none")
    $(".fruit_inf_r").css("border","none")
    $(".fruit_inf_r2").css("border","none") 

     
    $(".agent_eat").unbind("click"); 
     
     $(".selector_r").unbind("click");
     $(".selector_l").unbind("click");
   
    sourceInfLeftFruit("images/empty.png");
            showInfLeftFruit(); 
    sourceInfRightFruit("images/empty.png");
            showInfRightFruit();
      sourceInfLeftFruit2("images/empty.png");
            showInfLeftFruit(); 
    sourceInfRightFruit2("images/empty.png");
            showInfRightFruit();
     
    
    
    informativeness.agentOrient.shift(); 
    informativeness.agents.shift(); 
    informativeness.inf.shift();
    informativeness.rightFruit.shift();
    informativeness.leftFruit.shift();
    informativeness.back.shift(); 
    informativeness.targetPosition.shift();
     informativeness.targetSwitch.shift();
     informativeness.trees.shift();
     informativeness.trial.shift();
   
 
   informativeness.next();
  },


// recording the choice 
  choice: function() {
    
    showSlide("choice"); 
    
    background2("images/back"+informativeness.back[0]+".jpg");
      
    choiceAgent(informativeness.agents[0],"choice")
      
    showLeftChoiceFriend(informativeness.trees[0])
     
    showRightChoiceFriend(informativeness.trees[0])
      
      
    $(".selector_l").show();
      
    $(".selector_r").show();
    
      
      sourceSound("sound/" + informativeness.agents[0] + "_more.mp3");
      playSound();

      setTimeout(function() {
      sourceSound("sound/" + informativeness.agents[0] + "_which.mp3");
      playSound();
      }, 2750) 

 
      choiceInfRightFruit("images/empty.png") 
      choiceInfRightFruit2("images/empty.png") 
      choiceInfLeftFruit("images/empty.png") 
      choiceInfLeftFruit2("images/empty.png") 
      
      
    

      
if (informativeness.targetSwitch[0] == "stay") {
      
          if (informativeness.inf[0] == "left") {
                
                
              if (informativeness.targetPosition[0] == "inner"){
                    
                  choiceInfLeftFruit("images/"+informativeness.leftFruit[0]+".png");
                   
                  choiceInfLeftFruit2("images/empty.png");
                   
                   
                  choiceInfRightFruit("images/empty.png");
                   
                  choiceInfRightFruit2("images/"+informativeness.rightFruit[0]+".png");   
                   
              } else {                                
              
                  choiceInfLeftFruit("images/empty.png");
                   
                  choiceInfLeftFruit2("images/"+informativeness.leftFruit[0]+".png");
                   
                   
                  choiceInfRightFruit("images/"+informativeness.rightFruit[0]+".png");

                  choiceInfRightFruit2("images/empty.png");

              }; 

          } else { 

              if (informativeness.targetPosition[0] == "outer"){

                  choiceInfLeftFruit("images/empty.png");

                  choiceInfLeftFruit2("images/"+informativeness.leftFruit[0]+".png");


                  choiceInfRightFruit2("images/"+informativeness.rightFruit[0]+".png");

                  choiceInfRightFruit("images/empty.png");   

              } else {                                

                  choiceInfLeftFruit("images/"+informativeness.leftFruit[0]+".png");

                  choiceInfLeftFruit2("images/empty.png");


                  choiceInfRightFruit2("images/empty.png");

                  choiceInfRightFruit("images/"+informativeness.rightFruit[0]+".png");

              }; 

          };

      } else {

          if (informativeness.inf[0] == "left") {

              
              if (informativeness.targetPosition[0] == "inner"){

                  choiceInfRightFruit2("images/"+informativeness.leftFruit[0]+".png");

                  choiceInfRightFruit("images/empty.png");


                  choiceInfLeftFruit2("images/empty.png");

                  choiceInfLeftFruit("images/"+informativeness.rightFruit[0]+".png");   

              } else {                                
                        
                  choiceInfRightFruit2("images/empty.png");

                  choiceInfRightFruit("images/"+informativeness.leftFruit[0]+".png");


                  choiceInfLeftFruit2("images/"+informativeness.rightFruit[0]+".png");

                  choiceInfLeftFruit("images/empty.png");

              }; 
            
          } else { 

              if (informativeness.targetPosition[0] == "outer"){

                  choiceInfRightFruit2("images/empty.png");

                  choiceInfRightFruit("images/"+informativeness.leftFruit[0]+".png");


                  choiceInfLeftFruit("images/"+informativeness.rightFruit[0]+".png");

                  choiceInfLeftFruit2("images/empty.png");   

              } else {                                

                  choiceInfRightFruit2("images/"+informativeness.leftFruit[0]+".png");

                  choiceInfRightFruit("images/empty.png");


                  choiceInfLeftFruit("images/empty.png");

                  choiceInfLeftFruit2("images/"+informativeness.rightFruit[0]+".png");

              }; 

          };

      };
    
      
    // choice can be made by clicking the objects after 

      setTimeout(function() {
            
          $(".selector_l").click(function() {
              
              var clickedItem = event.target;
              
              var pick = event.target.id;
              
              clickedItem.style.border = '5px solid blue';
              
              $(".selector_l").unbind("click");
              
              $(".selector_r").hide();
       
              if (informativeness.inf[0]=="left" &&   informativeness.targetSwitch[0] == "stay") {
       
                  var correct =1
                  
                  } else if (informativeness.inf[0]=="right" && informativeness.targetSwitch[0] == "switch") {
                      
                      var correct =1
                      
                      } else {
                      
                          var correct = 0
                      };
       
      
    // data collected  
      data = {
        subid: train.subid,
        subage: train.subage,
        task: "informativeness",
        trial: informativeness.trial[0],
        agent: informativeness.agents[0],
        leftObject: informativeness.leftFruit[0],
        rightObject: informativeness.rightFruit[0],
        correct_location: informativeness.inf[0],
        pick: pick,
        correct: correct
            };
     
          informativeness.data.push(data);
              
                  setTimeout(function() {
                      clickedItem.style.border = '0px';
                      informativeness.eat()
                  }, 1500)
          });
   
          $(".selector_r").click(function() {
              
              var clickedItem = event.target;
              
              var pick = event.target.id;
              
              clickedItem.style.border = '5px solid blue';
              
              $(".selector_r").unbind("click");
              
              $(".selector_l").hide();
              
               var endTime = (new Date()).getTime();    
    
              if (informativeness.inf[0]=="right" &&   informativeness.targetSwitch[0] == "stay") {
       
                  var correct =1
                  
                  } else if (informativeness.inf[0]=="left" && informativeness.targetSwitch[0] == "switch") {
                      
                      var correct =1
                      
                      } else {
                      
                          var correct = 0
                      };

   
      
    // data collected  
      data = {
        subid: train.subid,
        subage: train.subage,
        task: "informativeness",
        trial: informativeness.trial[0],
        agent: informativeness.agents[0],
        leftObject: informativeness.leftFruit[0],
        rightObject: informativeness.rightFruit[0],
        correct_location: informativeness.inf[0],
        pick: pick,
        correct: correct
            };
      informativeness.data.push(data);
                 
              setTimeout(function() {
                  clickedItem.style.border = '0px';
                  informativeness.eat()
              }, 1500)
                       });

      }, 3000)  
  
},

    
    
// moving on within a trial
  next: function() {
  // when training is over show sinished training slide 
$(".moveButton").unbind("click"); 
   // when no more trials are left, end experiment    
    if (informativeness.trial.length == 0){
        setTimeout(function() {informativeness.end() }, 0);
      return;
    };  
      
  // after exposure is finished, switch to choice      
    
    showLeftFriend(informativeness.trees[0])
     
      showRightFriend(informativeness.trees[0])
      
      
      showSlide("stage");  
      
      $(".table_l").hide();
    $(".table_r").hide();  
      
      showAgent(informativeness.agents[0],informativeness.agentOrient[0][0]);
      
      
     if (informativeness.agentOrient[0][0] == "straight"){ 
      
  //    sourceSound("sound/"+informativeness.agents[0]+"_hello.mp3");
    //  playSound();
      
      //setTimeout(function() {
         sourceSound("sound/"+informativeness.agents[0]+"_inf_intro.mp3");
         playSound();
         
        pause("moveButton",3000);
         
    //  }, 3000)   
      
     }
      
      
      background("images/back"+informativeness.back[0]+".jpg");
  
  if (informativeness.trial[0] == "filler1"){
      
        sourceInfLeftFruit("images/"+informativeness.leftFruit[0]+".png");
        showInfLeftFruit(); 
        sourceInfLeftFruit2("images/empty.png");
        showInfLeftFruit2(); 
        sourceInfRightFruit("images/empty.png");
        showInfRightFruit();
        sourceInfRightFruit2("images/"+informativeness.rightFruit[0]+".png");
        showInfRightFruit2(); 
    } else  if (informativeness.trial[0] == "filler2"){
       sourceInfLeftFruit2("images/"+informativeness.leftFruit[0]+".png");
        showInfLeftFruit2(); 
        sourceInfLeftFruit("images/empty.png");
        showInfLeftFruit(); 
        sourceInfRightFruit("images/empty.png");
        showInfRightFruit();
        sourceInfRightFruit2("images/"+informativeness.rightFruit[0]+".png");
        showInfRightFruit2();    
        
    } else {
        
            if (informativeness.inf[0] == "left") {
                
                
               if (informativeness.targetPosition[0] == "inner"){
                    
                   sourceInfLeftFruit("images/"+informativeness.leftFruit[0]+".png");
                   showInfLeftFruit(); 
                   sourceInfLeftFruit2("images/"+informativeness.rightFruit[0]+".png");
                   showInfLeftFruit2();
                   
                   sourceInfRightFruit("images/empty.png");
                    showInfRightFruit();
                   sourceInfRightFruit2("images/"+informativeness.rightFruit[0]+".png");
                    showInfRightFruit2();
                   
                   
               } else {                                
                
                   sourceInfLeftFruit("images/"+informativeness.rightFruit[0]+".png");
                   showInfLeftFruit(); 
                   sourceInfLeftFruit2("images/"+informativeness.leftFruit[0]+".png");
                   showInfLeftFruit2();
                   
                   sourceInfRightFruit("images/"+informativeness.rightFruit[0]+".png");
                   showInfRightFruit();
                   sourceInfRightFruit2("images/empty.png");
                   showInfRightFruit2();
                
                }; 
            
            } else { 
               
         if (informativeness.targetPosition[0] == "outer"){
                    
                   sourceInfLeftFruit("images/empty.png");
                   showInfLeftFruit(); 
                   sourceInfLeftFruit2("images/"+informativeness.leftFruit[0]+".png");
                   showInfLeftFruit2();
                   
                   sourceInfRightFruit2("images/"+informativeness.rightFruit[0]+".png");
                    showInfRightFruit2();
                   sourceInfRightFruit("images/"+informativeness.leftFruit[0]+".png");
                    showInfRightFruit();
                   
                   
               } else {                                
                
                   sourceInfLeftFruit("images/"+informativeness.leftFruit[0]+".png");
                   showInfLeftFruit(); 
                   sourceInfLeftFruit2("images/empty.png");
                   showInfLeftFruit2();
                   
                   sourceInfRightFruit2("images/"+informativeness.leftFruit[0]+".png");
                    showInfRightFruit2();
                   sourceInfRightFruit("images/"+informativeness.rightFruit[0]+".png");
                    showInfRightFruit();
                
                }; 
            };
    };
 
 
      
            if (informativeness.agentOrient[0][0] == "point") {
          
                  sourceSound("sound/"+informativeness.agents[0]+"_label.mp3");
                  playSound();   
              
              pause("moveButton",6000);
          
              if (informativeness.inf[0] == "left"){
              
                  showAgent(informativeness.agents[0],"point_l")      
         
              $("#"+informativeness.trees[0]+"_l").animate({bottom: '200', queue:  false},300)
              $("#fruit_inf_l").animate({bottom: '530', queue:  true},300)
              $("#fruit_inf_l2").animate({bottom: '530', queue:  true},300)
              $("#"+informativeness.trees[0]+"_l").animate({bottom: '160', queue:    true},300)
              $("#fruit_inf_l").animate({bottom: '490', queue:  true},300)
               $("#fruit_inf_l2").animate({bottom: '490', queue:  true},300)
            
              
                  
              setTimeout(function() {
                  showAgent(informativeness.agents[0],"look_l") 
              }, 2600)   
            
              setTimeout(function() {
                  showAgent(informativeness.agents[0],"point_l")
                $("#"+informativeness.trees[0]+"_l").animate({bottom: '200', queue:  false},300)
                  $("#fruit_inf_l").animate({bottom: '530', queue:  false},300)
                  $("#fruit_inf_l2").animate({bottom: '530', queue:  false},300)
                  $("#"+informativeness.trees[0]+"_l").animate({bottom: '160', queue:    true},300)
                   $("#fruit_inf_l").animate({bottom: '490', queue:  true},300)
                   $("#fruit_inf_l2").animate({bottom: '490', queue:  true},300)
              }, 4300)
        
              setTimeout(function() {
                  showAgent(informativeness.agents[0],"look_l") 
              }, 6000)
             
          } else {
             
              showAgent(informativeness.agents[0],"point_r")
              
         
              $("#"+informativeness.trees[0]+"_r").animate({bottom: '200', queue:  false},300)
              $("#fruit_inf_r").animate({bottom: '530', queue:  false},300)
              $("#fruit_inf_r2").animate({bottom: '530', queue:  false},300)
              
              $("#"+informativeness.trees[0]+"_r").animate({bottom: '160', queue:    true},300)
              $("#fruit_inf_r").animate({bottom: '490', queue:    true},300)
              $("#fruit_inf_r2").animate({bottom: '490', queue:    true},300)
              
            
                  
              setTimeout(function() {
                  showAgent(informativeness.agents[0],"look_r") 

              }, 2600)   
            
              setTimeout(function() {
                  showAgent(informativeness.agents[0],"point_r") 
                  $("#"+informativeness.trees[0]+"_r").animate({bottom: '200', queue:  false},300)
                  $("#fruit_inf_r").animate({bottom: '530', queue:  false},300)
                  $("#fruit_inf_r2").animate({bottom: '530', queue:  false},300)
                  $("#"+informativeness.trees[0]+"_r").animate({bottom: '160', queue:    false},300)
                  $("#fruit_inf_r").animate({bottom: '490', queue:    true},300)
                  $("#fruit_inf_r2").animate({bottom: '490', queue:    true},300)
              }, 4300)
        
              setTimeout(function() {
                  showAgent(informativeness.agents[0],"look_r") 
              }, 6000)
          };
          
      } else if (informativeness.agentOrient[0][0] == "down") {
          
          
          $("#"+informativeness.trees[0]+"_l").animate({opacity: '0', queue: false},1000)
          $("#fruit_inf_l").animate({opacity: '0', queue: false},1000)
          $("#fruit_inf_l2").animate({opacity: '0', queue: false},1000)
          $("#fruit_inf_r").animate({opacity: '0', queue: false},1000)
          $("#fruit_inf_r2").animate({opacity: '0', queue: false},1000)
          $("#"+informativeness.trees[0]+"_r").animate({opacity: '0', queue: false},1000)
          
           pause("moveButton",2000);
          
          setTimeout(function() {
              informativeness.choice() }, 1500);
          return;
          
      }   
    
    
             $(".moveButton").click(informativeness.next);
      

   
    // move on to next phase of exposure
    informativeness.agentOrient[0].shift(); 
  }   
};
