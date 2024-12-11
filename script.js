const gba = new GameBoyAdvance();
const canvas = document.getElementById("screen");
gba.setCanvas(canvas);

document.getElementById("rom-loader").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".gba")) {
        const reader = new FileReader();
        reader.onload = function () {
            const romBuffer = reader.result;
            gba.loadRomFromFile(romBuffer)
                .then(() => {
                    console.log("ROM loaded successfully. Starting emulator...");
                    gba.runStable();
                })
                .catch((error) => {
                    console.error("Error loading ROM:", error);
                    alert("Failed to load ROM. Check the console for details.");
                });
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert("Please upload a valid .gba file.");
    }
});

gba.reportError = function (error) {
    console.error("Emulator error:", error);
    alert("An error occurred in the emulator. Check the console for details.");
};
