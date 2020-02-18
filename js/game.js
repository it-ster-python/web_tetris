'use strict'
var field = new Field();
field.init();
var figure = new Figure();
var mask = new Mask(FIELD_WIDTH, FIELD_HEIGHT);
mask.set_figure(figure);
mask.merge();
apply(mask, field)
field.show();


$("body").keypress((event) => {
    console.log(event.code);
    if(event.code == "KeyA") {
        console.log("LEFT");
    }
    if(event.code == "KeyD") {
        console.log("RIGHT")
    }
});