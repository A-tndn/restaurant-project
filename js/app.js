(function () {
    'use strict';

    gsap.registerPlugin(ScrollTrigger);

    // ========== Custom Cursor ==========
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');

    if (cursor && follower && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            followerX += (mouseX - followerX) * 0.08;
            followerY += (mouseY - followerY) * 0.08;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .menu-item, .gallery-card, .tilt-card, .social-icon');
        hoverTargets.forEach((el) => {
            el.addEventListener('mouseenter', () => follower.classList.add('hover'));
            el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
        });
    }

    // ========== Preloader ==========
    const preloader = document.getElementById('preloader');
    const preloaderChars = document.querySelectorAll('.preloader-char');
    const preloaderLine = document.querySelector('.preloader-line');
    const preloaderTagline = document.querySelector('.preloader-tagline');

    const preloaderTL = gsap.timeline({
        onComplete: () => {
            gsap.to(preloader, {
                yPercent: -100,
                duration: 1,
                ease: 'power4.inOut',
                onComplete: () => {
                    preloader.style.display = 'none';
                    initHeroAnimations();
                },
            });
        },
    });

    preloaderTL
        .to(preloaderChars, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power3.out',
        })
        .to(preloaderLine, { width: '80px', duration: 0.8, ease: 'power2.out' }, '-=0.2')
        .to(preloaderTagline, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .to({}, { duration: 0.5 });

    // ========== Hero Animations ==========
    function initHeroAnimations() {
        const heroTL = gsap.timeline();

        heroTL
            .from('.hero-badge', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' })
            .from('.hero-line', {
                y: '100%',
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power4.out',
            }, '-=0.4')
            .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
            .to('.hero-buttons', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
            .to('.scroll-indicator', { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.3');

        // Hero parallax
        gsap.to('.hero-bg-img', {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });
    }

    // ========== Navbar Scroll ==========
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========== Hamburger Menu ==========
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';

        if (mobileMenu.classList.contains('active')) {
            gsap.from('.mobile-menu-links a', {
                opacity: 0,
                y: 30,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power3.out',
                delay: 0.2,
            });
        }
    });

    mobileMenuLinks.forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========== Section Animations ==========

    // Split text reveal
    document.querySelectorAll('.split-text').forEach((el) => {
        gsap.from(el, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
        });
    });

    // Fade up elements
    document.querySelectorAll('.fade-up').forEach((el, i) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.05,
            scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none',
            },
        });
    });

    // Gold line draw
    document.querySelectorAll('.gold-line').forEach((el) => {
        gsap.to(el, {
            scaleX: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
        });
    });

    // Image reveal
    document.querySelectorAll('.reveal-image').forEach((el) => {
        ScrollTrigger.create({
            trigger: el,
            start: 'top 80%',
            onEnter: () => el.classList.add('revealed'),
        });
    });

    // ========== Counter Animation ==========
    document.querySelectorAll('.stat-num').forEach((el) => {
        const target = parseFloat(el.dataset.target);
        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(el, {
                    innerText: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { innerText: 1 },
                    onUpdate: function () {
                        el.textContent = Math.round(parseFloat(el.textContent));
                    },
                });
            },
            once: true,
        });
    });

    // ========== Menu Tabs ==========
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    menuTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            closeReveal();
            const category = tab.dataset.category;

            menuTabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');

            menuCategories.forEach((cat) => {
                cat.classList.remove('active');
                if (cat.dataset.category === category) {
                    cat.classList.add('active');
                    // Stagger animate menu items
                    const items = cat.querySelectorAll('.menu-item');
                    gsap.fromTo(
                        items,
                        { opacity: 0, y: 20 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            stagger: 0.08,
                            ease: 'power3.out',
                        }
                    );
                }
            });
        });
    });

    // Initial menu items animation
    document.querySelectorAll('.menu-category.active .menu-item').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
        });
    });

    // ========== Dish Reveal (Inline per item) ==========
    const dishReveal = document.createElement('div');
    dishReveal.className = 'dish-reveal';
    dishReveal.innerHTML = `
        <div class="dish-reveal-info">
            <p class="dish-reveal-desc"></p>
            <span class="dish-reveal-price"></span>
        </div>
        <div class="dish-reveal-plate">
            <img src="" alt="">
            <div class="plate-shadow"></div>
        </div>`;

    let revealOpen = false;
    let currentRevealItem = null;
    let revealTimeline = null;

    function openReveal(item) {
        const img = item.dataset.img;
        const name = item.querySelector('.menu-item-name').textContent;
        const desc = item.dataset.desc;
        const price = item.querySelector('.menu-item-price').textContent;

        // If open on a different item, close first then reopen
        if (revealOpen && currentRevealItem !== item) {
            closeReveal(() => doOpenReveal(item, img, desc, price, name));
            return;
        }

        doOpenReveal(item, img, desc, price, name);
    }

    function doOpenReveal(item, img, desc, price, name) {
        // Set content
        dishReveal.querySelector('.dish-reveal-desc').textContent = desc;
        dishReveal.querySelector('.dish-reveal-price').textContent = price;
        dishReveal.querySelector('img').src = img;
        dishReveal.querySelector('img').alt = name;

        // Highlight selected
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        currentRevealItem = item;

        // Insert reveal into the clicked menu item
        item.appendChild(dishReveal);

        // Reset and animate
        gsap.set(dishReveal, { height: 0, opacity: 0, overflow: 'hidden' });
        gsap.set(dishReveal.querySelector('.dish-reveal-plate'), { x: '100%', rotation: 60, opacity: 0 });
        gsap.set(dishReveal.querySelector('.dish-reveal-info'), { opacity: 0, x: -20 });

        revealOpen = true;

        if (revealTimeline) revealTimeline.kill();
        revealTimeline = gsap.timeline();
        revealTimeline
            // Expand the reveal area
            .to(dishReveal, {
                height: 'auto', opacity: 1,
                duration: 0.5, ease: 'power3.out',
                onComplete: () => { dishReveal.style.overflow = 'visible'; },
            })
            // Plate slides in from the right with rotation
            .to(dishReveal.querySelector('.dish-reveal-plate'), {
                x: '0%', rotation: 0, opacity: 1,
                duration: 0.8, ease: 'power3.out',
            }, '-=0.3')
            // Description fades in from left
            .to(dishReveal.querySelector('.dish-reveal-info'), {
                opacity: 1, x: 0,
                duration: 0.5, ease: 'power3.out',
            }, '-=0.5');
    }

    function closeReveal(callback) {
        if (!revealOpen) {
            if (callback) callback();
            return;
        }

        if (revealTimeline) revealTimeline.kill();
        dishReveal.style.overflow = 'hidden';

        revealTimeline = gsap.timeline({
            onComplete: () => {
                if (dishReveal.parentNode) {
                    dishReveal.parentNode.removeChild(dishReveal);
                }
                document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('selected'));
                currentRevealItem = null;
                revealOpen = false;
                if (callback) callback();
            },
        });

        revealTimeline
            .to(dishReveal.querySelector('.dish-reveal-plate'), {
                x: '100%', rotation: 30, opacity: 0,
                duration: 0.4, ease: 'power2.in',
            })
            .to(dishReveal.querySelector('.dish-reveal-info'), {
                opacity: 0, x: -15,
                duration: 0.2, ease: 'power2.in',
            }, '-=0.3')
            .to(dishReveal, {
                height: 0, opacity: 0,
                duration: 0.3, ease: 'power3.inOut',
            }, '-=0.1');
    }

    document.querySelectorAll('.menu-item').forEach((item) => {
        item.addEventListener('click', () => {
            if (currentRevealItem === item && revealOpen) {
                closeReveal();
                return;
            }
            openReveal(item);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && revealOpen) {
            closeReveal();
        }
    });

    // ========== Gallery Horizontal Scroll ==========
    const galleryTrack = document.getElementById('galleryTrack');
    if (galleryTrack) {
        const totalScrollWidth = galleryTrack.scrollWidth - window.innerWidth;

        gsap.to(galleryTrack, {
            x: -totalScrollWidth,
            ease: 'none',
            scrollTrigger: {
                trigger: '.gallery-scroll-wrapper',
                start: 'top 20%',
                end: () => '+=' + totalScrollWidth,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            },
        });

        // Stagger gallery cards
        gsap.from('.gallery-card', {
            opacity: 0,
            y: 60,
            scale: 0.9,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.gallery-scroll-wrapper',
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });
    }

    // ========== Chef Quote Typewriter ==========
    const chefQuote = document.getElementById('chefQuote');
    if (chefQuote) {
        const fullText = chefQuote.textContent;
        chefQuote.textContent = '';

        ScrollTrigger.create({
            trigger: chefQuote,
            start: 'top 80%',
            onEnter: () => {
                let i = 0;
                function type() {
                    if (i < fullText.length) {
                        chefQuote.textContent += fullText.charAt(i);
                        i++;
                        setTimeout(type, 20);
                    }
                }
                type();
            },
            once: true,
        });
    }

    // ========== Testimonial 3D Tilt ==========
    document.querySelectorAll('.tilt-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Testimonial entrance
    ScrollTrigger.create({
        trigger: '.testimonials-track',
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.testimonial-card',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                }
            );
        },
    });

    // ========== Magnetic Buttons ==========
    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });

        // Ripple effect on click
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ========== Reservation Parallax ==========
    gsap.to('.reservation-bg img', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
            trigger: '.reservation',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    });

    // ========== Footer Animations ==========
    gsap.from('.footer-grid > div', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 85%',
            toggleActions: 'play none none none',
        },
    });

    // ========== Reservation Form Submit ==========
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = reservationForm.querySelector('.btn');
            const origText = btn.textContent;
            btn.textContent = 'Message Sent!';
            btn.style.background = '#00BCD4';
            setTimeout(() => {
                btn.textContent = origText;
                btn.style.background = '';
                reservationForm.reset();
            }, 3000);
        });
    }

    // ========== Smooth scroll for anchor links ==========
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
})();
