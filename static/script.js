const form = document.getElementById("predictionForm");

const predictBtn = document.getElementById("predictBtn");

const resetBtn = document.getElementById("resetBtn");

const buttonText = document.getElementById("buttonText");

const loader = document.getElementById("loader");

const resultCard = document.getElementById("resultCard");

const predictionValue = document.getElementById("predictionValue");

const errorMessage = document.getElementById("errorMessage");


form.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Hide previous results/errors
    resultCard.classList.add("hidden");
    errorMessage.classList.add("hidden");

    // Show loading state
    predictBtn.disabled = true;

    buttonText.textContent = "Predicting...";

    loader.classList.remove("hidden");


    // Get values
    const MedInc = document.getElementById("MedInc").value;

    const HouseAge = document.getElementById("HouseAge").value;

    const AveRooms = document.getElementById("AveRooms").value;

    const Population = document.getElementById("Population").value;

    const AveOccup = document.getElementById("AveOccup").value;

    const Latitude = document.getElementById("Latitude").value;


    // Create URL
    const url =
        `/predict?MedInc=${encodeURIComponent(MedInc)}` +
        `&HouseAge=${encodeURIComponent(HouseAge)}` +
        `&AveRooms=${encodeURIComponent(AveRooms)}` +
        `&Population=${encodeURIComponent(Population)}` +
        `&AveOccup=${encodeURIComponent(AveOccup)}` +
        `&Latitude=${encodeURIComponent(Latitude)}`;


    try {

        const response = await fetch(url);

        const data = await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.error || "Something went wrong."
            );

        }


        // Display prediction
        const value = data.prediction;


        predictionValue.textContent =
            "$" + value.toLocaleString(
                "en-US",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );


        resultCard.classList.remove("hidden");


        // Scroll to result
        resultCard.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


    } catch (error) {

        errorMessage.textContent =
            "Error: " + error.message;

        errorMessage.classList.remove("hidden");

    }


    // Restore button
    predictBtn.disabled = false;

    buttonText.textContent = "Predict House Value";

    loader.classList.add("hidden");

});


/* Reset button */

resetBtn.addEventListener("click", function () {

    form.reset();

    resultCard.classList.add("hidden");

    errorMessage.classList.add("hidden");

});