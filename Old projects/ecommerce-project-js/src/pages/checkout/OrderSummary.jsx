import axios from "axios";
import { useState } from "react";
import DeliveryOptions from "./DeliveryOptions";
import dayjs from "dayjs";
import formatMoney from "../../utils/money";
function OrderSummary({ cart, deliveryOptions, loadCart }) {

    const [editingProductId, setEditingProductId] = useState(null);
    const [newQuantity, setNewQuantity] = useState('');
    return (
        <>
            <div className="order-summary">
                {deliveryOptions.length > 0 && cart.map((cartItem) => {

                    let selectedDeliveryOption = deliveryOptions
                        .find((deliveryOption) => {
                            return deliveryOption.id === cartItem.deliveryOptionId
                        });

                    const deleteCartItem = async () => {
                        await axios.delete(`/api/cart-items/${cartItem.productId}`);
                        await loadCart();
                    };

                    const updateCartItem = async () => {
                        await axios.put(`/api/cart-items/${cartItem.productId}`, {
                            quantity: Number(newQuantity)
                        });
                        await loadCart();
                        setEditingProductId(null);
                    };

                    return (
                        <div key={cartItem.productId} className="cart-item-container">
                            <div className="delivery-date">
                                Delivery date: {dayjs(selectedDeliveryOption.
                                    estimatedDeliveryTimeMs).format('dddd, MMMM, D')
                                }
                            </div>

                            <div className="cart-item-details-grid">
                                <img className="product-image"
                                    src={cartItem.product.image} />

                                <div className="cart-item-details">
                                    <div className="product-name">
                                        {cartItem.product.name}
                                    </div>
                                    <div className="product-price">
                                        {formatMoney(cartItem.product.priceCents)}
                                    </div>
                                    <div className="product-quantity">
                                        {editingProductId === cartItem.productId ? (
                                            <>
                                                <input
                                                    type="number"
                                                    className="quantity-input"
                                                    value={newQuantity}
                                                    onChange={(event) => {
                                                        setNewQuantity(event.target.value);
                                                    }}
                                                />
                                                <span
                                                    className="save-quantity-link link-primary"
                                                    onClick={updateCartItem}>
                                                    Save
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span>
                                                    Quantity: <span className="quantity-label">
                                                        {cartItem.quantity}</span>
                                                </span>
                                                <span className="update-quantity-link link-primary"
                                                    onClick={() => {
                                                        setEditingProductId(cartItem.productId);
                                                        setNewQuantity(cartItem.quantity);
                                                    }}>
                                                    Update
                                                </span>
                                            </>
                                        )}
                                        <span className="delete-quantity-link link-primary"
                                            onClick={deleteCartItem}>
                                            Delete
                                        </span>
                                    </div>
                                </div>

                                <DeliveryOptions
                                    deliveryOptions={deliveryOptions}
                                    cartItem={cartItem}
                                    loadCart={loadCart}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default OrderSummary;