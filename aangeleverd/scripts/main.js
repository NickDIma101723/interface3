import dataService from "./dataService.js";
import uiRenderer from "./uiRenderer.js";

let alleMemes = [];

const maakFilters = (memes) => {
    // verzamel unieke jaren met forEach, includes checkt of het er al in zit
    let jaren = [];
    memes.forEach(m => {
        if (!jaren.includes(m.year)) {
            jaren.push(m.year);
        }
    });
    // sorteer de jaren van nieuw naar oud, b - a zorgt dat de hoogste eerst komt
    jaren.sort((a,b) => b - a);
    
    let cats = [];
    memes.forEach(m => {
        if (!cats.includes(m.category)) {
            cats.push(m.category);
        }
    });

    // vul de jaar dropdown, innerHTML += voegt elke optie toe
    const jaarSelect = document.getElementById("year-filter");
    jaarSelect.innerHTML = '<option value="all">Alle jaren</option>';
    
    // groepeer jaren in periodes
    jaarSelect.innerHTML += '<option value="2020-2025">2020-2025</option>';
    jaarSelect.innerHTML += '<option value="2016-2020">2016-2020</option>';
    jaarSelect.innerHTML += '<option value="2010-2015">2010-2015</option>';
    jaarSelect.innerHTML += '<option value="2005-2010">2005-2010</option>';
    jaarSelect.innerHTML += '<option value="2000-2005">2000-2005</option>';

    const catSelect = document.getElementById("category-filter");
    catSelect.innerHTML = '<option value="all">Alle categorieën</option>';
    // forEach maakt voor elke categorie een option met ${} voor de waardes
    cats.forEach(c => {
        catSelect.innerHTML += `<option value="${c}">${c}</option>`;
    });
};

const updateMemes = () => {
    const filters = {
        jaar: document.getElementById("year-filter").value,
        categorie: document.getElementById("category-filter").value
    };
    uiRenderer(alleMemes, filters);
};

const resetFilters = () => {
    document.getElementById("year-filter").value = "all";
    document.getElementById("category-filter").value = "all";
    updateMemes();
};

// start de hele applicatie
async function start() {
    document.getElementById("loading").style.display = "block";
    
    alleMemes = await dataService();
    
    if (alleMemes.length > 0) {
        maakFilters(alleMemes);
        updateMemes();
        document.getElementById("loading").style.display = "none";
        
        // addEventListener vangt de change event op, roept updateMemes aan voor real-time filtering
        document.getElementById("year-filter").addEventListener("change", updateMemes);
        document.getElementById("category-filter").addEventListener("change", updateMemes);
        document.getElementById("reset-btn").addEventListener("click", resetFilters);
    }
}

start();
