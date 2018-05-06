require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var request = require('request');
var fs = require('fs');
//console.log("spotify"+JSON.stringify( spotify));
//console.log("twitter" +JSON.stringify(client ));
var currenttime=new Date();
//var today = new Date();
var dd = currenttime.getDate();
var mm = currenttime.getMonth()+1; //January is 0!
var yyyy = currenttime.getFullYear();
currenttime = mm + '/' + dd + '/' + yyyy;


var whattodo = process.argv[2];

var searchItem = "";
for(var i=3;i<process.argv.length;i++){
    searchItem += process.argv[i]+" ";
}

run();
function run(){
    switch(whattodo){
        case "my-tweets":
            twitt();
            break;
        case "post-my-tweets":
            posttwitt();
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
var str="";
function twitt(){
    var params = {
        count : 20
    }
    var tweetObjs;
    client.get('statuses/user_timeline', params,function(error, tweets, response){
        if(!error){
           
            tweetObjs = tweets;
          
        }
        str ="Command:"+whattodo+" "+ searchItem+" , "+" Time: "+currenttime;
        
        for(var eachitem in tweets){
            var temp = parseInt(eachitem)  + 1;
            console.log(temp+"-"+"tweets text: "+tweets[eachitem].text);
            console.log("  tweet time: "+tweets[eachitem].created_at);
            str+= temp+"-"+"tweets text: "+tweets[eachitem].text+"  tweet time: "+tweets[eachitem].created_at;

        }
        str+= "\n"+ "===============================================================\n";
        log(str);
        str="";
    });   
}
function posttwitt(){
    //str ="Command:"+whattodo+" "+ searchItem+" "+"\n Time"+currenttime.getDate();
    var update = {
        status: searchItem
    }
    client.post('statuses/update', update,  function(error, tweet, response) {
        if(error) {console.log(error);}
      
      });
      str ="Command:"+whattodo+" "+ searchItem+" , "+" Time: "+currenttime;
      str+= "\n"+ "===============================================================\n";
      log(str);
      str="";
}
function spotifySong(){
    var params = {
         type: 'track', 
         query: searchItem 
    }
   
    spotify.search(params,function(error,data){
        var str ="Command:"+whattodo+" "+ searchItem+" , "+" Time: "+currenttime;
        if(!error){
            for(var eachitem in data.tracks.items){
                console.log(eachitem+"-Artist Name: "+(data.tracks.items[eachitem].artists[0].name) );
                str +=eachitem+"-Artist Name: "+(data.tracks.items[eachitem].artists[0].name);
                console.log("\n  Song: "+JSON.stringify(data.tracks.items[eachitem].name) );
                str += "\n  Song: "+JSON.stringify(data.tracks.items[eachitem].name);
                console.log("\n  URL: "+JSON.stringify(data.tracks.items[eachitem].preview_url));
                str +="\n  URL: "+JSON.stringify(data.tracks.items[eachitem].preview_url);
                console.log("\n  Album Name: "+JSON.stringify(data.tracks.items[eachitem].album.name+"\n"));
                str +="\n  Album Name: "+JSON.stringify(data.tracks.items[eachitem].album.name+"\n");
            }
        }
        str+= "\n"+ "===============================================================\n";
        log(str);
        str="";
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
    //console.log('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
   // console.log('statusCode:',(JSON.parse(body).Response));
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
    
}
function fileRead(){
    var whatArr;
    str ="Reading from Random.txt:"+" , "+" Time: "+currenttime;
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
    str="";
}
function log(strToAdd){
    fs.appendFile("log.txt",strToAdd,function(error){
        if(error){
            console.log(error);
        }
    });
}