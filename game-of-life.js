function GameOfLife(canvas, width, height, rules) {

    var default_rules = [
        new GameRule(true, function(neighbours) { return neighbours < 2 || neighbours > 3; }, false), // Kill for under-population/over crowding
        new GameRule(false, function(neighbours) { return neighbours == 3; }, true), // Resurrect when optimal neighbout count
        new GameRule(true, function(neighbours) { return neighbours == 2 || neighbours == 3; }, true) // A live cell with 2/3 neighbours continues to live
    ];

    this.board = new GameBoard(canvas, width, height, rules ? rules : default_rules);
    var self = this;

    this.initialize = function() {
        self.board.initialize();
    };

    this.start = function() {
        self.board.start();
    };

    this.stop = function() {
        self.board.stop();
    };
}
