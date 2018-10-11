//need to make each of my functions take an argument. 
require("dotenv").config();
var key = require("./key")
var request = require('request');
var fs = require("fs");
//var spotify = new Spotify(keys.spotify);
var Spotify = require('node-spotify-api');

var bandsintown = require('bandsintown')('codingbootcamp');
var userCmd = process.argv[2]
var userBand = process.argv.slice(3).join(" ");

var arrevents = [];
var concert = function (userCmd2="") {
    if(userCmd2==""){

    }
    

    if (userCmd == "concert-this") {
        var concert = bandsintown
            .getArtistEventList(userBand)
            .then(function (events) {
                console.log(events[0].formatted_datetime);
                console.log(events[0].title);
                //console.log(events)
            });
    }
}//end of concert()



var spot = function (userCmd2) {
    

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
        else {
            
            var songSearch = spotify.search({ type: 'track', query: userCmd2 }, function (err, data) {
                
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
}//end of spot() 

var mov = function(userBand){


if (userCmd === "movie-this") {
    if (process.argv.length < 4) {
        //console.log("invlaid command ");
        request('http://www.omdbapi.com/?apikey=trilogy&t=' + 'mr.nobody', function (error, response, body) {
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
            var movie = JSON.parse(body);
            console.log('title:', movie.Title);
            console.log('Year:', movie.Year);
            console.log('IMDB rating:', movie.imdbRating);
            console.log('Rotten Tomatoes:', movie.Ratings[1].Value);
            console.log('Country:', movie.Country);
            console.log('Language:', movie.Language);
            console.log('Plot:', movie.Plot);
            console.log('Actors:', movie.Actors);
        });
    }
}//end if
}//end of mov()

var what = function(userCmd2){


if (userCmd === "do-what-it-says") {
    //begin copy
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
       
        // We will then print the contents of data
      //  console.log(data);
       
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
       
        // We will then re-display the content as an array for later use.
       //console.log(dataArr);
        //call liri again to pass it cmds
        userCmd =dataArr[0]
        userBand = dataArr[1];
        liri(userCmd, userBand)

       
       });
    //end copy
    
}//end if
}//end what()

var liri = function (userCmd, userCmd2="") {
    switch (userCmd) {
        case "concert-this":
            concert(userCmd2);
            break;

        case "spotify-this-song":
            spot(userCmd2);
            break;

        case "movie-this":
            mov(userCmd2);
            break;

        case "do-what-it-says":
            what(userCmd2);
            break;

    }
};

liri(userCmd, userBand);


