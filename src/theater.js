var theater = theaterJS({autoplay:true, erase:true});

var startDate = new Date(2015, 9, 29, 16, 53);
var currentDate = new Date();

var startTime = startDate.getTime();
var currentTime = currentDate.getTime();

var difference_ms = Math.abs(currentTime - startTime);
var MS_IN_DAY = 1000 * 60 * 60 * 24;
var daysSince = Math.floor(difference_ms/MS_IN_DAY);
var hoursSince = Math.floor(((difference_ms/MS_IN_DAY) % 1) * (24));
var minutesSince = Math.floor((((difference_ms/MS_IN_DAY) % 1) * (24) % 1 * 60));

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

currentDay = currentDate.getDay();
function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
var currentDateStr = ordinal_suffix_of(currentDate.getDate());
function showContinue() {
    var elementId = "line3";
    var parent = document.getElementById(elementId);
    var element = document.createElement("input");
    element.setAttribute("type", "button");
    element.setAttribute("value", "yes");
    element.setAttribute("name", "test_button");
    element.setAttribute("id", "test_button");
    element.setAttribute("onclick", "resume()");
    theater.stop();
    parent.appendChild(element);
}

function resume() {
    theater.play();
}

var isFlickerOn = true;
function toggleFlicker() {
    var element = document.getElementById("keyframes");
    if (isFlickerOn === true) {
        isFlickerOn = false;
        element.innerHTML = "";
    } else if (isFlickerOn === false) {
        isFlickerOn = true;
        element.innerHTML = "@keyframes flicker {to {color:rgb(88, 137, 113); }}";
    }
    return isFlickerOn;
}

theater
    .on('type:start, erase:start', function () {
      // add a class to actor's dom element when he starts typing/erasing
      var actor = theater.getCurrentActor();
      actor.$element.classList.add('is-typing');
    })
    .on('type:end, erase:end', function () {
      // and then remove it when he's done
      var actor = theater.getCurrentActor();
      actor.$element.classList.remove('is-typing');
    });

theater
    .addActor('line1', { speed: 0.9, accuracy: 1 })
    .addActor('line2', { speed: 0.9, accuracy: 1 })
    .addActor('line3', { speed: 0.9, accuracy: 1 })
    .addScene('line1:It\'s ' + days[currentDay] + ' ' + months[currentDate.getMonth()] + ' ' + currentDateStr + ', ' + currentDate.getFullYear() + '.', 50)
    .addScene(' .', 50)
    .addScene(' .', 1000)
    .addScene('line2:Which happens to be '+daysSince+' days, '+hoursSince+' hours, and '+minutesSince+' minutes since the start of this tale.', 3000)
    .addScene('line3:Care to hear the rest?', 1000)
    .addScene(showContinue)
    .addScene({name: 'fade', args:['line1,line2,line3']})
    .addScene('line1:It all started here, in San Francisco.',2000)
    .addScene(1000);
    
    