document.addEventListener('DOMContentLoaded', () => {
   
    const heartIcons = document.querySelectorAll('.fa-heart');
    heartIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            icon.classList.toggle('has-text-danger');
            icon.classList.toggle('fas');
            icon.classList.toggle('far');
        });
    });

    
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const cardTitle = e.target.closest('.card').querySelector('.title').textContent;
            alert(`You clicked on ${cardTitle}!`);
        });
    });

    
    const cards = document.querySelectorAll('.custom-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});