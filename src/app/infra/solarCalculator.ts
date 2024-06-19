const LOW_VOLTAGE = ['B', 'D', 'H'];
const MEDIUM_HIGH_VOLTAGE = ['C1', 'C2', 'E1', 'E2', 'E3', 'H1', 'H2'];
const FUSE_RATING_CT_RATIO_MAPPER = {
    'Fuse 32A': 11.31,
    'Fuse 63A': 22.26,
    'CT 150/5': 53.00,
    'CT 200/5': 70.67,
    'CT 300/5': 106.00,
    'CT 400/5': 141.34,
    'CT 500/5': 176.67,
    'CT 600/5': 212.00,
    'CT 800/5': 282.67,
    'CT 1000/5': 353.34,
    'CT 1200/5': 424.01,
    'CT 1600/5': 565.34,
};


export const estimateFinancingAmount = (tnbTariff, ctRatio) => {
    let capacity = 0, price = 0, financingAmount = 0;
    const tariff = tnbTariff;
    if (LOW_VOLTAGE.includes(tariff)) {
        if (ctRatio in FUSE_RATING_CT_RATIO_MAPPER) {
            capacity = FUSE_RATING_CT_RATIO_MAPPER[ctRatio] * 1.3;
        }
    } else if (MEDIUM_HIGH_VOLTAGE.includes(tariff)) {
        // capacity = this._ihs.avgMaximumDemand * 1.3;
        capacity = ctRatio * 0.75 * 1.3;
    }

    if (capacity >= 0 && capacity <= 29.9999) {
        price = 5200;
    } else if (capacity >= 30 && capacity <= 71.9999) {
        price = 5200;
    } else if (capacity >= 72 && capacity <= 100.9999) {
        price = 3200;
    } else if (capacity >= 101 && capacity <= 300.9999) {
        price = 3200;
    } else if (capacity >= 301 && capacity <= 500.9999) {
        price = 2640;
    } else if (capacity >= 501 && capacity <= 700.9999) {
        price = 2530;
    } else if (capacity >= 701 && capacity <= 900.9999) {
        price = 2500;
    } else if (capacity >= 901 && capacity <= 1000.9999) {
        price = 2480;
    } else if (capacity > 1000) {
        price = 2430;
    }

    financingAmount = capacity * price;
    return financingAmount.toFixed(2);
};
