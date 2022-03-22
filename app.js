const app = {

    corps: document.querySelector('.game'),
    button: document.querySelector('#button'),
    time: document.querySelector('#time'),
    players: document.querySelector('#players'),

    init: function () {
        app.generateTitle();
        app.button.addEventListener('click', (event) => {
            event.preventDefault();
            if (document.querySelector('.resultContainer')) {
                document.querySelector('.resultContainer').remove()
            }
            app.chosenGame()
        })
    },

    findData: async function () {
        const fetchData = await fetch('./data/jeux.json');
        const games = await fetchData.json();
        return games
    },

    randomIndex: function (a, b) {
        return Math.floor(Math.random() * b);
    },

    // randomGame attend un array en paramètre
    randomGame: async function (games) {
        const container = document.createElement('div');
        container.classList.add('resultContainer');
        app.corps.appendChild(container);
        // Je tire au sort l'index
        const index = app.randomIndex(0, games.length);
        // Je fais apparaître le nom dans une div
        const chosenGame = document.createElement('div');
        chosenGame.classList.add('chosenGame');
        container.appendChild(chosenGame)
        chosenGame.textContent = games[index].nom;
        // Je fais apparaître l'image dans une balise img
        const chosenPic = document.createElement('img');
        chosenPic.classList.add('chosenPic');
        chosenPic.setAttribute('src', games[index].img)
        container.appendChild(chosenPic);
    },

    chosenGame: async function () {
        const games = await app.findData();
        // Si les deux sont cochés, je fais un tirage random sur les jeux qui se jouent à deux et font moins d'une heure etc
        if (app.players.checked && app.time.checked) {
            console.log("les deux cochés");
            const gamesList = games.filter((game) => {
                return (game.court && game.deux_joueurs);
            });
            console.log(gamesList);
            app.randomGame(gamesList)
            // Les jeux courts seulement, pour tous les joueurs
        } else if (app.time.checked) {
            console.log("Time coché");
            const gamesList = games.filter((game) => {
                return (game.court);
            });
            console.log(gamesList);
            app.randomGame(gamesList)
            // Les jeux qui se jouent à deux, de toutes longueurs
        } else if (app.players.checked) {
            console.log("Joueurs cochés");
            const gamesList = games.filter((game) => {
                return (game.deux_joueurs);
            });
            console.log(gamesList);
            app.randomGame(gamesList)
            // Si rien n'est coché, je fais le tirage sur tous les jeux
        } else {
            console.log("Rien n'est coché")
            app.randomGame(games)
        }
    },

    generateTitle: function () {
        // Je récupère l'heure qu'il est pour affichert le titre en fonction
        const now = new Date();
        const hour = now.getHours();
        const title = document.createElement('h1');
        if (hour > 18) {
            title.textContent = 'On joue à quoi ce soir ?';
        } else {
            title.textContent = 'On joue à quoi aujourd\'hui ?';
        }
        app.corps.prepend(title);

    },
}


document.addEventListener('DOMContentLoaded', app.init);