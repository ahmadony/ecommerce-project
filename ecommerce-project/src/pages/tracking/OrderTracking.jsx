import dayjs from "dayjs";
import { Link } from "react-router";

function OrderTracking({orderProduct, currentStatus, displayedProgress}) {
    return (
        <div className="order-tracking">
            <Link className="back-to-orders-link link-primary" to="/orders">
                View all orders
            </Link>

            <div className="delivery-date">
                Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="product-info">
                {orderProduct.product.name}
            </div>

            <div className="product-info">
                Quantity: {orderProduct.quantity}
            </div>

            <img className="product-image" src={orderProduct.product.image} />

            <div className="progress-labels-container">
                <div className={`progress-label ${currentStatus === 'Preparing' ? 'current-status' : ''}`}>
                    Preparing
                </div>
                <div className={`progress-label ${currentStatus === 'Shipped' ? 'current-status' : ''}`}>
                    Shipped
                </div>
                <div className={`progress-label ${currentStatus === 'Delivered' ? 'current-status' : ''}`}>
                    Delivered
                </div>
            </div>

            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${displayedProgress}%` }}></div>
            </div>
        </div>
    );
}

export default OrderTracking;