function GameCell(x, y, alive) {
    var NULL_CELL = {alive: false, x: -1, y: -1};

    this.x = x;
    this.y = y;
    this.alive = alive;
    this.alive_next = alive;
    this.top = this.bottom = this.left = this.right = NULL_CELL;
    this.top_left = this.bottom_left = this.top_right = this.bottom_right = NULL_CELL;
    var self = this;

    this.draw = function(g) {
        if (!self.alive)
            return;
        g.fillRect(self.x * CELL_SIZE, self.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    };

    this.click = function() {
        self.toggle();
    };

    this.toggle = function() {
        self.alive = !self.alive;
    };

    this.advance_state = function() {
        self.alive = self.alive_next;
    };

    this.live_neighbours = function() {
        var count = 0;
        var neighbours = [ self.top_left, self.top, self.top_right, self.right, self.bottom_right, self.bottom, self.bottom_left, self.left ];

        for (var i = 0; i < neighbours.length; i++) {
            count += neighbours[i].alive ? 1 : 0;
        }

        return count;
    };
}