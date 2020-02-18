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
    switch(event.code) {
        case "KeyA": {
            console.log("LEFT");
            field.clean();
            mask.clean();
            mask.move_left();
            mask.merge();
            apply(mask, field);
            field.show();
            break;
        }
        case "KeyD": {
            console.log("RIGHT");
            field.clean();
            mask.clean();
            mask.move_right();
            mask.merge();
            apply(mask, field);
            field.show();
            break;
        }
        case "KeyW": {
            console.log("TURN");
            field.clean();
            mask.clean();
            mask.turn_figure();
            mask.merge();
            apply(mask, field);
            field.show();
            break;
        }
        default: {
            console.log(event.code);
        }
    }
});
var speed = 3000;
var speed_interval = setInterval(() => {
    field.clean();
    mask.clean();
    mask.step();
    mask.merge()
    apply(mask, field);
    field.show();
}, speed)