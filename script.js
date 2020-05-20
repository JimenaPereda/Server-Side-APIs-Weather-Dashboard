$(document).ready(function() {
        var APIkey = "55781b0b4ffc1477d07f00c547d3d768";
        var search = $("#citySearch")
        var show = search.val(); // to give value to city search//
        var history = JSON.parse(window.localStorage.getItem("history")) || []
 
        //var search = $("#citySearch").val();
      
       // var show = search.val(); // to give value to city search//
 
        //add city//
       //search click code you can put inout id or class//
       $("#add-city").on("click", function (event) {
       event.preventDefault(); //PREVENIR REFRESH
       var search = $("#citySearch").val();
       console.log(search)
       addCity(search)
       forecast(search)
       //call your function with the value you want to have//
      //search.val(""); //clear the input box when new one comes//
      });
    
       //click event for the city we are looking//
       $(".history").on("click",  function(){
        addCity($(this).text()) //when everythis is ready the text i want to show is going to appear//

       });
       

     //this is the add city function  (search) get the value from var show//
      function addCity(show){
      console.log(show)
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ show + "&appid=" + APIkey;
         $.ajax ({
          url: queryURL , //to get the input in the link//
          type: "GET", //to get the info from api"
          data:"json", //make data readable
          success: function(data){
            if (history.indexOf(show) === -1){
              history.push(show);
              window.localStorage.setItem("history", JSON.stringify(history));
              
            }  
            var icon = data.weather[0].icon;
            var imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            var cityDate = moment().format('l');
            var cityIconEl = $("<img>").attr("src", imgURL);
            $(".city-Info").show()
            $("#current-city").text(data.name + " (" + cityDate + ")").append(cityIconEl);
            $("#current-temp").text("Tempeture: " + data.main.temp  + "   C°")
            $("#current-humidity").text("Humidity: " + data.main.humidity + "   %")
            $("#current-wind").text("Wind Speed: " + data.wind.deg + "   MPH")
               var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid="+ APIkey +"&lat="+ data.coord.lat + "&lon="+ data.coord.lon;
               $.ajax({
                url: uvURL , //to get the input in the link//
                type: "GET", //to get the info from api"
                data:"json", //make data readable
                success: function(uvdata){
               $("#current-uv").text("UV Index: " + uvdata.value)
                }
                })
          } 
         })
      }

      function forecast(show) {
        var forcastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + show + "&appid=55781b0b4ffc1477d07f00c547d3d768" ;
        $.ajax({
          url: forcastQueryURL ,
          type: "GET", 
          data:"json",
          success: function(data){
            console.log(data)
            //Forecast city name and date//
            var dateOne = moment
			        .unix(data.list[0].dt)
		         	.utc()
		        	.format("L");   $(".dateOne").text(dateOne);
            var dateTwo = moment
            .unix(data.list[2].dt)
             .utc()
            .format("L");
            $(".dateTwo").text(dateTwo);
            var dateThree = moment
            .unix(data.list[12].dt)
             .utc()
            .format("L");
            $(".dateThree").text(dateThree);
            var dateFour = moment
            .unix(data.list[18].dt)
             .utc()
            .format("L");
            $(".dateFour").text(dateFour);
            var dateFive = moment
            .unix(data.list[26].dt)
             .utc()
            .format("L");
            $(".dateFive").text(dateFive);
             //forecast Tempeture//
             $(".tempOne").text("Tempeture: " + data.list[0].main.temp+ " °F");
             $(".tempTwo").text("Tempeture: " + data.list[2].main.temp+ " °F");
             $(".tempThree").text("Tempeture: " + data.list[12].main.temp + " °F");
             $(".tempFour").text("Tempeture: " + data.list[18].main.temp + " °F");
             $(".tempFive").text("Tempeture: " + data.list[26].main.temp+ " °F");
              //forecast Humidity//
             $(".humidityOne").text("Humidity: " +data.list[0].main.humidity + " %");
             $(".humidityTwo").text("Humidity: " +data.list[2].main.humidity + " %");
             $(".humidityThree").text("Humidity: " +data.list[12].main.humidity + " %");
             $(".humidityFour").text("Humidity: " +data.list[18].main.humidity + " %");
             $(".humidityFive").text("Humidity: " +data.list[26].main.humidity + " %");
             //Forecast Icon//
             var icon1 = data.list[0].weather[0].icon;
             var imgURL1 = "http://openweathermap.org/img/wn/" + icon1 + "@2x.png"
             var icon2 = data.list[2].weather[0].icon;
             var imgURL2 = "http://openweathermap.org/img/wn/" + icon2 + "@2x.png"
             var icon3 = data.list[12].weather[0].icon;
             var imgURL3 = "http://openweathermap.org/img/wn/" + icon3 + "@2x.png"
             var icon4 = data.list[18].weather[0].icon;
             var imgURL4 = "http://openweathermap.org/img/wn/" + icon4 + "@2x.png"
             var icon5 = data.list[26].weather[0].icon;
             var imgURL5 = "http://openweathermap.org/img/wn/" + icon5 + "@2x.png"
             

             $("#iconOne").attr("src", imgURL1).html("#iconOne").addClass("icon-size");
             $("#iconTwo").attr("src", imgURL2).html("#iconTwo").addClass("icon-size");
             $("#iconThree").attr("src", imgURL3).html("#iconThree").addClass("icon-size");
             $("#iconFour").attr("src", imgURL4).html("#iconFour").addClass("icon-size");
             $("#iconFive").attr("src", imgURL5).html("#iconFive").addClass("icon-size");

          }
        })
                 
   }
      

});
