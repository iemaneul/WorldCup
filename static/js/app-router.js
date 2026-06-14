const pageCache = new Map();

async function fetchDocument(url) {
    const absoluteUrl = new URL(url, window.location.href).toString();

    if (pageCache.has(absoluteUrl)) {
        return pageCache.get(absoluteUrl).cloneNode(true);
    }

    const response = await fetch(absoluteUrl, {
        headers: {
            "X-Requested-With": "floating-nav-router"
        }
    });

    if (!response.ok) {
        throw new Error(`Falha ao carregar ${absoluteUrl}`);
    }

    const html = await response.text();
    const nextDocument = new DOMParser().parseFromString(html, "text/html");
    pageCache.set(absoluteUrl, nextDocument);

    return nextDocument.cloneNode(true);
}

function swapPage(nextDocument, url, shouldPushState) {
    const nextCurrent = nextDocument.querySelector("floating-nav")?.getAttribute("current");
    const currentNav = document.querySelector("floating-nav");
    const currentContent = document.querySelector("#page-content");
    const nextContent = nextDocument.querySelector("#page-content");
    const canPartialSwap = Boolean(currentNav && nextCurrent && currentContent && nextContent);

    const update = () => {
        document.title = nextDocument.title;

        if (canPartialSwap) {
            currentContent.innerHTML = nextContent.innerHTML;
            currentNav.setAttribute("current", nextCurrent);
        } else {
            document.body.innerHTML = nextDocument.body.innerHTML;
        }

        if (shouldPushState) {
            window.history.pushState({}, "", url);
        }
    };

    if (!canPartialSwap && document.startViewTransition) {
        document.startViewTransition(update);
        return;
    }

    if (!canPartialSwap) {
        document.body.classList.add("is-transitioning");
    }

    update();

    if (!canPartialSwap) {
        requestAnimationFrame(() => {
            document.body.classList.remove("is-transitioning");
        });
    }
}

async function navigateTo(url, shouldPushState = true) {
    const currentUrl = new URL(window.location.href);
    const targetUrl = new URL(url, window.location.href);

    if (currentUrl.pathname === targetUrl.pathname) {
        return;
    }

    try {
        const nextDocument = await fetchDocument(targetUrl);
        swapPage(nextDocument, targetUrl, shouldPushState);
    } catch (error) {
        window.location.href = targetUrl.toString();
    }
}

document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");

    if (!link) {
        return;
    }

    if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
    ) {
        return;
    }

    const url = new URL(link.href, window.location.href);
    const isInternal = url.origin === window.location.origin;
    const isHtmlPage = url.pathname.endsWith(".html") || url.pathname === "/" || !url.pathname.includes(".");

    if (!isInternal || !isHtmlPage) {
        return;
    }

    event.preventDefault();
    navigateTo(url.toString());
});

window.addEventListener("popstate", () => {
    navigateTo(window.location.href, false);
});
