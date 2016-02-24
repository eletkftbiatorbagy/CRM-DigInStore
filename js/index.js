var app = 	{
				initialize: function() {
					this.bindEvents();
				},
	
				bindEvents: function() {
					document.addEventListener('deviceready', this.onDeviceReady, false);
				},
	
				onDeviceReady: function() {
					console.log("CAMERA : "+navigator.camera);
					setTimeout(function() {
						navigator.splashscreen.hide();
					}, 3000);
		
				}	
    		};
(function(){
    var oldLog = console.log;
    console.log = function (message) {
        document.getElementById("CONSOLE").innerHTML += message + "<br>";
        oldLog.apply(console, arguments);
    };
})();

var myscroll = [];

function iscroll_init()
{
	var mains = document.getElementsByTagName("main");
	for (var m=0; m<mains.length; m++)
	{
		var main = mains[m];
		if (main.firstChild)
		{
			if (!main.id) { main.id = "Main"+main.parentNode.id }
			myscroll[main.id] = new IScroll(main);
			console.log("iScroll : "+main.id);
		}	
	}
}

var OLDAL = 0;
var Oldal_cache = [];
var UGYFEL;

function login()
{
								login_siker();   // ide majd callback jön
}

function login_siker()
{
	oldal(0);
}


function oldal(NR,vissza)
{
	var oldalak = document.getElementsByTagName("oldal");
	for (var o=0; o<oldalak.length; o++)
	{
		oldalak[o].style.display = (oldalak[o].id==NR)?"block":"none";
	}
	if (!vissza) { Oldal_cache.push(NR); }
	OLDAL = NR;
	if (!UGYFEL && OLDAL<100 && !vissza) { oldal(100); }
}

function oldal_object(NR)
{
	var oldalak = document.getElementsByTagName("oldal");
	var obj;
	for (var o=0; o<oldalak.length; o++)
	{
		if (oldalak[o].id==NR) { obj = oldalak[o]; }
	}
	return obj;
}

function vissza()
{
	Oldal_cache.pop();
	var elozo_oldal = Oldal_cache[Oldal_cache.length-1];
	oldal(elozo_oldal,true);
}

function scan(){
	cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
	
}


function kivalaszt()
{
	UGYFEL = 1;
	vissza();
	vissza();
}


function hiba(message)
{
	console.log ("HIBA : "+message);
}

function uj_foto(ablak)
{
	var foto_kesz = function(imageData) {
							var img = document.createElement("img");
								img.src = "data:image/jpeg;base64," + imageData;
								img.className = "foto";
							oldal_object(ablak).getElementsByTagName("main")[0].getElementsByTagName("div")[0].appendChild(img);		
						};

	setTimeout(function() {
    	console.log("FOTÓZÁS +");
    	navigator.camera.getPicture(foto_kesz, hiba, { quality: 75,
    						destinationType: Camera.DestinationType.DATA_URL,
    						sourceType : Camera.PictureSourceType.CAMERA,
    						allowEdit : true,
    						encodingType: Camera.EncodingType.JPEG,
    						targetWidth: 700,
  							targetHeight: 394,
  							correctOrientation: true,
  							cameraDirection: Camera.Direction.BACK,
    						saveToPhotoAlbum: false,
    						popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY)
		});
	}, 0);
}

// Reposition the popover if the orientation changes.
 window.onorientationchange = function() {
     var cameraPopoverOptions = new CameraPopoverOptions(0, 0, 700, 394, Camera.PopoverArrowDirection.ARROW_ANY);
     cameraPopoverHandle.setPosition(cameraPopoverOptions);
 }
 
 
 function uj_bejegyzes(ablak)
 {
 	var cim = document.createElement("span");
 		cim.className = "bejegyzes_cim";
 	var d = new Date();
 		cim.innerHTML = "Szerző: " + "<strong>Kiss Attila<strong>" + "&nbsp;&nbsp;&nbsp;&nbsp;Bejegyzés dátuma : <strong>"+ d.getFullYear() + "." + d.getMonth()+1 + "." + d.getDate() +"&nbsp;&nbsp;" + d.getHours() + ":" + d.getMinutes()+"</strong>";
 	var txtarea = document.createElement("textarea");
 	    txtarea.className = "txtarea";
 	var main = oldal_object(ablak).getElementsByTagName("main")[0];
 	var div1 = main.getElementsByTagName("div")[0];
 	div1.appendChild(cim);
 	div1.appendChild(txtarea);
 	setTimeout(function () {
 			myscroll[main.id].refresh(); },0);
 }
