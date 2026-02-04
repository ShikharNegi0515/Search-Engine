let productIdCounter = 100;
const catalog = new Map();


module.exports = {
    catalog,
    getNextId: () => ++productIdCounter
};