function submitUrl() {
        var origimgurl = $('input:first').val()
        $('#container').html('');
        $('#ontop').html('');
        $('<img>', { src: origimgurl, style: 'opacity:1' }).appendTo('#container');
        var params = {
        //we don't need parameters for this call
        };
      
        $.ajax({
            url: "https://api.projectoxford.ai/emotion/v1.0/recognize?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","d012254075ba4c729825e85a841a13c8");
            },
            type: "POST",
            // Request body
            data: JSON.stringify({"url": origimgurl} )
        })
        .done(function(data) {
            console.log(data)
            alert("success");
            //run through each face data
             for (i = 0; i < data.length; i++) {
                face = data[i];
                emotionMath(face);
            }
        })
        .fail(function(data, url) {
            console.log(data)

            alert("error");
        });
    };

//Use the face scores to deterine which house the face belongs in
    function determineHouse(face){
        var grif = 0 + face.scores.surprise + face.scores.anger;
        var sly= 0 + face.scores.contempt  + face.scores.disgust;
        console.log('sly' + sly)
        var huff = 0+ face.scores.happiness + face.scores.fear;
        console.log('huff' + huff)
        var rave = 0 + face.scores.neutral + face.scores.sadness;
        console.log('rave' + rave)
        var house

        if ( grif > sly && grif > huff && grif > rave ) { house = "G";
    $('<img>', { src: 'Gryffindor.jpg', style: 'opacity:1' }).appendTo('#ontop');
       console.log("appended to");}
        if (sly >grif && sly>huff & sly > rave) {house ="S"; $('<img>', { src: 'Slytherin.jpg', style: 'opacity:1' }).appendTo('#ontop');
       console.log("appended to")}
        if (huff> grif && huff > sly && huff >rave) {house = "H"; $('<img>', { src: 'Hufflepuff.jpg', style: 'opacity:1' }).appendTo('#ontop');
       console.log("appended to") }   
        if (rave > grif && rave > sly && rave> huff) {house ="R"; $('<img>', { src: 'RavenClaw.jpg', style: 'opacity:1' }).appendTo('#ontop');
       console.log("appended to")}
    }

    function emotionMath(face){
        determineHouse(face);
        var forehead = face.faceRectangle.top - .1 * face.faceRectangle.height;
        var faceCenter = face.faceRectangle.left - .5*face.faceRectangle.width;
        
        //need to figure out how to put House Logo on people's foreheads
    //     $('<img>', { src: 'Gryffindor.jpg', style: 'opacity:1' }).appendTo('#ontop');
    //    console.log("appended to")

    }

