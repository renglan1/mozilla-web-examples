
populate();

/*In our function, the first four lines use the Fetch API to fetch the JSON from the server:
    > we declare the requestURL variable to store the GitHub URL
    > we use the URL to initialize a new Request superHeroesect.
    > we make the network request using the fetch() function, and this returns a Response superHeroesect
    > we retrieve the response as JSON using the json() function of the Response superHeroesect*/
async function populate() {
    const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const superHeroes = await response.json();

    populateHeader(superHeroes);
    populateHeroes(superHeroes);
}

function populateHeader(superHeroes) {
    const header = document.querySelector('header');
    const myH1 = document.createElement('h1');
    myH1.textContent = superHeroes['squadName'];
    header.appendChild(myH1);

    const myPara = document.createElement('p');
    // This is a template literal:
    myPara.textContent = `Hometown: ${superHeroes['homeTown']} // Formed: ${superHeroes['formed']}`;
    header.appendChild(myPara);
}

function populateHeroes(superHeroes) {
    const section = document.querySelector('section');
    const heroes = superHeroes['members'];

    for (const hero of heroes) {
        const myArticle = document.createElement('article');
        const myH2 = document.createElement('h2');
        const myPara1 = document.createElement('p');
        const myPara2 = document.createElement('p');
        const myPara3 = document.createElement('p');
        const myList = document.createElement('ul');

        myH2.textContent = hero.name;
        myPara1.textContent = `Secret identity: ${hero.secretIdentity}`;
        myPara2.textContent = `Age: ${hero.age}`;
        myPara3.textContent = 'Superpowers:';

        const superPowers = hero.powers;
        for (const power of superPowers) {
            const listItem = document.createElement('li');
            listItem.textContent = power;
            myList.appendChild(listItem);
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
    }
}