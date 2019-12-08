# LIRI-node-app

## Description
A command line node app that lets you search information on movies, songs, and concerts with 4 different command options.

* movie-this

* spotify-this-song

* concert-this

* do-what-it-says

## How to install LIRI
 

   ```   
   git clone https://github.com/byancad/liri-node-app.git
   ```
   ```
   npm install
   ```
### How to use LIRI

```node liri.js [command] [title]```



### What each command does 

* movie-this<br>
run node liri.js movie-this with your own movie title after and you will be given the movie name, rating, actors, year, and plot to the movie you researched. If you do not run a value after movie-this you will be given informartion on Mr.Nobody

* spotify-this-song<br>
run node liri.js spotify-this-song with a value after and you will be given the artist name of song and the album of which it belongs to. If no song is entered you will be defaulted Ace of Base

* concert-this<br>
run node liri.js concert-this with a band name and you will be given information on the next shows they are playing with the date, name of venue and location

* do-what-it-says<br>
run node liri.js do-what-it-says in the terminal and it will read a file with text already inputted and give you the information on that. 

#### Technologies

1. Javascript
2. Node.js
3. Node Packages
   - Request
   - Moment
   - Dotenv
   - Axios
   - Node-spotify-api
4. APIS
   - Spotify
   - Bands in town 
   - OMDB
   
   ### Created by
   Byanca De La Fuente
