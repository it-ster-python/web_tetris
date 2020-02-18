'use strict'

const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 20;

class Field {

    constructor() {
        this.__game_fields = $("#game_window .col").get();
        this.__field = new Array();
        for (var i = 0; i < this.__game_fields.length; ++i) {
            this.__field[i] = false;
        }
    }

    init() {
        this.clean()
        for (var i = 0; i < this.__game_fields.length; ++i) {
            this.__field[i] = false;
        }
    }

    clean() {
        this.__game_fields.forEach((element) => {
            if ($(element).hasClass("active")) {
                $(element).removeClass("active");
            }
        });
    }

    show() {
        this.__game_fields.forEach((element, index) => {
            if (this.__field[index]) {
                $(element).addClass("active");
            }
        });
    }

    set_cell(i, j, value = true) {
        this.__field[(i * FIELD_WIDTH) + j] = !!value
    }
}

const __figures = {
    line: [[true, true, true, true]],
    angle_right: [[true, true, true], [false, false, true]],
    angle_left: [[true, true, true], [true, false, false]],
    step_right: [[true, true, false], [false, true, true]],
    step_left: [[false, true, true], [true, true, false]],
    square: [[true, true], [true, true]]
}
const __turns = [0, 3, 2, 1];

var __keys = Object.keys(__figures);

class Figure {
    constructor() {
        this.__figure = __figures[
            __keys[Math.floor(Math.random() * __keys.length)]
        ].slice();
        console.log(this.__figure);
        this.__turn = Math.floor(Math.random() * __turns.length);
        this.turn()
        this.__turn = 2;
    }
    turn() {
        for (var t = 0; t <= this.__turn; ++t) {
            var tmp_figure = new Array();
            for (var i = this.__figure[0].length - 1; i >= 0; --i) {
                var line = new Array();
                for (var j = 0; j < this.__figure.length; ++j) {
                    line.push(this.__figure[j][i]);
                }
                tmp_figure.push(line);
            }
            this.__figure = tmp_figure.slice();
        }
    }
    get() {
        return this.__figure;
    }
    show() {
        console.log(this.__figure);
    }
}

class Mask {
    constructor(width, height) {
        this.__width = width;
        this.__height = height;
        this.__offset_left = 0;
        this.__offset_top = 0;
        this.__mask = new Array();
        this.__figure = new Array();
        for (var i = 0; i < this.__height; ++i) {
            var line = new Array()
            for (var j = 0; j < this.__width; ++j) {
                line.push(false);
            }
            this.__mask.push(line);
        }
    }

    set_figure(figure) {
        this.__figure = figure.get();
        this.__offset_left = Math.floor(
            (this.__width - this.__figure[0].length) / 2
        );
    }

    turn_figure() {
        this.__figure.turn();
    }

    merge() {
        for (var i = 0; i < this.__figure.length; ++i) {
            for (var j = 0; j < this.__figure[0].length; ++j) {
                this.__mask[i + this.__offset_top][j + this.__offset_left] = this.__figure[i][j]
            }
        }
    }

    clean_mask() {
        for (var i = 0; i < this.__height; ++i) {
            for (var j = 0; j < this.__width; ++j) {
                this.__mask[i][j] = false;
            }
        }
    }

    move_right() {
        if ((this.__offset_left + this.__figure[0].length) < this.__width - 1) {
            ++this.__offset_left;
        }
    }

    move_left() {
        if (this.__offset_left > 0) {
            --this.__offset_left;
        }
    }
    step() {
        if ((this.__offset_top + this.__figure.length) < this.__height - 1) {
            ++this.__offset_top
        }
    }
    get_mask() {
        // var result = new Array();
        // for (var i = 0; i < this.__height; ++i) {
        //     for (var j = 0; j < this.__width; ++j) {
        //         result[i * this.__width + j] = this.__mask[i];
        //     }
        // }
        // return result;
        return this.__mask;
    }
}