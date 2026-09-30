
const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    cartId: Date.now(),  
    id: product.id,  
    name: product.title,
    img: product.image,
    price: product.price,
    size: product.size || "Large",
    color: product.color || "White",
    qty: 1                 
  });

  localStorage.setItem("cart", JSON.stringify(cart));
};

export default addToCart;




