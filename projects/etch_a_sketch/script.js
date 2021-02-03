const container = document.getElementById('container');
const resetBtn = document.getElementById('resetBtn');
let theGrid;



function resetNewDimensions() {
    let newDimensions;
    do {
        newDimensions = Number(prompt('Enter a number between 10 and 100 to create a new sketch pad with those dimensions'));
    } while (isNaN(newDimensions) || newDimensions > 100 || newDimensions < 10);
    clearContainer();
    createGrid(newDimensions);
    addDivs(newDimensions);
}

function clearContainer() {
    container.removeChild(theGrid);
}

function createGrid(dimensions) {
    theGrid = document.createElement('div');
    theGrid.classList.add('theGrid');
    container.appendChild(theGrid);
    theGrid.style.cssText = 
    `grid-template-columns: repeat(${dimensions}, 1fr); 
    grid-template-rows: repeat(${dimensions}, 1fr)`;
}

function addDivs(dimensions) {
    for(let i=1;i<=(dimensions*dimensions);i++) {
        const div = document.createElement('div');
        div.setAttribute('id', `${i}`);
        div.classList.add('pixels');
        div.dataset.lightness = 50;
        theGrid.appendChild(div);
    }
    const pixels = document.querySelectorAll('.pixels');

    pixels.forEach((element) => {
        const thisID = element.id;
        element.addEventListener('mouseover', (e) =>{
            console.log(e.target.id)
            e.target.style.backgroundColor = setColour(e.target.id);
            
        
    });
});
}

function getRandomColour() {
    const colours = [0, 30, 60, 120, 240, 285]; //red, orange, yellow, green, blue, purple
    colour = colours[Math.floor(Math.random() *6)];
    return colour;
}

function setColour(divID) {
    const divToColour = document.getElementById(divID);
    let lightness = divToColour.dataset.lightness;
    if (lightness == 50) {
        hslColour = `hsl(${getRandomColour()}, 100%, ${lightness}%)`;
        divToColour.dataset.lightness = lightness - 10;
        return hslColour;
    } else if (lightness > 0) {
        divToColour.dataset.lightness = divToColour.dataset.lightness - 10;
        lightness = divToColour.dataset.lightness;
        hslColour = `hsl(${getRandomColour()}, 100%, ${lightness}%)`;
        return hslColour;
    }
}

createGrid(16);
addDivs(16);



resetBtn.addEventListener('click', resetNewDimensions);