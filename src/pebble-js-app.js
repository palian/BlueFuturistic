var url = 'https://rawgit.com/chrira/BlueFuturistic/load-actual-colors/config.html';

Pebble.addEventListener("ready",
  function(e) {
    console.log("PebbleKit JS ready!");
  }
);

Pebble.addEventListener("showConfiguration",
  function(e) {
    // load color configuration from local storage
    var color = localStorage.getItem('KEY_COLOR');
    var color1 = localStorage.getItem('KEY_COLORS');
    var color2 = localStorage.getItem('KEY_COLOR1');
    console.log("Got colors from local storage: KEY_COLOR: " + color + ", KEY_COLORS: " + color1 + ", KEY_COLOR1: " + color2);

    //Load the remote config page and give color variables to select actual options
    Pebble.openURL(url + "?color=" + color + "&color1=" + color1 + "&color2=" + color2);
  }
);

Pebble.addEventListener("webviewclosed",
  function(e) {
    //Get JSON dictionary
    var configuration = JSON.parse(decodeURIComponent(e.response));
    console.log("Configuration window returned: " + JSON.stringify(configuration));

    // save color configuration to local storage
    localStorage.setItem('KEY_COLOR', configuration.color);
    localStorage.setItem('KEY_COLORS', configuration.color1);
    localStorage.setItem('KEY_COLOR1', configuration.color2);

    //Send to Pebble, persist there
    Pebble.sendAppMessage(
      {"KEY_COLOR": configuration.color , "KEY_COLORS": configuration.color1, "KEY_COLOR1": configuration.color2},
      function(e) {
        console.log("Sending settings data...");
      },
      function(e) {
        console.log("Settings feedback failed!");
      }
    );
  }
);
