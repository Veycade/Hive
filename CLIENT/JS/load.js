const electron = require('electron');
const app = electron.app;
let $ = require('jquery');
const { autoUpdater } = require('electron-updater');


function pingURL() {
  
    // The custom URL entered by user
    var URL = $("#url").val();
    var timer = 10;
    var settings = {
    
      // Defines the configurations
      // for the request
      cache: false,
      dataType: "jsonp",
      async: true,
      crossDomain: true,
      url: URL,
      method: "GET",
      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    
      // Defines the response to be made
      // for certain status codes
      statusCode: {
        200: function (response) {
          document.getElementById('noInternet').innerText = 'CHECKING FOR UPDATES';
          autoUpdater.checkForUpdates();
            i=0;
            setInterval(() => {
                i++;
                $('.progress-bar').css('width', i+'%').attr('aria-valuenow', i);
                if(i >= 300){
                    //window.location.href = '../HTML/index.html';
                }
            }, 20);
        },
        400: function (response) {
          setInterval(() => {
            document.getElementById('noInternetBG').style = 'background-color: rgb(255, 51, 51); border-radius: 5px; color: white; max-width: 300px;'
            document.getElementById('noInternet').innerText = 'PLEASE CONNECT TO THE INTERNET \n TRYING AGAIN IN: ' + timer;
          }, 1000);
        },
        0: function (response) {
            setInterval(() => {
              document.getElementById('noInternetBG').style = 'background-color: rgb(255, 51, 51); border-radius: 5px; color: white; max-width: 300px;'
                document.getElementById('noInternet').innerText = 'PLEASE CONNECT TO THE INTERNET \n TRYING AGAIN IN: ' + timer;
              }, 1000);
        },
      },
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
      });
      setInterval(() => {
        if(timer >=2){
            timer--;
        }else{
            timer = 10;
        }
      }, 1000);
    // Sends the request and observes the response
    setTimeout(() => {
        $.ajax(settings).done(function (response) {
            console.log(response);
          });
    }, 10000);
  }


