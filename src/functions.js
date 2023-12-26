// Shuffles targeted array (Fisher-Yates Algorithm)
const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Decodes character entities
const decodeHtml = html => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};

export { shuffleArray, decodeHtml };
