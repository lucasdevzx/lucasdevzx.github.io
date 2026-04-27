(function () {
    var SELECTORS = [
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
    ].join(", ");

    function initReveal() {
        var targets = Array.prototype.slice.call(document.querySelectorAll(SELECTORS));

        if (!("IntersectionObserver" in window)) {
            targets.forEach(function (el) { el.classList.add("revealed"); });
            return;
        }

        // Delay em cascata (stagger) ligeiramente aumentado para ser mais perceptível
        document.querySelectorAll(".projects-blocks").forEach(function (el, i) {
            el.style.setProperty('--reveal-delay', (i * 150) + "ms");
        });
        document.querySelectorAll(".stacks-blocks").forEach(function (el, i) {
            el.style.setProperty('--reveal-delay', (i * 100) + "ms");
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    el.classList.add("revealed");

                    // Limpeza de classes após 2.5s (ajustado para a animação mais lenta)
                    setTimeout(function () {
                        el.classList.remove("reveal", "revealed");
                        el.style.removeProperty('--reveal-delay');
                    }, 2500);

                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.15, // Precisa de 15% do elemento visível
            rootMargin: "-10% 0px -5% 0px" // Espera o elemento entrar mais na tela
        });

        targets.forEach(function (el) {
            el.classList.add("reveal");
            observer.observe(el);
        });
    }

    if (document.readyState !== "loading") {
        initReveal();
    } else {
        document.addEventListener("DOMContentLoaded", initReveal);
    }
}());
