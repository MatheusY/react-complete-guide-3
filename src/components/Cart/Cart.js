import React from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [didSumitOrder, setDidSumitOrder] = useState(false);
  const http = useHttp();
  const { isLoading, sendRequest: saveOrder } = http;

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submitOrderHandler = (userData) => {
    saveOrder({
      url: "https://react-http-c01a6-default-rtdb.firebaseio.com/orders.json",
      method: "POST",
      body: { user: userData, orderdItems: cartContext.items },
    })
      .then(setDidSumitOrder(true))
      .then(cartContext.clearCart());
  };

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittngModalContent = <p>Sending order data...</p>;

  const didSumbitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isLoading && !didSumitOrder && cartModalContent}
      {isLoading && isSubmittngModalContent}
      {!isLoading && didSumitOrder && didSumbitModalContent}
    </Modal>
  );
};

export default Cart;
