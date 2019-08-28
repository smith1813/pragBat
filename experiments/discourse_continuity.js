var preloadItems = ["car", "truck", "train", "bus", "airplane", "boat", "motorbike", "strawberry", "apple", "banana", "cherry", "orange", "melon", "pineapple", "dog", "cat", "horse", "bear", "cow", "monkey", "elephant", "shoe", "sock", "hat", "shirt", "jacket", "dress", "skirt","drum", "flute", "guitar", "xylophone", "piano", "trumpet", "violin"];

var images = new Array();
for (i = 0; i < preloadItems.length; i++) {
    images[i] = new Image();
    images[i].src = "images/" + preloadItems[i] + ".png";
}

//only preload relevant audios (no speaker change)
var preloadAudios = ["hi", "lets", "intro", "thank", "it"];

var posAgents = ["Tiger","Bunny","Frog","Mouse","Pig"]

var audios = new Array();
for (i = 0; i < posAgents.length; i++) {
    for (j = 0; j < preloadAudios.length; j++) {
        var audio = new Audio();
        audio.src = "sound/" + preloadAudios[j] + "_" + posAgents[i] + ".mp3"
        audios.push(audio);
    }
    for (k = 0; k < preloadItems.length - 3; k++) {
        var audio = new Audio();
        audio.src = "sound/" + preloadItems[k] + "_" + posAgents[i] + ".mp3"
        audios.push(audio);
    }
}

var backgroundImages = new Array();
for (i = 1; i <= 12; i++) {
    backgroundImages[i] = new Image();
    backgroundImages[i].src = "images/backgrounds/back_int" + i + ".jpg";
}

function showSlide(id) {
    // Hide all slides
    $(".slide").hide();
    // Show just the slide we want to show
    $("#" + id).show();
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function showDisconAgent(id, orient) {
    $(".discon_agent").hide();
    $(".agent").hide();
    $(".agent_transition").hide();
    $("#" + id + "_" + orient).show();
}

function sourceRightItem(a) {
    document.getElementById("item_r").src = a;
}

function showRightItem() {
    document.getElementById('item_r').style.visibility = 'visible';
}

function hideRightItem() {
    document.getElementById('item_r').style.visibility = 'hidden';
}

function sourceMiddleItem(a) {
    document.getElementById("item_m").src = a;
}

function showMiddleItem() {
    document.getElementById('item_m').style.visibility = 'visible';
}

function hideMiddleItem() {
    document.getElementById('item_m').style.visibility = 'hidden';
}

function sourceLeftItem(a) {
    document.getElementById("item_l").src = a;
}

function showLeftItem() {
    document.getElementById('item_l').style.visibility = 'visible';
}

function hideLeftItem() {
    document.getElementById('item_l').style.visibility = 'hidden';
}

function sourceSound(c) {
    document.getElementById("sound").src = c;
}

function playSound() {
    document.getElementById("sound").play();
}

function backgroundDis(x) {
    document.getElementById("background_dis").src = x;
}

function backgroundDis2(x) {
    document.getElementById("background2_dis").src = x;
}

function shuffleProperties(obj) {
    var new_obj = {};
    var keys = getKeys(obj);
    keys;
    for (var key in keys) {
        if (key == "shuffle") continue; // skip our prototype method
        new_obj[keys[key]] = obj[keys[key]];
    }
    return new_obj;
}

function getKeys(obj) {
    var arr = new Array();
    for (var key in obj)
        arr.push(key);
    return arr;
}

showSlide("instructions");

var slides = [1, 2, 3, 4, 5, 6, "choice"]

var trials = [0, 1, 2, 3, 4]

var backgrounds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

var vehiclesF = ["train", "car", "boat", "motorbike", "truck", "airplane", "bus"]
var fruitsF = ["orange", "apple", "pineapple", "cherry", "banana", "melon", "strawberry"]
var mammalsF = ["elephant", "bear", "monkey", "cow", "horse", "cat", "dog"]
var clothesF = ["sock", "shoe", "hat", "shirt", "skirt", "jacket", "dress"]
var instrumentsF = ["drum", "flute", "guitar", "xylophone", "piano", "trumpet", "violin"]

var allFamiliar = {
    instruments: instrumentsF,
    vehicles: vehiclesF,
    fruits: fruitsF,
    mammals: mammalsF,
    clothes: clothesF
}

// map of category names to category arrays for familiar items
var familiarItems = allFamiliar;

var categoryNames = getKeys(familiarItems);

var trackRepeats = new Map();

for (i = 0; i < categoryNames.length; i++) {
    trackRepeats.set(categoryNames[i], 3);
}

function checkCategory(category) {
    if (trackRepeats.get(category) > 0) {
        return true;
    } else {
        return false;
    }
}

//names of all possible targets, also orderedTargetNames1
var posTargetNames = categoryNames;

//arrays of all possible targets, in order
var targetsF = new Array();

for (var nTarget = 0; nTarget < trials.length; nTarget++) {
    targetsF.push(familiarItems[posTargetNames[nTarget]].slice())
    targetsF[nTarget];
}

var targetsF2 = new Array();

var posTargetNames2 = posTargetNames.slice();

var orderedTargetNames2 = new Array();

function orderTargetsF2(posTargetNames2, posTargetNames) {
    var tempPosTargetNames2 = posTargetNames2.slice();
    var tempPosTargetNames = posTargetNames.slice();
    orderTargetsF2Helper(tempPosTargetNames2, tempPosTargetNames, posTargetNames2, posTargetNames);
}

function orderTargetsF2Helper(tempPosTargetNames2, tempPosTargetNames, posTargetNames2, posTargetNames) {
    if (tempPosTargetNames2.length == 1) {
        if (tempPosTargetNames2[0] != tempPosTargetNames[0] &&
            checkCategory(tempPosTargetNames2[0])) {
            targetsF2.push(familiarItems[tempPosTargetNames2[0]].slice());
            orderedTargetNames2.push(tempPosTargetNames2[0]);
            trackRepeats[tempPosTargetNames2[0]]--;
        } else {
            targetsF2 = [];
            tempPosTargetNames2 = posTargetNames2.slice();
            tempPosTargetNames = posTargetNames.slice();
        }
        return;
    } else {
        if (tempPosTargetNames2[0] != tempPosTargetNames[0] &&
            checkCategory(tempPosTargetNames2[0])) {
            targetsF2.push(familiarItems[tempPosTargetNames2[0]].slice());
            orderedTargetNames2.push(tempPosTargetNames2[0]);
            tempPosTargetNames2.shift();
            tempPosTargetNames.shift();
            trackRepeats[posTargetNames2[0]]--;
        } else {
            tempPosTargetNames2.push(tempPosTargetNames2.shift());
        }
        orderTargetsF2Helper(tempPosTargetNames2, tempPosTargetNames, posTargetNames2, posTargetNames);
    }
}

while (targetsF2.length < trials.length) {
    orderTargetsF2(posTargetNames2, posTargetNames);
}

var targetsF3 = new Array();

var posTargetNames3 = posTargetNames.slice();

var orderedTargetNames3 = new Array();

function orderTargetsF3(posTargetNames3, orderedTargetNames2, posTargetNames) {
    var tempPosTargetNames3 = posTargetNames3.slice();
    var tempPosTargetNames2 = orderedTargetNames2.slice();
    var tempPosTargetNames = posTargetNames.slice();
    orderTargetsF3Helper(tempPosTargetNames3, tempPosTargetNames2, tempPosTargetNames, posTargetNames3, orderedTargetNames2, posTargetNames);
}

function orderTargetsF3Helper(tempPosTargetNames3, tempPosTargetNames2, tempPosTargetNames, posTargetNames3, orderedTargetNames2, posTargetNames) {
    if (tempPosTargetNames3.length == 1) {
        if (tempPosTargetNames3[0] != tempPosTargetNames[0] &&
            tempPosTargetNames3[0] != tempPosTargetNames2[0] &&
            checkCategory(tempPosTargetNames3[0])) {
            targetsF3.push(familiarItems[tempPosTargetNames3[0]].slice());
            orderedTargetNames3.push(tempPosTargetNames3[0]);
            trackRepeats[tempPosTargetNames3[0]]--;
        } else {
            targetsF3 = [];
            tempPosTargetNames3 = posTargetNames3.slice();
            tempPosTargetNames2 = orderedTargetNames2.slice();
            tempPosTargetNames = posTargetNames.slice();
        }
        return;
    } else {
        if (tempPosTargetNames3[0] != tempPosTargetNames[0] &&
            tempPosTargetNames3[0] != tempPosTargetNames2[0] &&
            checkCategory(tempPosTargetNames3[0])) {
            targetsF3.push(familiarItems[tempPosTargetNames3[0]].slice());
            orderedTargetNames3.push(tempPosTargetNames3[0]);
            tempPosTargetNames3.shift();
            tempPosTargetNames2.shift();
            tempPosTargetNames.shift();
            trackRepeats[posTargetNames3[0]]--;
        } else {
            tempPosTargetNames3.push(tempPosTargetNames3.shift());
        }
        orderTargetsF3Helper(tempPosTargetNames3, tempPosTargetNames2, tempPosTargetNames, posTargetNames3, orderedTargetNames2, posTargetNames);
    }
}

while (targetsF3.length < trials.length) {
    orderTargetsF3(posTargetNames3, orderedTargetNames2, posTargetNames);
}

// array of category names for each trial, to create trainingDist
// [[3 cats used in trial 1], [3 cats used in trial 2], ...]
var trialTargets = new Array();

for (var nTrial = 0; nTrial < trials.length; nTrial++) {
    trialTargets.push([]);
    trialTargets[nTrial].push(posTargetNames[nTrial]);
    trialTargets[nTrial].push(orderedTargetNames2[nTrial]);
    trialTargets[nTrial].push(orderedTargetNames3[nTrial]);
}

var trialFamiliarItems = new Array();

for (nTrial = 0; nTrial < trials.length; nTrial++) {
    var familiarItemsMap = new Map();
    familiarItemsMap.set(trialTargets[nTrial][0], targetsF[nTrial]);
    familiarItemsMap.set(trialTargets[nTrial][1], targetsF2[nTrial]);
    familiarItemsMap.set(trialTargets[nTrial][2], targetsF3[nTrial]);
    trialFamiliarItems.push(familiarItemsMap);
}

// array contains 6 items
function shuffleByIndex(array) {
    for (var i = 0; i < trials.slice(); i++) {
        var temp = array[i];
        array[i] = array[shuffleIndex[i]];
        array[shuffleIndex[i]] = temp;
    }
}

shuffleByIndex(trialTargets);
shuffleByIndex(trialFamiliarItems);

var posDist = shuffle([[6, 0, 0], [6, 0, 0], [6, 0, 0], [6, 0, 0],[6, 0, 0]]);

//distribution for each trial
var trainingDist = new Array();

for (var i = 0; i < trials.length; i++) {
    trainingDist.push([]);
    for (var j = 0; j < posDist[i].length; j++) {
        for (var k = 0; k < posDist[i][j]; k++) {
            trainingDist[i].push(trialTargets[i][j]);
        }
    }
    trainingDist[i];
}

var trainingAgents = new Array();
for (var m = 0; m < trials.length; m++) {
    trainingAgents.push(posAgents[m]);
}

function findCategory(pick) {
    for (var i = 0; i < categoryNames.length; i++) {
        var categoryArray = categoryNames[i] + "F";
        if (eval(categoryArray).includes(pick)) {
            return categoryNames[i];
        }
    }
}

var discon = {
    slides: slides.slice(),
    trials: trials,

    targetsF: targetsF,
    targetsF2: targetsF2,
    targetsF3: targetsF3,

    trialTargets: trialTargets,

    trialFamiliarItems: trialFamiliarItems,

    posDist: posDist,
    trainingDist: trainingDist,

    trainingAgents: trainingAgents,
    backgrounds: backgrounds.slice(),

    position: [],

    lastInputCat: "",

    data: [],

    sound: new Audio(),

    introAll: function () {
        showSlide("introAll");
        document.getElementById("text_introAll").innerHTML = "In this game, you're going to meet the little animals. They each live in a house and they have many different kinds of things at home. Each animal will tell you about some of things they have in their house.";
        document.getElementById("text_introAll_2").innerHTML = "Your job is to touch the thing the animal is talking about. So, listen carefully and find out which one you have to touch.";
    },

    intro: function () {

        $(".agent_transition").unbind("click");

        backgroundDis2("images/backgrounds/back_int" + discon.backgrounds[0] + ".jpg");

        showSlide("transition");

        showDisconAgent(trainingAgents[trials[0]], "transition");

        sourceSound("sound/" + "hi_" + trainingAgents[trials[0]] + ".mp3");
        playSound();

        sound = document.getElementById("sound");

        sound.onended = function () {
            sourceSound("sound/" + "intro_" + trainingAgents[trials[0]] + ".mp3");
            playSound();
            sound = document.getElementById("sound");
            sound.onended = function () {
                $(".agent_transition").click(discon.train);
            };
        };
    },

    train: function () {
        backgroundDis("images/backgrounds/back_int" + discon.backgrounds[0] + ".jpg");

        showSlide("input");

        document.getElementById("next-input").style.visibility = "hidden";
        document.getElementById("next-novel").style.visibility = "hidden";

        $(".agent_transition").unbind("click");

        if (discon.slides[0] == "choice") {
            discon.choice();
            return;
        }

        discon.position = shuffle([discon.targetsF[0][0], discon.targetsF2[0][0], discon.targetsF3[0][0]]);

        showDisconAgent(trainingAgents[trials[0]], "ask");

        sourceLeftItem("images/" + discon.position[0] + ".png");
        hideLeftItem();

        sourceMiddleItem("images/" + discon.position[1] + ".png");
        hideMiddleItem();

        sourceRightItem("images/" + discon.position[2] + ".png");
        hideRightItem();

        // pause for 1s before images appear
        setTimeout(function () {

            showLeftItem();
            showMiddleItem();
            showRightItem();

            document.getElementById("next-input").style.visibility = "visible";

        }, 900);
    },

    train2: function () {

        document.getElementById("next-input").style.visibility = "hidden";
        var correctCategory = trialFamiliarItems[trials[0]].get(trainingDist[trials[0]][0]);
        var correctItem = correctCategory[0];

        sourceSound("sound/" + correctItem + "_" + trainingAgents[trials[0]] + ".mp3");
        playSound();

        sound = document.getElementById("sound");

        sound.onended = function () {
            $(".item").click(function () {
                var clickedItem = event.target;

                var pickId = event.target.id;

                if (pickId == "item_l") {
                    var pick = discon.position[0];
                } else if (pickId == "item_m") {
                    var pick = discon.position[1];
                } else if (pickId == "item_r") {
                    var pick = discon.position[2];
                }

                // compare to correct item of input
                if (pick == correctItem) {
                    var correct_item = 1;
                } else {
                    var correct_item = 0;
                }

                // stores category of the final input slide
                if (discon.slides[0] == slides.length - 1) {
                    discon.lastInputCat = findCategory(pick);
                }

                $(".item").unbind("click");
                clickedItem.style.border = '5px solid blue';

                var subid = discon.subid;
                var subage = discon.subage;

                data = {
                    subid: train.subid,
                    subage: train.subage,
                    task: "discourse_continuity",
                    trial: "training",

                    agent: trainingAgents[trials[0]],
                    slide: discon.slides[0],

                    distribution: posDist[trials[0]],
                    target1: trialTargets[trials[0]][0],
                    target2: trialTargets[trials[0]][1],
                    target3: trialTargets[trials[0]][2],

                    item_l: discon.position[0],
                    item_m: discon.position[1],
                    item_r: discon.position[2],

                    correct: correct_item,
                    pick: pick,
                    pickPos: pickId,
                    pickCat: findCategory(pick)
                }

                discon.data.push(data);

                discon.targetsF[0].shift();
                discon.targetsF2[0].shift();
                discon.targetsF3[0].shift();

                discon.trainingDist[trials[0]].shift();

                discon.slides.shift();
                discon.backgrounds.shift();

                setTimeout(function () {
                    clickedItem.style.border = '0px';
                    discon.train();
                }, 900);
            });
        };
    },

    choice: function () {
        backgroundDis("images/backgrounds/back_int" + discon.backgrounds[0] + ".jpg");

        showSlide("input");

        document.getElementById("next-input").style.visibility = 'hidden';
        document.getElementById("next-novel").style.visibility = 'hidden';

        showDisconAgent(trainingAgents[trials[0]], "ask");


        if (discon.trials[0] == "0") {

            discon.position = [discon.targetsF[0][0], discon.targetsF2[0][0], discon.targetsF3[0][0]];

        } else if (discon.trials[0] == "1") {

            discon.position = [discon.targetsF2[0][0], discon.targetsF3[0][0], discon.targetsF[0][0]];

        } else if (discon.trials[0] == "2") {

         discon.position = [discon.targetsF3[0][0], discon.targetsF[0][0], discon.targetsF2[0][0]];
           
        } else if (discon.trials[0] == "2") {

           discon.position = [discon.targetsF3[0][0], discon.targetsF2[0][0], discon.targetsF[0][0]];


        } else {

            discon.position = [discon.targetsF2[0][0], discon.targetsF[0][0], discon.targetsF3[0][0]];

        }

        sourceLeftItem("images/" + discon.position[0] + ".png");
        hideLeftItem();

        sourceMiddleItem("images/" + discon.position[1] + ".png");
        hideMiddleItem();

        sourceRightItem("images/" + discon.position[2] + ".png");
        hideRightItem();


        // pause for 1s before items appear.
        setTimeout(function () {

            showLeftItem();
            showMiddleItem();
            showRightItem();

            document.getElementById("next-novel").style.visibility = 'visible';

        }, 900);
    },

    choice2: function () {
        document.getElementById("next-novel").style.visibility = "hidden";

        sourceSound("sound/" + "it_" + trainingAgents[trials[0]] + ".mp3");
        playSound();

        sound = document.getElementById("sound");

        sound.onended = function () {
            $(".item").click(function () {
                var clickedItem = event.target;

                var pickId = event.target.id;

                if (pickId == "item_l") {
                    var pick = discon.position[0];
                } else if (pickId == "item_m") {
                    var pick = discon.position[1];
                } else if (pickId == "item_r") {
                    var pick = discon.position[2];
                }

                var pickCat = findCategory(pick);

                // compare to 1st target
                if (pickCat == trialTargets[trials[0]][0]) {
                    var correct_target1 = 1;
                } else {
                    var correct_target1 = 0;
                }

                // compare to 2nd target
                if (pickCat == trialTargets[trials[0]][1]) {
                    var correct_target2 = 1;
                } else {
                    var correct_target2 = 0;
                }

                if (pickCat == trialTargets[trials[0]][2]) {
                    var correct_target3 = 1;
                } else {
                    var correct_target3 = 0;
                }

                if (pickCat == discon.lastInputCat) {
                    var same_lastInput = 1;
                } else {
                    var same_lastInput = 0;
                }

                $(".item").unbind("click");
                clickedItem.style.border = '5px solid blue';

                var subid = train.subid;
                var subage = train.subage;

                data = {
                    subid: train.subid,
                    subage: train.subage,
                    task: "discourse_continuity",
                    trial: trials[0] + 1,

                    agent: trainingAgents[trials[0]],
                    slide: discon.slides[0],

                    target1: trialTargets[trials[0]][0],
                    target2: trialTargets[trials[0]][1],
                    target3: trialTargets[trials[0]][2],

                    item_l: discon.position[0],
                    item_m: discon.position[1],
                    item_r: discon.position[2],

                    pick: pick,
                    pickPos: pickId,
                    pickCat: pickCat,

                    correct: correct_target1,

                }
                discon.data.push(data);

                discon.lastInputCat = "";

                setTimeout(function () {
                    clickedItem.style.border = '0px';
                    discon.transition();
                }, 900);
            });
        };
    },

    transition: function () {
        backgroundDis2("images/backgrounds/back_int" + discon.backgrounds[0] + ".jpg");

        showSlide("transition");
        showDisconAgent(trainingAgents[trials[0]], "transition");

        sourceSound("sound/" + "thank_" + trainingAgents[trials[0]] + ".mp3");
        playSound();

        discon.trials.shift();

        if (discon.trials.length == 0) {
            setTimeout(function () {
                turk.submit(discon)
            }, 500);
            showSlide("select");
            return;
        }

        discon.targetsF.shift();
        discon.targetsF2.shift();
        discon.targetsF3.shift();

        discon.backgrounds = backgrounds.slice();

        discon.slides = slides.slice();

        sound = document.getElementById("sound");
        sound.onended = function () {
            $(".agent_transition").click(discon.intro);
        };
    },

}