const uiRenderer = (memes, filters) => {
    const container = document.getElementById("meme-container");
    const loading = document.getElementById("loading");
    const resultsCount = document.getElementById("results-count");
    
    container.innerHTML = "";
    loading.style.display = "none";
    
    // hier heb ik de filter logica gemaakt
    let gefilterd = memes;
    if (filters.jaar !== "all") {
        // Het kijkt of het een periode is zoals 2010-2015 of 1 jaar
        if (filters.jaar.includes("-")) {
            // split bijv "2010-2015" wordt ["2010", "2015"], dan omzetten naar nummers
            const jaren = filters.jaar.split("-");
            const min = Number(jaren[0]);
            const max = Number(jaren[1]);
            // houd alleen memes die tussen die jaren vallen
            gefilterd = gefilterd.filter(m => m.year >= min && m.year <= max);
        } else {
            gefilterd = gefilterd.filter(m => m.year == filters.jaar);
        }
    }
    if (filters.categorie !== "all") {
        gefilterd = gefilterd.filter(m => m.category === filters.categorie);
    }
    
    if (gefilterd.length === 0) {
        container.innerHTML = '<div class="col-span-3 text-center py-32 text-xl text-gray-600">Geen memes gevonden</div>';
        resultsCount.textContent = '0 memes gevonden';
        return;
    }
    
    // maak de kaartjes met forEach, voor elke meme wordt er HTML gemaakt
    // innerHTML += voegt het toe aan de container, ${} haalt de data uit het meme object
    gefilterd.forEach((meme, index) => {
        container.innerHTML += `
            <div class="aspect-[4/3] border border-black overflow-hidden relative p-12 flex items-center justify-center group" style="animation-delay: ${index * 0.05}s">
                <div class="flex items-center justify-center transition-all duration-400 group-hover:blur-lg" style="width: 70%; height: 70%;">
                    <img src="img/${meme.image}" alt="${meme.title}" class="max-w-full max-h-full object-contain">
                </div>
                <div class="absolute bottom-0 left-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none text-left z-10">
                    <h3 class="text-xl font-bold mb-1">${meme.title}</h3>
                    <p class="text-sm mb-2">${meme.year} • ${meme.category}</p>
                    <p class="text-sm italic">${meme.description}</p>
                </div>
            </div>
        `;
    });
    
    resultsCount.textContent = gefilterd.length + ' memes gevonden';
}

export default uiRenderer;

