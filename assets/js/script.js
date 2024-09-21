window.addEventListener("load", webPageInit);

const quoteGeneratorButton = document.getElementById("generate-quote");
quoteGeneratorButton.addEventListener("click", generateQuote);

const quoteParagraph = document.getElementById("quote");
const authorSpan = document.getElementById("author");

const loaderContainer = document.querySelector(".loader-container");

const categoriesFilter = document.querySelector(".categories-filter");
categoriesFilter.addEventListener("click", openCategoriesFilter);

const categoriesFilterContainer = document.querySelector(".categories-filter-container");

const categoriesBackFilter = document.querySelector(".categories-backfilter");
categoriesBackFilter.addEventListener("click", closeCategoriesFilter);

const categories = [
    'age',          'alone',         'amazing',       'anger',
    'architecture', 'art',           'attitude',      'beauty',
    'best',         'birthday',      'business',      'car',
    'change',       'communication', 'computers',     'cool',
    'courage',      'dad',           'dating',        'death',
    'design',       'dreams',        'education',     'environmental',
    'equality',     'experience',    'failure',       'faith',
    'family',       'famous',        'fear',          'fitness',
    'food',         'forgiveness',   'freedom',       'friendship',
    'funny',        'future',        'god',           'good',
    'government',   'graduation',    'great',         'happiness',
    'health',       'history',       'home',          'hope',
    'humor',        'imagination',   'inspirational', 'intelligence',
    'jealousy',     'knowledge',     'leadership',    'learning',
    'legal',        'life',          'love',          'marriage',
    'medical',      'men',           'mom',           'money',
    'morning',      'movies',        'success'];
/* Local Quote Array */
// let lastRandomIndex = -1;
// let quotes = ["“Be yourself; everyone else is already taken.”― Oscar Wilde",
// "“I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.”― Marilyn Monroe",
// "“So many books, so little time.”― Frank Zappa",
// "“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.”― Albert Einstein",
// "“A room without books is like a body without a soul.”― Marcus Tullius Cicero",
// "“Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.”― Bernard M. Baruch",
// "“You've gotta dance like there's nobody watching,Love like you'll never be hurt,Sing like there's nobody listening,And live like it's heaven on earth.”― William W. Purkey",
// "“You know you're in love when you can't fall asleep because reality is finally better than your dreams.”― Dr. Seuss",
// "“You only live once, but if you do it right, once is enough.”― Mae West",
// "“Be the change that you wish to see in the world.”― Mahatma Gandhi",
// "“In three words I can sum up everything I've learned about life: it goes on.”― Robert Frost",
// "“If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.”― J.K. Rowling, Harry Potter and the Goblet of Fire",
// "“Don’t walk in front of me… I may not followDon’t walk behind me… I may not leadWalk beside me… just be my friend”― Albert Camus",
// "“If you tell the truth, you don't have to remember anything.”― Mark Twain",
// "“Friendship ... is born at the moment when one man says to another \"What! You too? I thought that no one but myself . . .”― C.S. Lewis, The Four Loves",
// "“I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.”― Maya Angelou",
// "“A friend is someone who knows all about you and still loves you.”― Elbert Hubbard",
// "“To live is the rarest thing in the world. Most people exist, that is all.”― Oscar Wilde",
// "“Always forgive your enemies; nothing annoys them so much.”― Oscar Wilde",
// "“Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.”― Martin Luther King Jr., A Testament of Hope: The Essential Writings and Speeches",
// "“Live as if you were to die tomorrow. Learn as if you were to live forever.”― Mahatma Gandhi",
// "“We accept the love we think we deserve.”― Stephen Chbosky, The Perks of Being a Wallflower",
// "“Without music, life would be a mistake.”― Friedrich Nietzsche, Twilight of the Idols",
// "“I am so clever that sometimes I don't understand a single word of what I am saying.”― Oscar Wilde, The Happy Prince and ,Other Stories",
// "“To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.”― Ralph Waldo Emerson",
// "“Here's to the crazy ones. The misfits. The rebels. The troublemakers. The round pegs in the square holes. The ones who see things differently. They're not fond of rules. And they have no respect for the status quo. You can quote them, disagree with them, glorify or vilify them. About the only thing you can't do is ignore them. Because they change things. They push the human race forward. And while some may see them as the crazy ones, we see genius. Because the people who are crazy enough to think they can change the world, are the ones who do.”― Steve Jobs",
// "“Insanity is doing the same thing, over and over again, but expecting different results.”― Narcotics Anonymous",
// "“I believe that everything happens for a reason. People change so that you can learn to let go, things go wrong so that you appreciate them when they're right, you believe lies so you eventually learn to trust no one but yourself, and sometimes good things fall apart so better things can fall together.”― Marilyn Monroe",
// "“It is better to be hated for what you are than to be loved for what you are not.”― Andre Gide, Autumn Leaves",
// "“Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.”― H. Jackson Brown Jr., P.S. I Love You"
// ]

const colors = document.getElementsByClassName("change-color");

let categoryName = "";

var animationTimeout;

Array.from(colors).forEach((item) => {
    item.addEventListener("click", changeColor);
})

function webPageInit() {
    generateQuote();
    randomOnStartColor();
    generateCategories();
}

async function getQuote() {
    let response = await fetch((categoryName === "") ? "https://api.api-ninjas.com/v1/quotes" : `https://api.api-ninjas.com/v1/quotes?category=${categoryName}`, {
        headers: {
            'X-Api-Key': "pvB1gJxclYTXCn+Gzsyhyw==SyAuDF0XakAXjh4Y",
        }
    })
    let data = await response.json();
    return data;
}

/* Local Quote array Function */
// function parseQuote(quote) {
//     let regex = /(?!=”)―+(?=\s)/;
//     return quote.split(regex);
// }

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

async function generateQuote() {
    loaderContainer.classList.replace("hide-loader", "display-loader");
    let quote = await getQuote();
    loaderContainer.classList.replace("display-loader", "hide-loader");

    /* Code dealing with local quote array */
    // let currentRandomIndex = getRandomInt(0, quotes.length);
    // while(currentRandomIndex == lastRandomIndex) {
    //     currentRandomIndex = getRandomInt(0, quotes.length);
    // }
    // lastRandomIndex = currentRandomIndex;

    // let parsedQuote = parseQuote(quotes[currentRandomIndex]);

    // quoteParagraph.textContent = parsedQuote[0];
    // authorSpan.textContent = "--" + parsedQuote[1];

    quoteParagraph.textContent = quote[0]["quote"];
    authorSpan.textContent = quote[0]["author"];

    clearTimeout(animationTimeout);
    animateRemove();
    animate(quoteParagraph);
    animate(authorSpan);
}

function randomOnStartColor() {
    colorButton = colors[getRandomInt(0, colors.length)];
    colorButton.click();
}

function animate(elmnt) {
    elmnt.classList.add("quote-animation");
    animationTimeout = setTimeout(animateRemove, 1000);
}

function animateRemove() {
    quoteParagraph.classList.remove("quote-animation");
    authorSpan.classList.remove("quote-animation");
}

function changeColor(event) {
    let hueValue = event.target.getAttribute("data-hue-value");
    document.body.style.setProperty("--clr-hue", hueValue);
}

function generateCategories() {
    for(let item of categories) {
        let div = document.createElement("div");
        div.classList.add("category");
        div.textContent = item;
        div.role = "button";
        div.addEventListener("click", selectCategory);
        categoriesFilterContainer.appendChild(div);
    }
}

function openCategoriesFilter(event) {
    if(event.target === categoriesFilter)
        event.target.style.setProperty("--display", "flex");
}

function closeCategoriesFilter(event) {
    event.currentTarget.closest(".categories-filter").style.setProperty("--display", "none");
}

function selectCategory(event) {
    let value = event.currentTarget.style.getPropertyValue("--light");

    if(value === "" || value === "53%") {
        event.currentTarget.style.setProperty("--light", "35%");
        categoryName = event.currentTarget.textContent;
    }
    else {
        event.currentTarget.style.setProperty("--light", "53%");
        categoryName = "";
    }

    for(let item of document.querySelectorAll(".category")) {
        if(item !== event.currentTarget)
            item.style.setProperty("--light", "53%");
    }
}