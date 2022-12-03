
// the actual experiment
var novelty = {
    // Parameters for this sequence.
    trial: [1, 2, 3, 4, 5],
    agents: ["Monkey", "Bunny", "Cat", "Dog", "Frog"],
    novel: ["right", "left", "right", "right", "left"],
    agentOrient: [
        ["straight", "point_r", "point_l", "disappear", "gone", "down"],
        ["straight", "point_l", "point_r", "disappear", "gone", "down"],
        ["straight", "point_r", "point_l", "disappear", "gone", "down"],
        ["straight", "point_l", "point_r", "disappear", "gone", "down"],
        ["straight", "point_r", "point_l", "disappear", "gone", "down"]
    ],
    leftObject: ["t26", "t27", "t28", "t29", "t30"],
    rightObject: ["t31", "t32", "t33", "t34", "t35"],
    back: [1, 6, 3, 8, 5],
    data: [],


    // end of the experiment
    end: function() {
        // Show the finish slide.
        //deberia saltar a novelty_nonpragmatic 
        //showSlide("finished");
        novelty_nonpragmatic.next();
        //setTimeout(function() { downloadData(novelty.data) }, 0);
    },


    // what happens between trials - display agent from previous trial and click on it to move on to the next trial    
    eat: function(event) {

        setTimeout(function() { novelty.eat2() }, 1500);

        showSlide("choice");

        event.target.style.border = '5px solid blue';

        sourceSound("sound/end.mp3");
        playSound();


        $(".fruit_r").unbind("click");
        $(".fruit_l").unbind("click");

        var pick_src = event.target.src;
        // get time for reaction time
        var endTime = (new Date()).getTime();
        // select correct object


        // Code correct: does name of chosen object contain the name of the correct object

        if (novelty.novel[0] == "left") {
            if (pick_src.indexOf(novelty.leftObject[0]) > -1) {
                var correct = 1
                var pick = novelty.leftObject[0]
            } else {
                var correct = 0
                var pick = novelty.rightObject[0]
            };
        } else {
            if (pick_src.indexOf(novelty.rightObject[0]) > -1) {
                var correct = 1
                var pick = novelty.rightObject[0]
            } else {
                var correct = 0
                var pick = novelty.leftObject[0]
            };
        };


        // data collected  
        data = {
            subid: train.subid,
            subage: train.subage,
            task: "novelty",
            trial: novelty.trial[0],
            agent: novelty.agents[0],
            leftObject: novelty.leftObject[0],
            rightObject: novelty.rightObject[0],
            correct_location: novelty.novel[0],
            pick: pick,
            correct: correct,
        };
        trialData.push(data);
        //novelty.data.push(data);

    },

    eat2: function(event) {

        showSlide("eat");

        background("images/back" + novelty.back[0] + ".jpg");

        sourceSound("sound/end.mp3");
        playSound();

        showEat(novelty.agents[0])

        $(".agent_eat").click(novelty.newtrial);

    },



    // unbind and shift variables between trials      
    newtrial: function() {

        $(".fruit_l").css("border", "none")

        $(".fruit_r").css("border", "none")


        $(".agent_eat").unbind("click");


        sourceLeftFruit("images/empty.png");
        showLeftFruit();
        sourceRightFruit("images/empty.png");
        showRightFruit();



        novelty.trial.shift();
        novelty.agentOrient.shift();
        novelty.agents.shift();
        novelty.rightObject.shift();
        novelty.leftObject.shift();
        novelty.back.shift();
        novelty.novel.shift();

        novelty.next();
    },


    // recording the choice 
    choice: function(event) {

        showSlide("choice");

        $(".tree_l_c").hide();
        $(".tree_r_c").hide();
        $(".selector_l").hide();
        $(".selector_r").hide();

        background2("images/back" + novelty.back[0] + ".jpg");


        showAgent(novelty.agents[0], "choice");



        // specify what is shown on the tables depending on training and test condition

        choiceLeftFruit("images/" + novelty.leftObject[0] + ".png");

        choiceRightFruit("images/" + novelty.rightObject[0] + ".png");


        // play choice sound
        sourceSound("sound/" + novelty.agents[0] + "_nov_choice.mp3");
        playSound();



        // choice can be made by clicking the objects after - possible after 5s
        setTimeout(function() {
            $(".fruit_l").click(novelty.eat);
            $(".fruit_r").click(novelty.eat);

        }, 000);
    },

    // moving on within a trial

    next: function() {
        $(".moveButton").unbind("click");


        $(".table_l").show();
        $(".table_r").show();

        // when no more trials are left, end experiment    
        if (novelty.trial.length == 0) {
            setTimeout(function() { novelty.end() }, 0);
            return;
        };

        // after exposure is finished, switch to choice      
        if (novelty.agentOrient[0][0] == "down") {
            setTimeout(function() { novelty.choice() }, 0);
            return;
        };

        showSlide("stage");


        $(".table_l").show();
        $(".table_r").show();

        $(".tree_l").hide();
        $(".tree_r").hide();

        background("images/back" + novelty.back[0] + ".jpg")

        // show agent
        showAgent(novelty.agents[0], novelty.agentOrient[0][0]);



        // display obejcts on table depending on training and test condition


        // after the animal has commented on both tables and leaves, the novel object appears
        if (novelty.agentOrient[0][0] == "gone") {
            pause("moveButton", 3000);
        };


        if (novelty.novel[0] == "left") {

            if (novelty.agentOrient[0][0] == "gone") {

                sourceLeftFruit("images/" + novelty.leftObject[0] + ".png");
                showLeftFruit();

                sourceRightFruit("images/" + novelty.rightObject[0] + ".png");
                showRightFruit();

                $("#fruit_l").css("bottom", "460px");
                $("#fruit_l").animate({ bottom: "345px" }, { duration: 1500 });

                setTimeout(function() {
                    $("#fruit_r").animate({ width: "200px", opacity: '0.3' });
                    $("#fruit_l").animate({ width: "200px", opacity: '0.3' });
                    $("#fruit_l").animate({ width: "150px", opacity: '1' });
                    $("#fruit_r").animate({ width: "150px", opacity: '1' })
                }, 2500)

            } else {

                sourceLeftFruit("images/empty.png");
                showLeftFruit();

                sourceRightFruit("images/" + novelty.rightObject[0] + ".png");
                showRightFruit();

            }


        } else {

            if (novelty.agentOrient[0][0] == "gone") {

                sourceLeftFruit("images/" + novelty.leftObject[0] + ".png");
                showLeftFruit();

                sourceRightFruit("images/" + novelty.rightObject[0] + ".png");
                showRightFruit();

                $("#fruit_r").css("bottom", "460px");
                $("#fruit_r").animate({ bottom: "345px" }, { duration: 1500 });

                setTimeout(function() {
                    $("#fruit_r").animate({ width: "200px", opacity: '0.3' });
                    $("#fruit_l").animate({ width: "200px", opacity: '0.3' });
                    $("#fruit_l").animate({ width: "150px", opacity: '1' });
                    $("#fruit_r").animate({ width: "150px", opacity: '1' })
                }, 2500)

            } else {

                sourceLeftFruit("images/" + novelty.leftObject[0] + ".png");
                showLeftFruit();

                sourceRightFruit("images/empty.png");
                showRightFruit();

            }

        };


        // play hello sound and write name of agent
        if (novelty.agentOrient[0][0] == "straight") {
            pause("moveButton", 1600);
            sourceSound("sound/" + novelty.agents[0] + "_hello.mp3");
            playSound();

        }

        if (novelty.agentOrient[0][0] == "point_l") {

            pause("moveButton", 2300);

            if (novelty.novel[0] == "left") {

                sourceSound("sound/" + novelty.agents[0] + "_point_nothing.mp3");
                playSound();

            } else {

                sourceSound("sound/" + novelty.agents[0] + "_point_old.mp3");
                playSound();

            }
        }

        if (novelty.agentOrient[0][0] == "point_r") {

            pause("moveButton", 2300);

            if (novelty.novel[0] == "right") {

                sourceSound("sound/" + novelty.agents[0] + "_point_nothing.mp3");
                playSound();

            } else {

                sourceSound("sound/" + novelty.agents[0] + "_point_old.mp3");
                playSound();

            }
        }


        if (novelty.agentOrient[0][0] == "disappear") {
            showAgent(novelty.agents[0], "straight")
            setTimeout(function() {
                showAgent(novelty.agents[0], "disappear")
            }, 1000);
            pause("moveButton", 2000);
            setTimeout(function() {
                hideAgent()
            }, 2000);
        };


        // move on to next phase of exposure
        novelty.agentOrient[0].shift();
        $(".moveButton").click(novelty.next);
    },

};