// Import order model
Order = require('../models/orders');
// Handle index actions
exports.index = function (req, res) {
    Order.get(function (err, orders) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Orders retrieved successfully",
            data: orders
        });
    });
};
// Handle create order request
exports.new = function (req, res) {
    var order = new Order();
    order.nameClient = req.body.nameClient ? req.body.nameClient : order.nameClient;
    order.nameOrder = req.body.nameOrder;
    order.priceOrder = req.body.priceOrder;
    order.imageOrder = req.body.imageOrder;
    order.latitude = req.body.latitude;
    order.longitude = req.body.longitude;
// save the order and check for errors
    order.save(function (err) {
        // Check for validation error
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New Order created!',
                data: order
            });
    });
};
// Handle view order info
exports.view = function (req, res) {
    Order.findById(req.params.id, function (err, order) {
        if (err)
            res.send(err);
        res.json({
            data: order
        });
    });
};

// Handle delete order
exports.delete = function (req, res) {
    Order.deleteOne({
        id: req.params.id
    }, function (err, order) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Order deleted'
        });
    });
};