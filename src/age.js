// thanks to https://github.com/ottomated/portfolio/blob/master/js/age.js

let ageEl = document.getElementById('age');

setInterval(() => {
    let birthday = new Date('June 25, 1998 06:25:00');
    let time = (new Date() - birthday) / (1000 * 60 * 60 * 24 * 365.25); // milliseconds per year
    ageEl.innerText = time.toString().substring(0, 12);
}, 50);
