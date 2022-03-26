import { TrashIcon } from "@heroicons/react/solid";
import { Product } from "types";
import { formatPrice } from "utils";
import Image from "components/common/Image";
import { useCartStore } from "stores";

type CartItemProps = {
  item: Product & { quantity: number };
  className?: string;
};

const CartItem = ({ item, className = "" }: CartItemProps) => {
  const deleteCart = useCartStore((state) => state.deleteCart);

  return (
    <div
      key={item.id}
      className={`flex justify-between items-center space-x-2 md:space-x-4 py-2 border-b ${className}`}
    >
      <div className="flex flex-[3] items-center space-x-2 md:space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={item.image}
            alt={item.title}
            className="w-12 h-12 md:w-16 md:h-16"
          />
        </div>
        <div className="font-semibold text-sm md:text-base">
          {item.title} ({item.quantity})
        </div>
      </div>
      <div className="flex space-x-4 items-center min-w-[120px] md:min-w-[150px]">
        <TrashIcon
          aria-label="delete"
          role="button"
          data-testid="delete"
          className="w-5 h-5 cursor-pointer hover:text-red-500 transition"
          onClick={() => deleteCart(item)}
        />
        <div className="text-slate-500 text-xs md:text-sm w-[100px] whitespace-nowrap">
          {formatPrice(parseFloat(item.price) * item.quantity)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
