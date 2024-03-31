const root = document.getElementById("root");

const peopleUrl = "https://www.swapi.tech/api/people/"; 
const planetsUrl = "https://www.swapi.tech/api/planets/";
const peciesUrl = "https://www.swapi.tech/api/species/"; 
const starshipsUrl = "https://www.swapi.tech/api/starships/";
const vehiclesUrl = "https://www.swapi.tech/api/vehicles/";

/* 
film structure = {
    characters: [],
    planets: [], 
    starships: [], 
    vehicles: [], 
    species: [], 
    producer, 
    title, 
    episode_id, 
    director, 
    releaseDate, 
    openingCrawl, 
    url
}
 */

const onInit = async () => {
    try {
        let filmsDetails = await getFilms();
        let totalFilms = filmsDetails.length;
        renderFilmsTable(totalFilms, filmsDetails);
    } catch (err) {
        renderFailure("Error fetching films");
        console.log("Error fetching films:", err);
    }
    

}

//build table with films details
const renderFilmsTable = (rows, filmsDetails) => {
    let table = `    <table>
                        <thead>
                            <tr>
                                <th>Episode ID</th>
                                <th>Title</th>
                                <th>Director</th>
                                <th>Release Date</th>
                                <th class="wide-cell">Opening Crawl</th>
                                <th>Characters</th>
                            </tr>
                        </thead>
                        <tbody>`

    for (let i = 1; i < rows+1; i++) {
        table += `${renderFilmGenericData(i, filmsDetails)}`;
    }
    table +=    `</tbody>
            </table>`;

    root.innerHTML = table;

}

//render single film generic data
const renderFilmGenericData = (filmId, filmsDetails) => {
    let filmDetails = filmsDetails[filmId-1].properties;
    
    let htmlBlock = `    <tr>
                            <td>${filmDetails.episode_id}</td>
                            <td><a href="#" onclick="openSingleFilmDetails(${filmId})">${filmDetails.title}</a></td>
                            <td>${filmDetails.director}</td>
                            <td>${filmDetails.release_date}</td>
                            <td class="wide-cell">${filmDetails.opening_crawl}</td>
                            <td><a href="#" onclick="openSingleFilmDetails(${filmId}, event)">More Details...</a></td>
                        </tr>`
    return htmlBlock;
}
//render film characters data
const renderCharacters = async (filmsDetails) => {
    let totalCharactersAmount = filmsDetails.characters.length;
    
    let characterHTML = ``;

    for (let i = 0; i < totalCharactersAmount; i++) {
        let characterDetails = await getEntityData(filmsDetails.characters[i]);
        characterHTML += `<p>Name: ${characterDetails.name}, gender: ${characterDetails.gender}, height: ${characterDetails.height}, mass: ${characterDetails.mass}</p>`;
        if ((i === 2) && (i != totalCharactersAmount-1)) {
            characterHTML += `<p>And others...</p>`;
            break;
        }
    }
    
    return characterHTML;    

}

//render film planets data
const renderPlanets = async (filmsDetails) => {
    let totalPlanetsAmount = filmsDetails.planets.length;
    
    let planetHTML = ``;

    for (let i = 0; i < totalPlanetsAmount; i++) {
        let planetDetails = await getEntityData(filmsDetails.planets[i]);
        planetHTML += `<p>Name:${planetDetails.name}, diameter: ${planetDetails.diameter}, population: ${planetDetails.population}, climate: ${planetDetails.climate}</p>`;
        if ((i === 2) && (i != totalPlanetsAmount-1)) {
            planetHTML += `<p>And others...</p>`;
            break;
        }
    }
    
    return planetHTML;    

}

//render film starships data
const renderStarships = async (filmsDetails) => {
    let totalStarshipsAmount = filmsDetails.starships.length;
    
    let starshipsHTML = ``;

    for (let i = 0; i < totalStarshipsAmount; i++) {
        let starshipDetails = await getEntityData(filmsDetails.starships[i]);
        starshipsHTML += `<p>Model:${starshipDetails.model}, class: ${starshipDetails.starship_class}, Cost: ${starshipDetails.cost_in_credits}, crew: ${starshipDetails.crew}</p>`;
        if ((i === 2) && (i != totalStarshipsAmount-1)) {
            starshipsHTML += `<p>And others...</p>`;
            break;
        }
    }
    
    return starshipsHTML;    

}


//render single film generic data
const renderFilmDetailedData = async (filmProperties) => {
    let filmDetails = filmProperties;
    let characters = await renderCharacters(filmDetails);
    let planets = await renderPlanets(filmDetails);
    let starships = await renderStarships(filmDetails);
    let htmlBlock = `    <tr>
                            <td>${filmDetails.episode_id}</td>
                            <td>${filmDetails.title}</a></td>
                            <td>${filmDetails.director}</td>
                            <td>${filmDetails.producer}</td>
                            <td>${filmDetails.release_date}</td>
                            <td class="wide-cell">${filmDetails.opening_crawl}</td>
                            <td class="wide-cell">${characters}</td>
                            <td class="wide-cell">${planets}</td>
                            <td class="wide-cell">${starships}</td>
                        </tr>`
    return htmlBlock;
}

//build table with single film details
const openSingleFilmDetails = async (filmId, event) => {
    
    const filmDetails = await getSingleFilmDetails(filmId); 
    let filmProperties = filmDetails.properties;
    const filmData = await renderFilmDetailedData(filmProperties);

    console.log(filmProperties);
    
    //let filmDetails = filmsDetails[filmId].properties;
    let table = `    <table>
                        <thead>
                            <tr>
                                <th>Episode ID</th>
                                <th>Title</th>
                                <th>Director</th>
                                <th>Producer</th>
                                <th>Release Date</th>
                                <th class="wide-cell">Opening Crawl</th>
                                <th>Characters</th>
                                <th>Planets</th>
                                <th>Starships</th>
                            </tr>
                        </thead>
                        <tbody>`

    table += `${filmData}`;
    table +=    `</tbody>
    </table>
    <button title="Back" class="backbutton" onclick="Back()">Back to the list of films</button>`;

    root.innerHTML = table;
}

//overwrite root with the failure 
const renderFailure = (errorMessage) => {
    let failedHTML = `  <img class="loader" src="./img/start.gif" alt="failure" class="gif"/>
                        <p class="failure">Failed to load data: ${errorMessage}</p>`;
    
    root.innerHTML = failedHTML;

}

//back to the list of films. not the sexy solution :)
const Back = async () => {
    try {
        let filmsDetails = await getFilms();
        let totalFilms = filmsDetails.length;
        renderFilmsTable(totalFilms, filmsDetails);
    } catch (err) {
        renderFailure("Error fetching films");
        console.log("Error fetching films:", err);
    }
    
}