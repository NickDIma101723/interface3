// dataService.js - haalt de json op met fetch en async/await

const dataService = async () => {
    try {
        // fetch haalt de data op, await wacht tot het klaar is
        const response = await fetch('./data/data.json');
        const data = await response.json();
        
        // wacht 1 seconde zodat je de loading ziet
        await new Promise(resolve => setTimeout(resolve, 1000));
        return data;

    } catch (fout) {
        console.log("fout bij laden:", fout);
        return [];
    }
}
export default dataService;

