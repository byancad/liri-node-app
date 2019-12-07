require('dotenv').config();

var keys = require("./keys.js");

var axios = require("axios")

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let value = process.argv.slice(3).join(" ");
// let value = process.argv[3];

switch(command){
    case 'movie-this': 
        movie();
    break;
    case 'spotify-this-song':
        song();
    break;
    case 'concert-this':
        show();
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
        // if(!value) {
        //     value = "Mr. Nobody";
        // } 
    })
   
}

function show(){
    let queryUrl = "http://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp"
    axios.get(queryUrl)
        .then(function(response){
            let jsonData = response.data[0];
            console.log(jsonData)
            let showData = [
                "Venue Name: " + jsonData.venue.name,
                "Venue Location: " + jsonData.venue.city
            ].join('\n\n')
            console.log(showData);
        })
        
}

function song(response){
  spotify.search({ type: 'track', query: value }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
      console.log(response.data)
    }
   
      
    
    let songs = data.tracks.items;
    for(let i = 0; i < songs.length; i++){
        console.log('song name: ' + songs[i].name);
        console.log('artist name: ' + songs[i].artist);
        console.log('album name: ' + songs[i].album.name);
        console.log('preview song: ' + songs[i].preview_url);
        console.log('-------------------------------------------');
    }
  });
}
   