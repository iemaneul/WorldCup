const gamesListCache = new Map();

async function loadGamesList() {
    const gamesList = document.querySelector("[data-games-list]");

    if (!gamesList) {
        return;
    }

    const source = gamesList.dataset.gamesList;

    if (!source) {
        return;
    }

    if (!gamesListCache.has(source)) {
        const response = await fetch(source, {
            headers: {
                "X-Requested-With": "games-list-loader"
            }
        });

        if (!response.ok) {
            throw new Error(`Falha ao carregar ${source}`);
        }

        gamesListCache.set(source, await response.text());
    }

    gamesList.innerHTML = gamesListCache.get(source);
}

function initGamesList() {
    loadGamesList().catch(() => {
        const gamesList = document.querySelector("[data-games-list]");

        if (gamesList) {
            gamesList.innerHTML = "<p>Não foi possível carregar os jogos.</p>";
        }
    });
}

document.addEventListener("DOMContentLoaded", initGamesList);
document.addEventListener("page:content-swapped", initGamesList);
