let calculationHistory = [];

function calculate(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    
    if (isNaN(num1) || isNaN(num2)) {
        showNotification('Please enter valid numbers! 🤔');
        return;
    }
    
    let result;
    let symbol;
    
    switch(operation) {
        case 'add':
            result = num1 + num2;
            symbol = '+';
            break;
        case 'subtract':
            result = num1 - num2;
            symbol = '-';
            break;
        case 'multiply':
            result = num1 * num2;
            symbol = '×';
            break;
        case 'divide':
            if (num2 === 0) {
                showNotification('Cannot divide by zero! 🚫');
                return;
            }
            result = num1 / num2;
            symbol = '÷';
            break;
        case 'power':
            result = Math.pow(num1, num2);
            symbol = '^';
            break;
    }

  
    result = Number(result.toFixed(4));
    
    
    document.getElementById('result').textContent = result;
    
  
    addToHistory(num1, num2, symbol, result);
    
  
    showSuccessAnimation();
}

function addToHistory(num1, num2, symbol, result) {
    const calculation = `${num1} ${symbol} ${num2} = ${result}`;
    calculationHistory.unshift(calculation);
    
   
    if (calculationHistory.length > 5) {
        calculationHistory.pop();
    }
    
   
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyDiv = document.getElementById('history');
    if (historyDiv) {
        historyDiv.innerHTML = '<h4>Recent Calculations:</h4>' + 
            calculationHistory.map(calc => `<div class="history-item">${calc}</div>`).join('');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

function showSuccessAnimation() {
    const result = document.getElementById('result');
    result.classList.add('highlight');
    setTimeout(() => result.classList.remove('highlight'), 500);
}

function clearInputs() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('result').textContent = '0';
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        calculate('add');
    } else if (e.key === 'Escape') {
        clearInputs();
    }
});


function add() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    
    if (isNaN(num1) || isNaN(num2)) {
        alert('Please enter valid numbers');
        return;
    }
    
    const result = num1 + num2;
    document.getElementById('result').textContent = result;
}