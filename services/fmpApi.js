const fmp = require('financialmodelingprep')('6b5e8bedc6de039791e6bbd72013e79d')

const fmpApi = {
    quoteStocks(symbols) {
        return fmp.stock(symbols).quote()
            .then(() => {})
            .catch((err) => {
                console.error(err);
            });
    },
    forex(from, to) {
    return fmp.forex(from, to).rate()
        .then()
        .catch((err) => {
            console.error(err);
        });
    }
}

// Simple Examples

// API route: /stock/sectors-performance
fmp.market.sector_performance().then(response => console.log(response));

// API route: /quote/USDEUR
fmp.forex('USD', 'EUR').rate().then(response => console.log(response));
