function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
function replaceAll(str, find, replace) {
    var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
}

// DISPLAY
readTextFile("../config.json", function(text){
    var data = JSON.parse(text);

    if(data.home.tiles != null){
        var keys = Object.keys(data.home.tiles),
            animationDelay = 500;
        for(i=0;i<keys.length;i++){
            var currentID = keys[i];

            var content = typeD(data.home.tiles[currentID].type, data.home.tiles[currentID].content);

            $('.elements').append(`
                <div class="element ${data.home.tiles[currentID].display}" id="home${i}">${content}</div>
            `);

            // ANIMATION
            if(i == keys.length - 1){
                $(`.element`).each(function (index){
                    setTimeout(() => {
                        $(this).addClass('active');
                    }, animationDelay);
                    animationDelay = animationDelay + 200;
                })
            }
        }
    }
});
function typeD(type, content){
    switch(type){
        case 'text':
            return formatter(content);
            break;
        case 'module':
            return formatter(content);
            break;
        default:
            return formatter(content);
    }
}
function formatter(content){
    content = replaceAll(content, '${enter}', '<br/>');
    
    // content = replaceAll(content, '${centerS}', '<center>');
    // content = replaceAll(content, '${centerH}', '<center/>');
    
    content = replaceAll(content, '${titleS}', '<h4>');
    content = replaceAll(content, '${titleH}', '<h4/>');

    return content;
}