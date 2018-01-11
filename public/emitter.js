// var canvas = document.getElementById("preview");
// var context = canvas.getContext("2d");

// canvas.width = 800;
// canvas.height = 600;

// context.width = canvas.width;
// context.heigth = canvas.height;

var video = document.getElementById("video");

var socket = io();

function logger(msg) {
    $("#logger").text(msg);
}

function loadCam(stream) {
    video.src = window.URL.createObjectURL(stream);
    logger("Camera loaded");
}

function loadFail(stream) {
    logger("Camera failed loading");
}

function viewVideo(video, /*context*/) {
    //context.drawImage(video, 0, 0, context.width, context.height);
    socket.emit("stream", video.toDataURL("image/webp"));
}

$(function () {
    navigator.gerUserMedia = (navigator.getUserMedia
        || navigator.webkitGeUserMedia
        || navigator.mozGetUserMedia
        || navigator.msgGetUserMedia);

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true }, loadCam, loadFail);
    }

    setInterval(function () {
        viewVideo(video, /*context*/);
    }, 500);
});