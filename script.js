document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MOBILE MENU TOGGLE
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'bi bi-x-lg';
            } else {
                icon.className = 'bi bi-list';
            }
        });
        
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'bi bi-list';
            });
        });
    }

    // ==========================================
    // 2. NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 3. ABOUT ME TABS
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Deactivate all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Activate clicked button
            btn.classList.add('active');
            
            // Hide all tab panels
            document.querySelectorAll('.tab-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Show corresponding panel
            const activePanel = document.getElementById(`tab-${tabId}`);
            if (activePanel) {
                activePanel.classList.add('active');
            }
        });
    });

    // ==========================================
    // 4. INTERACTIVE CANVAS PARTICLES
    // ==========================================
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        const maxParticles = 65; // Balanced for good performance
        
        // Mouse coordinate tracking
        let mouse = {
            x: null,
            y: null,
            radius: 130
        };
        
        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });
        
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Resize canvas to fit screen
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle Class
        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            
            // Draw particle
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            
            // Update particle state (movement & boundary checks)
            update() {
                // Bounce on boundaries
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                
                // Mouse interaction
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius + this.size) {
                    if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                        this.x += 2;
                    }
                    if (mouse.x > this.x && this.x > this.size * 10) {
                        this.x -= 2;
                    }
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                        this.y += 2;
                    }
                    if (mouse.y > this.y && this.y > this.size * 10) {
                        this.y -= 2;
                    }
                }
                
                // Move particle
                this.x += this.directionX;
                this.y += this.directionY;
                
                this.draw();
            }
        }

        // Initialize particles
        function initParticles() {
            particlesArray = [];
            for (let i = 0; i < maxParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((window.innerWidth - size * 2) - size * 2)) + size * 2;
                let y = (Math.random() * ((window.innerHeight - size * 2) - size * 2)) + size * 2;
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                let color = Math.random() > 0.5 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(139, 92, 246, 0.3)';
                
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        // Draw connections between nearby particles
        function connectParticles() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let dx = particlesArray[a].x - particlesArray[b].x;
                    let dy = particlesArray[a].y - particlesArray[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 140) {
                        opacityValue = 1 - (distance / 140);
                        // Gradient connection lines
                        ctx.strokeStyle = `rgba(6, 182, 212, ${opacityValue * 0.12})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Animation Loop
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connectParticles();
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    // ==========================================
    // 5. TERMINAL TYPEWRITER EFFECT
    // ==========================================
    const consoleTextElement = document.querySelector('.typewriter-console');
    if (consoleTextElement) {
        const textOptions = [
            'mvn clean install -DskipTests',
            'ping -c 3 api.rahim.dev',
            'git commit -m "feat: optimize database indices"',
            'docker compose up -d --build',
            'curl -X GET https://api.rahim.dev/health'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeWriter() {
            const currentString = textOptions[textIndex];
            
            if (isDeleting) {
                consoleTextElement.textContent = currentString.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // Faster deletion
            } else {
                consoleTextElement.textContent = currentString.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100; // Normal typing
            }
            
            if (!isDeleting && charIndex === currentString.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at the end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textOptions.length;
                typingSpeed = 600; // Pause before typing next word
            }
            
            setTimeout(typeWriter, typingSpeed);
        }
        
        setTimeout(typeWriter, 1000);
    }

    // ==========================================
    // 6. SKILL BARS SCROLL LOADER
    // ==========================================
    const skillProgressBars = document.querySelectorAll('.skill-bar-progress');
    if (skillProgressBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const finalWidth = progressBar.getAttribute('data-width');
                    progressBar.style.width = finalWidth;
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.1 });
        
        skillProgressBars.forEach(bar => {
            skillsObserver.observe(bar);
        });
    }

    // ==========================================
    // 7. ACTIVE NAVIGATION LINK HIGH LIGHTER
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    if (sections.length > 0 && navItems.length > 0) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeSectionId = entry.target.getAttribute('id');
                    
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${activeSectionId}`) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.45 }); // Trigger when section occupies 45% of viewport
        
        sections.forEach(section => {
            navObserver.observe(section);
        });
    }

    // ==========================================
    // 8. PROJECTS CATEGORY FILTER
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active filter button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'flex';
                        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
                    } else {
                        const cardCategory = card.getAttribute('data-category');
                        if (cardCategory === filterValue) {
                            card.style.display = 'flex';
                            setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.95)';
                            setTimeout(() => { card.style.display = 'none'; }, 300);
                        }
                    }
                });
            });
        });
    }

    // ==========================================
    // 9. CONTACT FORM INTERACTIVE FEEDBACK
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;
            
            // Perform basic sanity checks
            if (!name || !email || !subject || !message) {
                alert('Please fill in all details before transmitting.');
                return;
            }
            
            // Simulate API POST request
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Transmitting...';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="bi bi-check2-all"></i> Message Transmitted!';
                submitBtn.style.background = 'var(--accent)';
                submitBtn.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
                
                alert(`API Connection Established!\nThank you ${name}, your message regarding "${subject}" has been queued. I will get back to you at ${email} shortly.`);
                
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalContent;
                    submitBtn.style.background = '';
                    submitBtn.style.boxShadow = '';
                }, 3000);
            }, 1500);
        });
    }
});
