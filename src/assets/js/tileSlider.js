import {msQuery, msQueryAll} from 'making-stuffs-queries';

/*

    Needs to do the following
    1. Gather all the tiles
    2. Get the width of the parent element
    3. Get the width of the tiles
    4. Calculate if all slides fit in the parent container -- parentW > totalTileW
    5. if they dont, calculate by how much they spill -- totalTileW - parentW
    6. divide that by the number of tiles -- totalTileW - parentW / tiles.length
    7. Number from step 6 is now the absolute minimum by which the tiles must encolse
    8. Find the left value of the middle tile -- parentW / 2 - tileW / 2
    9. Find the middle tile and set its left value
    10. Increment the other tiles around it
*/

const getDimensions = (tiles, parent) => {
    const parentW = parent.offsetWidth;
    const tileW = tiles[0].offsetWidth;    
    const sumOfTiles = tileW * tiles.length;
    const containerSpill = parentW >= sumOfTiles ? 0 : parentW - sumOfTiles;
    const maximumIncrement = Math.abs(containerSpill / tiles.length);
    const middleLeft = (parentW / 2) - (tileW / 2);
    const middleW = parentW / 2;
    const middleTile = Math.floor(tiles.length / 2);
    const tallestTile = (() => {
        let tallest = 0;
        for(let tile of tiles) {
            if(tile.offsetHeight > tallest) { 
                tallest = tile.offsetHeight 
            } else { 
                break; 
            }
        }
        return tallest;
    })();

    return {
        parentW,
        tileW,
        sumOfTiles,
        containerSpill,
        maximumIncrement,
        tallestTile,
        middleLeft,
        middleW,
        middleTile
    };
}

const getXPosition = (tiles, index, dimensions) => {
    // Check if this tile is the middle one
    if(index === dimensions.middleTile) {
        // If it is position it in the middle of the parent
        return dimensions.middleLeft;
    // Check if tile is to the left of the middle one
    } else if (index === 0) {
        return dimensions.middleLeft - (dimensions.maximumIncrement / 2);
    } else if(index < dimensions.middleTile) {
        return (dimensions.middleLeft - dimensions.tileW) + ((index * dimensions.maximumIncrement) / 2);
    } else {
        return dimensions.middleW + (dimensions.tileW * ((index - 1) - dimensions.middleTile) / 2) - dimensions.maximumIncrement;
    }
    
}

const getScale = (index, middleTile) => {
    if(index + 1 <= middleTile) {
        return 0.8 + (index / 10);
    } else {
        return 0.8;
    }
} 

const positionTiles = (tiles, parent) => {
    const dimensions = getDimensions(tiles, parent);
    // Get the dimensions
    const { parentW,
    tileW,
    sumOfTiles,
    containerSpill,
    maximumIncrement,
    tallestTile,
    middleLeft,
    middleW,
    middleTile } = dimensions;
    // Set the hieght of the parent with a 50px margin
    parent.style.height = `${tallestTile + 50}px`;
    // Iterate the tiles
    for(let i = 0; i < tiles.length; i++) {
        const scale = getScale(i, middleTile)
        // Set the X position
        const xPosition = getXPosition(tiles, i, dimensions);
        const zPosition = i > middleTile ? Math.round(tiles.length / 2) - i + 2 : i + 1;
        tiles[i].style.transform = i === middleTile ? `translateX(${xPosition}px) scale(1)` : `translateX(${xPosition}px) scale(0.8)`;
        tiles[i].style.height = `${tallestTile}px`;
        tiles[i].style.zIndex = zPosition;
    }
}

const buildSlider = () => {
    const tiles = msQueryAll('.service-tile'); 
    const parent = msQuery('.service-row');
    const middleTile = Math.floor(tiles.length / 2);
    tiles[middleTile].classList.add('active');
    positionTiles(tiles, parent);


}

buildSlider();