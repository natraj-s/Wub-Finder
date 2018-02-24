module.exports = function(app) {

    var artists = require("../data/artists.js");

    app.get("/data/artists", function(req, res) {
        res.json(artists);
    });

    app.post("/data/artists", function(req, res) {
        var userScore = req.body["userScore[]"];
        console.log("req.body: ", userScore);

        var smallestDiffIndex = 0;

        // stores difference values between user scores and artist scores
        var diffArr = [];

        for(var i = 0; i < artists.length; i++){
            var totalDiff = 0;
            for(var j = 0; j < userScore.length; j++) {
                totalDiff += Math.abs(parseInt(userScore[j]) - parseInt(artists[i].scores[j]));
            }

            diffArr.push(totalDiff);
        }
        console.log(diffArr);
        smallestDiffIndex = diffArr.indexOf(Math.min.apply(Math, diffArr));
        console.log("smallestDiffIndex", smallestDiffIndex);
        res.json(artists[smallestDiffIndex]);
    });

};