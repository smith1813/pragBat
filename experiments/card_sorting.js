
function showSample(a) {
    $(".sample").show();
    document.getElementById("sample").src = a;
};


// the actual experiment
var sort = {
  trial: ["train","train2",1,2,3,4,5,6,"switch",1,2,3,4,5,6],
  sample: ["red_rabbit", "blue_boat", "red_rabbit", "blue_boat", "blue_boat", "red_rabbit", "red_rabbit", "blue_boat", "red_rabbit", "blue_boat","blue_boat", "red_rabbit","blue_boat","red_rabbit"],
  phase: ["color","shape"],   
  data: [],
    

    
// end of the experiment
  end: function() {
    // Show the finish slide.
    showSlide("select");
    setTimeout(function() { turk.submit(sort) }, 200);
  },
    
  
// what happens between trials - display agent from previous trial and click on it to move on to the next trial    
   chooseLeft: function(event) {
    
    event.target.style.border = '5px solid orange';
    
    $("#sample").animate({bottom: "300px", left: "100px", opacity: 0},{duration: 1500})
          
    pause("next", 1500)
    
    setTimeout(function() {sort.newtrial() }, 1500);
    
   
    // Code correct: does name of chosen object contain the name of the correct object
    if (sort.phase[0] == "color"){
        
        if (sort.sample[0] == "blue_boat"){
           var correct = 1 
        } else {
            var correct = 0    
        }
        
        
        } else {
        if (sort.sample[0] == "blue_boat"){
           var correct = 0
        } else {
            var correct = 1    
        }
        };   
    

    // data collected  
      data = {
        subid: train.subid,
        subage: train.subage,
        phase: sort.phase[0],
        task: "card_sorting",
        sample: sort.sample[0],
        trial: sort.trial[0],
        target: "blue_rabbit",
        correct: correct
            };
      sort.data.push(data);
             
  },
    
    
   chooseRight: function(event) {
    
    event.target.style.border = '5px solid orange';
    
    $("#sample").animate({bottom: "300px", left: "700px", opacity: 0},{duration: 1500})
          
    pause("next", 1500)
    
    setTimeout(function() {sort.newtrial() }, 1500);
    
   
    // Code correct: does name of chosen object contain the name of the correct object
    if (sort.phase[0] == "color"){
        
        if (sort.sample[0] == "blue_boat"){
           var correct = 0 
        } else {
            var correct = 1    
        }
        
        
        } else {
        if (sort.sample[0] == "blue_boat"){
           var correct = 1
        } else {
            var correct = 0    
        }
        };   
    

    // data collected  
      data = {
        subid: train.subid,
        subage: train.subage,
        phase: sort.phase[0],
        task: "card_sorting",
        sample: sort.sample[0],
        trial: sort.trial[0],
        target: "red_boat",
        correct: correct
            };
      sort.data.push(data);
             
  },
 

// unbind and shift variables between trials      
 newtrial: function() {
    
    $(".target_l").css("border","none")
    $(".target_r").css("border","none")
    $(".sample").css("border","none")
 
    $(".target_l").unbind("click"); 
    $(".target_r").unbind("click"); 
    $(".sample").unbind("click"); 
   
    showSample("images/empty.png");     
    
    
    if (sort.trial[0] == "train"){
        sort.trial.shift()
        sort.sample.shift();
        showSlide("cardSortingIntro2");
        return;
    }; 
     
     
     if (sort.trial[0] == "train2"){
        sort.trial.shift()
        sort.sample.shift();
        showSlide("cardSortingIntro3");
        return;
    }; 
     
    
    $("#text").text(""); 
     
     
    sort.trial.shift();   
    sort.sample.shift();   
    
    setTimeout(function() {sort.next() }, 500);
     
  },
    
  next: function() {

    if (sort.trial.length == 0){
        setTimeout(function() {sort.end() }, 0);
      return;
    };  
      
    if (sort.trial[0] == "switch"){
        sort.phase.shift()
        sort.trial.shift()
        showSlide("cardSortingSwitch");
        return;
    }; 
    
    showSlide("cardSorting")
      
    $("#sample").css({bottom: "100px", left: "400px", opacity: 1})
        
    showSample("images/"+sort.sample[0]+".png")      
      
    $(".target_l").click(sort.chooseLeft);  
      
    $(".target_r").click(sort.chooseRight); 
      
        if (sort.phase[0] == "color"){
        
        if (sort.sample[0] == "red_rabbit") {
            $("#text").text("Hier ist eine Rote, wo kommt die hin?");
        } else {
            $("#text").text("Hier ist eine Blaue, wo kommt die hin?");
        }
        
    } else {
        
        if (sort.sample[0] == "red_rabbit") {
            $("#text").text("Hier ist ein Hase, wo kommt der hin?");
        } else {
            $("#text").text("Hier ist ein Boot, wo kommt das hin?");
        }
        
    }
        
      
    $(".sample").click(function (event){
        event.target.style.border = '5px solid orange'
    })
    
  }  
};

