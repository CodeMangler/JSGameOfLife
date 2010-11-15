var CELL_SIZE = 20;

var advance_board_state; // HACK

function GameBoard(canvas, width, height, rules) {

    this.cells = new Array(width);
    this.rules = rules;
    this.animate = false;
    var self = this;

    this.initialize = function() {
        advance_board_state = self.advance_state; // HACK
        initializeCanvas();
        initializeCells(self.cells);
        self.draw();
    };

    this.start = function() {
        self.animate = true;
        self.advance_state();
    };

    this.stop = function() {
        self.animate = false;
    };

    this.advance_state = function() {
        updateCellStates(self.cells);
        self.draw();

        if (self.animate)
            setTimeout("advance_board_state()", 1000);
    };

    this.draw = function () {
        if (canvas.getContext) {
            var g = canvas.getContext("2d");
            g.clearRect(0, 0, canvas.width, canvas.height);
            drawGrid(g);
            drawCells(g);
        }
    };

    function initializeCanvas() {
        canvas.style.position = "relative"; // Positioning HAS to be relative for getting the correct click co-ordinates..
        canvas.width = width * CELL_SIZE;
        canvas.height = height * CELL_SIZE;

        canvas.onclick = onBoardClick;
    }

    function initializeCells(cells) {
        for (var i = 0; i < width; i++) {
            cells[i] = new Array(height);
            for (var j = 0; j < height; j++) {
                cells[i][j] = new GameCell(i, j, false);
            }
        }
        connectCells(cells);
    }

    function onBoardClick(e) {
        if (!e)
            e = window.event;
        
        var clickLocation = mouseLocation(e);
        var cellX = Math.floor(clickLocation.x / CELL_SIZE);
        var cellY = Math.floor(clickLocation.y / CELL_SIZE);

        self.cells[cellX][cellY].click();

        self.draw();
    }

    function drawGrid(g) {
        g.beginPath();
        for (var i = 0; i <= canvas.width; i += CELL_SIZE) {
            g.moveTo(i, 0);
            g.lineTo(i, canvas.height);
        }
        for (var i = 0; i <= canvas.height; i += CELL_SIZE) {
            g.moveTo(0, i);
            g.lineTo(canvas.width, i);
        }
        g.closePath();
        g.stroke();
    }

    function drawCells(g) {
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                self.cells[i][j].draw(g);
            }
        }
    }

    function updateCellStates(cells) {
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                applyRules(cells[i][j]);
            }
        }
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                cells[i][j].advance_state();
            }
        }
    }

    function applyRules(cell) {
        for (var i = 0; i < self.rules.length; i++)
            self.rules[i].apply(cell);
    }

    function connectCells(cells) {
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                // TODO: Refactor to a nicer "Spherical Matrix" structure

                var left = wrap(i - 1, width);
                var right = wrap(i + 1, width);
                var top = wrap(j - 1, height);
                var bottom = wrap(j + 1, height);

                var cell = cells[i][j];
                cell.top_left = cells[left][top];
                cell.top = cells[i][top];
                cell.top_right = cells[right][top];
                cell.right = cells[right][j];
                cell.bottom_right = cells[right][bottom];
                cell.bottom = cells[i][bottom];
                cell.bottom_left = cells[left][bottom];
                cell.left = cells[left][j];
            }
        }
    }
}
