let orders = [];
let nextOrderNumber = 1000;

exports.getAllOrders = (req, res) => {
  res.json({ orders });
};

exports.getOrderById = (req, res) => {
  const order = orders.find(o => o.orderNumber === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
};

exports.createOrder = (req, res) => {
  const { shippingInfo, paymentInfo, items, subtotal, shipping, tax, total } = req.body;

  if (!shippingInfo || !items || items.length === 0) {
    return res.status(400).json({ message: 'Shipping info and items are required' });
  }

  const order = {
    orderNumber: nextOrderNumber++,
    shippingInfo,
    paymentInfo: {
      last4: paymentInfo ? paymentInfo.cardNumber.slice(-4) : 'N/A',
      cardName: paymentInfo ? paymentInfo.cardName : 'N/A'
    },
    items,
    subtotal,
    shipping,
    tax,
    total,
    status: 'Pending',
    date: new Date().toISOString()
  };

  orders.unshift(order);
  res.status(201).json(order);
};

exports.updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = orders.find(o => o.orderNumber === parseInt(id));
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = status;
  res.json(order);
};
