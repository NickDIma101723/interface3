import dataService from "./dataService.js";
import uiRenderer from "./uiRenderer.js";

let alleMemes = [];

const maakFilters = (memes) => {
    // Het verzmelt alle unieke categorieën in een array
    let cats = [];
    memes.forEach(m => {
        if (!cats.includes(m.category)) {
            cats.push(m.category);
        }
    });

    // getElementById pakt het select element en innerHTML zet er HTML in
    const jaarSelect = document.getElementById("year-filter");
    jaarSelect.innerHTML = '<option value="all">Alle jaren</option>';
    
    // Hier heb ik de periodes hardcoded
    jaarSelect.innerHTML += '<option value="2020-2025">2020-2025</option>';
    jaarSelect.innerHTML += '<option value="2016-2020">2016-2020</option>';
    jaarSelect.innerHTML += '<option value="2010-2015">2010-2015</option>';
    jaarSelect.innerHTML += '<option value="2005-2010">2005-2010</option>';
    jaarSelect.innerHTML += '<option value="2000-2005">2000-2005</option>';

    const catSelect = document.getElementById("category-filter");
    catSelect.innerHTML = '<option value="all">Alle categorieën</option>';
    // Met forEach maak ik voor elke categorie een option, ${c} stopt de categorie naam erin
    cats.forEach(c => {
        catSelect.innerHTML += `<option value="${c}">${c}</option>`;
    });
};

// Het update de memes op basis van de filters
const updateMemes = () => {
    const filters = {
        jaar: document.getElementById("year-filter").value,
        categorie: document.getElementById("category-filter").value
    };
    uiRenderer(alleMemes, filters);
};

// Het reset de filters naar all en update de memes
// Reset zet beide filters terug naar all en toont alle memes weer
const resetFilters = () => {
    document.getElementById("year-filter").value = "all";
    document.getElementById("category-filter").value = "all";
    updateMemes();
};

// Start de applicatie op
// Start functie is async zodat ik await kan gebruiken
const start = async () => {
    document.getElementById("loading").style.display = "block";
    
    alleMemes = await dataService();
    
    //  Als er memes zijn geladen maak de fillters en update de weergave
    if (alleMemes.length > 0) {
        maakFilters(alleMemes);
        updateMemes();
        document.getElementById("loading").style.display = "none";
        
        document.getElementById("year-filter").addEventListener("change", updateMemes);
        document.getElementById("category-filter").addEventListener("change", updateMemes);
        document.getElementById("reset-btn").addEventListener("click", resetFilters);
    }
}

start();
