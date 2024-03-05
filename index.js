/* import * as Carousel from "./Carousel.js";
import axios from "axios"; */

// The breed selection input element.
const breedSelect = document.getElementById('breedSelect');
// The information section div element.
const infoDump = document.getElementById('infoDump');
// The progress bar div element.
const progressBar = document.getElementById('progressBar');
// The get favourites button element.
const getFavouritesBtn = document.getElementById('getFavouritesBtn');

// Step 0: Store your API key here for reference and easy access.
const API_KEY =
  'live_6dkTfegxbz7PgYkADhD6aInJCpwHatU5qBFAd8Xt3PekOyzwt23omloMroTQ59uP';

const url =`https://api.thecatapi.com/v1/breeds`;

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key':
      'live_6dkTfegxbz7PgYkADhD6aInJCpwHatU5qBFAd8Xt3PekOyzwt23omloMroTQ59uP',
    'X-RapidAPI-Host': 'https://api.thecatapi.com/v1/breeds',
  },
};
/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

//Create an async function "initialLoad"
const initialLoad = async () => {
  try {
    const url = await fetch(`https://api.thecatapi.com/v1/breeds`);
    const response = await url.json();

    //Create new <options> for each of these breeds, and append them to breedSelect.
    const breedSelect = document.getElementById('breedSelect');

    response.forEach((breed) => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.innerHTML = breed.name;
      breedSelect.appendChild(option);
    });

    breedSelect.addEventListener('change', handleBreedSelect);
  } catch (error) {
    console.error(error);
  }
};
/* 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 */

async function handleBreedSelect() {
  const selectedBreedId = document.getElementById('breedSelect').value;
  const carousel = document.getElementById('carouselExampleControls');
  const infoDump = document.getElementById('infoDump');

  // Clear previous content
  carousel.innerHTML = '';
  infoDump.innerHTML = '';

  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}&limit=5`
    );
    const jsonData = await response.json();

    //console.log(jsonData);

    jsonData.forEach((image) => {
      const imgElement = document.createElement('img');
      imgElement.src = image.url;
      carousel.appendChild(imgElement).style.height="150px";
      carousel.style.paddingLeft = '150px';
    });

    const responseBreed = await fetch(
      `https://api.thecatapi.com/v1/breeds/${selectedBreedId}`
    );
    const breedInfo = await responseBreed.json();

    // Create informational section within info Dump

    const infoTitle = document.createElement('h2');
    infoTitle.textContent = `${breedInfo.name}`;

    const infoDescription = document.createElement('p');
    infoDescription.textContent = `${breedInfo.description}`;

    infoDump.appendChild(infoTitle);
    infoDump.appendChild(infoDescription);
  } catch (error) {
    console.error(error);
  }
}


 // 9. creating a getFavourites() function.
 
/*  const getFavourites = document.getElementById('getFavouritesBtn');
 getFavourites.addEventListener('click', Favourite);

 async function Favourite() {
     const carousel = document.getElementById('carouselExampleControls');
     const infoDump = document.getElementById('infoDump');
     carousel.innerHTML = '';
     infoDump.innerHTML = '';
 
     try {
  
         const response = await fetch( 'https://api.thecatapi.com/v1/favourites'); 

         const jsonData = await response.json();
    
        jsonData.forEach((image) => {
          const imgElement = document.createElement('img');
          imgElement.src = image.url;
          carousel.appendChild(imgElement).style.height="150px";
          carousel.style.paddingLeft = '150px';
        });
     } catch (error) {
         console.error(error);
     }
 } */
 
 initialLoad();