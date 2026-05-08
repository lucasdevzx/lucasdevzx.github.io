const initProjectToggle = () => {
    const projectsContainer = document.querySelector(".projects-container");

    if (!projectsContainer) {
        return;
    }

    projectsContainer.querySelectorAll(":scope > .projects-container").forEach((nestedContainer) => {
        while (nestedContainer.firstElementChild) {
            projectsContainer.insertBefore(nestedContainer.firstElementChild, nestedContainer);
        }

        nestedContainer.remove();
    });

    const projectCards = Array.from(projectsContainer.querySelectorAll(":scope > .projects-blocks"));

    if (projectCards.length <= 1) {
        return;
    }

    projectCards.forEach((card, index) => {
        card.style.order = index;
    });

    const toggleWrapper = document.createElement("div");
    toggleWrapper.className = "projects-toggle-wrapper";

    const toggleButton = document.createElement("button");
    toggleButton.className = "projects-toggle selection shadow";
    toggleButton.type = "button";
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.innerHTML = `
        <span class="projects-toggle-text">Ver mais projetos</span>
        <svg class="projects-toggle-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
            viewBox="0 0 24 24" fill="none" stroke="#d4f0e8" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
        </svg>
    `;

    toggleWrapper.appendChild(toggleButton);
    projectsContainer.after(toggleWrapper);

    let isExpanded = false;

    const applyProjectVisibility = () => {
        projectCards.forEach((card) => card.classList.remove("project-card-hidden"));

        const containerStyles = window.getComputedStyle(projectsContainer);
        const gap = parseFloat(containerStyles.columnGap || containerStyles.gap) || 0;
        const cardWidth = projectCards[0].getBoundingClientRect().width;
        const cardsPerRow = Math.max(
            1,
            Math.floor((projectsContainer.clientWidth + gap) / (cardWidth + gap))
        );
        const visibleLimit = Math.min(cardsPerRow, projectCards.length);
        const hasHiddenCards = visibleLimit < projectCards.length;

        toggleWrapper.classList.toggle("projects-toggle-wrapper-visible", hasHiddenCards);

        if (!hasHiddenCards) {
            isExpanded = false;
            toggleButton.setAttribute("aria-expanded", "false");
            toggleButton.querySelector(".projects-toggle-text").textContent = "Ver mais projetos";
            return;
        }

        if (!isExpanded) {
            projectCards.forEach((card, index) => {
                if (index >= visibleLimit) {
                    card.classList.add("project-card-hidden");
                }
            });
        }

        toggleButton.setAttribute("aria-expanded", String(isExpanded));
        toggleButton.querySelector(".projects-toggle-text").textContent = isExpanded
            ? "Ver menos projetos"
            : "Ver mais projetos";
    };

    toggleButton.addEventListener("click", () => {
        const previousTop = projectsContainer.getBoundingClientRect().top;

        isExpanded = !isExpanded;
        applyProjectVisibility();

        requestAnimationFrame(() => {
            const currentTop = projectsContainer.getBoundingClientRect().top;
            window.scrollBy(0, currentTop - previousTop);
        });
    });

    window.addEventListener("resize", applyProjectVisibility);
    window.addEventListener("load", applyProjectVisibility);
    applyProjectVisibility();
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProjectToggle);
} else {
    initProjectToggle();
}
