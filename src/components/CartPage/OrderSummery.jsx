
import { useNavigate } from "react-router-dom";
import Vector from "../../assets/Vector.png";

const OrderSummary = ({ items }) => {
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 0),
    0
  );
  const discount = subtotal * 0.2;
  const delivery = subtotal > 0 ? 15 : 0;
  const total = subtotal - discount + delivery;

  return (
    <div className="border-gray-200 border-[0.5px] rounded-xl p-4 space-y-4 max-h-96 overflow-auto">
      <h2 className="font-semibold text-lg">Order Summary</h2>

      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>${subtotal}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>Discount (20%)</span>
        <span className="text-red-500">-${discount.toFixed(0)}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>Delivery Fee</span>
        <span>${delivery}</span>
      </div>
      <hr />

      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>${total.toFixed(0)}</span>
      </div>

      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex relative flex-row min-w-50 item-center">
          <img
            src={Vector}
            alt=""
            className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Add promo code"
            className="rounded-3xl bg-gray-300 w-56 h-10 px-4 py-3 flex-1 pl-10 pr-4"
          />
        </div>
        <button className="px-4 bg-black rounded-3xl text-white">Apply</button>
      </div>

      <button
        onClick={() => navigate("/shiping")}
        className="w-full bg-black text-white py-3 rounded-3xl"
        disabled={items.length === 0}
      >
        Go to Checkout →
      </button>
    </div>
  );
};

export default OrderSummary;








