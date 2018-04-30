require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
//var omdb = require('omdb');
var request = require('request');
var fs = require('fs');
console.log("spotify"+JSON.stringify( spotify));
console.log("twitter" +JSON.stringify(client ));
var currenttime=new Date();
var whattodo = process.argv[2];

var searchItem = "";
for(var i=3;i<process.argv.length;i++){
    searchItem += process.argv[i]+" ";
}
//process.argv[3]; 
run();
function run(){
    switch(whattodo){
        case "my-tweets":
            twitt();
            break;
        case "spotify-this-song":
            spotifySong();
            break;
        case "movie-this":
            OmdbCall();
            break;
        case "do-what-it-says":
            fileRead();
            break;
        
    }
}
function twitt(){
    var params = {
        count : 20
    }
    var tweetObjs;
    client.get('statuses/user_timeline', params,function(error, tweets, response){
        if(!error){
            console.log(tweets);
            tweetObjs = tweets;
           // console.log(response);
        }
        var str ="Command:"+whattodo+" "+ searchItem+" "+"\n Time"+currenttime.getDate();
        
        for(var eachitem in tweets){
            console.log("***"+i+"****"+tweets[eachitem].text);
            str+= "***"+i+"****"+tweets[eachitem].text;
        }
        log(str);
    });   
}
function spotifySong(){
    var params = {
         type: 'track', 
         query: searchItem 
    }
   // console.log(searchItem);
    spotify.search(params,function(error,data){
        var str ="Command:"+whattodo+" "+ searchItem+" "+"\n Time"+currenttime.getDate();
        if(!error){
            for(var eachitem in data.tracks.items){
                console.log("*****"+eachitem+"1 spotify****"+(data.tracks.items[eachitem].artists[0].name) );
                str +="*****"+eachitem+"1 spotify****"+(data.tracks.items[eachitem].artists[0].name);
                console.log("*****"+eachitem+"2 spotify****"+JSON.stringify(data.tracks.items[eachitem].name) );
                str += "*****"+eachitem+"2 spotify****"+JSON.stringify(data.tracks.items[eachitem].name);
                console.log("*****"+eachitem+"3 spotify****"+JSON.stringify(data.tracks.items[eachitem].preview_url));
                str +="*****"+eachitem+"3 spotify****"+JSON.stringify(data.tracks.items[eachitem].preview_url);
                console.log("*****"+eachitem+"4 spotify****"+JSON.stringify(data.tracks.items[eachitem].album.name));
                str +="*****"+eachitem+"4 spotify****"+JSON.stringify(data.tracks.items[eachitem].album.name);
            }
        }
        log(str);
    });
}
function OmdbCall(){
    if(!searchItem){
        searchItem = 'Mr. Nobody';
    }
    var params = {
        title: searchItem
    }//JSON.parse(body)
    request('http://www.omdbapi.com/?i=tt3896198&apikey=adfa6881&plot=full&t='+params.title, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('statusCode:',(JSON.parse(body).Response));
    var str ="Command:"+whattodo+" "+ searchItem+" "+"\n Time"+currenttime.getDate();
    if(JSON.parse(body).Response==="False"){
        console.log("not found");
        str += "not found";
    }
    else{
        console.log('Title: ',JSON.parse(body).Title +"\n"+"Year: "+JSON.parse(body).Year+"\n"+"Ratings: "+JSON.parse(body).Ratings[0].Source+","+JSON.parse(body).Ratings[0].Value+"\n"+"Ratings: "+JSON.parse(body).Ratings[1].Source+","+JSON.parse(body).Ratings[1].Value+"\n"+"Country: "+
    JSON.parse(body).Country+"\n"+"Language: "+JSON.parse(body).Language+"\n"+"Plot: "+JSON.parse(body).Plot+"\n"+"Actors: "+JSON.parse(body).Actors); // Print the HTML for the Google homepage.
        str += 'Title: ',JSON.parse(body).Title +"\n"+"Year: "+JSON.parse(body).Year+"\n"+"Ratings: "+JSON.parse(body).Ratings[0].Source+","+JSON.parse(body).Ratings[0].Value+"\n"+"Ratings: "+JSON.parse(body).Ratings[1].Source+","+JSON.parse(body).Ratings[1].Value+"\n"+"Country: "+
        JSON.parse(body).Country+"\n"+"Language: "+JSON.parse(body).Language+"\n"+"Plot: "+JSON.parse(body).Plot+"\n"+"Actors: "+JSON.parse(body).Actors;
    }
    log(str);
});
    
}
function fileRead(){
    var whatArr;
    var str ="Reading from Random.txt:"+" "+"\n Time"+currenttime.getDate();
    log(str);
   fs.readFile("random.txt","utf8",function(error,data){
        if(!error){
            console.log(data);
            whatArr = data.split(",");
            console.log(whatArr[0]);
            whattodo = whatArr[0];
            searchItem = whatArr[1];
            console.log(whatArr[1]);
            run();
        }
    });
}
function log(strToAdd){
    fs.appendFile("log.txt",strToAdd,function(error){
        if(error){
            console.log(error);
        }
    });
}