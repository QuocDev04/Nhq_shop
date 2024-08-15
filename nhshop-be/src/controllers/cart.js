import { StatusCodes } from "http-status-codes";
import Cart from "../models/cart";
import Product from "../models/product";

// Lấy danh sách sản phẩm thuộc 1 user
export const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId").populate("products.attributes.ValueAttributeId");
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Cart not found" });
    }
    cart.products = cart.products.filter((item) => item.productId);
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
          gallery: item.productId.gallery,
          total: finalPrice * item.quantity,
          attributes: item.attributes || {},
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
        (acc, item) => acc + (item.productId.discount || 0),
        0
      ),
      finalTotalPrice: cart.products.reduce(
        (acc, item) =>
          acc +
          (item.productId.price || 0) * (item.quantity || 0) -
          (item.productId.discount || 0),
        0
      ),
    };
    return res.status(StatusCodes.OK).json(cartData);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to get cart data" });
  }
};

// Thêm sản phẩm vào giỏ hàng
export const addItemToCart = async (req, res) => {
  const { userId, productId, quantity, attributes } = req.body;

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

    const existProductIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId &&
        JSON.stringify(item.attributes) === JSON.stringify(attributes)
    );

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Product not found" });
    }

    const productPrice = product.price || 0;
    const productDiscount = product.discount || 0;
    const finalProductPrice = productPrice - productDiscount;

    if (existProductIndex !== -1) {
      cart.products[existProductIndex].quantity += quantity;
      cart.products[existProductIndex].price = productPrice;
      cart.products[existProductIndex].discount = productDiscount;
      cart.products[existProductIndex].finalPrice = finalProductPrice;
    } else {
      cart.products.push({
        productId,
        quantity,
        price: productPrice,
        discount: productDiscount,
        finalPrice: finalProductPrice,
        attributes,
      });
    }

    // Cập nhật tổng số lượng, tổng giá trị, tổng khuyến mãi và giá cuối cùng
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

// Xoá Sản phẩm theo productID và Attribute
export const removeFromCart = async (req, res) => {
  const { userId, productId, attributes } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Cart not found" });
    }

    // Xóa sản phẩm dựa theo productId và attributes (ValueAttributeId)
    cart.products = cart.products.filter(
      (product) => {
        if (product.productId.toString() !== productId) {
          return true; // Giữ lại sản phẩm nếu productId không khớp
        }
        // So sánh thuộc tính bằng JSON.stringify
        const attributesValue = JSON.stringify(product.attributes) === JSON.stringify(attributes);
        // Loại bỏ sản phẩm nếu tất cả thuộc tính khớp
        return !attributesValue;
      }
    );

    // Cập nhật tổng số lượng, tổng giá trị, tổng khuyến mãi và giá cuối cùng
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
    console.error("Error removing item from cart:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng thuộc 1 user
export const updateProductQuantity = async (req, res) => {
  const { userId, productId, quantity, attributes } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Cart not found" });
    }
    const product = cart.products.find(
      (item) => item.productId.toString() === productId &&
      JSON.stringify(item.attributes) === JSON.stringify(attributes)
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
  } catch (error) { }
};

// Tăng số lượng của sản phẩm trong giỏ hàng
export const increaseProductQuantity = async (req, res) => {
  const { userId, productId, attributes } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId &&
        JSON.stringify(item.attributes) === JSON.stringify(attributes)
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    product.quantity++;

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

// Giảm số lượng của sản phẩm trong giỏ hàng
export const decreaseProductQuantity = async (req, res) => {
  const { userId, productId, attributes } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId &&
      JSON.stringify(item.attributes) === JSON.stringify(attributes)
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (product.quantity > 1) {
      product.quantity--;
    }
    else if (product.quantity === 1) {
      cart.products = cart.products.filter(
        (product) =>{
          if (product.productId.toString() !== productId) {
            return true;
          }
          const attributesValue = JSON.stringify(product.attributes) === JSON.stringify(attributes)
          return !attributesValue;
        }
      )
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
