$(document).ready(function() {
        var APIkey = "55781b0b4ffc1477d07f00c547d3d768";
        var search = $("#citySearch")
        var show = search.val(); // to give value to city search//
 
        //add city//
       //search click code you can put inout id or class//
       $("#add-city").on("click", function (event) {
      event.preventDefault(); //PREVENIR REFRESH
      search.val(""); //clear the input box when new one comes//
      console.log(show)
      addCity(show) //call your function with the value you want to have//

      });
    
       //click event for the city we are looking//
       $(".history").on("click",  function(){
        addCity($(this).text()) //when everythis is ready the text i want to show is going to appear//

       });

     //this is the add city function  (search) get the value from var show//
     function addCity(show){
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ show  + "&APPID=" + APIkey;
        $.ajax({  
        url: queryURL , //to get the input in the link//
        type: "GET", //to get the info from api"
        data:"json", //make data readable
        success: function(data){
          console.log(data.name)  
          $(".city-Info").show()
          $("#current-city").text("City: " + data.name)
          $("#current-temp").text("Tempeture: " + data.main.temp  + "   °F")
          $("#current-humidity").text("Humidity: " + data.main.humidity + "   %")
          $("#current-wind").text("Wind Speed: " + data.wind.deg + "   MPH")
          var icon = data.weather[0].icon;
          var imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
          $("#current-icon").attr("src", imgURL)  
          var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid="+ APIkey +"&lat="+ data.coord.lat + "&lon="+ data.coord.lon;

          $.ajax({
            url: uvURL , //to get the input in the link//
            type: "GET", //to get the info from api"
            data:"json", //make data readable
            success: function(uvdata){
            $("#current-uv").text(uvdata.value)
            }
          })
           
           
       }})

       
     }
    
      
        
        var forcastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + show + "&appid=" + APIKey;
         
         
         $.ajax({
          url: forcastQueryURL , //to get the input in the link//
          type: "GET", //to get the info from api"
          data:"json", //make data readable
       }).then(function (data) {
        var fivedayforecastData = data.list;
        console.log(fivedayforecastData)
        for(var i = 0; i<$fivedayforecastData.length; i++){
          console.log(fivedayforecastData.length);
       });

      

});
