require('dotenv').config();

var keys = require("./keys.js");

var axios = require("axios")

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let value = process.argv[3];

switch(command){
    case 'movie-this': 
        movie();
    break;
    case 'spotify-this-song':
        song();
    break;
    case 'concert-this':
        artist();
    break;
}

function movie(){
    let queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + value; 
    axios.get(queryUrl)
    .then(function(response){
        console.log('Title: ' + response.data.Title);
        console.log('Year: ' + response.data.Year);
        console.log('Rated: ' + response.data.Rated)
        console.log('IMDB Rating: ' + response.data.imdbRating)
        console.log('Country: ' + response.data.Country)
        console.log('Language: ' + response.data.Language)
        console.log('Plot: ' + response.data.Plot)
        console.log('Actors: ' + response.data.Actors)
        // console.log('Rotten Tomatoes rating: ' + response.data.Ratings[i].source)
        
    })
}

function artist(){
    let queryUrl = "http://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp"
    axios.get(queryUrl)
        .then(function(response){
            console.log(response.data)
        })
}

function song(){
  spotify.search({ type: 'track', query: value }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
      
    }
    let songs = data.tracks.items;
    for(let i = 0; i < songs.length; i++){
        console.log(i);
        console.log('song name: ' + songs[i].name);
        console.log('artist name: ' + songs[i].artist.name);
    }
  });
}
   