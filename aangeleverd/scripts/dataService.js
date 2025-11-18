const dataService = async () => {
    try {
        // Fetch pakt alle data op en zet het om naar een JSON object
        // Await wacht tot het klaar is
        const response = await fetch('./data/data.json');
        
        // Het checkt of fetch gelukt is
        if (!response.ok) {
            throw new Error("Data kon niet geladen worden");
        }
        
        const data = await response.json();
        
        // Het wacht 1 sec zodat alle data geladen is en de loading zichtbaar is
        await new Promise(resolve => setTimeout(resolve, 1000));
        return data;

    } catch (fout) {
        console.log("fout bij laden:", fout);
        alert("Kon de memes niet laden. Probeer de pagina opnieuw te laden.");
        return [];
    }
}
export default dataService;

