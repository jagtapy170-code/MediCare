/*==================================================
                Medicare+
            Landing Page JavaScript
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
                MOBILE MENU
    =========================================*/

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (navLinks.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    }

    /*=========================================
            CLOSE MENU AFTER CLICK
    =========================================*/

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

    /*=========================================
            STICKY NAVBAR SHADOW
    =========================================*/

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.boxShadow = "0 8px 25px rgba(0,0,0,.12)";

        } else {

            navbar.style.boxShadow = "0 3px 15px rgba(0,0,0,.05)";

        }

    });

    /*=========================================
            ACTIVE NAV LINK
    =========================================*/

    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    /*=========================================
            BACK TO TOP BUTTON
    =========================================*/

    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            topBtn.style.display = "block";

        } else {

            topBtn.style.display = "none";

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    /*=========================================
            HERO COUNTER ANIMATION
    =========================================*/

    const counters = document.querySelectorAll(".hero-card h3");

    let started = false;

    function startCounter() {

        counters.forEach(counter => {

            const original = counter.innerText;

            const target = parseInt(original.replace(/\D/g, ""));

            const suffix = original.replace(/[0-9]/g, "");

            let count = 0;

            const speed = Math.max(10, Math.floor(target / 100));

            const interval = setInterval(() => {

                count += speed;

                if (count >= target) {

                    counter.innerText = target + suffix;

                    clearInterval(interval);

                } else {

                    counter.innerText = count + suffix;

                }

            }, 20);

        });

    }

    window.addEventListener("scroll", () => {

        const hero = document.querySelector(".hero");

        if (!started && window.scrollY < hero.offsetHeight) {

            started = true;

            startCounter();

        }

    });

    startCounter();

    /*=========================================
            SCROLL REVEAL ANIMATION
    =========================================*/

    const revealElements = document.querySelectorAll(

        ".feature-card, .service-card, .portal-card, .contact-card, .hero-card, .about-content, .about-box"

    );

    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform = "translateY(50px)";

        element.style.transition = "all .8s ease";

    });

    function revealOnScroll() {

        revealElements.forEach(element => {

            const position = element.getBoundingClientRect().top;

            const screenHeight = window.innerHeight;

            if (position < screenHeight - 100) {

                element.style.opacity = "1";

                element.style.transform = "translateY(0)";

            }

        });

    }

    revealOnScroll();

    window.addEventListener("scroll", revealOnScroll);

    /*=========================================
            BUTTON RIPPLE EFFECT
    =========================================*/

    const buttons = document.querySelectorAll(

        ".btn-primary, .btn-secondary, .portal-card a"

    );

    buttons.forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform = "scale(1.05)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "scale(1)";

        });

    });

    /*=========================================
            SMOOTH SCROLL
    =========================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

});