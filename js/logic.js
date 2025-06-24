// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable sonarjs/pseudo-random, unicorn/prefer-global-this */
;
(() => {
    let lives = 3;
    let score = 0;
    const mosquitoLife = 1500;
    const multiply = 1;
    const eatEvent = 'mouseover';
    /*
     * Game screen size
     */
    const margin = 100;
    let width = 0;
    let height = 0;
    function adjustGameScreenSize() {
        width = window.innerWidth;
        height = window.innerHeight;
    }
    adjustGameScreenSize();
    /*
     * Mosquito Logic
     */
    function randomMosquitoPosition() {
        var _a;
        // Remove the previous mosquito (if there's any...)
        if (document.querySelector('#mosquito') !== null) {
            (_a = document.querySelector('#mosquito')) === null || _a === void 0 ? void 0 : _a.remove();
            if (lives > 0) {
                document.getElementById('life' + lives).src = 'images/empty_heart.png';
                lives--;
            }
            if (lives <= 0) {
                window.location.href = 'gameOver.html?' + score;
            }
        }
        const maxWidth = width / 2 + 640;
        let minWidth = width / 2 - 640;
        let positionX = 0;
        if (width >= 1024) {
            positionX =
                Math.floor(Math.random() * (maxWidth - minWidth + 1)) +
                    minWidth -
                    margin;
        }
        else {
            positionX = Math.floor(Math.random() * width) - margin;
            minWidth = 0;
        }
        let positionY = Math.floor(Math.random() * height) - margin;
        positionX = Math.max(positionX, minWidth, margin);
        positionY = Math.max(positionY, margin);
        // Create the html element
        const mosquito = document.createElement('img');
        mosquito.src = 'images/mosquito.png';
        mosquito.className = randomMosquitoSize() + ' ' + randomMosquitoDirection();
        mosquito.style.left = positionX + 'px';
        mosquito.style.top = positionY + 'px';
        mosquito.style.position = 'absolute';
        mosquito.id = 'mosquito';
        mosquito.addEventListener(eatEvent, function () {
            mosquito.remove();
            score += multiply;
            document.querySelector('#current-score').textContent = score.toString();
        });
        document.body.append(mosquito);
    }
    function randomMosquitoSize() {
        const mosquitoSizeClass = Math.floor(Math.random() * 3);
        switch (mosquitoSizeClass) {
            case 0: {
                return 'mosquito1';
            }
            case 1: {
                return 'mosquito2';
            }
            default: {
                return 'mosquito3';
            }
        }
    }
    function randomMosquitoDirection() {
        const mosquitoDirectionClass = Math.floor(Math.random() * 2);
        return mosquitoDirectionClass === 0 ? 'direction_left' : 'direction_right';
    }
    const createMosquitoInterval = setInterval(function () {
        randomMosquitoPosition();
    }, mosquitoLife);
    /*
     * Timer
     */
    let time = 60;
    const chronometerElement = document.querySelector('#chronometer');
    if (chronometerElement === null) {
        throw new Error('Chronometer element not found');
    }
    chronometerElement.textContent = time.toString();
    const chronometerInterval = setInterval(function () {
        time--;
        if (time < 0) {
            clearInterval(chronometerInterval);
            clearInterval(createMosquitoInterval);
            window.location.href = 'gameOver.html?' + score;
        }
        else {
            chronometerElement.textContent = time.toString();
        }
    }, 1000);
})();
