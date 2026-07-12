import { Link } from 'react-router';
import axios from 'axios';
import { useState } from 'react';
import { Fragment } from 'react';
import dayjs from "dayjs";
import formatMoney from "../../utils/money";
function OrdersGrid({ orders, loadCart }) {

    const [addedProductIds, setAddedProductIds] = useState({});

    return (
        <>
            <div className="orders-grid">

                {orders.map((order) => {
                    return (
                        <div key={order.id} className="order-container">

                            <div className="order-header">
                                <div className="order-header-left-section">
                                    <div className="order-date">
                                        <div className="order-header-label">Order Placed:</div>
                                        <div>
                                            {dayjs(order.orderTimeMs).
                                                format('MMMM D')}
                                        </div>
                                    </div>
                                    <div className="order-total">
                                        <div className="order-header-label">Total:</div>
                                        <div>
                                            {formatMoney(order.totalCostCents)}
                                        </div>
                                    </div>
                                </div>

                                <div className="order-header-right-section">
                                    <div className="order-header-label">Order ID:</div>
                                    <div>{order.id}</div>
                                </div>
                            </div>

                            <div className="order-details-grid">
                                {order.products.map((orderProduct) => {

                                    const toCart = async () => {
                                        await axios.post(`/api/cart-items`, {
                                            productId: orderProduct.productId,
                                            quantity: orderProduct.quantity
                                        });
                                        await loadCart();

                                        setAddedProductIds((prev) => ({
                                            ...prev,
                                            [orderProduct.productId]: true
                                        }));

                                        setTimeout(() => {
                                            setAddedProductIds((prev) => ({
                                                ...prev,
                                                [orderProduct.productId]: false
                                            }));
                                        }, 2000);
                                    };

                                    return (
                                        <Fragment key={orderProduct.product.Id}>
                                            <div className="product-image-container">
                                                <img src={orderProduct.product.image} />
                                            </div>

                                            <div className="product-details">
                                                <div className="product-name">
                                                    {orderProduct.product.name}
                                                </div>
                                                <div className="product-delivery-date">
                                                    Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).
                                                        format('MMMM D')}
                                                </div>
                                                <div className="product-quantity">
                                                    Quantity: {orderProduct.quantity}
                                                </div>
                                                <button className="buy-again-button button-primary" onClick={toCart}>
                                                    {addedProductIds[orderProduct.productId] ? (
                                                        <>
                                                            <span className="checkmark">✓</span>
                                                            <span className="buy-again-message">Added</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                                            <span className="buy-again-message">Add to Cart</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            <div className="product-actions">
                                                <Link to="/tracking">
                                                    <button className="track-package-button button-secondary">
                                                        Track package
                                                    </button>
                                                </Link>
                                            </div>
                                        </Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default OrdersGrid;