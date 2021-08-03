// const BREEDS_URL = 'https://dog.ceo/api/breeds/image/random';

// function addDoggo() {
//     fetch(BREEDS_URL)       // when we do .fetch, we do ajax
//     .then(function (responese) {
//         return responese.json();
//     }).then(function (data) {
//         const img = document.createElement('img');
//         img.src = data.message;
//         img.alt = 'cute doggo';

//         document.querySelector('.doggos').appendChild(img);
//     })
// }

// document.querySelector('.add-doggo').addEventListener('click',addDoggo);


const BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
const select = document.querySelector('.breeds');
const spinner = document.querySelector('.spinner');
const img = document.querySelector('.doggo-image');
let currentUrl;

fetch(BREEDS_URL)
    .then(responce => {
        return responce.json();
    })
    .then(data => {
        const breedObject = data.message;
        const breedArr = Object.keys(breedObject);

        for (let i = 0; i < breedArr.length; i++) {
            const option = document.createElement('option');
            option.value = breedArr[i];
            option.innerText = breedArr[i];

            if (i === 39) {
                option.selected = true;
                getDoggo(`https://dog.ceo/api/breed/${breedArr[39]}/images/random`);
            }

            select.appendChild(option);
        };
    });

function spinDoggo(toSpin) {
    if (toSpin) {
        spinner.classList.add('show')
        img.classList.remove('show')
        //img.style.diplay='none';
    }
    else {
        spinner.classList.remove('show')
        img.classList.add('show')
    }
};



function getDoggo(url) {
    spinDoggo(true);

    currentUrl = url;
    fetch(url)
        .then(responce => {
            return responce.json()
        })
        .then(data => {
            img.src = data.message;
        });
};

select.addEventListener('change', event => {
    let url = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
    getDoggo(url);
});


const button = document.querySelector('.other-img-btn');
button.addEventListener('click', event => {
    getDoggo(currentUrl);
});

img.addEventListener("load", function () {
    spinDoggo(false);
});