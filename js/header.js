// Header JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('mainHeader');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky header on scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Toggle mobile menu
    function toggleMobileMenu() {
        hamburgerBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    // Close mobile menu when clicking on a link
    function closeMobileMenu() {
        hamburgerBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Smooth scroll to section
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking
            closeMobileMenu();
        }
    }

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    
    // Add smooth scroll to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !hamburgerBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close mobile menu on window resize (if resizing to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});

