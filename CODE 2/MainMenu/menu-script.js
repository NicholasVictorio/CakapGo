// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    handleResize();
});

// Handle window resize to maintain aspect ratios
window.addEventListener('resize', handleResize);

function initializeApp() {
    // Add loading animation to main content
    document.querySelector('.main-content').classList.add('loading');
    
    // Initialize progress bars with 15% as shown in the image
    initializeProgressBars();
    
    // Add click animations to feature cards
    addFeatureCardAnimations();
    
    // Add profile icon functionality
    addProfileIconFunctionality();
}

function handleResize() {
    // Ensure proper scaling on window resize
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        // Force reflow to maintain aspect ratio
        card.style.height = 'auto';
    });
}

function initializeProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    // Set initial progress to 15% as shown in the image
    const initialProgress = 15;
    
    // Animate progress bars on load
    setTimeout(() => {
        progressFills.forEach(fill => {
            fill.style.width = initialProgress + '%';
            fill.setAttribute('data-progress', initialProgress);
        });
        
        // Update percentage text
        const percentageElements = document.querySelectorAll('.progress-percentage');
        percentageElements.forEach(element => {
            element.textContent = initialProgress + '%';
        });
    }, 500);
}

function addFeatureCardAnimations() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'translateY(-2px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }, 150);
        });
    });
}

function addProfileIconFunctionality() {
    const profileIcon = document.querySelector('.profile-icon');
    
    profileIcon.addEventListener('click', function() {
        showProfileMenu();
    });
}

function openFeature(featureType) {
    // Show loading state
    showNotification(`Membuka ${getFeatureName(featureType)}...`);
    
    // Simulate navigation delay
    setTimeout(() => {
        switch(featureType) {
            case 'translate':
                openTranslateFeature();
                break;
            case 'speaking':
                openSpeakingFeature();
                break;
            case 'dialogue':
                openDialogueFeature();
                break;
        }
    }, 1000);
}

function getFeatureName(featureType) {
    const names = {
        'translate': 'Latihan Mengartikan Kata & Kalimat',
        'speaking': 'Latihan Bercakap',
        'dialogue': 'Latihan Dialog AI'
    };
    return names[featureType] || 'Fitur';
}

function openTranslateFeature() {
    updateProgress('words', 20);
    window.location.href = '../WordLesson/word-lesson.html';
}

function openSpeakingFeature() {
    updateProgress('speaking', 20);
    window.location.href = '../SpeakingLesson/speaking-lesson.html';
}

function openDialogueFeature() {
    updateProgress('AI convo', 20);
    window.location.href = '../AIConvo/aiConvo-lesson.html';
}

function updateProgress(category, newProgress) {
    const progressItems = document.querySelectorAll('.progress-item');
    
    progressItems.forEach(item => {
        const label = item.querySelector('.progress-label').textContent;
        if (label === category) {
            const progressFill = item.querySelector('.progress-fill');
            const progressPercentage = item.querySelector('.progress-percentage');
            
            progressFill.style.width = newProgress + '%';
            progressFill.setAttribute('data-progress', newProgress);
            progressPercentage.textContent = newProgress + '%';
        }
    });
}

function showProfileMenu() {
    const menu = createProfileMenu();
    document.body.appendChild(menu);
    
    // Remove menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function removeMenu(e) {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', removeMenu);
            }
        });
    }, 100);
}

function createProfileMenu() {
    const menu = document.createElement('div');
    menu.className = 'profile-menu';
    menu.style.cssText = `
        position: fixed;
        top: 12vh;
        right: 4vw;
        background: white;
        border-radius: 10px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        padding: 15px;
        z-index: 1000;
        min-width: 200px;
        font-size: clamp(0.9rem, 1vw, 1.1rem);
    `;
    
    menu.innerHTML = `
        <div style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">User Profile</div>
        <div style="padding: 10px; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background=''" onclick="showNotification('Pengaturan akan segera tersedia!')">⚙️ Pengaturan</div>
        <div style="padding: 10px; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background=''" onclick="showNotification('Statistik akan segera tersedia!')">📊 Statistik</div>
        <div style="padding: 10px; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background=''" onclick="showNotification('Logout berhasil!')">🚪 Logout</div>
    `;
    
    return menu;
}

function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 2vh;
        right: 2vw;
        background: linear-gradient(135deg, #2196F3, #21CBF3);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        font-weight: 500;
        font-size: clamp(0.9rem, 1vw, 1.1rem);
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, 3000);
}

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open menus
        const profileMenu = document.querySelector('.profile-menu');
        if (profileMenu) {
            profileMenu.remove();
        }
    }
});

// Performance optimization: Lazy load animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe feature cards for animation
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// Maintain aspect ratios on orientation change
window.addEventListener('orientationchange', function() {
    setTimeout(handleResize, 100);
});