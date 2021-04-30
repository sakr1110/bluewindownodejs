
'use strict';
var dbConn = require('../config/db.config');

//WE CAN USE TYPEORM instead of writing queries as string
//

//Rating List object create
var RatingList = function (ratingList) {
    this.ID = ratingList.ID;
    this.COUNTRY_CODE = ratingList.COUNTRY_CODE;
    this.BRAND_ID = ratingList.BRAND_ID;
    this.RATING = ratingList.RATING;
    this.RATING_LIST = ratingList.RATING_LIST;
    this.BRAND_LIST = ratingList.BRAND_LIST;
};

RatingList.create = function (newRatingList, result) {
    var id = null;
    dbConn.query("INSERT INTO RATING_LIST(COUNTRY_CODE) VALUES (?);", newRatingList.COUNTRY_CODE, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            id = res.insertId
            result(null, res.insertId);
            var sql = "INSERT INTO BRANDS_RATING_LIST (BRAND_ID, RATING_LIST_ID, RATING) VALUES ";
            newRatingList.BRAND_LIST.forEach((element, index) => {
                if(index == 0) {
                    sql += "(" + element + "," + id + "," + newRatingList.RATING_LIST[index] + ")";
                }else {
                    sql += ",(" + element + "," + id + "," + newRatingList.RATING_LIST[index] + ")";
                }
            });
            dbConn.query(sql, function (errr, ress) {
                if (err) {
                    console.log("error: ", errr);
                    // result(errr, null);
                }
                else {
                    console.log("success: ", ress);
                    // result(null, ress);
                }
            });
        }
    });
};
RatingList.findById = function (id, result) {
    dbConn.query("Select * from RATING_LIST where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
RatingList.findAll = function (result) {
    dbConn.query("SELECT BRANDS_RATING_LIST.*,BRANDS.NAME AS BRAND_NAME,BRANDS.DESCRIPTION AS BRAND_DESCRIPTION,RATING_LIST.COUNTRY_CODE FROM BRANDS_RATING_LIST LEFT JOIN BRANDS on BRANDS_RATING_LIST.BRAND_ID = BRANDS.ID LEFT JOIN RATING_LIST on BRANDS_RATING_LIST.RATING_LIST_ID = RATING_LIST.ID", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('RatingList : ', res);
            result(null, res);
        }
    });
};
RatingList.update = function (id, rating_list, result) {
    dbConn.query("UPDATE RATING_LIST SET COUNTRY_CODE=? WHERE ID = ?", [rating_list.COUNTRY_CODE, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
RatingList.delete = function (id, result) {
    dbConn.query("DELETE FROM RATING_LIST WHERE ID = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log("ma wosil");
            result(null, res);
        }
    });
};

RatingList.deletebrand = function (id, result) {
    dbConn.query("DELETE FROM BRANDS_RATING_LIST WHERE ID = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log("wosil");
            result(null, res);
        }
    });
};
RatingList.updatebrand = function (id, rating_list, result) {
    dbConn.query("UPDATE BRANDS_RATING_LIST SET RATING=? WHERE ID = ?", [rating_list.RATING, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = RatingList;