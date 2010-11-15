function wrap(x, max) {
    return (x + max) % max;
}

function mouseLocation(e) {
    // Event source HAS to be 'relative'ly 'position'ed for any of these to work..
    var clickX, clickY;
    if (e.layerX || e.layerX == 0) { // FF, Chrome
        clickX = e.layerX;
        clickY = e.layerY;
    } else if (e.offsetX || e.offsetX == 0) { // Opera, Chrome?
        clickX = e.offsetX;
        clickY = e.offsetY;
    } else { // Untested..
        clickX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        clickY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return {x:clickX, y:clickY};
}
