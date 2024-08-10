document.getElementById('batteryCondition').addEventListener('change', function() {
    const conditionImage = document.getElementById('batteryConditionImage');
    conditionImage.style.display = this.value === 'Yes' ? 'block' : 'none';
        
});
document.getElementById('exteriorDamage').addEventListener('change', function() {
    const damageDetails = document.getElementById('exteriorDamageDetails');
    damageDetails.style.display = this.value === 'Yes' ? 'block' : 'none';
});
document.getElementById('engineDamage').addEventListener('change', function() {
    const damageDetails = document.getElementById('engineDamageDetails');
    damageDetails.style.display = this.value === 'Yes' ? 'block' : 'none';
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('[id^="section-"]');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

function startSpeechRecognition(inputId) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = function(event) {
        document.getElementById(inputId).value = event.results[0][0].transcript;
    };

    recognition.onerror = function(event) {
        console.error(event.error);
    };
}

function startInteraction() {
    // Get the label text
    // Get all elements with the ID 'abc'
    const elements = document.querySelectorAll('label');

    // Initialize the SpeechSynthesis API
    const synth = window.speechSynthesis;

    elements.forEach(element => {
        // Create a new SpeechSynthesisUtterance
        const utterance = new SpeechSynthesisUtterance(element.textContent);

        // Speak the text
        synth.speak(utterance);

    

    // Wait for the speech to finish before starting speech recognition
    utterance.onend = function() {
        // Start speech recognition
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

        recognition.onresult = function(event) {
            const userInput = event.results[0][0].transcript;
            document.getElementById('test124').value = userInput;
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
        };

        recognition.start();
    }});
}
(function() {
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimaitonFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

var canvas = document.getElementById("sig-canvas");
var ctx = canvas.getContext("2d");
ctx.strokeStyle = "#222222";
ctx.lineWidth = 4;

var drawing = false;
var mousePos = {
    x: 0,
    y: 0
};
var lastPos = mousePos;

canvas.addEventListener("mousedown", function(e) {
    drawing = true;
    lastPos = getMousePos(canvas, e);
}, false);

canvas.addEventListener("mouseup", function(e) {
    drawing = false;
}, false);

canvas.addEventListener("mousemove", function(e) {
    mousePos = getMousePos(canvas, e);
}, false);

// Add touch event support for mobile
canvas.addEventListener("touchstart", function(e) {

}, false);

canvas.addEventListener("touchmove", function(e) {
    var touch = e.touches[0];
    var me = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
    });
    canvas.dispatchEvent(me);
}, false);

canvas.addEventListener("touchstart", function(e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var me = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
    });
    canvas.dispatchEvent(me);
}, false);

canvas.addEventListener("touchend", function(e) {
    var me = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(me);
}, false);

function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
    x: mouseEvent.clientX - rect.left,
    y: mouseEvent.clientY - rect.top
    }
}

function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
    }
}

function renderCanvas() {
    if (drawing) {
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
    lastPos = mousePos;
    }
}

// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function(e) {
    if (e.target == canvas) {
    e.preventDefault();
    }
}, false);
document.body.addEventListener("touchend", function(e) {
    if (e.target == canvas) {
    e.preventDefault();
    }
}, false);
document.body.addEventListener("touchmove", function(e) {
    if (e.target == canvas) {
    e.preventDefault();
    }
}, false);

(function drawLoop() {
    requestAnimFrame(drawLoop);
    renderCanvas();
})();

function clearCanvas() {
    canvas.width = canvas.width;
}

// Set up the UI
var sigText = document.getElementById("sig-dataUrl");
var sigImage = document.getElementById("sig-image");
var clearBtn = document.getElementById("sig-clearBtn");
var submitBtn = document.getElementById("sig-submitBtn");
clearBtn.addEventListener("click", function(e) {
    clearCanvas();
    sigText.innerHTML = "Data URL for your signature will go here!";
    sigImage.setAttribute("src", "");
}, false);
submitBtn.addEventListener("click", function(e) {
    var dataUrl = canvas.toDataURL();
    sigText.innerHTML = dataUrl;
    sigImage.setAttribute("src", dataUrl);
}, false);

})();    