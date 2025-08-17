function populateContent(content) {
    // Hero Section
    const studioName = document.querySelector('.studio-name');
    if (studioName) studioName.textContent = content.studio.name;
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.textContent = content.hero.title;
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = content.hero.subtitle;
    
    const heroCta = document.querySelector('.hero .cta-button');
    if (heroCta) heroCta.textContent = content.hero.ctaButton;
    
    // Antumbra Section
    const antumbraTitle = document.querySelector('.antumbra .section-title');
    if (antumbraTitle) antumbraTitle.textContent = content.antumbra.title;
    
    const badges = document.querySelectorAll('.antumbra .badge');
    if (badges.length && content.antumbra.badges) {
        badges.forEach((badge, i) => {
            if (content.antumbra.badges[i]) {
                badge.textContent = content.antumbra.badges[i];
            }
        });
    }
    
    const synopsisTitle = document.querySelector('.synopsis h3');
    if (synopsisTitle) synopsisTitle.textContent = content.antumbra.subtitle;
    
    const synopsisParagraphs = document.querySelectorAll('.synopsis p');
    if (synopsisParagraphs.length && content.antumbra.synopsis) {
        synopsisParagraphs.forEach((p, i) => {
            if (content.antumbra.synopsis[i]) {
                p.textContent = content.antumbra.synopsis[i];
            }
        });
    }
    
    // Stats
    const statItems = document.querySelectorAll('.manga-stats .stat-item');
    if (statItems.length) {
        statItems[0].querySelector('h4').textContent = content.antumbra.stats.chapters;
        statItems[0].querySelector('p').textContent = 'Chapters';
        statItems[1].querySelector('h4').textContent = content.antumbra.stats.acts;
        statItems[1].querySelector('p').textContent = 'Acts Planned';
        statItems[2].querySelector('h4').textContent = content.antumbra.stats.launchYear;
        statItems[2].querySelector('p').textContent = 'Launch Year';
    }
    
    // About Section
    const aboutTitle = document.querySelector('.about .section-title');
    if (aboutTitle) aboutTitle.textContent = content.about.title;
    
    const aboutParagraphs = document.querySelectorAll('.about-text p');
    if (aboutParagraphs.length && content.about.paragraphs) {
        aboutParagraphs.forEach((p, i) => {
            if (content.about.paragraphs[i]) {
                p.textContent = content.about.paragraphs[i];
            }
        });
    }
    
    const aboutStats = document.querySelectorAll('.about-stats .stat');
    if (aboutStats.length) {
        aboutStats[0].querySelector('h3').textContent = content.about.stats.artists;
        aboutStats[0].querySelector('p').textContent = content.about.stats.artistsLabel;
        aboutStats[1].querySelector('h3').textContent = content.about.stats.artworks;
        aboutStats[1].querySelector('p').textContent = content.about.stats.artworksLabel;
        aboutStats[2].querySelector('h3').textContent = content.about.stats.exhibitions;
        aboutStats[2].querySelector('p').textContent = content.about.stats.exhibitionsLabel;
    }
    
    // Artists Section
    const artistsTitle = document.querySelector('.artists .section-title');
    if (artistsTitle) artistsTitle.textContent = content.artists.title;
    
    // Dynamically create artist cards
    const artistsGrid = document.getElementById('artists-grid');
    if (artistsGrid && content.artists.list) {
        artistsGrid.innerHTML = ''; // Clear existing content
        content.artists.list.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.className = 'artist-card';
            artistCard.innerHTML = `
                <div class="artist-image-placeholder"></div>
                <h3>${artist.name}</h3>
                <p class="artist-specialty">${artist.specialty}</p>
                <p class="artist-bio">${artist.bio}</p>
            `;
            artistsGrid.appendChild(artistCard);
        });
    }
    
    // Contact Section
    const contactTitle = document.querySelector('.contact .section-title');
    if (contactTitle) contactTitle.textContent = content.contact.title;
    
    const visitTitle = document.querySelector('.contact-info h3');
    if (visitTitle) visitTitle.textContent = content.contact.visitTitle;
    
    const address = document.querySelector('.address');
    if (address) {
        address.innerHTML = `${content.contact.address.line1}<br>${content.contact.address.line2}<br>${content.contact.address.line3}`;
    }
    
    const contactDetails = document.querySelectorAll('.contact-details p');
    if (contactDetails.length) {
        contactDetails[0].innerHTML = `<strong>Phone:</strong> ${content.contact.details.phone}`;
        contactDetails[1].innerHTML = `<strong>Email:</strong> ${content.contact.details.email}`;
        contactDetails[2].innerHTML = `<strong>Hours:</strong> ${content.contact.details.hours}`;
    }
    
    // Footer
    const footerCopyright = document.querySelectorAll('.footer-section p')[0];
    if (footerCopyright) footerCopyright.textContent = content.footer.copyright;
    
    const newsletterTitle = document.querySelectorAll('.footer-section h4')[1];
    if (newsletterTitle) newsletterTitle.textContent = content.footer.newsletter.title;
    
    const newsletterDesc = document.querySelectorAll('.footer-section p')[1];
    if (newsletterDesc) newsletterDesc.textContent = content.footer.newsletter.description;
}

document.addEventListener('DOMContentLoaded', function() {
    // Load content from content.js
    if (typeof siteContent !== 'undefined') {
        populateContent(siteContent);
    } else {
        console.error('Content not loaded. Make sure content.js is included before script.js');
    }
    
    const navToggle = document.querySelector('.nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const chapterCards = document.querySelectorAll('.chapter-card');
    const coverArt = document.querySelector('.cover-art img');

    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
        
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('active');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if it's an external page link (like antumbra.html)
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#')) {
                // Let the browser handle external links normally
                return;
            }
            
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '-100px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });

    if (coverArt) {
        coverArt.style.opacity = '0';
        coverArt.style.transform = 'scale(0.95)';
        coverArt.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            coverArt.style.opacity = '1';
            coverArt.style.transform = 'scale(1)';
        }, 300);
    }
    
    chapterCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        card.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 100 * (index + 1));
    });

    const animationObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, animationObserverOptions);

    // Apply animations after content is loaded
    setTimeout(() => {
        document.querySelectorAll('.artist-card, .stat').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            animationObserver.observe(el);
        });
    }, 100);

    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message. We will respond within 24 hours.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'SUBSCRIBING...';
        button.disabled = true;
        
        setTimeout(() => {
            alert('Successfully subscribed to newsletter.');
            this.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1000);
    });

    const heroContent = document.querySelector('.hero-content');
    setTimeout(() => {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }, 100);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
            navToggle.classList.remove('active');
            
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
            navToggle.classList.remove('active');
        }
    });

    const yearSpan = document.createElement('span');
    yearSpan.textContent = new Date().getFullYear();
    const copyrightText = document.querySelector('.footer-section p');
    if (copyrightText && copyrightText.textContent.includes('2024')) {
        copyrightText.textContent = copyrightText.textContent.replace('2024', yearSpan.textContent);
    }

    console.log('Aftermath Art Studio - Minimalist Design Initialized');
});