// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Music Player Functionality
    let isPlaying = false;
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');

    // Play button
    playBtn.addEventListener('click', function() {
        isPlaying = true;
        showNotification('🎵 음악이 재생됩니다');
        playBtn.style.opacity = '0.6';
        pauseBtn.style.opacity = '1';
    });

    // Pause button
    pauseBtn.addEventListener('click', function() {
        isPlaying = false;
        showNotification('⏸️ 음악이 일시정지됩니다');
        playBtn.style.opacity = '1';
        pauseBtn.style.opacity = '0.6';
    });

    // Stop button
    stopBtn.addEventListener('click', function() {
        isPlaying = false;
        showNotification('⏹️ 음악이 정지됩니다');
        playBtn.style.opacity = '1';
        pauseBtn.style.opacity = '0.6';
    });

    // Volume slider
    volumeSlider.addEventListener('input', function() {
        volumeValue.textContent = this.value;
    });

    // Visitor counter animation
    let visitorCount = 1234;
    const visitorElement = document.getElementById('visitor-count');
    
    // Increment visitor count on page load
    setTimeout(function() {
        visitorCount++;
        animateCounter(visitorElement, 1234, visitorCount, 1000);
    }, 500);

    // Guestbook functionality
    const guestName = document.getElementById('guestName');
    const guestMessage = document.getElementById('guestMessage');
    const submitGuest = document.getElementById('submitGuest');
    const guestbookList = document.getElementById('guestbook-list');

    submitGuest.addEventListener('click', function() {
        const name = guestName.value.trim();
        const message = guestMessage.value.trim();

        if (name === '' || message === '') {
            showNotification('⚠️ 이름과 메시지를 모두 입력해주세요', 'error');
            return;
        }

        // Create new guest entry
        const guestEntry = document.createElement('div');
        guestEntry.className = 'guest-entry';
        
        const currentDate = new Date().toISOString().split('T')[0];
        
        guestEntry.innerHTML = `
            <div class="guest-header">
                <strong>${escapeHtml(name)}</strong>
                <span class="date">${currentDate}</span>
            </div>
            <p>${escapeHtml(message)}</p>
        `;

        // Insert at the beginning of the list
        guestbookList.insertBefore(guestEntry, guestbookList.firstChild);

        // Clear form
        guestName.value = '';
        guestMessage.value = '';

        // Show success message
        showNotification('✅ 방명록이 작성되었습니다!', 'success');

        // Increment visitor count
        visitorCount++;
        animateCounter(visitorElement, parseInt(visitorElement.textContent), visitorCount, 500);
    });

    // Allow Enter key in name field to move to message
    guestName.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            guestMessage.focus();
        }
    });

    // Photo gallery hover effects
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            const emoji = this.querySelector('.photo-placeholder').textContent;
            const title = this.querySelector('p').textContent;
            showNotification(`${emoji} ${title} 사진을 선택했습니다`);
        });
    });

    // Add sparkle effect on header
    const header = document.querySelector('.header h1');
    setInterval(function() {
        header.style.textShadow = `
            ${Math.random() * 4}px ${Math.random() * 4}px ${Math.random() * 10}px rgba(255, 255, 255, 0.8),
            ${Math.random() * -4}px ${Math.random() * -4}px ${Math.random() * 10}px rgba(255, 255, 255, 0.6)
        `;
    }, 2000);

    // Helper Functions

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Animate counter
    function animateCounter(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(function() {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.round(current);
        }, 16);
    }

    // Show notification
    function showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style based on type
        const colors = {
            'info': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'success': 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
            'error': 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(function() {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Welcome message
    setTimeout(function() {
        showNotification('🎉 미니홈피에 오신 것을 환영합니다!', 'success');
    }, 500);

    // Add some interactivity to sections - smooth scroll reveal
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(function() {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    console.log('🎉 미니홈피가 준비되었습니다!');
});
