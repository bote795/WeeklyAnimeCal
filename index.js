//helps export vals
var env = require('node-env-file');
env('.env')
var id=process.env.ID;
var secret=process.env.SECRET;

var nani = require('nani').init(id, secret);
var Anime=[];
var querystring = require('querystring');

var $ = require('jquery-deferred');
var params ={
  type: "Tv",
  status: "Not Yet Aired",
  season: "Winter"
}

var paramsString = querystring.stringify(params);
console.log(paramsString);

//sends request to retrieve all data for the season
//gets a small model for each
nani.get('browse/anime?'+paramsString)
  .then(data => {
    requests(data,analyseData);
  })
  .catch(error => {
    console.log(error);
  });

//function creates requests for all animes
//params
//@param data = anime retrieved from call 
//of animes that are coming out this season
//@param callback, function to send all data retrieved
function requests (data, callback) {
	var promises=[];
  for (var i = 0; i < data.length; i++) {
    promises.push(date(data[i].id));
  }
  $.when.apply($, promises).then(function () {
      var temp = arguments;
      console.log(temp);
      callback(temp)
  });
}

//function to retrieve the full anime data per anime usin the id
//to be able to retrieve the start date
//so we are then able to get what day of the week they come out
function date (id) {
	var dfd = $.Deferred();
	nani.get("anime/"+id)
  .then(data => {
    dfd.resolve(data)
  })
  .catch(error => {
    console.log(error);
  });
 return dfd.promise();
}

//function that is called back after all the data for each anime is retrieved
//created an array of Anime 
//prints out the dates
function analyseData (animeData) {
  for( key in animeData)
  {
    Anime.push(animeData[key]);
    var date = new Date(animeData[key].start_date);
    console.log("name:" +animeData[key].title_english + "start date:"+date);
  }
}

