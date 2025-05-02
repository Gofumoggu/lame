const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

// Function to handle calculations
const calculate = (btnValue) => {
    display.focus();

    if (btnValue === "=" && output !== "") {
        // Replace "%" with "/100" before evaluation
        output = eval(output.replace("%", "/100"));
    } else if (btnValue === "AC") {
        // Clear output
        output = "";
    } else if (btnValue === "DEL") {
        // Remove the last character
        output = output.slice(0, -1);
    } else {
        // Prevent starting with a special character
        if (output === "" && specialChars.includes(btnValue)) return;
        output += btnValue;
    }

    display.value = output;
};

// Attach event listeners to buttons
buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
