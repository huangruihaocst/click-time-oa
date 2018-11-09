'use strict';

const express = require('express');
const router = express.Router();

const fs = require('fs');

const DVD_DISCOUNT = 0.1;
const BLU_RAY_DISCOUNT = 0.15;
const BULK_DISCOUNT = 0.05;

/* calculate price and save to fake db */
router.post('/', ((req, res) => {
    const { items } = req.body;
    bindPrice(items);

    let price = 0;

    items.forEach((item) => {
        price += item.price * item.quantity;
    });

    let discounts = {};

    // discount on DVDs and Blu-Rays
    discounts['DVD'] = calDvdDiscount(items);
    discounts['Blu-Ray'] = calBluDiscount(items);
    price -= discounts['DVD'];
    price -= discounts['Blu-Ray'];

    // bulk discount
    discounts['bulk'] = calBulkDiscount(items, price);
    price -= discounts['bulk'];

    save(items);

    res.status(200).json({ 'price': price, 'discounts': discounts });
}));

const bindPrice = (items) => {
    // fake db
    const db = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    const map = new Map();
    db.items.forEach((item) => {
        map.set(item.name, item.price);
    });
    items.forEach((item) => {
        item.price = map.get(item.name);
    });
};

const calDvdDiscount = (items) => {
    let count = 0, discount = 0;
    items.forEach((item) => {
        if (item.name.indexOf('DVD') !== -1) {
            ++count;
        }
    });

    if (count >= 3) {
        items.forEach((item) => {
            if (item.name.indexOf('DVD') !== -1) {
                discount += DVD_DISCOUNT * item.price * item.quantity;
            }
        });
    }

    return +discount.toFixed(2);
};

const calBluDiscount = (items) => {
    let count = 0, discount = 0;
    items.forEach((item) => {
        if (item.name.indexOf('Blu-Ray') !== -1) {
            ++count;
        }
    });

    if (count >= 3) {
        items.forEach((item) => {
            if (item.name.indexOf('Blu-Ray') !== -1) {
                discount += BLU_RAY_DISCOUNT * item.price * item.quantity;
            }
        });
    }

    return +discount.toFixed(2);
};

const calBulkDiscount = (items, price) => {
    let count = 0;
    items.forEach((item) => {
        count += parseInt(item.quantity);
    });
    if (count >= 100) {
        return +(BULK_DISCOUNT * price).toFixed(2);
    }
    return 0;
};

// save to fake db
const save = (items) => {
    items.forEach((item) => {
        delete item.price;
        item.quantity = parseInt(item.quantity);
    });
    const db = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    db.cart = items;
    fs.writeFileSync('./db.json', JSON.stringify(db), 'utf8');
};

module.exports = router;