const fmp = require('financialmodelingprep')('6b5e8bedc6de039791e6bbd72013e79d')
// https://github.com/patelneel55/financialmodelingprep/blob/master/README.md
const fmpApi = {
    // Quote stock
    quote(symbols) {
        return fmp.stock(symbols).quote()
            .then()
            .catch((err) => {
                console.error(err);
            });
    },
    forex(from, to) {
        return fmp.forex(from, to)
    },
    list() {
        return fmp.market.index.list()
    },
    history(stock, { start_date, end_date, data_type, limit } = {}) {
        return fmp.market.index.history(stock, { start_date, end_date, data_type, limit })
    },
    most_active() {
        return fmp.stock.most_active()
    },
    most_gainer() {
        return fmp.stock.most_gainer()
    },
    most_loser() {
        return fmp.stock.most_loser()
    },
    sector_performance() {
        return fmp.market.sector_performance()
    },
    trading_hours() {
        return fmp.market.trading_hours()
    }
}

export default fmpApi;
