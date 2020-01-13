import {
    msQuery,
    msQueryAll
} from 'making-stuffs-queries';

function flipTile () {
    this.classList.toggle('flip-tile');
}

(function addListeners () {
    const tiles = msQueryAll('.service-tile-inner');
    for(let tile of tiles) {
        tile.addEventListener('click', flipTile);
    }
    
})()