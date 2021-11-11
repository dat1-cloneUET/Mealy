import React, { useState, useEffect, useMemo } from "react";
import Food from "../../atom/Food/Food";
import FoodIcon from "../../atom/FoodIcon/FoodIcon";
import styles from "./MenuScreen.module.scss";
import { motion } from "framer-motion";
// import { useBooking } from '../../context/BookingProvider'
import { useLoader } from "../../context/LoaderProvider";
import { getAllFood } from "../../../GraphQL/query";
function MenuScreen() {
  const [active, setActive] = useState("none");
  const [listFood, setListFood] = useState([]);
  const { turnOffLoader, turnOnLoader } = useLoader();
  const handleChooseCategory = (val) => {
    if (active === val) setActive("none");
    else setActive(val);
  };
  // const { listItem }= useBooking();
  useEffect(() => {
    // turnOnLoader();
    getAllFood()
      .then((res) => {
        const { message, data } = res.data.food;
        if (message === "success") setListFood(data);
      })
      // .finally(() => turnOffLoader());
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0.4, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.mainComponent}
    >
      <div className={styles.leftComponent}>
        <p className={styles.text}>Popular Category</p>
        <div className={styles.listIcon}>
          <div className={styles.list}>
            <FoodIcon
              type={"pizza"}
              active={active === "pizza"}
              handleChooseCategory={() => handleChooseCategory("pizza")}
            />
            <FoodIcon
              type={"burger"}
              active={active === "burger"}
              handleChooseCategory={() => handleChooseCategory("burger")}
            />
            <FoodIcon
              type={"sandwitch"}
              active={active === "sandwitch"}
              handleChooseCategory={() => handleChooseCategory("sandwitch")}
            />
            <FoodIcon
              type={"chicken"}
              active={active === "chicken"}
              handleChooseCategory={() => handleChooseCategory("chicken")}
            />
            <FoodIcon
              type={"pasta"}
              active={active === "pasta"}
              handleChooseCategory={() => handleChooseCategory("pasta")}
            />
            <FoodIcon
              type={"desert"}
              active={active === "desert"}
              handleChooseCategory={() => handleChooseCategory("desert")}
            />
          </div>
          <div className={styles.listFood}>
            {listFood.filter((item) => {
              if(active === 'none') return item;
              else return item.type === active
            }).map((item) => (
              <Food
                id={item.id}
                type={item.type}
                name={item.food_name}
                price={item.price}
                key={item.id}
              />
            ))}
          </div>
        </div>
      </div>
      <img src="/image/svg/bigIcon.svg" alt="" className={styles.bigIcon} />
    </motion.div>
  );
}

export default React.memo(MenuScreen);
