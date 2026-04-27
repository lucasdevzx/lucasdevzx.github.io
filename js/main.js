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

        /* Aplica o delay em cascata usando variável CSS */
        document.querySelectorAll(".projects-blocks").forEach(function (el, i) {
            el.style.setProperty('--reveal-delay', (i * 100) + "ms");
        });
        document.querySelectorAll(".stacks-blocks").forEach(function (el, i) {
            el.style.setProperty('--reveal-delay', (i * 80) + "ms");
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    el.classList.add("revealed");

                    /* LIMPEZA: Remove as classes após a animação (aprox 2s).
                       Isso é essencial para destravar o hover natural do CSS! */
                    setTimeout(function () {
                        el.classList.remove("reveal", "revealed");
                        el.style.removeProperty('--reveal-delay');
                    }, 2000);

                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0,
            rootMargin: "0px 0px -15% 0px" /* Dispara um pouco antes de aparecer na tela */
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
