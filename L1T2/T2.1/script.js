
const colorPairs = [
    { color: '#FF6B6B', name: 'Coral Red' },
    { color: '#4ECDC4', name: 'Turquoise' },
    { color: '#45B7D1', name: 'Sky Blue' },
    { color: '#96CEB4', name: 'Sage Green' },
    { color: '#FFEEAD', name: 'Soft Yellow' }
];

let clickCount = 0;

function createRippleEffect(button, color) {
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.backgroundColor = color;
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.opacity = '0.4';

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

function changeColor() {
    const button = document.querySelector('.button');
    const randomPair = colorPairs[Math.floor(Math.random() * colorPairs.length)];
    
  
    button.style.transform = 'scale(1.1)';
    createRippleEffect(button, randomPair.color);
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);

    button.style.backgroundColor = randomPair.color;
    button.textContent = `I'm ${randomPair.name}!`;
    
    clickCount++;
    
  
    if (clickCount % 5 === 0) {
        button.style.boxShadow = `0 0 30px ${randomPair.color}`;
        button.textContent = '✨ Special Effect! ✨';
        
        setTimeout(() => {
            button.style.boxShadow = 'none';
            button.textContent = 'Click Again!';
        }, 1000);
    }
}


const style = document.createElement('style');
style.textContent = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
.button {
    position: relative;
    overflow: hidden;
}
`;
document.head.appendChild(style);