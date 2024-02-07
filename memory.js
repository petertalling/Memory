const cards = document.querySelectorAll(".memory-card");
cards.forEach(item => item.addEventListener("click", flip));
document.getElementById("restart").addEventListener("click", resetGame);

shuffle();

let foundPairs = 0;
let triesToFind = 0;
let numCardsTunred = 0;
let firstCard, secondCard;

function resetGame() {
    cards.forEach(item => item.classList.remove("turn"));
    foundPairs = 0;
    document.getElementById("numPairs").textContent = "Pairs found: " + foundPairs;
    triesToFind = 0;
    document.getElementById("numTries").textContent = "Tries: " + triesToFind;
    setTimeout(() => {
        shuffle();
    }, 1000);
    cards.forEach(item => item.removeEventListener("click", flip));
    cards.forEach(item => item.addEventListener("click", flip));

}

function shuffle() {

    cards.forEach(item => {
        let setRandomPos = Math.floor(Math.random() * 100);
        item.style.order = setRandomPos;
        console.log(setRandomPos)

    });
}

function flip() {
    if (numCardsTunred == 2) {
        return;
    }
    this.classList.add("turn");
    if (numCardsTunred == 0) {
        numCardsTunred = 1;
        firstCard = this;
        firstCard.removeEventListener("click", flip);
    } else {
        numCardsTunred = 2;
        secondCard = this;
        secondCard.removeEventListener("click", flip);

        if (firstCard.dataset.name === secondCard.dataset.name) {
            numCardsTunred = 0;
            foundPairs++;
            document.getElementById("numPairs").textContent = "Pairs found: " + foundPairs;
            triesToFind++;
            document.getElementById("numTries").textContent = "Tries: " + triesToFind;
            if (foundPairs == 12) {
                document.getElementById("numPairs").textContent = "Good job! You found all pairs after " + triesToFind + " tries!";

            }
        } else {
            triesToFind++;
            document.getElementById("numTries").textContent = "Tries: " + triesToFind;

            setTimeout(() => {
                firstCard.addEventListener("click", flip);
                secondCard.addEventListener("click", flip);
                firstCard.classList.remove("turn");
                secondCard.classList.remove("turn");
                numCardsTunred = 0;
            }, 1000);

        }

    }

}