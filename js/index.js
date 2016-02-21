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

