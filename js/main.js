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

        document.querySelectorAll(".projects-blocks").forEach(function (el, i) {
            el.style.setProperty('--reveal-delay', (i * 180) + "ms");
        });
        document.querySelectorAll(".stacks-blocks").forEach(function (el, i) {
            el.style.setProperty('--reveal-delay', (i * 120) + "ms");
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    el.classList.add("revealed");

                    // SÓ LIMPA SE NÃO FOR O FOOTER
                    // Isso permite que o hover funcione nos blocos, mas o footer não suma
                    if (!el.classList.contains('footer-credits')) {
                        setTimeout(function () {
                            el.classList.remove("reveal", "revealed");
                            el.style.removeProperty('--reveal-delay');
                        }, 3000);
                    }

                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -20px 0px"
        });

        targets.forEach(function (el) {
            el.classList.add("reveal");
            observer.observe(el);
        });

        // Garantia extra para o fim da página
        window.addEventListener('scroll', function () {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5) {
                var footer = document.querySelector('.footer-credits');
                if (footer) footer.classList.add('revealed');
            }
        });
    }

    if (document.readyState !== "loading") {
        initReveal();
    } else {
        document.addEventListener("DOMContentLoaded", initReveal);
    }
}());
