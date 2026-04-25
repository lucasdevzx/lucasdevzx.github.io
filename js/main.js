document.addEventListener("DOMContentLoaded", () => {

    const heroChildren = document.querySelectorAll(
        ".hero .name-section, .hero hr, .hero .social-info, .hero .arrow-wrapper"
    );

    heroChildren.forEach((el, i) => {
        el.classList.add("hero-hidden");
        setTimeout(() => {
            el.classList.add("hero-visible");
        }, 120 + i * 130);
    });

    const revealTargets = document.querySelectorAll([
        "#about .photo-about",
        "#about svg.lucide-braces",
        "#about .text-about",
        "#tools h2",
        "#tools > p",
        ".stacks-containers",
        ".stacks > hr",
        "#projects h2",
        ".projects-main",
        ".projects-blocks",
        "#contact > p",
        ".contact-title",
        "#contact hr",
        ".contact-badges-container",
        ".footer-infos",
        ".footer-credits",
    ].join(", "));

    revealTargets.forEach(el => {
        el.classList.add("reveal");
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    revealTargets.forEach(el => observer.observe(el));

    document.querySelectorAll(".projects-blocks").forEach((el, i) => {
        el.style.transitionDelay = `${i * 80}ms`;
    });

    document.querySelectorAll(".stacks-blocks").forEach((el, i) => {
        el.style.transitionDelay = `${i * 50}ms`;
    });

});
