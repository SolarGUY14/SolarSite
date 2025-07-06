// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Tab functionality for experience section
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const tabName = button.getAttribute('data-tab');
        const targetContent = document.getElementById(tabName);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .experience-item, .education-item, .hobby-item, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form submission
const scriptURL = 'https://script.google.com/macros/s/AKfycbwfEBETMuaYjj2ywsJLz6GoqDA0Nbd6NBhXi6KWk7jmYdcV-daF4Rs4e5GO3wcPH3vt/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        fetch(scriptURL, { 
            method: 'POST', 
            body: new FormData(form)
        })
        .then(response => {
            msg.innerHTML = "Message sent successfully!";
            msg.className = 'form-message success';
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Clear message after 5 seconds
            setTimeout(() => {
                msg.innerHTML = "";
                msg.className = 'form-message';
            }, 5000);
        })
        .catch(error => {
            console.error('Error!', error.message);
            msg.innerHTML = "Failed to send message. Please try again.";
            msg.className = 'form-message error';
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Clear message after 5 seconds
            setTimeout(() => {
                msg.innerHTML = "";
                msg.className = 'form-message';
            }, 5000);
        });
    });
}

// Typing animation for hero title with proper HTML handling
function typeWriter(element, text, speed = 100) {
    // Store the original HTML content
    const originalHTML = element.innerHTML;
    
    // Create a temporary element to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;
    
    // Extract text content while preserving HTML structure
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    // Clear the element
    element.innerHTML = '';
    
    let i = 0;
    
    function type() {
        if (i < textContent.length) {
            // Reconstruct the HTML with the typed text
            const typedText = textContent.substring(0, i + 1);
            
            // Find the span element in the original HTML
            const spanMatch = originalHTML.match(/<span[^>]*class="highlight"[^>]*>([^<]*)<\/span>/);
            
            if (spanMatch) {
                const spanText = spanMatch[1];
                const beforeSpan = textContent.substring(0, textContent.indexOf(spanText));
                const afterSpan = textContent.substring(textContent.indexOf(spanText) + spanText.length);
                
                if (typedText.length <= beforeSpan.length) {
                    // Still typing before the span
                    element.innerHTML = typedText;
                } else if (typedText.length <= beforeSpan.length + spanText.length) {
                    // Typing within the span
                    const spanTypedText = typedText.substring(beforeSpan.length);
                    element.innerHTML = beforeSpan + '<span class="highlight">' + spanTypedText + '</span>';
                } else {
                    // Typing after the span
                    const afterSpanTypedText = typedText.substring(beforeSpan.length + spanText.length);
                    element.innerHTML = beforeSpan + '<span class="highlight">' + spanText + '</span>' + afterSpanTypedText;
                }
            } else {
                // No span found, just type normally
                element.innerHTML = typedText;
            }
            
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Start typing animation after a short delay
        setTimeout(() => {
            typeWriter(heroTitle, heroTitle.innerHTML, 50);
        }, 500);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Matrix-style background effect
function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.02';
    document.body.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#10b981';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

// Initialize matrix effect
document.addEventListener('DOMContentLoaded', () => {
    createMatrixEffect();
});

// Glitch effect for skill tags
function addGlitchEffect() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.textShadow = '2px 0 #ff0000, -2px 0 #00ff00';
            setTimeout(() => {
                tag.style.textShadow = 'none';
            }, 200);
        });
    });
}

// Initialize glitch effect
document.addEventListener('DOMContentLoaded', () => {
    addGlitchEffect();
});

// Add CSS for error message styling and tech effects
const style = document.createElement('style');
style.textContent = `
    .form-message.error {
        background: #7f1d1d;
        color: #fecaca;
        border: 1px solid #ef4444;
    }
    
    .skill-tag {
        position: relative;
        overflow: hidden;
    }
    
    .skill-tag::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
    }
    
    .skill-tag:hover::before {
        left: 100%;
    }
    
    .project-card {
        position: relative;
        overflow: hidden;
    }
    
    .project-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #10b981, transparent);
        transition: left 0.5s;
    }
    
    .project-card:hover::before {
        left: 100%;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    .nav-logo a {
        animation: pulse 3s ease-in-out infinite;
    }
`;
document.head.appendChild(style); 