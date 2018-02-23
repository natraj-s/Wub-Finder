$(document).ready(function() {
    
    var globalQCounter = 0;

    var questions = ["How important is sound design? 1 being not at all important and 5 being very important",
                     "On a scale of 1 to 5, 1 being lowest and 5 being highest, how heavy do you like your music?",
                     "How important is the live show aspect of an artist? 1 is not at all important and 5 is very important",
                     "Roadtrip or Drive like you stole it?",
                     "Do you like the vibes?",
                     "Tyrannosaurus Rex or Aliens?",
                     "Old School or Contemporary?",
                     "Neon Future or Miami Vice 80s?",
                     "Post Apocalyptic Future?",
                     "Pick the genre you listen to the most from the ones listed below."
                    ];

    $(".question").text(questions[globalQCounter]);

    $(".option").click(function() {
        $(".question").toggleClass("disappear");
        globalQCounter++;
        console.log($(this).val());
        setTimeout(function() {
            $(".question").text(questions[globalQCounter]);
            $(".question").toggleClass("disappear"); 
        }, 500);
    });
});