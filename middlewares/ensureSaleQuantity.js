const ensureProdQuantity = require('./ensureProductQuantity');

const ensureSaleQuantity = (req, res, next) => {
    const sales = req.body;
    const allQuantityValid = sales.every(({ quantity }) => {
        req.body.quantity = quantity;

        let isValid = false;
        ensureProdQuantity(req, res, () => { isValid = true; });
        return isValid;
    });
    if (allQuantityValid) next();
};

module.exports = ensureSaleQuantity;