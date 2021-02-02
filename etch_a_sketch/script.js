const container = document.getElementById('container');
const resetBtn = document.getElementById('resetBtn');
let theGrid;



function resetNewDimensions() {
    let newDimensions;
    do {
        newDimensions = Number(prompt('Enter a number between 10 and 100 to create a new sketch pad with those dimensions'));
    } while (typeof newDimensions != 'number' || newDimensions > 100 || newDimensions < 10);
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
        theGrid.appendChild(div);
    }
    const pixels = document.querySelectorAll('.pixels');

    pixels.forEach((element) => {
        element.addEventListener('mouseover', (e) =>{
        console.log(e.target.style.backgroundColor);

        e.target.style.backgroundColor = 'blue';
        
    });
});
}

createGrid(16);
addDivs(16);



resetBtn.addEventListener('click', resetNewDimensions);