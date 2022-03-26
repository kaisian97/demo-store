import Button from "components/common/Button";
import Home from "pages/Home";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center mx-16 my-8">
      <div className="font-medium mb-4">There is no item in cart.</div>
      <Button className="w-full" onClick={() => navigate(Home.path)}>
        Back to store
      </Button>
    </div>
  );
};

export default EmptyCart;
