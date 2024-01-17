const jwt = require('jsonwebtoken');

const generateAccessToken = (id, name, isPremium) => {
    return jwt.sign({ userID: id, name: name, isPremium: isPremium }, 'any secret key string');
}

exports.updateTrans = async (req, res, next) => {
    try {
        // change auth token -> old token + premium
        const token = req.header('Authorization');
        const userDetails = jwt.verify(token, 'any secret key string');
        newToken = generateAccessToken(userDetails.userID, userDetails.name, true);

        // update successfull order
        const order_id = req.body.order_id;

        const order = await req.user.getOrders({ where: { orderId: order_id } });
        order[0].paymentId = req.body.payment_id;
        order[0].status = 'SUCCESS';
        const updateOrder = await order[0].save();

        res.status(201).json({ token: newToken, order: updateOrder });
    }
    catch (err) {
        console.log(err);
    }
}