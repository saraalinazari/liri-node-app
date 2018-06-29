# liri-node-app

## Requirement
- Supposed to create an application called LIRI which is like iPhone's SIRI. LIRI is a _Language_ Interpretation and Recognition Interface, while SIRI is a Speech Interpretation and Recognition Interface.
- LIRI will be a command line node app that takes in parameters and gives you back data.
- LIRI displays your latest tweets.
- Send requests to the Twitter, Spotify, and OMDB APIs.

## Prerequisites
- Download Chrome or Internet Explorer or Mozilla for your specific operating system.
- Check if you have Node installed by typing  'node -v' in your terminal. If it returns anything related to version then you have it installed.

## Instructions
- change current directory where you want to clone my repo in to.
- For my tweets you need to type in console:
```
node liri.js my-tweets
```
- For posting your tweet:
```
node liri.js my-tweets post-my-tweets '<your favorite tweet text>'
```
- For songs from spotify:
```
node liri.js spotify-this-song '<song name>'
```
- For movie information from imdb:
```
node liri.js movie-this '<movie name>'
```
+ if no movie name is given, information for 'Mr. Nobody' will appear
- To do what (random.txt) says:
```
node liri.js do-what-it-says
```
+ it reads the file to run whatever it asks for. In this case, it runs spotify-this-song "I Want it That Way".
- All commands and outputs are logged into log.txt.

## Technologies Used
- Node.js
- Twitter API npm package
- Spotify API npm package
- Request npm package
- OMDb API

## Code Explanation
### Lesson Learned
- How to use npm package for spotify,Twitter, and OMDB to get information returned from spotify and show it to the user. 
- How to handle the data that is returned from API to show properly to the user.
- How to read and write in file by Node.js.

### Code Highlights
```
function OmdbCall(){
    if(!searchItem){
        searchItem = 'Mr. Nobody';
    }
    var params = {
        title: searchItem
    }//JSON.parse(body)
    request('http://www.omdbapi.com/?i=tt3896198&apikey=adfa6881&plot=full&t='+params.title, function (error, response, body) {
   
    str ="\nCommand: "+whattodo+" "+ searchItem+" "+"\n Time: "+currenttime;
    if(JSON.parse(body).Response==="False"){
        console.log("not found");
        str += "not found";
    }
    else{
        console.log(' Title: ',JSON.parse(body).Title +"\n "+"Year: "+JSON.parse(body).Year+"\n "+" Ratings: "+JSON.parse(body).Ratings[0].Source+"/"+JSON.parse(body).Ratings[0].Value+"\n"+" Ratings: "+JSON.parse(body).Ratings[1].Source+"/"+JSON.parse(body).Ratings[1].Value+"\n "+"Country: "+
    JSON.parse(body).Country+"\n"+"Language: "+JSON.parse(body).Language+"\n"+"Plot: "+JSON.parse(body).Plot+"\n"+"Actors: "+JSON.parse(body).Actors+"\n"); // Print the HTML for the Google homepage.
        str += '\n Title: '+ JSON.parse(body).Title +"\n "+"Year: "+JSON.parse(body).Year+"\n "+"Ratings: "+JSON.parse(body).Ratings[0].Source+"  "+JSON.parse(body).Ratings[0].Value+"\n"+" Ratings: "+JSON.parse(body).Ratings[1].Source+"  "+JSON.parse(body).Ratings[1].Value+"\n "+"Country: "+
        JSON.parse(body).Country+"\n"+" Language: "+JSON.parse(body).Language+"\n"+" Plot: "+JSON.parse(body).Plot+"\n"+" Actors: "+JSON.parse(body).Actors+"\n"; // Print the HTML for the Google homepage.
        str+= "\n"+ "===============================================================\n";
        log(str);
        str="";
    }
   
});
```

## Authors
- Sara Alinazari