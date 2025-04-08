document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('site-header');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
        spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : '';
    });
    
    document.addEventListener('click', function(event) {
        if (!menuToggle.contains(event.target) && !navLinks.contains(event.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
    
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(function() {
            cookieConsent.classList.add('active');
        }, 1000);
    }
    
    acceptCookiesBtn.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.classList.remove('active');
    });
    
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = '';
                }
            }
        });
    });
});
