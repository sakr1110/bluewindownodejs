'use strict';
const Brand = require('../models/brand.model');
exports.findAll = function (req, res) {
    Brand.findAll(function (err, brand) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', brand);
        res.send(brand);
    });
};
exports.create = function (req, res) {
    const new_brand = new Brand(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Brand.create(new_brand, function (err, brand) {
            if (err)
                res.send(err);
            res.json({ error: false, message: "Brand added successfully!", data: brand });
        });
    }
};
exports.findById = function (req, res) {
    Brand.findById(req.params.id, function (err, brand) {
        if (err)
            res.send(err);
        res.json(brand);
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Brand.update(req.params.id, new Brand(req.body), function (err, brand) {
            if (err)
                res.send(err);
            res.json({ error: false, message: 'Brand successfully updated' });
        });
    }
};
exports.delete = function (req, res) {
    Brand.delete(req.params.id, function (err, brand) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'Brand successfully deleted' });
    });
};