// the actual experiment


//todo hacer mejor transicion entre que se muestran las frutas y se puede elegir 
// probablemente manipular la funcion next para esto
var novelty_nonpragmatic = {
    // Parameters for this sequence.
    trial: [1, 2, 3, 4, 5],
    agents: ["Monkey", "Bunny", "Cat", "Dog", "Frog"],
    novel: ["left","right", "left", "right", "right"],
    //manipular este arreglo para indicar las acciones que se van haciendo
    //deberian ser 3 acciones (fruta vieja,fruta nueva y choice)
    agentOrient: [
        ["old","novel","choice"],
        ["old","novel","choice"],
        ["old","novel","choice"],
        ["old","novel","choice"],
        ["old","novel","choice"],
    ],
    leftObject: ["t26", "t27", "t28", "t29", "t30"],
    rightObject: ["t31", "t32", "t33", "t34", "t35"],
    back: [1, 6, 3, 8, 5],
    data: [],


    // end of the experiment
    end: function() {
        // jump to nonpragmatic novelty_nonpragmatic.
        // todo set slide to nonpragmatic
        showSlide("finished");
        hideAllAgents();
        setTimeout(function() { downloadData(trialData) }, 0);
        //setTimeout(function() { downloadData(novelty_nonpragmatic.data) }, 0);
    },


    // what happens between trials - display agent from previous trial and click on it to move on to the next trial    
    eat: function(event) {

        setTimeout(function() { novelty_nonpragmatic.eat2() }, 1500);

        showSlide("choice");
        hideAllAgents();

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

        if (novelty_nonpragmatic.novel[0] == "left") {
            if (pick_src.indexOf(novelty_nonpragmatic.leftObject[0]) > -1) {
                var correct = 1
                var pick = novelty_nonpragmatic.leftObject[0]
            } else {
                var correct = 0
                var pick = novelty_nonpragmatic.rightObject[0]
            };
        } else {
            if (pick_src.indexOf(novelty_nonpragmatic.rightObject[0]) > -1) {
                var correct = 1
                var pick = novelty_nonpragmatic.rightObject[0]
            } else {
                var correct = 0
                var pick = novelty_nonpragmatic.leftObject[0]
            };
        };


        // data collected  
        data = {
            subid: train.subid,
            subage: train.subage,
            task: "novelty_nonpragmatic",
            trial: novelty_nonpragmatic.trial[0],
            agent: "nonpragmatic_"+novelty_nonpragmatic.agents[0], //esto es para que no se confunda con los trials pragmáticos
            leftObject: novelty_nonpragmatic.leftObject[0],
            rightObject: novelty_nonpragmatic.rightObject[0],
            correct_location: novelty_nonpragmatic.novel[0],
            pick: pick,
            correct: correct,
        };
        trialData.push(data);
        novelty_nonpragmatic.data.push(data);

    },

    eat2: function(event) {
        showSlide("eat");

        background("images/back" + novelty_nonpragmatic.back[0] + ".jpg");

        sourceSound("sound/end.mp3");
        playSound();

        showEat(novelty_nonpragmatic.agents[0])

        $(".agent_eat").click(novelty_nonpragmatic.newtrial);

    },



    // unbind and shift variables between trials    
    //elimina la accion que ya se realizó del stack de acciones 
    newtrial: function() {
        hideAllAgents();

        $(".fruit_l").css("border", "none")

        $(".fruit_r").css("border", "none")


        $(".agent_eat").unbind("click");


        sourceLeftFruit("images/empty.png");
        showLeftFruit();
        sourceRightFruit("images/empty.png");
        showRightFruit();



        novelty_nonpragmatic.trial.shift();
        novelty_nonpragmatic.agentOrient.shift();
        novelty_nonpragmatic.agents.shift();
        novelty_nonpragmatic.rightObject.shift();
        novelty_nonpragmatic.leftObject.shift();
        novelty_nonpragmatic.back.shift();
        novelty_nonpragmatic.novel.shift();

        novelty_nonpragmatic.next();
    },


    // recording the choice 
    choice: function(event) {

        showSlide("choice");
        hideAllAgents();
        $(".tree_l_c").hide();
        $(".tree_r_c").hide();
        $(".selector_l").hide();
        $(".selector_r").hide();

        background2("images/back" + novelty_nonpragmatic.back[0] + ".jpg");


        //showAgent(novelty_nonpragmatic.agents[0], "choice");

        // specify what is shown on the tables depending on training and test condition

        choiceLeftFruit("images/" + novelty_nonpragmatic.leftObject[0] + ".png");

        choiceRightFruit("images/" + novelty_nonpragmatic.rightObject[0] + ".png");


        // play choice sound
        //sourceSound("sound/" + novelty_nonpragmatic.agents[0] + "_nov_choice.mp3");
        //playSound();


        // choice can be made by clicking the objects after - possible after 5s
        setTimeout(function() {
            $(".fruit_l").click(novelty_nonpragmatic.eat);
            $(".fruit_r").click(novelty_nonpragmatic.eat);

        }, 000);
    },

    // moving on within a trial

    next: function() {
        // when no more trials are left, end experiment    
        if (novelty_nonpragmatic.trial.length == 0) {
            setTimeout(function() { novelty_nonpragmatic.end() }, 0);
            return;
        };

        console.log(novelty_nonpragmatic.agentOrient[0][0]);
        $(".moveButton").unbind("click");


        $(".table_l").show();
        $(".table_r").show();

        
        // va sacando elementos del arreglo agentOrient y lo usa como un stack de acciones
        if (novelty_nonpragmatic.agentOrient[0][0] == "choice") {
            setTimeout(function() { novelty_nonpragmatic.choice() }, 0);
            return;
        };

        showSlide("stage");

        $(".table_l").show();
        $(".table_r").show();

        $(".tree_l").hide();
        $(".tree_r").hide();
        
        // esconder los agentes porque no se usan
        hideAllAgents();
        background("images/back" + novelty_nonpragmatic.back[0] + ".jpg")

        //aqui podría ir directamente la animación completa

        // aqui va la animación, si se quiere sacar el movebutton entre ambas animaciones hay que hacer un shift y un next
        // al final de cada condicion
        //console.log([novelty_nonpragmatic.novel[0],novelty_nonpragmatic.agentOrient[0][0] ]);
        if (novelty_nonpragmatic.novel[0] == "left") {

            if (novelty_nonpragmatic.agentOrient[0][0] == "old") {

                console.log('entering left-old if...');

                //aparece el elemento antiguo por la derecha, mientras el izquierdo no está
                sourceLeftFruit("images/" + novelty_nonpragmatic.leftObject[0] + ".png");
                hideLeftFruit();

                sourceRightFruit("images/" + novelty_nonpragmatic.rightObject[0] + ".png");
                showRightFruit();
                

                $("#fruit_r").css("bottom", "460px");                
                $("#fruit_r").animate({ left: "+=100px" }, { duration: 750 });
                $("#fruit_r").animate({ bottom: "-=50px" },{ duration: 750 });
                $("#fruit_r").animate({ left: "-=200px" }, { duration: 750 });
                $("#fruit_r").animate({ bottom: "-=50px" },{ duration: 750 });
                $("#fruit_r").animate({ left: "+=100px" }, { duration: 750 });
                $("#fruit_r").animate({ bottom: "-=15px" },{ duration: 750 });
                pause("moveButton",4000);

            } else {
                console.log('entering left-novel if...');
                //aparece el elemento nuevo por la izquierda, mientras el de la derecha se mantiene

                sourceLeftFruit("images/" + novelty_nonpragmatic.leftObject[0] + ".png");
                showLeftFruit();

                sourceRightFruit("images/" + novelty_nonpragmatic.rightObject[0] + ".png");
                showRightFruit();

                showLeftFruit();
                $("#fruit_l").css("bottom", "460px");
                $("#fruit_l").animate({ bottom: "345px" }, { duration: 1500 });
                

                setTimeout(function() {
                    $("#fruit_r").animate({ width: "200px", opacity: '0.3' });
                    $("#fruit_l").animate({ width: "200px", opacity: '0.3' });
                    $("#fruit_l").animate({ width: "150px", opacity: '1' });
                    $("#fruit_r").animate({ width: "150px", opacity: '1' })
                }, 2500)
                pause("moveButton",4500);

            }


        } else {

            if (novelty_nonpragmatic.agentOrient[0][0] == "old") {
                
                console.log('entering right-old if...');
                //aparece el elemento antiguo por la izquierda, mientras el derecho no está


                sourceLeftFruit("images/" + novelty_nonpragmatic.leftObject[0] + ".png");
                showLeftFruit();

                sourceRightFruit("images/" + novelty_nonpragmatic.rightObject[0] + ".png");
                hideRightFruit();
                

                $("#fruit_l").css("bottom", "460px");                
                $("#fruit_l").animate({ left: "+=100px" }, { duration: 750 });
                $("#fruit_l").animate({ bottom: "-=50px" },{ duration: 750 });
                $("#fruit_l").animate({ left: "-=200px" }, { duration: 750 });
                $("#fruit_l").animate({ bottom: "-=50px" },{ duration: 750 });
                $("#fruit_l").animate({ left: "+=100px" }, { duration: 750 });
                $("#fruit_l").animate({ bottom: "-=15px" },{ duration: 750 });
                pause("moveButton",4000);

            } else {
                //aparece el elemento nuevo por la derecha, mientras el de la izquierdo se mantiene
                console.log('entering right-novel if...');
                sourceLeftFruit("images/" + novelty_nonpragmatic.leftObject[0] + ".png");
                showLeftFruit();

                sourceRightFruit("images/" + novelty_nonpragmatic.rightObject[0] + ".png");
                showRightFruit();

                showLeftFruit();
                $("#fruit_r").css("bottom", "460px");
                $("#fruit_r").animate({ bottom: "345px" }, { duration: 1500 });
                

                setTimeout(function() {
                    $("#fruit_r").animate({ width: "200px", opacity: '0.3' });
                    $("#fruit_l").animate({ width: "200px", opacity: '0.3' });
                    $("#fruit_l").animate({ width: "150px", opacity: '1' });
                    $("#fruit_r").animate({ width: "150px", opacity: '1' })
                }, 2500)
                pause("moveButton",4500);

            }

        };


        // poner un boton para avanzar al choice? hablarlo con la pauli

        // move on to next phase of exposure
        novelty_nonpragmatic.agentOrient[0].shift();
        $(".moveButton").click(novelty_nonpragmatic.next);
    },

};