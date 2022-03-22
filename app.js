const app = {

    container: document.querySelector('#container'),

    init: function () {
        app.displayGame()
    },

    findData: async function () {
        const fetchData = await fetch('./data/jeux.json');
        const games = await fetchData.json();
        return games
    },

    displayGame: async function () {
        const games = await app.findData();
        const index = app.randomIndex(0, games.length);
        const chosenGame = document.createElement('div');
        chosenGame.classList.add('chosenGame');
        app.container.appendChild(chosenGame)
        chosenGame.textContent = games[index].nom;

        console.log(index)
        console.log(games[index].nom)
        // games.forEach(element => {
        //     console.log(element.nom)
        // });
    },

    randomIndex: function (a, b) {
        return Math.floor(Math.random() * b);
    }
}
app.init()
