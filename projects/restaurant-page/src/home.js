const renderHome = (content) => {
    const title = 'Toppa Pizza';
    const intro = 'Here at Toppa Pizza, we\'ve been pretending to make pizza since The Odin Project told us to. We even got the inspiration for our name from them. Although our pizza is pretend, the code used to create this site is 100% organic!';

    const chefImgDiv = document.createElement('div');
    chefImgDiv.classList.add('chefImgDiv');
    const titleHeading = document.createElement('h1');
    titleHeading.classList.add('contentHeading');
    titleHeading.textContent = title;
    const introPara = document.createElement('p');
    introPara.textContent = intro;
    content.appendChild(chefImgDiv);
    content.appendChild(titleHeading);
    content.appendChild(introPara);
}

export default renderHome 

