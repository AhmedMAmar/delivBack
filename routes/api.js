let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Is Working',
        message: 'Api started',
    });
});
// Import contact controller
var orderController = require('../controllers/orderController');
// Contact routes
router.route('/orders')
    .get(orderController.index)
    .post(orderController.new);

router.route('/orders/:id')
    .get(orderController.view)
    .delete(orderController.delete);


// Export API routes
module.exports = router;