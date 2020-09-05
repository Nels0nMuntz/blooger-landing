const menu = () => {
    const menuIconSelector = 'i.fa-bars';
    const headerSelector = 'header';

    const menuIcon = document.querySelector(menuIconSelector);
    const header = document.getElementById(headerSelector);

    header.addEventListener('click', event => {
        if(event.target.closest(menuIconSelector) === menuIcon){
            header.classList.toggle('active');
        }
        if(event.target.closest('.header__nav') || event.target.closest('.social')){
            if(header.classList.contains('active')) header.classList.remove('active');
        }
    });
}