// Truth Table Generator
document.addEventListener('DOMContentLoaded', () => {
    generateTable(); // Generate initial table
});

function generateTable() {
    const numVars = parseInt(document.getElementById('numVars').value);
    const expression = document.getElementById('expression').value.trim();
    const tableContainer = document.getElementById('tableContainer');
    
    // Clear previous table
    tableContainer.innerHTML = '';
    
    // Generate truth table
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    
    // Create header row
    const headerRow = document.createElement('tr');
    for (let i = 0; i < numVars; i++) {
        const th = document.createElement('th');
        th.textContent = String.fromCharCode(65 + i); // A, B, C, etc.
        headerRow.appendChild(th);
    }
    
    // Add result column if expression is provided
    if (expression) {
        const resultTh = document.createElement('th');
        resultTh.textContent = 'Result';
        headerRow.appendChild(resultTh);
    }
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Generate all possible combinations
    const combinations = generateCombinations(numVars);
    
    // Create table rows
    combinations.forEach(combination => {
        const row = document.createElement('tr');
        
        // Add variable values
        combination.forEach(value => {
            const td = document.createElement('td');
            td.textContent = value ? '1' : '0';
            row.appendChild(td);
        });
        
        // Add result if expression is provided
        if (expression) {
            const resultTd = document.createElement('td');
            const result = evaluateExpression(expression, combination);
            resultTd.textContent = result ? '1' : '0';
            resultTd.className = result ? 'true' : 'false';
            row.appendChild(resultTd);
        }
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    tableContainer.appendChild(table);
}

function clearTable() {
    document.getElementById('tableContainer').innerHTML = '';
    document.getElementById('expression').value = '';
}

function generateCombinations(numVars) {
    const combinations = [];
    const totalCombinations = Math.pow(2, numVars);
    
    for (let i = 0; i < totalCombinations; i++) {
        const combination = [];
        for (let j = 0; j < numVars; j++) {
            combination.push((i & (1 << (numVars - 1 - j))) !== 0);
        }
        combinations.push(combination);
    }
    
    return combinations;
}

function evaluateExpression(expression, values) {
    // Create a mapping of variables to their values
    const variables = {};
    for (let i = 0; i < values.length; i++) {
        variables[String.fromCharCode(65 + i)] = values[i];
    }
    
    // Replace variables with their values
    let expr = expression.toUpperCase();
    for (const [varName, value] of Object.entries(variables)) {
        expr = expr.replace(new RegExp(varName, 'g'), value ? '1' : '0');
    }
    
    // Replace logical operators with JavaScript operators
    expr = expr.replace(/AND/g, '&&')
               .replace(/OR/g, '||')
               .replace(/XOR/g, '^')
               .replace(/NOT/g, '!');
    
    try {
        // Evaluate the expression
        return eval(expr) ? true : false;
    } catch (error) {
        console.error('Error evaluating expression:', error);
        return false;
    }
}
