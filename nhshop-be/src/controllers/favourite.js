import { StatusCodes } from "http-status-codes";
import Favourite from "../models/favourite";

export const getFavouriteByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const favourite = await Favourite.findOne({ userId }).populate(
      "products.productId"
    );
    if (!favourite) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Favourite not found" });
    }
    const favouriteData = {
      productFavourite: favourite.products.map((item) => {
        return {
          productId: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          img: item.productId.img,
        };
      }),
    };
    return res.status(StatusCodes.OK).json(favouriteData);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to get favourite data" });
  }
};

export const postFavouriteByUserId = async (req, res) => {
  const { userId, productId } = req.body;
  if (!userId || !productId)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid input data" });
  try {
    let favourite = await Favourite.findOne({ userId });
    if (!favourite) {
      favourite = new Favourite({ userId, products: [] });
    }

    const exitsProductIndex = favourite.products.findIndex(
      (item) => item.productId.toHexString() === productId
    );
    if (exitsProductIndex === -1) {
        favourite.products.push({
            productId,
        })
    }
    await favourite.save()
    return res.status(StatusCodes.OK).json({favourite})
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to get favourite data" });
  }
};

export const delFavouriteByUserId = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const favourite = await Favourite.findOne({ userId })
    if (!favourite) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Favourite not found" });
    }
   favourite.products = favourite.products.filter(
    (productFavourite) =>
    productFavourite.productId && productFavourite.productId.toString() !== productId
   )
   await favourite.save()
    return res.status(StatusCodes.OK).json(favourite);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to get favourite data" });
  }
};
