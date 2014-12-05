var pages = [];
var links = [];
var numPages;
var numLinks;
var Screens = [];   

var app = {
    // Application Constructor
    initialize: function() {
        pages = document.querySelectorAll("[data-role=page]");
        links = document.querySelectorAll("[data-role=pagelink]");
        
        numPages = pages.length;
        numLinks = links.length;   

        pageshow = document.createEvent("Event");
        pageshow.initEvent('pageshow',true,true);        
             
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        for (var i = 0; i < numLinks; i++) {
            if(detectTouchSupport()) {
                links[i].addEventListener("touchend", Toucher, false);
            } else {
                links[i].addEventListener("click", Toucher, false);
            }
            
        }        
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
    },
    // Update DOM on a Received Event
};
app.initialize();

function Toucher(ev) {
    ev.preventDefault(); //This stops the 300ms delay
    var currentsource = ev.currentTarget.href; //This grabs the href of the object that was clicked 
    var currsplit = currentsource.split("#"); //Takes the href (currentsource), splits it in half and puts the halves in a array. The 1 half is '#' and the other half is 'home'.  
    loadPage(currsplit[1]);
    var pageid= "#"+currsplit[1];// #home, #map, #warehouse
    document.querySelector(pageid).dispatchEvent(pageshow);//Dispatches page show for the page selected 
}

function loadPage(pagename) {
    if (pagename == null || pagename == "undefined") {
        //If the page is not available it will show the home page
        pagename == pages[0].id;
//      console.log("the page isn't working (is null or undefined)");
    }
    if (Screens[Screens.length - 1] != pagename) {
        Screens.push(pagename);
        //Saves the history of the screens viewed in the Screens array
    }
    for (var i = 0; i < numPages; i++) {
        if (pages[i].id == pagename) {
//          console.log("showing the page");
            pages[i].className = "active";
            // setTimeout(show, 10, pages[i]);
            //If the page id equals the pagename being passed into the function it becomes active
            console.log(pagename+" is now active");
        } else {
            pages[i].className = "inactive";//If not, the page stays/becomes inactive
            // setTimeout(hide, 800, pages[i]);
        }
    }
    for (var i = 0; i < numLinks; i++) {
        links[i].className = " ";
    }

    var atr = '[href="#'+pagename+'"]';
    console.log(atr);
    document.querySelector(atr).className = "activetab";//stores the active tab in a variable for later use
}

function show(page) {
    page.className = "active";
}

function hide(page) {
    page.className = "inactive";
}

function detectTouchSupport( ){
  msGesture = navigator && navigator.msPointerEnabled && navigator.msMaxTouchPoints > 0 && MSGesture;
  touchSupport = (("ontouchstart" in window) || msGesture || (window.DocumentTouch && document instanceof DocumentTouch));
  return touchSupport;
}
