// EA Castro Landscaping - Interactive Features and Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVIGATION FUNCTIONALITY =====
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== SMOOTH SCROLLING =====
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero scroll arrow functionality
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const nextSection = document.querySelector('.features') || document.querySelector('.services-preview');
            if (nextSection) {
                const offsetTop = nextSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '90px',
            right: '20px',
            maxWidth: '400px',
            padding: '15px 20px',
            borderRadius: '8px',
            boxShadow: '0 5px 25px rgba(0,0,0,0.2)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: getNotificationColor(type),
            color: 'white',
            fontWeight: '500'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            removeNotification(notification);
        });

        // Auto close after 5 seconds
        setTimeout(() => {
            removeNotification(notification);
        }, 5000);
    }

    function removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    function getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || icons.info;
    }

    function getNotificationColor(type) {
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };
        return colors[type] || colors.info;
    }

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .value-card, .faq-item, .contact-card, .service-area-card, .emergency-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        }
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);

    // ===== ENHANCED MOBILE FUNCTIONALITY =====
    
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Add mobile class to body for CSS targeting
    if (isMobile || isTouchDevice) {
        document.body.classList.add('mobile-device');
    }
    
    // Enhanced mobile navigation
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (isTouchDevice) {
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        });
        
        function handleSwipeGesture() {
            const swipeThreshold = 100;
            const swipeDistance = touchEndX - touchStartX;
            
            // Swipe right to open menu (when closed)
            if (swipeDistance > swipeThreshold && !navMenu.classList.contains('active')) {
                navMenu.classList.add('active');
                hamburger.classList.add('active');
            }
            
            // Swipe left to close menu (when open)
            if (swipeDistance < -swipeThreshold && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    }
    
    // ===== ENHANCED PHONE NUMBER FORMATTING =====
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        // Add mobile-friendly attributes
        input.setAttribute('autocomplete', 'tel');
        input.setAttribute('inputmode', 'tel');
        
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 10) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})/, '($1) $2-');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})/, '($1) ');
            }
            
            e.target.value = value;
        });
        
        // Mobile-specific validation
        input.addEventListener('blur', function(e) {
            const value = e.target.value.replace(/\D/g, '');
            if (value.length > 0 && value.length < 10) {
                showFieldError(e.target, 'Please enter a complete phone number');
            }
        });
    });

    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    function updateActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = new URL(link.href).pathname;
            
            if (currentPath === linkPath || 
                (currentPath === '/' && linkPath.includes('index.html')) ||
                (currentPath.includes('index') && linkPath.includes('index.html'))) {
                link.classList.add('active');
            }
        });
    }

    updateActiveNavLink();

    // ===== SERVICE SELECTION HELPER =====
    const servicesSelect = document.getElementById('services');
    if (servicesSelect) {
        // Add helper text for multiple selection
        const helpText = document.createElement('div');
        helpText.className = 'service-select-help';
        helpText.innerHTML = `
            <small style="color: #666; font-style: italic;">
                💡 Tip: Hold Ctrl (Windows) or Cmd (Mac) and click to select multiple services
            </small>
        `;
        servicesSelect.parentNode.insertBefore(helpText, servicesSelect.nextSibling);
    }

    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.title = 'Back to top';
    
    // Styles for back to top button
    Object.assign(backToTopBtn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        opacity: '0',
        visibility: 'hidden',
        zIndex: '999',
        fontSize: '18px'
    });

    document.body.appendChild(backToTopBtn);

    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    // Back to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect for back to top button
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--primary-light)';
        this.style.transform = 'translateY(-2px)';
    });

    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--primary-color)';
        this.style.transform = 'translateY(0)';
    });

    // ===== LAZY LOADING FOR IMAGES (if any are added later) =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    // Debounce scroll events
    let ticking = false;
    function updateOnScroll() {
        // Any scroll-based updates go here
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // ===== MOBILE-SPECIFIC FORM ENHANCEMENTS =====
    
    // Add mobile-friendly attributes to form inputs
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.setAttribute('autocomplete', 'email');
        input.setAttribute('inputmode', 'email');
    });
    
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(input => {
        const name = input.name || input.id;
        if (name.includes('name')) {
            input.setAttribute('autocomplete', 'name');
        } else if (name.includes('address')) {
            input.setAttribute('autocomplete', 'address-line1');
        }
    });
    
    // Enhanced mobile form validation
    if (contactForm) {
        // Prevent zoom on focus for iOS
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                if (isMobile) {
                    // Temporarily disable zoom
                    const viewport = document.querySelector('meta[name="viewport"]');
                    if (viewport) {
                        const content = viewport.content;
                        viewport.content = content + ', user-scalable=no';
                        setTimeout(() => {
                            viewport.content = content;
                        }, 1000);
                    }
                }
            });
        });
        
        // Mobile-friendly multi-select helper
        const multiSelect = contactForm.querySelector('select[multiple]');
        if (multiSelect && isTouchDevice) {
            // Create mobile-friendly multi-select alternative
            const wrapper = document.createElement('div');
            wrapper.className = 'mobile-multiselect';
            wrapper.innerHTML = '<p><strong>Select Services:</strong></p>';
            
            Array.from(multiSelect.options).forEach(option => {
                const checkboxWrapper = document.createElement('label');
                checkboxWrapper.className = 'mobile-checkbox-item';
                checkboxWrapper.innerHTML = `
                    <input type="checkbox" value="${option.value}" name="services-mobile">
                    <span>${option.textContent}</span>
                `;
                wrapper.appendChild(checkboxWrapper);
            });
            
            multiSelect.style.display = 'none';
            multiSelect.parentNode.insertBefore(wrapper, multiSelect.nextSibling);
            
            // Sync checkbox values with original select
            wrapper.addEventListener('change', function(e) {
                if (e.target.type === 'checkbox') {
                    const option = multiSelect.querySelector(`option[value="${e.target.value}"]`);
                    if (option) {
                        option.selected = e.target.checked;
                    }
                }
            });
        }
    }
    
    // ===== ENHANCED ACCESSIBILITY =====
    // Keyboard navigation for mobile menu
    hamburger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });

    // Focus trap for mobile menu when open
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.focus();
        }
    });
    
    // Enhanced focus management for mobile
    if (isTouchDevice) {
        // Remove outline on touch but keep for keyboard navigation
        document.addEventListener('touchstart', function() {
            document.body.classList.add('using-touch');
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.remove('using-touch');
            }
        });
    }

    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // In production, you might want to send this to a logging service
    });

    // ===== CONSOLE MESSAGE =====
    console.log(`
    🌱 EA Castro Landscaping Website
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Professional landscaping services in Huntington Station, NY
    
    Website features:
    ✅ Responsive design
    ✅ Smooth scrolling
    ✅ Interactive contact form
    ✅ Mobile-friendly navigation
    ✅ Accessibility features
    
    Contact: (555) 123-4567
    Email: info@eacastrolandscaping.com
    `);
});

// ===== UTILITY FUNCTIONS =====
// Format currency (for future pricing features)
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Format phone number
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

// Get business hours (for future features)
function getBusinessHours() {
    return {
        monday: { open: '07:00', close: '18:00' },
        tuesday: { open: '07:00', close: '18:00' },
        wednesday: { open: '07:00', close: '18:00' },
        thursday: { open: '07:00', close: '18:00' },
        friday: { open: '07:00', close: '18:00' },
        saturday: { open: '08:00', close: '16:00' },
        sunday: { closed: true }
    };
}

// Check if business is currently open
function isBusinessOpen() {
    const now = new Date();
    const currentDay = now.toLocaleLowerCase().substring(0, 3) + 
                      now.toLocaleLowerCase().substring(3);
    const currentTime = now.toTimeString().substring(0, 5);
    
    const hours = getBusinessHours();
    const todayHours = hours[currentDay];
    
    if (todayHours && !todayHours.closed) {
        return currentTime >= todayHours.open && currentTime <= todayHours.close;
    }
    
    return false;
}

// ===== MODAL FUNCTIONALITY =====

// Get modal elements
const callModal = document.getElementById('callModal');

// Modal functions
function openCallModal() {
    if (callModal) {
        callModal.style.display = 'flex';
        callModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Close modal events

if (callModal) {
    const callClose = document.getElementById('callModalClose');
    const closeCallBtn = document.getElementById('closeCallModal');
    
    if (callClose) {
        callClose.addEventListener('click', () => closeModal(callModal));
    }
    
    if (closeCallBtn) {
        closeCallBtn.addEventListener('click', () => closeModal(callModal));
    }
    
    // Close on backdrop click
    callModal.addEventListener('click', (e) => {
        if (e.target === callModal) {
            closeModal(callModal);
        }
    });
}

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal(callModal);
    }
});

// Make modal functions globally available
window.openCallModal = openCallModal;