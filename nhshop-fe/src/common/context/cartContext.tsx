// cartContext.tsx
import React, { createContext, useState, ReactNode } from "react";

type CartProduct = {
    ProductId: string;
    quantity: number;
};

type Cart = {
    _id?: string;
    products: CartProduct[];
};

type CartContextType = {
    cart: Cart | null;
    setCart: (cart: Cart | null) => void;
};

export const cartCT = createContext<CartContextType>({
    cart: null,
    setCart: () => {},
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [cart, setCart] = useState<Cart | null>(null);

    return (
        <cartCT.Provider value={{ cart, setCart }}>{children}</cartCT.Provider>
    );
};
