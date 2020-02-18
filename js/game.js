'use strict'
var field = new Field();
field.init();
var figure = new Figure();
var mask = new Mask(FIELD_WIDTH, FIELD_HEIGHT);
mask.set_figure(figure);
mask.merge();
var data = mask.get_mask();
for (var i=0; i<FIELD_HEIGHT; ++i) {
    for (var j=0; j<FIELD_WIDTH; ++j) {
        field.set_cell(i, j, data[i][j])
    }
}
field.show();