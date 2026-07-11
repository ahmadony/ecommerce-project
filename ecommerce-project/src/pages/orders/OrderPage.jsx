import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import OrdersGrid from './OrdersGrid';
import './OrderPage.css';
function OrderPage({ cart }) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrdersData = async () => {
            const response = await axios.get('/api/orders?expand=products');
            setOrders(response.data);
        };
        getOrdersData();
    }, []);


    return (
        <>
            <title>Orders</title>

            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} />
            </div>
        </>
    );
}

export default OrderPage;