var artistImageURL = "";
var artistBio = "";
var spotifyLink = "";

$(document).ready(function () {

    var globalQCounter = 0;
    var userScores = [];

    var fiveButtons =
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='1' aria-label=''>1</label>" +
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='2' aria-label=''>2</label>" +
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='3' aria-label=''>3</label>" +
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='4' aria-label=''>4</label>" +
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='5' aria-label=''>5</label>";

    var genreButtons =
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='1' aria-label=''>Rock/Metal</label>" +
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='2' aria-label=''>Rap/Hip-Hop</label>" +
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='3' aria-label=''>Jazz</label>" +
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='4' aria-label=''>World Music</label>";

    var roadButtons =
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='1' aria-label=''>Hashtag Wanderlust</label>" +
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='2' aria-label=''>Whose car is this?</label>";

    var etButtons =
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='1' aria-label=''>Call me Richard Attenborough</label>" +
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='2' aria-label=''>I spit acid</label>" + 
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='3' aria-label=''>I like being alive</label>";

    var ageButtons =
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='1' aria-label=''>Old School</label>" +
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='2' aria-label=''>Contemporary</label>" + 
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='3' aria-label=''>Both</label>";

    var ambienceButtons =
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='1' aria-label=''>My middle name is Bladerunner</label>" +
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='2' aria-label=''>I still rock a mullet</label>";
    
    var futureButtons = 
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='1' aria-label=''>I thought you'd never ask</label>" +
        "<label class='radio-inline'><input type='radio' class='option' name='optradio' value='2' aria-label=''>I'm fine right here</label>"
    

    var questions = [
        "How important is sound design? 1 being not at all important and 5 being very important",
        "On a scale of 1 to 5, 1 being lowest and 5 being highest, how heavy do you like your music?",
        "How important is the live show aspect of an artist? 1 is not at all important and 5 is very important",
        "Roadtrip or Drive like you stole it?",
        "On a scale of 1 to 5, how much do you like the vibes?",
        "Tyrannosaurus Rex or Aliens?",
        "Old School or Contemporary?",
        "Neon Future or Miami Vice 80s?",
        "Post Apocalyptic Future?",
        "Pick the genre you listen to the most from the ones listed below.",
        "How hard are you looking to dance?"
    ];

    var buttons = [
        fiveButtons,
        fiveButtons,
        fiveButtons,
        roadButtons,
        fiveButtons,
        etButtons,
        ageButtons,
        ambienceButtons,
        futureButtons,
        genreButtons,
        fiveButtons
    ];

    $(".question").text(questions[globalQCounter]);
    $(".options").append(buttons[globalQCounter]);

    $(".options").on("click", ".option", function() {
        userScores.push($(this).val());

        if(globalQCounter < questions.length) {
            $(".question").toggleClass("disappear");
            $(".options").toggleClass("disappear");
            globalQCounter++;

            setTimeout(function () {
                $(".question").text(questions[globalQCounter]);
                $(".question").toggleClass("disappear");
                $(".options").empty();
                $(".options").append(buttons[globalQCounter]);
                $(".options").toggleClass("disappear");
            }, 500);

            if(globalQCounter === questions.length) {
                $(".question").text("You've reached the end of the quiz");
                var scoreJSON = {
                    userScore: userScores
                }

                $.post("/data/artists", scoreJSON).then(function(data) {
                    $(".question").text("You should listen to " + data.name);
                    spotifyLink = data.link;
                    getArtistData(data.name);
                });
            }
        }
        else {
            // TODO: display artist that closely matches
        }
    });
});

function showModal(artist) {
    var overlayDiv = $("<div class='overlay' aria-hidden='false'>");
    var showArtistDiv = $("<div class='showartistdiv'>");
    $(".survey").addClass("below");
    showArtistDiv.addClass("above");
    var row = $("<p class='artisttitle'>");
    var artistLabel = $("<label class='artistlabel'>");
    artistLabel.append(artist);
    row.append("YOU SHOULD LISTEN TO ");
    row.append(artistLabel);
    row.append("<hr>");
    var row2 = $("<p class='artistimage'>");
    row2.append("<img src='" + artistImageURL + "' alt='" + artist + "' title='" + artist + "'/>");
    var row3 = $("<p class='artistbio'>");
    row3.append(artistBio);
    var row4 = $("<p class='spotifylink'>");
    row4.append("<a href='" + spotifyLink + " target='blank'> Listen on Spotify </a>");
    showArtistDiv.append(row);
    showArtistDiv.append(row2);
    showArtistDiv.append(row3);
    showArtistDiv.append(row4);

    $(".mainContent").append(overlayDiv);
    overlayDiv.append(showArtistDiv);
    overlayDiv.removeClass("hidden");
    overlayDiv.addClass("opened");

};

function getArtistData(artist) {
    var apiKey = "e9526b6f9b8347d91973bf1d26081834";
    var queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist +
                    "&api_key=e9526b6f9b8347d91973bf1d26081834&format=json";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        artistImageURL = response.artist.image[2]["#text"];
        artistBio = response.artist.bio.summary;
        showModal(artist);
    })
}