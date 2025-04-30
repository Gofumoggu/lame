document.getElementById('calculate-btn').addEventListener('click', calculateBMI);

function calculateBMI() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    
    if (isNaN(height) || isNaN(weight)) {
        alert('Please enter valid height and weight values');
        return;
    }
    
    if (height <= 0 || weight <= 0) {
        alert('Height and weight must be positive values');
        return;
    }
    
    // Convert height from cm to meters
    const heightInMeters = height / 100;
    
    // Calculate BMI: weight (kg) / (height (m) ^ 2)
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Display BMI with 1 decimal place
    bmiValue.textContent = bmi.toFixed(1);
    
    // Determine BMI category
    let category;
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 25) {
        category = 'Normal weight';
    } else if (bmi < 30) {
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }
    
    bmiCategory.textContent = category;
    
    // Change category color based on BMI
    if (bmi < 18.5) {
        bmiCategory.style.color = '#3498db'; // Blue for underweight
    } else if (bmi < 25) {
        bmiCategory.style.color = '#2ecc71'; // Green for normal
    } else if (bmi < 30) {
        bmiCategory.style.color = '#f39c12'; // Orange for overweight
    } else {
        bmiCategory.style.color = '#e74c3c'; // Red for obesity
    }
}