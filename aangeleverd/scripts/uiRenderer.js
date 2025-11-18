const uiRenderer = (memes, filters) => {
    const container = document.getElementById("meme-container");
    const loading = document.getElementById("loading");
    const resultsCount = document.getElementById("results-count");
    
    container.innerHTML = "";
    loading.style.display = "none";
    
    // Hier filter ik de memes
    let gefilterd = memes;
    if (filters.jaar !== "all") {
        // Includes kijkt of er een - in zit, dan weet ik dat het een periode is
        if (filters.jaar.includes("-")) {
            // Split op de - en zet om naar nummers
            const jaren = filters.jaar.split("-");
            const min = Number(jaren[0]);
            const max = Number(jaren[1]);
            // Filter houdt alleen memes waarbij year tussen min en max zit
            gefilterd = gefilterd.filter(m => m.year >= min && m.year <= max);
        } else {
            gefilterd = gefilterd.filter(m => m.year === Number(filters.jaar));
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
    
    // Hier maak ik de kaartjes
    // ForEach loopt door elke meme, innerHTML += voegt HTML toe, ${} stopt de meme data erin
    gefilterd.forEach((meme, index) => {
        container.innerHTML += `
            <div class="aspect-[4/3] border border-black overflow-hidden relative p-12 flex flex-col items-center justify-center" style="animation-delay: ${index * 0.05}s">
                <div class="flex items-center justify-center mb-8" style="width: 70%; height: 50%;">
                    <img src="img/${meme.image}" alt="${meme.title}" class="max-w-full max-h-full object-contain">
                </div>
                <div class="text-left w-full mt-6">
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

