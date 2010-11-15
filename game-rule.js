function GameRule(cell_state, neighbour_predicate, next_state) {
    this.cell_state = cell_state;
    this.next_state = next_state;
    this.neighbour_predicate = neighbour_predicate;
    var self = this;

    this.apply = function(cell) {
        if (cell.alive == self.cell_state && self.neighbour_predicate(cell.live_neighbours()))
            cell.alive_next = self.next_state;
    };
}