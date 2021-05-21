import renderHome from './home';
import renderContact from './contact';
import renderMenu from './menu';

let content = document.getElementById('content');
let navLinks = Array.from(document.getElementsByClassName('navItem'));
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        navLinks[displayedTab].classList.remove('selected');
        e.target.classList.add('selected');
        displayedTab = e.target.dataset.index;
        clearContent();

        if (displayedTab == '0') {
            renderHome(content);
        } else if (displayedTab == '1') {
            renderMenu(content);
        } else {
            renderContact(content);
        }
    })
})


function clearContent() {
    while (content.hasChildNodes()) {
        content.removeChild(content.lastChild);
    }
}

navLinks[0].classList.add('selected');
let displayedTab = '0';

renderHome(content);
