const renderMenu = (content) => {
    const pizzaPrefixs = ['cap', 'haw', 'marg', 'mari', 'mex', 'mush', 'pep', 'sea', 'veg'];
    const pizzaDescriptions = ['mushrooms, sliced tomatoes, and green and black olives', 'pineapple, bacon, and bacon crumble', 'sliced tomatoes and basil', 'sliced tomatoes, sardines, and black olives', 'chili peppers, soppressata, and black olives', 'mushrooms, sliced tomatoes, basil, and black olives', 'pepperoni and oregano', 'shrimp and black olives', 'sliced tomatoes, mushrooms, sliced green peppers, and black and green olives'];
    const pizzaPrices = ['$15', '$16', '$14', '$16', '$17', '$16', '$15', '$20', '$16'];

    for (let i = 0; i < pizzaPrefixs.length; i++) {
        const pizzaDiv = document.createElement('div');
        pizzaDiv.classList.add('pizzaDiv');
        const pizzaDescDiv = document.createElement('div');
        pizzaDescDiv.classList.add('pizzaDescDiv');
        const pizzaPrice = document.createElement('p');
        pizzaPrice.classList.add('pizzaPrice');
        pizzaPrice.textContent = pizzaPrices[i];
        const pizzaDescP = document.createElement('p');
        pizzaDescP.classList.add('pizzaDescP');
        pizzaDescP.textContent = pizzaDescriptions[i];
        const img = document.createElement('img');
        img.src = `./images/${pizzaPrefixs[i]}.jpg`;

        pizzaDescDiv.appendChild(pizzaPrice);
        pizzaDescDiv.appendChild(pizzaDescP);
        pizzaDiv.appendChild(img);
        pizzaDiv.appendChild(pizzaDescDiv);
        content.appendChild(pizzaDiv);
    }
}

export default renderMenu