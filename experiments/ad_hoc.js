
// the actual experiment
var adhoc = {
  trial: ["train1","train2",1,2,3,4,5],
  agents: ["Sheep"],
  agentOrient: [
          ["straight","down"],
          ["straight","down"],
          ["straight","down"],
          ["straight","down"],
          ["straight","down"],
        ["straight","down"],
      ["straight","down"]],
  stimulus: ["house_train","friend_train","box","chair","table","plate","house"],
  infPos: ["left", "right","left", "right", "right", "left", "right"],
  data: [],



// end of the experiment
  end: function() {
    // Show the finish slide.
    showSlide("select");
    setTimeout(function() { turk.submit(adhoc) }, 500);
  },


// what happens between trials - display agent from previous trial and click on it to move on to the next trial
   eat: function(event) {

    setTimeout(function() {adhoc.eat2() }, 1500);

    showSlide("adhoc");

    event.target.style.border = '5px solid blue';

    sourceSound("sound/end.mp3");
    playSound();


    $(".object_r").unbind("click");
    $(".object_l").unbind("click");

      var pick = event.target.src;

    // Code correct: does name of chosen object contain the name of the correct object
    if (pick.includes("inf")){
        var correct = 1
        } else {
        var correct = 0
        };

       if (adhoc.infPos[0] == "left"){
        var LeftFruit = adhoc.stimulus[0]+"_inf";
        var RightFruit = adhoc.stimulus[0]+"_dis";

    } else  {

        var LeftFruit = adhoc.stimulus[0]+"_dis";
        var RightFruit = adhoc.stimulus[0]+"_inf";
    }



    // data collected
      data = {
        subid: train.subid,
        subage: train.subage,
        task: "ad_hoc_implicature",
        trial: adhoc.trial[0],
        agent: adhoc.agents[0],
        leftObject: LeftFruit,
        rightObject: RightFruit,
        correct_location: adhoc.infPos[0],
        pick: pick,
        correct: correct
            };
      adhoc.data.push(data);

  },

eat2: function(event) {

    showSlide("eat");

    sourceSound("sound/end.mp3");
    playSound();

    showEat(adhoc.agents[0])

    $(".agent_eat").click(adhoc.newtrial);

},

// unbind and shift variables between trials
 newtrial: function() {

    $(".object_l").css("border","none")

    $(".object_r").css("border","none")


    $(".agent_eat").unbind("click");


    leftObject("images/empty.png");
    rightObject("images/empty.png");




    adhoc.trial.shift();
    adhoc.infPos.shift();
    adhoc.stimulus.shift();

   adhoc.next();
  },


// recording the choice
  next: function(event) {

    if (adhoc.trial.length == 0){
        setTimeout(function() {adhoc.end() }, 0);
      return;
    };


    showSlide("adhoc");

    showAgent(adhoc.agents[0],"straight");

    if (adhoc.trial[0] == "train1"){

      sourceSound("sound/sheep_hello_adhoc.mp3");
      playSound();

setTimeout(function() {
      sourceSound("sound/"+adhoc.agents[0]+"_"+adhoc.stimulus[0]+".mp3");
      playSound();
}, 3000);

    } else {

     sourceSound("sound/"+adhoc.agents[0]+"_"+adhoc.stimulus[0]+".mp3");
     playSound();
    }

    // specify what is shown on the objects depending on training and test condition
    if (adhoc.infPos[0] == "left"){

        leftObject("images/adhoc/"+adhoc.stimulus[0]+"_inf.png");

        rightObject("images/adhoc/"+adhoc.stimulus[0]+"_dis.png");

        } else {

          leftObject("images/adhoc/"+adhoc.stimulus[0]+"_dis.png");

          rightObject("images/adhoc/"+adhoc.stimulus[0]+"_inf.png");

        }


    // choice can be made by clicking the objects after - possible after 5s
    setTimeout(function() {
        $(".object_l").click(adhoc.eat);

        $(".object_r").click(adhoc.eat);

    }, 000);
  },
};
