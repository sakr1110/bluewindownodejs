'use strict';
const RatingList = require('../models/rating-list.model');
exports.findAll = function (req, res) {
    RatingList.findAll(function (err, ratinglist) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', ratinglist);
        res.send(ratinglist);
    });
};
exports.create = function (req, res) {
    const new_brands_rating_list = new RatingList(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        RatingList.create(new_brands_rating_list, function (err, RatingList) {
            if (err)
                res.send(err);
            res.json({ error: false, message: "RatingList added successfully!", data: RatingList });
        });
    }
};
exports.findById = function (req, res) {
    RatingList.findById(req.params.id, function (err, RatingList) {
        if (err)
            res.send(err);
        res.json(RatingList);
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        RatingList.update(req.params.id, new RatingList(req.body), function (err, RatingList) {
            if (err)
                res.send(err);
            res.json({ error: false, message: 'RatingList successfully updated' });
        });
    }
};
exports.delete = function (req, res) {
    RatingList.delete(req.params.id, function (err, RatingList) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'RatingList successfully deleted' });
    });
};
exports.deletebrand = function (req, res) {
    RatingList.deletebrand(req.params.id, function (err, RatingList) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'Brand successfully deleted' });
    });
};
exports.updatebrand = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        RatingList.updatebrand(req.params.id, new RatingList(req.body), function (err, RatingList) {
            if (err)
                res.send(err);
            res.json({ error: false, message: 'RatingList successfully updated' });
        });
    }
};

