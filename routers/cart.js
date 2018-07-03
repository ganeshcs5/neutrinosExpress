var express = require('express');
var router = express.Router();
var cartDB = require('../model/cart');

router.get('/:email', function (req, res, next) {

    cartDB.find({ email: req.params.email }).populate('productId').exec(function (err, projects) {
        res.json(projects)
    })

});

router.post('/', function (req, res, next) {
    let cartData = new cartDB(req.body);
    console.log(cartData)
    cartData.save(function (err, result) {
        if (err) {
            res.json({
                message: "Could not save the cart"
            })
        } else {
            res.json(result)
        }
    });

});


router.delete('/:id', function (req, res) {
    console.log(req.params.id)
    cartDB.findById(req.params.id, function (err, cart) {

        if (err) {
            return res.status(500).json({
                title: 'An error occur',
                error: err
            });
        }
        if (!cart) {
            return res.status(500).json({
                title: 'No cart found',
                error: { cart: 'Message not found' }
            });
        }

        cart.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occur',
                    error: err
                });
            }

            res.status(200).json({
                message: 'delete',
                obj: result
            })
        })

    })



});


module.exports = router;