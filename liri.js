require('dotenv').config();

fs = require('fs');

var keys = require("./keys.js");

var axios = require("axios")

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

let moment = require('moment');



let command = process.argv[2];
let value = process.argv.slice(3).join(" ");
let go = function(command, title) {
    switch(command){
    case 'movie-this': 
        movie(title);
        break;
    case 'spotify-this-song':
        song(title);
        break;
    case 'concert-this':
        show(title);
        break;
    case 'do-what-it-says':
        fixed();
        break;
}
}
function movie(value){
    let title;
    if(!value){
        title = "Mr.Nobody"
    } else { title = value }
    console.log(value)
    let queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + title; 
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

function show(value){
    let queryUrl = "http://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp"
    axios.get(queryUrl)
        .then(function(response){
           
        for(i = 0; i < response.data.length; i++){
            let jsonData = response.data[i];
            jsonData.datetime = moment(jsonData.datetime).format('MMMM Do YYYY, h:mm:ss a');
            let showData = [
                "Venue Name: " + jsonData.venue.name,
                "Venue Location: " + jsonData.venue.city,
                "Date: " + jsonData.datetime,
                "--------------------------"
            ].join('\n\n')
            console.log(showData);
            }
        })
    
        
}

function song(value){ 
    let title;
    if(!value){
        title = "Ace of Base"
    } else { title = value }
    console.log(value)
  spotify.search({ type: 'track', query: title }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
     
    }
   
      
    // let artists = data.tracks.items.artist;
    let songs = data.tracks.items;

    for(let i = 0; i < songs.length; i++){
      
        console.log('song name: ' + songs[i].name);
        console.log('artist name: ' +  songs[i].album.artists[0].name);
        console.log('album name: ' + songs[i].album.name);
        console.log('preview song: ' + songs[i].preview_url);
        console.log('-------------------------------------------');
    }
  });
}

function fixed(){
    fs.readFile('random.txt', 'utf8', function(err, data){
        if (err) throw err;
        console.log(data)
        let dataArr = data.split(',');
        let command=dataArr[0];
        let title=dataArr[1];
        console.log(dataArr)
        if (dataArr.length == 2){
            go(command, title);
        } else if (dataArr.length == 1){
        go(dataArr[0]);
        }
    });
}


go(command,value);
   