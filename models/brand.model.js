'use strict';
var dbConn = require('../config/db.config');

//WE CAN USE TYPEORM instead of writing queries as string
//

//Brand object create
var Brand = function (brand) {
    this.ID = brand.ID;
    this.NAME = brand.NAME;
    this.DESCRIPTION = brand.DESCRIPTION;
};
Brand.create = function (newBrand, result) {
    dbConn.query("INSERT INTO BRANDS set ?", newBrand, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Brand.findById = function (id, result) {
    dbConn.query("Select * from BRANDS where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Brand.findAll = function (result) {
    dbConn.query("Select * from BRANDS", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('brands : ', res);
            result(null, res);
        }
    });
};
Brand.update = function (id, brand, result) {
    dbConn.query("UPDATE BRANDS SET NAME=?,DESCRIPTION=? WHERE ID = ?", [brand.NAME, brand.DESCRIPTION, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Brand.delete = function (id, result) {
    dbConn.query("DELETE FROM BRANDS WHERE BRANDS.ID = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = Brand;