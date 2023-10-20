img = ""
status = ""
objects = []


function preload() {
    img = loadImage("https://thumbs.dreamstime.com/b/armed-robber-shotgun-attacker-wearing-balaclava-31146585.jpg")
}

function setup() {
    canvas = createCanvas(700, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(700, 500)
    video.hide()

}

function draw() {
    image(video, 0, 0, 700, 500)
    document.getElementById("number").innerHTML="No. of objects detected are "+objects.length
    

    if (status != "") {
        objectDetector.detect(video, gotResult)
        

        for (i = 0; i < objects.length; i = i + 1) {
            
            document.getElementById("status").innerHTML = "Status:Objects Detected"
            fill("red")
            percent = floor(objects[i].confidence * 100)
            textSize(20)
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y)
            noFill()
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }


    }

}

function modelLoaded() {
    console.log("Model loaded successfully")
    status = true
    objectDetector.detect(video, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        objects = results
    }

}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status:Detecting Objects"
    



}