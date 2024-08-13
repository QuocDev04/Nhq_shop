import { StatusCodes } from "http-status-codes";
import Cart from "../models/cart";
import Product from "../models/product";

// Lấy danh sách sản phẩm thuộc 1 user

export const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  console.log("Received request to get cart for userId:", userId);

  try {
    const cart = await Cart.findOne({ userId })
      .populate("products.productId")
      .populate("products.attribute.attributeId")
      .populate("products.attribute.ValueAttributeId");

    console.log("Fetched cart:", cart);

    if (!cart) {
      console.log("Cart not found for userId:", userId);
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Cart not found" });
    }

    const cartData = {
      products: cart.products.map((item) => {
        const price = item.productId.price;
        const discount = item.productId.discount || 0;
        const finalPrice = price - discount;

        return {
          productId: item.productId._id,
          name: item.productId.name,
          price,
          discount,
          finalPrice,
          quantity: item.quantity,
          img: item.productId.img,
          total: finalPrice * item.quantity,
          attributes: item.attribute.map((attr) => ({
            attributeId: attr.attributeId._id,
            attributeName: attr.attributeId.name,
            valueAttributeId: attr.ValueAttributeId._id,
            name: attr.ValueAttributeId.name,
          })),
        };
      }),
      totalQuantity: cart.products.reduce(
        (acc, item) => acc + (item.quantity || 0),
        0
      ),
      totalPrice: cart.products.reduce(
        (acc, item) => acc + (item.productId.price || 0) * (item.quantity || 0),
        0
      ),
      totalDiscount: cart.products.reduce(
        (acc, item) =>
          acc + (item.productId.discount || 0) * (item.quantity || 0),
        0
      ),
      finalTotalPrice: cart.products.reduce(
        (acc, item) => acc + item.finalPrice * (item.quantity || 0),
        0
      ),
    };

    console.log("Cart data to be returned:", cartData);

    return res.status(StatusCodes.OK).json(cartData);
  } catch (error) {
    console.error("Failed to get cart data:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to get cart data" });
  }
};

// Thêm sản phẩm vào giỏ hàng

export const addItemToCart = async (req, res) => {
  const { userId, productId, quantity, attribute } = req.body;

  if (!userId || !productId || !Number.isInteger(quantity) || quantity <= 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid input data" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Product not found" });
    }

    const { name, img, price = 0, discount = 0, shippingCosts } = product;
    const productPrice = product.price || 0;
    const productDiscount = product.discount || 0;
    const finalProductPrice = productPrice - productDiscount;

    // Tạo một đối tượng sản phẩm mới với thuộc tính
    const newProduct = {
      productId,
      quantity,
      name,
      img,
      price,
      shippingCosts,
      discount,
      finalPrice: finalProductPrice,
      attribute: attribute || [],
    };

    // Kiểm tra xem sản phẩm với cùng thuộc tính đã tồn tại chưa
    const existProductIndex = cart.products.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        JSON.stringify(item.attribute) === JSON.stringify(attribute)
    );

    if (existProductIndex !== -1) {
      // Nếu đã tồn tại sản phẩm với thuộc tính đó, cập nhật số lượng của sản phẩm
      cart.products[existProductIndex].quantity += quantity;
      cart.products[existProductIndex].price = price;
      cart.products[existProductIndex].discount = discount;
      cart.products[existProductIndex].finalPrice = finalProductPrice;
    } else {
      // Nếu không tồn tại, thêm sản phẩm mới vào giỏ hàng
      cart.products.push(newProduct);
    }

    // Cập nhật tổng số lượng và giá
    cart.totalQuantity = cart.products.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0
    );
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + (item.finalPrice || 0),
      0
    );
    cart.totalDiscount = cart.products.reduce(
      (acc, item) => acc + (item.discount || 0),
      0
    );
    cart.finalTotalPrice = cart.products.reduce(
      (acc, item) => acc + (item.finalPrice || 0) * (item.quantity || 0),
      0
    );

    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    console.error("Error adding item to cart: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

// Xóa sản phẩm trong giỏ hàng thuộc 1 user

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Cart not found" });
    }
    cart.products = cart.products.filter(
      (product) =>
        product.productId && product.productId.toString() !== productId
    );
    cart.totalQuantity = cart.products.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0
    );
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + (item.finalPrice || 0),
      0
    );
    cart.totalDiscount = cart.products.reduce(
      (acc, item) => acc + (item.discount || 0),
      0
    );
    cart.finalTotalPrice = cart.products.reduce(
      (acc, item) => acc + (item.finalPrice || 0) * (item.quantity || 0),
      0
    );

    // Đảm bảo các trường là số hợp lệ
    cart.totalQuantity = Number.isFinite(cart.totalQuantity)
      ? cart.totalQuantity
      : 0;
    cart.totalPrice = Number.isFinite(cart.totalPrice) ? cart.totalPrice : 0;
    cart.totalDiscount = Number.isFinite(cart.totalDiscount)
      ? cart.totalDiscount
      : 0;
    cart.finalTotalPrice = Number.isFinite(cart.finalTotalPrice)
      ? cart.finalTotalPrice
      : 0;
    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Internal Server Error" });
  }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng thuộc 1 user

export const updateProductQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Cart not found" });
    }

    const product = cart.products.find(
      (item) =>
        item.productId.toString() === productId &&
        JSON.stringify(item.attribute) === JSON.stringify(attribute)
    );
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }
    product.quantity = quantity;
    cart.totalQuantity = cart.products.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0
    );
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + (item.finalPrice || 0),
      0
    );
    cart.totalDiscount = cart.products.reduce(
      (acc, item) => acc + (item.discount || 0),
      0
    );
    cart.finalTotalPrice = cart.products.reduce(
      (acc, item) => acc + (item.finalPrice || 0) * (item.quantity || 0),
      0
    );
    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {}
};

// Tăng số lượng của sản phẩm trong giỏ hàng

export const increaseProductQuantity = async (req, res) => {
  const { userId, productId, attribute } = req.body;

  try {
    // Tìm giỏ hàng của người dùng
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Tìm sản phẩm trong giỏ hàng với thuộc tính cụ thể
    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Tăng số lượng sản phẩm
    product.quantity++;

    // Cập nhật tổng số lượng và giá
    cart.totalQuantity = cart.products.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0
    );
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
      0
    );
    cart.totalDiscount = cart.products.reduce(
      (acc, item) => acc + (item.discount || 0) * (item.quantity || 0),
      0
    );
    cart.finalTotalPrice = cart.products.reduce(
      (acc, item) => acc + (item.finalPrice || 0) * (item.quantity || 0),
      0
    );

    // Lưu giỏ hàng cập nhật
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Giảm số lượng của sản phẩm trong giỏ hàng

export const decreaseProductQuantity = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (product.quantity > 1) {
      product.quantity--;
    } else if (product.quantity === 1) {
      cart.products = cart.products.filter(
        (product) =>
          product.productId && product.productId.toString() !== productId
      );
    }
    cart.totalQuantity = cart.products.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0
    );
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + (item.finalPrice || 0),
      0
    );
    cart.totalDiscount = cart.products.reduce(
      (acc, item) => acc + (item.discount || 0),
      0
    );
    cart.finalTotalPrice = cart.products.reduce(
      (acc, item) => acc + (item.finalPrice || 0) * (item.quantity || 0),
      0
    );
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
