import { useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Header from '../../components/Header';
import OrderTracking from './OrderTracking';
import './TrackingPage.css';

function TrackingPage({ cart }) {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');
    const productId = searchParams.get('productId');

    const [order, setOrder] = useState(null);
    const [orderProduct, setOrderProduct] = useState(null);
    const [displayedProgress, setDisplayedProgress] = useState(0);
    const [currentStatus, setCurrentStatus] = useState('Preparing');

    useEffect(() => {
        const fetchOrderData = async () => {
            const response = await axios.get('/api/orders?expand=products');
            const matchedOrder = response.data.find((order) => order.id === orderId);
            const matchedProduct = matchedOrder.products.find(
                (product) => product.productId === productId
            );
            setOrder(matchedOrder);
            setOrderProduct(matchedProduct);
        };
        fetchOrderData();
    }, [orderId, productId]);

    useEffect(() => {
        if (!order || !orderProduct) return;

        const orderTimeMs = order.orderTimeMs;
        const deliveryTimeMs = orderProduct.estimatedDeliveryTimeMs;
        const totalDuration = deliveryTimeMs - orderTimeMs;
        const timePassed = dayjs().valueOf() - orderTimeMs;

        let percent = (timePassed / totalDuration) * 100;
        if (percent > 100) percent = 100;
        if (percent < 0) percent = 0;

        if (percent >= 100) {
            setCurrentStatus('Delivered');
        } else if (percent >= 50) {
            setCurrentStatus('Shipped');
        } else {
            setCurrentStatus('Preparing');
        }

        const timer = setTimeout(() => {
            setDisplayedProgress(percent);
        }, 100);

        return () => clearTimeout(timer);
    }, [order, orderProduct]);

    if (!order || !orderProduct) {
        return null;
    }

    return (
        <>
            <title>Tracking</title>

            <Header cart={cart} />

            <div className="tracking-page">
                <OrderTracking 
                  orderProduct={orderProduct}
                  currentStatus={currentStatus}
                  displayedProgress={displayedProgress}/>
            </div>
        </>
    );
}

export default TrackingPage;