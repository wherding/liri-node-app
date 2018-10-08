require("dotenv").config();
var key = require("./key")
var request = require('request');
var fs = require("fs");
//var spotify = new Spotify(keys.spotify);
var Spotify = require('node-spotify-api');

var bandsintown = require('bandsintown')('codingbootcamp');
var userCmd = process.argv[2]
var userBand = process.argv.slice(3).join(" ");
//console.log(process.argv)
var arrevents = [];

if (userCmd == "concert-this") {
  var concert = bandsintown
    .getArtistEventList(userBand)
    .then(function (events) {
      console.log(events[0].formatted_datetime);
      console.log(events[0].title);
      //console.log(events)
    });
}

var spotify = new Spotify(key.spotify);

if (userCmd === "spotify-this-song") {
  
  if (process.argv.length < 4) {

    var songSearch = spotify.search({ type: 'track', query: 'The Sign' }, function (err, data) {
      if (err) {
        //return console.log('Error occurred: ' + err);
      }
      console.log(data.tracks.items[0].artists[0].name);
      console.log(data.tracks.items[0].name);
      console.log(data.tracks.items[0].external_urls.spotify);
      console.log(data.tracks.items[0].album.name);
    });
  }
  else{
  var songSearch = spotify.search({ type: 'track', query: userBand }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].external_urls.spotify);
    console.log(data.tracks.items[0].album.name);
  });
}
}

if (userCmd === "movie-this") {
  if (process.argv.length < 4) {
    //console.log("invlaid command ");
    request('http://www.omdbapi.com/?apikey=trilogy&t=' + 'mr.nobody', function (error, response, body) {
     // console.log('error:', error); // Print the error if one occurred
     // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received  
      var movie = JSON.parse(body);
      console.log('title:', movie.Title); // Print the HTML for the Google homepage.
      console.log('Year:', movie.Year);
      console.log('IMDB rating:', movie.imdbRating);
      console.log('Rotten Tomatoes:', movie.Ratings[1].Value);
      console.log('Country:', movie.Country);
      console.log('Language:', movie.Language);
      console.log('Plot:', movie.Plot);
      console.log('Actors:', movie.Actors);
    });
  }
  else {
    request('http://www.omdbapi.com/?apikey=trilogy&t=' + userBand, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received  
      var movie = JSON.parse(body);
      console.log('title:', movie.Title); // Print the HTML for the Google homepage.
      console.log('Year:', movie.Year);
      console.log('IMDB rating:', movie.imdbRating);
      console.log('Rotten Tomatoes:', movie.Ratings[1].Value);
      console.log('Country:', movie.Country);
      console.log('Language:', movie.Language);
      console.log('Plot:', movie.Plot);
      console.log('Actors:', movie.Actors);
    });
  }
}

if (userCmd === "do-what-it-says") {
  console.log("more to come...")
}


