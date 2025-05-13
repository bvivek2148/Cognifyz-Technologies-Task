document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.querySelector('.modal-caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const backBtn = document.querySelector('.back-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentImageIndex = 0;
    let filteredItems = [];

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            
            document.querySelectorAll('.gallery-item').forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Like functionality
    document.querySelectorAll('.fa-heart').forEach(heart => {
        heart.addEventListener('click', (e) => {
            e.stopPropagation();
            heart.classList.toggle('active');
            if (heart.classList.contains('active')) {
                heart.style.color = '#e74c3c';
            } else {
                heart.style.color = 'white';
            }
        });
    });

    // Modal navigation
    function updateModal(index) {
        const items = document.querySelectorAll('.gallery-item:not([style*="display: none"])');
        filteredItems = Array.from(items);
        currentImageIndex = index;
        
        const item = filteredItems[index];
        modalImg.src = item.querySelector('img').src;
        modalCaption.querySelector('h3').textContent = item.querySelector('h3').textContent;
        modalCaption.querySelector('p').textContent = item.querySelector('p').textContent;
    }

    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.querySelector('.fa-expand').addEventListener('click', (e) => {
            e.stopPropagation();
            modal.style.display = 'block';
            updateModal(index);
        });
    });

    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + filteredItems.length) % filteredItems.length;
        updateModal(currentImageIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % filteredItems.length;
        updateModal(currentImageIndex);
    });

    // Close modal
    [closeBtn, modal].forEach(element => {
        element.addEventListener('click', (e) => {
            if (e.target === element) {
                modal.style.display = 'none';
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            switch(e.key) {
                case 'ArrowLeft':
                    prevBtn.click();
                    break;
                case 'ArrowRight':
                    nextBtn.click();
                    break;
                case 'Escape':
                    modal.style.display = 'none';
                    break;
            }
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    modal.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextBtn.click();
            } else {
                prevBtn.click();
            }
        }
    }
});

// Add at the beginning of your script
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const favoritesBtn = document.querySelector('.favorites-btn');
const favoritesCount = document.querySelector('.favorites-count');

// Update favorites count
function updateFavoritesCount() {
    favoritesCount.textContent = favorites.length;
}

// Toggle favorite status
function toggleFavorite(imageId, heartIcon) {
    const index = favorites.indexOf(imageId);
    if (index === -1) {
        favorites.push(imageId);
        heartIcon.classList.add('favorited');
    } else {
        favorites.splice(index, 1);
        heartIcon.classList.remove('favorited');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCount();
}

// Initialize favorites
document.addEventListener('DOMContentLoaded', () => {
    updateFavoritesCount();
    
    // Add click handler for favorites button
    favoritesBtn.addEventListener('click', () => {
        favoritesBtn.classList.toggle('active');
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            if (favoritesBtn.classList.contains('active')) {
                if (!favorites.includes(item.dataset.id)) {
                    item.style.display = 'none';
                }
            } else {
                item.style.display = 'block';
            }
        });
    });

    // Add click handlers for heart icons
    document.querySelectorAll('.fa-heart').forEach(heart => {
        const galleryItem = heart.closest('.gallery-item');
        const imageId = galleryItem.dataset.id;
        
        if (favorites.includes(imageId)) {
            heart.classList.add('favorited');
        }

        heart.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(imageId, heart);
        });
    });
});