const normalizeQuery = (query) => query.toLowerCase().trim();


const detectPriceIntent = (query) => {
    const match = query.match(/(\d+)k|rupees|rs/);
    if (!match) return null;


    const value = parseInt(match[1]);
    return value ? value * 1000 : null;
};


const detectCheapIntent = (query) =>
    query.includes("sasta") || query.includes("cheap") || query.includes("low price");


module.exports = {
    normalizeQuery,
    detectPriceIntent,
    detectCheapIntent
};