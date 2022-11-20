import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../redux/cartSlice";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
const cx = classNames.bind(styles);

const Product = () => {
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const id = location.pathname.split("/")[2];
  const [cartQuantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const addCard = () => {
    dispatch(add({ ...product, cartQuantity }));
  };

  const handleQuantity = (type) => {
    if (type === "dec") {
      cartQuantity > 1 && setQuantity(cartQuantity - 1);
    } else {
      setQuantity(cartQuantity + 1);
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await publicRequest.get("/product/find/" + id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);
  console.log(product);
  return (
    <div className={cx("container")}>
      <div className={cx("block-top")}>
        <div className={cx("image")}>
          <img src={product.image} alt="" className={cx("img")} />
        </div>
        <div className={cx("right")}>
          <div className={cx("block-name")}>
            <div className={cx("name")}>{product.title}</div>
            <div className={cx("price")}>$ {product.price}</div>
          </div>
          <div className={cx("color")}>
            <div className={cx("title")}>COLOUR</div>
            <button
              style={{ backgroundColor: product.color }}
              className={cx("color-btn")}
            ></button>
          </div>
          <div className={cx("quantity")}>
            <span className={cx("title")}>QUANTITY:</span>
            <div className={cx("count")}>{cartQuantity}</div>
          </div>
          <div>
            <button className={cx("btn-add")} onClick={addCard}>
              add to cart
            </button>
          </div>
          <div className={cx("des")}>
            <p className={cx("p")}>FreeShip</p>
            <p className={cx("p")}>Free Return</p>
            <p className={cx("p")}>
              Customs taxes and fees will be applied upon delivery in accordance
              with Vietnam Customs regulations
            </p>
          </div>
        </div>
      </div>

      <div className={cx("bottom")}>
        <div className={cx("desc-title")}>describe</div>
        <div className={cx("desc")}>
         {product.desc}
        </div>
        <div className={cx("block")}>
          <div className={cx("thickness")}>
            <div className={cx("thickness-name")}>Thickness</div>
            <div className={cx("prop")}>{product.thickness}</div>
          </div>
          <div className={cx("thickness")}>
            <div className={cx("thickness-name")}>Color</div>
            <div className={cx("prop")}>{product.color}</div>
          </div>
          <div className={cx("thickness")}>
            <div className={cx("thickness-name")}>Move</div>
            <div className={cx("prop")}>{product.Move}</div>
          </div>
          <div className={cx("thickness")}>
            <div className={cx("thickness-name")}>Material</div>
            <div className={cx("prop")}>{product.Material}</div>
          </div>
          <div className={cx("thickness")}>
            <div className={cx("thickness-name")}>Strap</div>
            <div className={cx("prop")}>{product.Strap}</div>
          </div>
          <div className={cx("thickness")}>
            <div className={cx("thickness-name")}>SwapStraps</div>
            <div className={cx("prop")}>{product.SwapStraps}</div>
          </div>
          <div className={cx("thickness")}>
            <div className={cx("thickness-name")}>Waterproof</div>
            <div className={cx("prop")}>{product.Waterproof}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
