let myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if (mySrc === 'images/silly-headshot.jpg') {
        myImage.setAttribute('src', 'images/less-silly-headshot.jpg');
    } else {
        myImage.setAttribute('src', 'images/silly-headshot.jpg') 
    }
}

let myButton = document.querySelector('button')
myButton.onclick = function() {
    setUserName();
}

let myHeading = document.querySelector('h2') 

function setUserName() {
    let myName = prompt('Please enter your name.');
    if(!myName) {
        setUserName();
    } else {
      localStorage.setItem('name', myName);
      myHeading.textContent = 'Mozilla is cool, ' + myName;
    }
}

if (!localStorage.getItem('name')) {
    setUserName();
} else {
    let storedName = localStorage.getItem('name');
    myHeading.textContent = 'Mozilla is cool, ${myName}';
}
