
let r, g, b;
let brain;

let which = "black";

function pickColor() {
    r = random(255);
    g = random(255);
    b = random(255);
    redraw();
}

function setup() {
    createCanvas(400, 200);
    noLoop();
    brain = new NeuralNetwork(3, 4, 2);

    for(let i=0;i<1000;i++){
        let r = random(255);
        let g = random(255);
        let b = random(255);
        let inputs = [r/255,g/255,b/255];
        let targets = trainColor(r,g,b);
        brain.train(inputs,targets);
    }

    pickColor();
}

function mousePressed(){
    let targets;
    if(mouseX>width/2)
        targets = [0,1];
    else   
        targets = [1,0];

    let inputs = [r,g,b];
    brain.train(inputs, targets);

    pickColor();
}

function colorPreditor(r,g,b){
    let inputs = [r/255,g/255,b/255];
    let outputs = brain.predict(inputs);
    console.log(outputs);

    if(outputs[0] > outputs[1])
        return "black";
    else
        return "white";
}

function trainColor(r,g,b){
    if(r+g+b > 350)
        return [1,0];
    else
        return [0,1];
}

function draw() {
    background(r,g,b);
    strokeWeight(4);
    stroke(0);
    line(width/2,0,width/2,height);

    textSize(32);
    noStroke();
    fill(0);
    textAlign(CENTER);
    text("black", width/4, height/3);
    fill(255);
    text("white", width*3/4, height/3);

    let which = colorPreditor(r,g,b);
    if(which === "black"){
        fill(0);
        ellipse(width/4,height*2/3,32);
    }else{
        fill(255);
        ellipse(width*3/4,height*2/3,32);
    }
}