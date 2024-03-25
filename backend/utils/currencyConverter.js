
// Convert currencies
const currencyConverter = (base, amount, rate) => {
    const operation = base === "$" ? "*" : "/";
    const expression = `${amount}${operation}${rate}`;
    return parseFloat(eval(expression)).toFixed(2);
}

module.exports = {
    currencyConverter
}