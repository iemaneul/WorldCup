class FloatingNav extends HTMLElement {
    static get observedAttributes() {
        return ["current"];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const current = this.getAttribute("current") || "home";

        this.innerHTML = `
            <nav class="floating-nav" aria-label="Navegação principal">
                ${this.renderItem({
                    key: "home",
                    href: "index.html",
                    title: "Início",
                    icon: `
                        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z"></path>
                    `,
                    current
                })}
                ${this.renderItem({
                    key: "jogos",
                    href: "jogos.html",
                    title: "Jogos",
                    icon: `
                        <circle cx="12" cy="12" r="7.25"></circle>
                        <path d="m12 8.5 2.6 1.9-1 3.1h-3.2l-1-3.1z"></path>
                        <path d="M9.4 10.4 7.7 9m6.9 1.4L16.3 9m-9 7 2.8-.2m7.8.2-2.8-.2m-4.7-2.4L8.8 16m6.4-2.4 1.6 2.4"></path>
                    `,
                    current
                })}
                ${this.renderItem({
                    key: "grupos",
                    href: "grupos.html",
                    title: "Grupos",
                    icon: `
                        <rect x="4.5" y="5.5" width="15" height="13" rx="2.5"></rect>
                        <path d="M9.5 5.5v13M14.5 5.5v13M4.5 10h15M4.5 14h15"></path>
                    `,
                    current
                })}
                ${this.renderItem({
                    key: "selecoes",
                    href: "selecoes.html",
                    title: "Seleções",
                    icon: `
                        <path d="M12 4.5 18 7v4.8c0 4.2-2.6 6.9-6 7.7-3.4-.8-6-3.5-6-7.7V7z"></path>
                        <path d="M9.5 11.5 11 13l3.5-3.5"></path>
                    `,
                    current
                })}
                ${this.renderItem({
                    key: "paises-sede",
                    href: "paises-sede.html",
                    title: "Países-sede",
                    icon: `
                        <circle cx="12" cy="12" r="7.25"></circle>
                        <path d="M4.9 12h14.2M12 4.8a11.5 11.5 0 0 1 0 14.4M12 4.8a11.5 11.5 0 0 0 0 14.4"></path>
                        <path d="m15.6 15.6 3.2 3.2"></path>
                    `,
                    current
                })}
            </nav>
        `;
    }

    renderItem({ key, href, title, icon, current }) {
        const isActive = key === current;
        const activeClass = isActive ? " is-active" : "";
        const currentAttr = isActive ? ' aria-current="page"' : "";

        return `
            <a class="nav-item${activeClass}" href="${href}" title="${title}"${currentAttr}>
                <span class="icon-wrap">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        ${icon}
                    </svg>
                </span>
                <span class="sr-only">${title}</span>
            </a>
        `;
    }
}

customElements.define("floating-nav", FloatingNav);
