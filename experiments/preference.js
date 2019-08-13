// beginning of actual experiment
var preference = {
  // Parameters for this sequence.
  trial: [1,2,3,4,5],
  agents: ["Monkey","Bunny","Cat","Dog","Frog"],
  agentOrient: [
    ["straight","point_r", "point_l","down"],
    ["straight","point_l", "point_r","down"],
    ["straight","point_r", "point_l","down"],
    ["straight","point_l", "point_r","down"],
    ["straight","point_r", "point_l","down"]],
  rightFruit: ["t01","t02","t03","t04","t05"],
  leftFruit: ["t06","t07","t08","t09","t10"],
  pref: ["right", "left", "left", "right", "left"],
  back: [1,2,3,4,5],
  data: [],
   
    
  
// end of the experiment
  end: function() {
    // Show the finish slide.
    showSlide("select");
    setTimeout(function() {turk.submit(preference) }, 500);
  },
    

// what happens between trials - display agent from previous trial and click on it to move on to the next trial  
    eat: function(event) {

    setTimeout(function() {preference.eat2() }, 1500);
     
    $(".fruit_r").unbind("click");
    $(".fruit_l").unbind("click");    
        
    showSlide("choice");  
       
    event.target.style.border = '5px solid blue';
    
    sourceSound("sound/end.mp3");
    playSound();
        
   
   // get time for reaction time       
    var endTime = (new Date()).getTime();    
    // select correct object
    var corrFruit = $(".fruit_"+preference.pref[0][0]).attr("src");
    // select chosen object    
    var pick = event.target.src;
     // code correct: does name of chosen object contain the name of the correct object
    if (pick.indexOf(corrFruit) > -1) {
        var correct =1
        } else {
        var correct = 0
        };
      
 
    // data collected  
      data = {
        subid: train.subid,
        subage: train.subage,
        task: "preference",
        trial: preference.trial[0],
        agent: preference.agents[0],
        leftObject: preference.leftFruit[0],
        rightObject: preference.rightFruit[0],
        correct_location: preference.pref[0],
        pick: pick,
        correct: correct,
             };
      preference.data.push(data);
   
  },
 
 eat2: function(event) {
    
    showSlide("eat");
    
    background("images/back"+preference.back[0]+".jpg");
    
    sourceSound("sound/end.mp3");
    playSound();
   
    // display same agent as during choice

        showEat(preference.agents[0])
   
    $(".agent_eat").click(preference.newtrial);     
  
},     
 // unbind and shif variables between trials       
 newtrial: function() {
    
    $(".fruit_l").css("border","none")
    $(".fruit_r").css("border","none") 
     
    $(".agent_eat").unbind("click"); 
   
   
    sourceLeftFruit("images/empty.png");
            showLeftFruit(); 
    sourceRightFruit("images/empty.png");
            showRightFruit();
      
    preference.trial.shift();  
    preference.agentOrient.shift();   
    preference.agents.shift();
    preference.pref.shift();
    preference.rightFruit.shift();
    preference.leftFruit.shift();
    preference.back.shift(); 

      
    preference.next();
  },
// Slide recording the choice

// recording the choice 
  choice: function(event) {
    
    showSlide("choice"); 
      
      $(".tree_l_c").hide();
      $(".tree_r_c").hide();
      $(".selector_l").hide();
      $(".selector_r").hide();
    
    background2("images/back"+preference.back[0]+".jpg");  
    
    // show objects  
    choiceLeftFruit("images/"+preference.leftFruit[0]+".png");
    choiceRightFruit("images/"+preference.rightFruit[0]+".png");     
      
   // show agent depending on speaker change and write their name  
 
       choiceAgent(preference.agents[0]);
       sourceSound("sound/"+preference.agents[0]+"_choice.mp3");
        playSound()

    
    // choice can be made by clicking the objects after - possible after 8s  
    setTimeout(function() {      
    $(".fruit_r").click(preference.eat);
    $(".fruit_l").click(preference.eat);
}, 0);
  
  },
     
// moving on within a trial.
  next: function() {
$(".moveButton").unbind("click"); 
    // if no more trials are left, end experiment   
    if (preference.trial.length == 0){
        setTimeout(function() {preference.end() }, 0);
      return;
    };  
  
    // after exposure is finished, switch to choice  
    if (preference.agentOrient[0][0] == "down") {
      setTimeout(function() {preference.choice() }, 0);
      return;
    };  
   // play sound depending on agent orientation  
    
    showSlide("stage");  
      
        	$(".tree_l").hide();
    	$(".tree_r").hide();  
      
    background("images/back"+preference.back[0]+".jpg");
      
    showAgent(preference.agents[0],preference.agentOrient[0][0]);
    
    // show objects on tables
    sourceRightFruit("images/"+preference.rightFruit[0]+".png");
            showRightFruit();  
     
    sourceLeftFruit("images/"+preference.leftFruit[0]+".png");
            showLeftFruit();  
    
    // play sound depending on agent orientation 
    // agent says hello  
   if (preference.agentOrient[0][0] == "straight") {  
        pause("next",1500); 
        sourceSound("sound/"+preference.agents[0]+"_hello.mp3");
        playSound();
    }; 
      
    
  // commenting on objects on the tables depending on condition      
    if (preference.agentOrient[0][0] == "point_l" && preference.pref[0] == "right") { 
        pause("next",4000); 
        sourceSound("sound/"+preference.agents[0]+"_npoint.mp3");
        playSound();   
    } else if (preference.agentOrient[0][0] == "point_l" && preference.pref[0] == "left") { 
        pause("next",4000); 
        sourceSound("sound/"+preference.agents[0]+"_ppoint.mp3");
        playSound();   
    };
     
     if (preference.agentOrient[0][0] == "point_r" && preference.pref[0] == "left") { 
        pause("next",4000); 
        sourceSound("sound/"+preference.agents[0]+"_npoint.mp3");
        playSound();   
    } else if (preference.agentOrient[0][0] == "point_r" && preference.pref[0] == "right") { 
        pause("next",4000); 
        sourceSound("sound/"+preference.agents[0]+"_ppoint.mp3");
        playSound();   
    };
    
    
      
    // animate object when visible and pointed at 
      if (preference.agentOrient[0][0] == "point_r") {
        setTimeout(function() {
            $("#fruit_r").animate({width: "200px",opacity: '0.3', queue: false, duration: 1000});
            $("#fruit_r").animate({width: "150px",opacity: '1', queue: false, duration: 1000})
        }, 2500)
    }; 
      
    if (preference.agentOrient[0][0] == "point_l") {
        setTimeout(function() {
            $("#fruit_l").animate({width: "200px",opacity: '0.3', queue: false, duration: 1000});
            $("#fruit_l").animate({width: "150px",opacity: '1', queue: false, duration: 1000})
        }, 2500)
    }; 
    
    
    // after agent has commented on both locations, play ring sound and briefly show disappearing agent and then hide agent  
    // move on to next phase of exposure 
    preference.agentOrient[0].shift(); 
       $(".moveButton").click(preference.next);
  }
};
