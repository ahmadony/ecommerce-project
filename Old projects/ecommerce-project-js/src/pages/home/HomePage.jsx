import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import Header from '../../components/Header';
import ProductsGrid from './ProductsGrid';

import './HomePage.css'

function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();

    const search = searchParams.get('search') || '';
    useEffect(() => {
        const getHomeData = async () => {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        };

        getHomeData();
    }, []);

    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
    });


    return (
        <>

            <title>Ecommerce Project</title>

            <Header cart={cart} />

            <div className="home-page">
                {filteredProducts.length === 0 ? (
                    <p className="no-products">
                        No products matched your search.
                    </p>
                ) : (
                    <ProductsGrid
                        products={filteredProducts}
                        loadCart={loadCart}
                    />
                )}
            </div>
        </>
    );
}

export default HomePage