const renderContact = (content) => {
    let title = document.createElement('h1');
    title.textContent = 'Contact Us';
    title.classList.add('contentHeading');
    let chefContact = document.createElement('div');
    chefContact.classList.add('contactDiv');
    let chefContactTitle = document.createElement('h2');
    chefContactTitle.textContent = 'Executive Chef';
    let chefContactName = document.createElement('h3');
    chefContactName.textContent = 'Chef Odin';
    let chefContactPhone = document.createElement('p');
    chefContactPhone.textContent = '416-123-1234';
    let chefContactEmail = document.createElement('p');
    chefContactEmail.textContent = 'theodinprojectcontact@gmail.com';
    chefContact.appendChild(chefContactTitle);
    chefContact.appendChild(chefContactName);
    chefContact.appendChild(chefContactPhone);
    chefContact.appendChild(chefContactEmail);

    let devContact = document.createElement('div');
    devContact.classList.add('contactDiv');
    let devContactTitle = document.createElement('h2');
    devContactTitle.textContent = 'Web Developer';
    let devContactName = document.createElement('h3');
    devContactName.textContent = 'Maplesyrupman';
    let devContactPhone = document.createElement('p');
    devContactPhone.textContent = '416-579-7681';
    let devContactEmail = document.createElement('p');
    devContactEmail.textContent = 'maplesyrupman@protonmail.com';
    devContact.appendChild(devContactTitle);
    devContact.appendChild(devContactName);
    devContact.appendChild(devContactPhone);
    devContact.appendChild(devContactEmail);

    content.appendChild(title);
    content.appendChild(chefContact);
    content.appendChild(devContact);
}

export default renderContact 