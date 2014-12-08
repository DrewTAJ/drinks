var pages = [];
var links = [];
var numPages;
var numLinks;
var Screens = [];   
var header_title;
var inner_text;
var imagevar;
var reading;
var writing;
var custom_drink_pojo;

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
        for (var i = 0; i < numLinks; i++) {
            if(detectTouchSupport()) {
                links[i].addEventListener("touchend", Toucher, false);
            } else {
                links[i].addEventListener("click", Toucher, false);
            }           
        }        
        if(detectTouchSupport()) {
            document.querySelector("#drink_ingredients_add").addEventListener("touchend",addInput,false);
            document.querySelector("#drink_step_add").addEventListener("touched",addInput,false);
            document.querySelector("#custom_drink_save").addEventListener("touchend",saveDrink,false);
            document.querySelector("#drink_image_input").addEventListener("touchend",getImage,false);
            document.querySelector("#drink_image_input_cameraroll").addEventListener("touchend",getImage,false);
        } else {
            document.querySelector("#drink_ingredients_add").addEventListener("click",addInput,false);
            document.querySelector("#drink_step_add").addEventListener("click",addInput,false);
            document.querySelector("#custom_drink_save").addEventListener("click",saveDrink,false);
            document.querySelector("#drink_image_input").addEventListener("touchend",getImage,false);
        }

        if(detectTouchSupport()) {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        } else {
            this.onDeviceReady();   
        }

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
//        alert(document.querySelector("body").offsetWidth);

        reader = false;
        writer = false;
        console.log(document.querySelector("body").offsetWidth);
    },
    // Update DOM on a Received Event
};
app.initialize();

function Toucher(ev) {
    ev.preventDefault(); //This stops the 300ms delay
    var currentsource = ev.currentTarget.href; //This grabs the href of the object that was clicked 
    innert_text = ev.currentTarget.innerHTML;
    var idder = ev.currentTarget.id;
    var currsplit = currentsource.split("#"); //Takes the href (currentsource), splits it in half and puts the halves in a array. The 1 half is '#' and the other half is 'home'.  
    loadPage(currsplit[1], idder);
    var pageid= "#"+currsplit[1];// #home, #map, #warehouse
    document.querySelector(pageid).dispatchEvent(pageshow);//Dispatches page show for the page selected 
}

function loadPage(pagename, idder) {
    if (pagename == null || pagename == "undefined") {
        //If the page is not available it will show the home page
        pagename == pages[0].id;
//      console.log("the page isn't working (is null or undefined)");
    }
    if (Screens[Screens.length - 1] != pagename) {
        Screens.push(pagename);
        //Saves the history of the screens viewed in the Screens array                                           
    }

    if(pagename == "drink_selection") {
        console.log("bullshit "+pagename)
        var lister = document.querySelector("#"+pagename+" ul");
        // console.log("BEFORE JSON PARSIG");
        // var drinksjson = JSON.parse("drinks.json");
        // var k;
        // console.log(drinksjson);
        console.log("Before FOR LOOP");
        switch(idder) {
            case "Strong":
                k = 0;
                break;
            case "Medium":
                k = 1;
                break;
            case "Non-Alcoholic":
                k = 2;
                break;
            case "Exotic":
                k = 3;
                break;
            default: 
                k = null;
                break;
        }
        // for(var i = 0; i < drinksjson.Category[k].length; i++) {
        //     console.log("IN FOR LOOP");
        //     var listing = '<li>';
        //         listing+= '<a href="#'+pagename+'" data-role="pagelink">'+drinksjson.Category[k].Drinks[i].name+'</a>';
        //         listing += '</li>';
        //     lister.appendChild(listing);
        // }
        // console.log("IN FOR LOOP");
    }

    if(idder == "My") {
        window.requestFileSystem(LocalFileSystem.Persistent, 5*1024*1024, onFileSuccess, errorHandler);
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

    header_title = document.querySelector("#header_title");

    switch(pagename) {

        case "home" :
            header_title.innerHTML="Home";
            break;
        case "favourite" :
            header_title.innerHTML="Favourite";
            break;
        case "search":
            header_title.innerHTML="Search";
            break;
        case "settings":
            header_title.innerHTML="Settings";
            break;
        case "drink_display":
            header_title.innerHTML="Master Chief";
            break;
        case "custom_drink":
            header_title.innerHTML="Make a Drink";
            break;
        case "drink_selection":
            header_title.innerHTML=innert_text;
            break;
        default :
            header_title.innerHTML="Drink Index";
            break;
    }

    document.querySelector("#back_button a").href = "#"+Screens[Screens.length - 1];

    console.log(header_title.innerHTML+" title");
    var atr = '[href="#'+pagename+'"]';
    console.log(atr);

    imagevar = null;

    if(pagename == "home") {
        document.querySelector("#home_button").className = "activetab";
    } else  {
        document.querySelector(atr).className = "activetab";//stores the active tab in a variable for later use
    }
}

function addInput(ev) {
    ev.preventDefault();

    if(ev.currentTarget.id == "drink_ingredients_add") {
        var quantity_div = document.getElementById("drink_ingredients_quantity");
        var name_div = document.getElementById("drink_ingredients_name");

        var ingredient_quantity = document.createElement("input");
        ingredient_quantity.id = "drink_ingredients_name_input";
        ingredient_quantity.setAttribute("type","text");
        ingredient_quantity.setAttribute("placeholder","leave blank if none")

        var ingredient_name = document.createElement("input")
        ingredient_name.id = "drink_ingredients_quantity_input";
        ingredient_quantity.setAttribute("type","text");
        ingredient_quantity.setAttribute("plceholder","Ingredient");

        quantity_div.appendChild(ingredient_quantity);
        name_div.appendChild(ingredient_name);
    } else {
        var recipe_div = document.getElementById("drink_recipe");

        var recipe_step = document.createElement("input");
        recipe_step.id = "drink_recipe_input";
        recipe_step.setAttribute("type","text");
        recipe_step.setAttribute("placeholder","recipe step");

        recipe_div.appendChild(recipe_step);
    }
}

function saveDrink(ev) {
    ev.preventDefault();

    writer = true;

    var drink_name = document.querySelector("#drink_name_input");
    var drink_image = null;
    var drink_description = document.querySelector("#drink_description_input");
    var drink_ingredient_name = document.querySelectorAll("#drink_ingredients_quantity_input");
    var drink_ingredient_quantity = document.querySelectorAll("#drink_ingredients_name_input");
    var drink_recipe_steps = document.querySelectorAll("#drink_recipe_input");

    var drink_quant_count = 0;
    var drink_name_count = 0;
    var drink_recipe_count = 0

    for(var i = 0; i < drink_ingredient_name.length; i++) {
        if(drink_ingredient_name[i].value != "") {
            drink_name_count++;
        } 
    }

    for(var i = 0; i < drink_recipe_steps; i++) {
        if(drink_recipe_steps[i].value != "") {
            drink_recipe_count++;
        }
    }

    if(drink_name_count == drink_ingredient_name.length && drink_name.value != "" && drink_recipe_count == drink_recipe_steps.length) {

        window.requestFileSystem(LocalFileSystem.Persistent, 5*1024*1024, onFileSuccess, errorHandler);

        custom_drink_pojo = {
            "title" : drink_name,
            "picture" : imagevar,
            "ingredients" : [],
            "recipe" : [],
            "description" : drink_description.value
        };

        for(var i = 0; i < drink_ingredient_name.length; i++) {
            if(drink_ingredient_quantity[i].value == "") {
                var pushable = {"Name" : drink_ingredient_name[i].value, "Quantity" : null}
            } else {
                var pushable = {"Name" : drink_ingredient_name[i].value, "Quantity" : drink_ingredient_quantity[i].value}
            }
            custom_drink_pojo.ingredients.push(pushable);
        }

        for(var i = 0; i < drink_recipe_steps.length; i++) {
            var pushable = drink_recipe_steps.value;

            custom_drink_pojo.recipe.push(pushable);
        }
    } else {
        alert("Please fill out all necessary form fields accordingly")
    }

}

function getImage(ev) {
    ev.preventDefault();
    if(ev.currentTarget.id == "drink_image_input_cameraroll") {
        var cameraOptions = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        };  
    } else {
        var cameraOptions = {
            destinationType: Camera.DestinationType.FILE_URI,
        };           
    }
    console.log("IMAGE");
    navigator.camera.getPicture( cameraSuccess, cameraError, cameraOptions);     
   
}

function cameraSuccess(imageURI) {
    imagevar = imageURI;
}

function cameraError(error) {
    alert("Error Code: "+error);
}

function onFileSuccess(fileSystem) {
    if(writer == true) {
        fileSystem.root.getFile('drink_user.json', {create: false}, getFileWriterSuccess, errorHandler);
    } else {
        fileSystem.root.getFile('drink_user.json', {create: false}, getFileReaderSuccess, errorHandler);
    }
}

function getFileReaderSuccess(fileEntry) {
    var reader = new FileReader();

    reader.onload() = function() {

    }
}

function getFileWriterSuccess(fileEntry) {
    fileEntry.createWriter(function(fileWriter) {
        
        fileWriter.onwriteend = function(e) {
            console.log("Write Completed");
        };

        fileWriter.onerror = function(e) {
            console.log("Write failed: " + e.toString());
        };

        var blob = custom_drink_pojo;

        fileWriter.write(blob);


    },errorHandler);
}

function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
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

var sim = {
    goOffline: function() {
        sim._dispatchEvent("offline");
    },
    goOnline: function() {
        sim._dispatchEvent("online");
    }, 
    _dispatchEvent: function(eventType) {
        var event = document.createEvent('Event');
        event.initEvent(eventType, true, true);
        document.dispatchEvent(event);
        app.contactStarter(eventType);
    }
};