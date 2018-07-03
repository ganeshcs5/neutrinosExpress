var express = require('express');
var router = express.Router();
var productDB = require('../model/product');
var cartDB = require('../model/cart');

router.get('/:id', function (req, res, next) {
    let responseData = [];
    cartDB.find({ email: req.params.id }, function (err, dataCart) {
        productDB.find({}, function (err, dataProduct) {
            if (err) {
                res.json(err);
            } else {
                for (let i = 0; i < dataProduct.length; i++) {
                    let lenthOfData = responseData.length;
                    for (let j = 0; j < dataCart.length; j++) {
                        if (dataProduct[i]._id + "" === dataCart[j].productId + "") {
                            let object = {};
                            object = dataProduct[i].toJSON();
                            object["canAdd"] = false;
                            responseData.push(object)
                            break;
                        }

                    }
                    if (lenthOfData == responseData.length) {
                        let object = {};
                        object = dataProduct[i].toJSON();
                        object["canAdd"] = true;
                        responseData.push(object)
                    }
                }
                res.json(responseData);
            }

        })

    });
});

router.post('/', function (req, res, next) {
    let productData = new productDB(req.body);
    productData.save(function (err, result) {
        if (err) {
            res.json({
                message: "Could not save the product"
            })
        } else {
            res.json(result)
        }
    })

});


module.exports = router;