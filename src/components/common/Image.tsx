import {
  LazyLoadImage,
  LazyLoadImageProps,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface ImageProps extends LazyLoadImageProps {}

const Image = ({
  src,
  // height = 200,
  // width = 200,
  ...restProps
}: ImageProps) => {
  return (
    <LazyLoadImage
      src={`${process.env.REACT_APP_IMAGE_PREFIX_URL}/${src}`}
      effect="blur"
      {...restProps}
    />
  );
};

export default Image;
