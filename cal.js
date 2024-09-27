const display = document.getElementById("display");
let lastWasCalculation = false;

function appendToDisplay(input) {
    const lastChar = display.value[display.value.length - 1];
    const operators = ['+', '-', '*', '/', 'Math.sin(', 'Math.cos(', 'Math.tan(', 'Math.log10(', 'Math.sqrt(', '**'];

    
    if (lastWasCalculation) {
        if (!isNaN(input) || input === '.') {
            display.value = input;
            lastWasCalculation = false;
        }
        return; 
    }
       if (operators.includes(lastChar) && operators.includes(input)) {
           display.value = display.value.slice(0, -1) + input; 
       } else {
           display.value += input; 
       }
}
function clearDisplay(){
    display.value = "";
}
function clearLastInput() {
    display.value = display.value.slice(0, -1); 
}
function calculate() {
    try {
        const lastChar = display.value[display.value.length - 1];
        const operators = ['+', '-', '*', '/', 'Math.sin(', 'Math.cos(', 'Math.tan(', 'Math.log10(', 'Math.sqrt('];

        if (operators.includes(lastChar)) {
            display.value = display.value.slice(0, -1);
        }

        // Sanitize the input for logarithmic calculation
        if (display.value.includes('Math.log10')) {
            const value = parseFloat(display.value.split('Math.log10(')[1].replace(')', ''));
            if (value <= 0) {
                throw new Error("Logarithm undefined for zero or negative numbers");
            }
        }

        display.value = eval(display.value);

    } catch (error) {
        display.value = "Error";
    }
}


document.addEventListener('keydown', function(event) {
    const key = event.key;

    
    if (!isNaN(key) || ['+', '-', '*', '/','.'].includes(key)) {
        appendToDisplay(key);
    }

    if (key === 'Enter') {
        calculate();
    }

    if (key === 'Backspace') {
        clearLastInput();
    }

    if (key === 'Escape') {
        clearDisplay();
    }
});
