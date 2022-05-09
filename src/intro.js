// Credit to https://github.com/ottomated/portfolio/blob/master/js/intro.js

let header = document.querySelector('#intro');
let bigPause = 300;
let smallPause = 100;
let animation = [
    { t: '[█]', ms: bigPause },
    { t: '[█]', ms: bigPause },
    { t: '[█]', ms: bigPause },
    { t: '[█]', ms: bigPause },
    { t: '[\u00A0█\u00A0]', ms: smallPause },
    { t: '[\u00A0T█\u00A0]', ms: smallPause },
    { t: '[\u00A0TR█\u00A0]', ms: smallPause },
    { t: '[\u00A0TRI█\u00A0]', ms: smallPause },
    { t: '[\u00A0TRIM█\u00A0]', ms: smallPause },
    { t: '[\u00A0TRIMC█\u00A0]', ms: smallPause },
    { t: '[\u00A0TRIMCL█\u00A0]', ms: smallPause },
    { t: '[\u00A0TRIMCLA█\u00A0]', ms: smallPause },
    { t: '[\u00A0TRIMCLAI█\u00A0]', ms: smallPause },
    { t: '[\u00A0TRIMCLAIN█]', ms: smallPause },
    { t: '[\u00A0TRIMCLAIN█]', ms: bigPause },
    { t: '[\u00A0TRIMCLAIN█]', ms: bigPause },
    { t: '[\u00A0TRIMCLAIN█]', ms: bigPause },
    { t: '[\u00A0TRIMCLAIN█]', ms: bigPause },
    { t: '[\u00A0TRIMCLAIN█]', ms: bigPause },
    { t: '[\u00A0TRIMCLAIN\u00A0]', ms: bigPause },
];

let stepDenominator = 1;
if (window.localStorage.stepDenominator)
    stepDenominator = window.localStorage.stepDenominator;

let i = 0;
const update = () => {
    let step = animation[i];
    header.innerText = step.t;
    i++;

    if (i < animation.length) setTimeout(update, step.ms / stepDenominator);
    else {
        header.classList.add('top');
        setTimeout(() => {
            document.getElementById('main').style.opacity = 1;
            // initGlobe();
        }, 500);
        window.localStorage.stepDenominator = 2;
    }
};

update();
