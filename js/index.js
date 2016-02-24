var app = 	{
				initialize: function() {
					this.bindEvents();
				},
	
				bindEvents: function() {
					document.addEventListener('deviceready', this.onDeviceReady, false);
				},
	
				onDeviceReady: function() {
	
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
		if (oldalak(o).id==NR) { obj = oldalak(o); }
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


function uj_foto(ablak)
{
	var foto_kesz = function(imageData) {
							var img = document.createElement("img");
								img.src = imageData;
								img.className = "foto";
							oldal_object(ablak).getElementsByTagName("main")[0].appendChild(img);		
						};

	setTimeout(function() {
    	navigator.camera.getPicture(foto_kesz, hiba, { quality: 75,
    						destinationType: Camera.DestinationType.DATA_URL,
    						encodingType: Camera.EncodingType.JPEG,
    						saveToPhotoAlbum: false
		});
	}, 0);
}
