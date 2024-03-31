const filmsUrl = "https://www.swapi.tech/api/films/";

//get ALL films data from API
const getFilms = async () => {
    
    try {
        let response = await fetch(filmsUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        filmsData = await response.json();

        return filmsData.result;
    
    } catch (err) {
        console.error("Error getting films:", err);
        throw err;
    }

}

//get single film data from API
const getSingleFilmDetails = async (filmId) => {
    
    try {
        let response = await fetch(`${filmsUrl}${filmId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        singleFilmData = await response.json();

        return singleFilmData.result;
    
    } catch (err) {
        console.error("Error getting films:", err);
        throw err;
    }

}


//get people, planet, vehicle, starship data from API
const getEntityData = async (url) => {
    
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        actorData = await response.json();

        return actorData.result.properties;
    
    } catch (err) {
        console.error(`Error getting entity from ${url}: ${err}`);
        throw err;
    }

}