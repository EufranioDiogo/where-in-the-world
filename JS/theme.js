
const getActiveTheme = function () {
    let isDark = localStorage.getItem('theme');

    if (isDark == null) {
        localStorage.setItem('theme', 'false');
        isDark = 'false';
    } else if (isDark == 'false') {
        return false;
    }

    return true;
}

const switchTheme = function (isDark) {
    console.log('IsDark: ' + isDark)
    localStorage.setItem('theme', isDark.toString());
}

const wearTheme = function (parentPathToResource) {
    let isDark = getActiveTheme();

    if (isDark) {
        document.querySelectorAll('link')[0].href = parentPathToResource + 'CSS/dark-variables.css';

        document.querySelector('.dark-ligth-mode-button').innerText = 'Light Mode';

        document.querySelector('.dark-ligth-mode-icon').src = parentPathToResource + 'IMAGES/sun-white.svg';

        document.querySelector('.search-icon').src = parentPathToResource + 'IMAGES/search-white.svg';
    } else {
        document.querySelectorAll('link')[0].href = parentPathToResource + 'CSS/ligth-variables.css';

        document.querySelector('.dark-ligth-mode-button').innerText = 'Dark Mode';

        document.querySelector('.dark-ligth-mode-icon').src = parentPathToResource + 'IMAGES/moon-black.svg';

        document.querySelector('.search-icon').src = parentPathToResource + 'IMAGES/search-black.svg';
    }
}

export { getActiveTheme, switchTheme, wearTheme };