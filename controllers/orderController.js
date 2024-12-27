const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.placeOrder = async (req, res) => {
  const { shippingAddress } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(400).json({ message: 'Cart not found' });

    let totalPrice = 0;
    const products = cart.products.map(product => {
      const price = 100; // Assume fixed price for now
      totalPrice += price * product.quantity;
      return { ...product, price };
    });

    const newOrder = new Order({
      userId,
      products,
      totalPrice,
      shippingAddress,
      paymentStatus: 'Pending',
      orderStatus: 'Pending'
    });

    await newOrder.save();
    await Cart.findOneAndDelete({ userId }); // Clear cart after placing order

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: 'Error placing order', error: err.message });
  }
};
