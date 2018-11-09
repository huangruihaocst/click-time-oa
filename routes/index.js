'use strict';

const express = require('express');
const router = express.Router();

const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
    const items = getItems();
    const cart = getCart();
    const map = new Map();
    cart.forEach((item) => {
        map.set(item.name, item.quantity);
    });
    items.forEach((item) => {
        if (map.has(item.name)) {
            item.quantity = map.get(item.name);
        } else {
            item.quantity = 0;
        }
    });
    res.render('index', { items: items });
});

const getItems = () => {
    // fake db
    const db = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    return db.items;
};

const getCart = () => {
    // fake db
    const db = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    return db.cart;
};

module.exports = router;
