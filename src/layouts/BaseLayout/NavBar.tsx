import { MenuIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import Cart from "pages/Cart";
import Home from "pages/Home";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "stores";

type NavBarProps = {};

const NavBar = (props: NavBarProps) => {
  const cart = useCartStore((state) => state.cart);
  const totalCartItems = useMemo(() => {
    return cart.reduce((total, item) => {
      total += item.quantity;
      return total;
    }, 0);
  }, [cart]);

  const iconClassName = "w-6 h-6 md:w-10 md:h-10";

  return (
    <div className="sticky top-0 bg-white z-10 shadow">
      <nav className="flex justify-between root-wrapper items-center px-4 py-2 ">
        <MenuIcon className={iconClassName} />
        <Link to={Home.path}>Demo Store</Link>
        <Link to={Cart.path} title="Cart" className="relative">
          <ShoppingCartIcon
            aria-label="cart"
            role="button"
            className={iconClassName}
          />
          {!!totalCartItems && (
            <span
              title="Total items"
              className="text-xs md:text-sm absolute -top-1 md:top-0 p-1 -right-[5px] md:-right-[2px] min-w-[1rem] max-h-[1rem] rounded-full bg-blue-500 text-white flex justify-center items-center"
            >
              {totalCartItems < 9 ? totalCartItems : "9+"}
            </span>
          )}
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
