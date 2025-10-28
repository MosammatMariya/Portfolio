// Particles.js Configuration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js (full-page background)
    if (document.getElementById('particles-bg')) {
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = window.innerWidth <= 768;
        const count = prefersReduced ? 30 : (isMobile ? 60 : 120);

        particlesJS('particles-bg', {
            particles: {
                number: {
                    value: count,
                    density: { enable: true, value_area: 900 }
                },
                color: { value: "#ffffff" },
                shape: {
                    type: "star",
                    polygon: { nb_sides: 5 }
                },
                opacity: {
                    value: 0.35,
                    random: true,
                    anim: { enable: false }
                },
                size: {
                    value: 6,
                    random: true,
                    anim: { enable: false }
                },
                line_linked: { enable: false },
                move: {
                    enable: !prefersReduced,
                    speed: 0.8,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: !prefersReduced, mode: "bubble" },
                    onclick: { enable: !prefersReduced, mode: "push" },
                    resize: true
                },
                modes: {
                    bubble: { distance: 120, size: 6, duration: 2, opacity: 0.6 },
                    repulse: { distance: 100, duration: 0.4 },
                    push: { particles_nb: 2 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        });
    }

    // Navigation bar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, #navbar a');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide navbar when scrolling down, show when scrolling up
        if (scrollTop > lastScrollTop) {
            // navbar.classList.add('hide');
            navbar.classList.remove('hide');
        } else {
            // navbar.classList.remove('hide');
            navbar.classList.add('hide');
        }
        
        lastScrollTop = scrollTop;
        
        // Highlight current section in navbar
        updateActiveNavLink();
    });

    // Update active navigation link based on current section
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}` || (href && href.slice(1) === current)) {
                link.classList.add('active');
            }
        });
    }

    // Contact form submission with improved handling
    const contactForm = document.getElementById('contactForm');
    const formModal = document.getElementById('formModal');
    const closeModal = document.getElementById('closeModal');
    const submitBtn = document.getElementById('submitBtn');
    const loadingState = document.getElementById('loadingState');
    const successState = document.getElementById('successState');
    const errorState = document.getElementById('errorState');
    const retryBtn = document.getElementById('retryBtn');

    let isSubmitting = false;
    let formData = null;

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // If already submitting, prevent multiple submissions
            if (isSubmitting) return;
            
            // Store form data in case submission is interrupted
            formData = new FormData(this);
            
            // Show modal with loading state
            formModal.classList.add('show');
            loadingState.style.display = 'block';
            successState.style.display = 'none';
            errorState.style.display = 'none';
            
            // Disable submit button and close button
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            closeModal.classList.add('disabled');
            isSubmitting = true;
            
            // Submit the form
            submitFormData();
        });
    }

    // Function to submit form data
    function submitFormData() {
        fetch('https://formsubmit.co/ajax/mariya.mosammat@gmail.com', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Show success state after 1 second (gives time for the loading animation to be seen)
            setTimeout(() => {
                loadingState.style.display = 'none';
                successState.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Re-enable close button
                closeModal.classList.remove('disabled');
                
                // Reset submission state
                isSubmitting = false;
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }, 1000);
        })
        .catch(error => {
            console.error('Error:', error);
            
            // Show error state
            loadingState.style.display = 'none';
            errorState.style.display = 'block';
            
            // Re-enable close button
            closeModal.classList.remove('disabled');
        });
    }

    // Close modal handler
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            // Prevent closing during submission
            if (isSubmitting && this.classList.contains('disabled')) {
                return;
            }
            
            formModal.classList.remove('show');
        });
    }

    // Retry button handler
    if (retryBtn) {
        retryBtn.addEventListener('click', function() {
            if (formData) {
                // Show loading state again
                loadingState.style.display = 'block';
                errorState.style.display = 'none';
                
                // Disable close button again
                closeModal.classList.add('disabled');
                isSubmitting = true;
                
                // Try to submit again
                submitFormData();
            } else {
                // If form data is lost, close modal and let user try again from the form
                formModal.classList.remove('show');
            }
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === formModal) {
            // Prevent closing during submission
            if (isSubmitting) {
                return;
            }
            
            formModal.classList.remove('show');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Collapsible: All Skills categories
    const skillSections = document.querySelectorAll('.skill-category[aria-expanded]');
    skillSections.forEach(section => {
        const header = section.querySelector('.collapsible-header');
        if (!header) return;
        const toggle = () => {
            const expanded = section.getAttribute('aria-expanded') === 'true';
            section.setAttribute('aria-expanded', String(!expanded));
        };
        header.addEventListener('click', toggle);
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });

    // Initial call to set active nav link
    updateActiveNavLink();

    // Scroll Indicator for mobile
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollArrow = document.querySelector('.scroll-arrow');
    
    if (scrollIndicator && window.innerWidth <= 768) {
        let lastScrollTop = 0;
        let isScrollingUp = false;
        
        // Initially hide the scroll indicator
        scrollIndicator.style.opacity = '0';
        
        // Add click functionality
        scrollIndicator.addEventListener('click', function() {
            if (isScrollingUp) {
                // Scroll to top if arrow points up
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Scroll to bottom if arrow points down
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth'
                });
            }
        });
        
        window.addEventListener('scroll', function() {
            // Show the scroll indicator when scrolling starts
            scrollIndicator.style.opacity = '1';
            
            // Calculate scroll percentage
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const scrollPercentage = (scrolled / windowHeight) * 100;
            
            // Update progress circle
            scrollProgress.style.background = 'conic-gradient(var(--primary-color) ' + scrollPercentage + '%, #f0f0f0 ' + scrollPercentage + '%)';
            
            // Determine scroll direction and update arrow
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (currentScrollTop > lastScrollTop) {
                // Scrolling down
                if (isScrollingUp) {
                    scrollArrow.classList.remove('up');
                    isScrollingUp = false;
                }
            } else {
                // Scrolling up
                if (!isScrollingUp) {
                    scrollArrow.classList.add('up');
                    isScrollingUp = true;
                }
            }
            
            lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
            
            // Hide the scroll indicator after 2 seconds of no scrolling
            clearTimeout(window.scrollTimeout);
            window.scrollTimeout = setTimeout(function() {
                scrollIndicator.style.opacity = '0';
            }, 2000);
        });
    } else if (scrollIndicator) {
        // Hide scroll indicator on non-mobile devices
        scrollIndicator.style.display = 'none';
    }

    setTimeout(() => {
        document.querySelector('.name-reveal').classList.add('animated');
    }, 500);

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
        
        updateScrollIndicator();
        
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 200) {
            navbar.classList.remove('hide');
        } else {
            navbar.classList.add('hide');
        }
    });
    
    function updateScrollIndicator() {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        const scrollIndicator = document.querySelector('.scroll-indicator');
        const scrollProgress = document.querySelector('.scroll-progress');
        const scrollArrow = document.querySelector('.scroll-arrow');
        
        if (scrollProgress) {
            scrollProgress.style.background = `conic-gradient(#000 ${scrollPercent}%, #f0f0f0 0%)`;
        }
        
        if (scrollIndicator) {
            if (scrollTop > 200) {
                scrollIndicator.style.opacity = '1';
            } else {
                scrollIndicator.style.opacity = '0';
            }
            
            if (scrollTop > scrollHeight / 2) {
                scrollArrow.classList.add('up');
            } else {
                scrollArrow.classList.remove('up');
            }
        }
    }
    
    const scrollToTopBtn = document.querySelector('.scroll-indicator');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            
            if (scrollTop > scrollHeight / 2) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }
        });
    }

    const altForm = document.getElementById('contact-form');
    if (altForm) altForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = document.querySelector('.submit-btn');
        const formFields = document.querySelectorAll('#contact-form input, #contact-form textarea');
        const formData = {};
        const modal = document.getElementById('modalSubmit');
        const closeBtn = document.querySelector('.close-modal');
        const modalTitle = document.querySelector('.modal-body h3');
        const modalText = document.querySelector('.modal-body p');
        const loadingAnimation = document.getElementById('loadingAnimation');
        const successAnimation = document.getElementById('successAnimation');
        const errorAnimation = document.getElementById('errorAnimation');
        const retryBtn = document.getElementById('retryBtn');
        
        formFields.forEach(field => {
            formData[field.getAttribute('name')] = field.value;
        });
        
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.innerText = 'Sending...';
        
        showModal('loading');
        
        try {
            const response = await fetch('https://formsubmit.co/ajax/mariya.mosammat@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showModal('success');
                document.getElementById('contact-form').reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            showModal('error');
            console.error('Error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.innerText = 'Send Message';
        }
        
        function showModal(state) {
            modal.classList.add('show');
            
            loadingAnimation.style.display = 'none';
            successAnimation.style.display = 'none';
            errorAnimation.style.display = 'none';
            retryBtn.style.display = 'none';
            closeBtn.classList.remove('disabled');
            
            switch(state) {
                case 'loading':
                    modalTitle.textContent = 'Sending Message';
                    modalText.textContent = 'Please wait while we process your message...';
                    loadingAnimation.style.display = 'block';
                    closeBtn.classList.add('disabled');
                    break;
                case 'success':
                    modalTitle.textContent = 'Message Sent';
                    modalText.textContent = 'Your message has been sent successfully. I will get back to you soon!';
                    successAnimation.style.display = 'block';
                    break;
                case 'error':
                    modalTitle.textContent = 'Error';
                    modalText.textContent = 'There was an error sending your message. Please try again or contact me directly.';
                    errorAnimation.style.display = 'block';
                    retryBtn.style.display = 'inline-block';
                    break;
            }
        }
    });

    const closeAlt = document.querySelector('.close-modal');
    if (closeAlt) closeAlt.addEventListener('click', function() {
        if (!this.classList.contains('disabled')) {
            const modal = document.getElementById('modalSubmit');
            if (modal) modal.classList.remove('show');
        }
    });

    const retryAlt = document.getElementById('retryBtn');
    if (retryAlt) retryAlt.addEventListener('click', function() {
        const modal = document.getElementById('modalSubmit');
        if (modal) modal.classList.remove('show');
        const formEl = document.getElementById('contact-form');
        if (formEl) formEl.dispatchEvent(new Event('submit', {bubbles: true}));
    });
});
