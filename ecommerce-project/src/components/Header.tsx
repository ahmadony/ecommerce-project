import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import './header.css';

type HeaderProps = {
    cart: {
        productId: string;
        quantity: number;
        deliveryOptionId: string;
    }[];
};

function Header({ cart }: HeaderProps) {

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    let totalQuantity = 0;

    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });

    const handleSearch = () => {
        if (searchTerm.trim() === '') return;
        navigate(`/?search=${searchTerm}`);
    };

    return (
        <>
            <div className="header">
                <div className="left-section">
                    <Link to="/" className="logo">
                        Ecommerce
                    </Link>
                </div>

                <div className="middle-section">
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />

                    <button className="search-button" onClick={handleSearch}>
                        <img className="search-icon" src="images/icons/search-icon.png" />
                    </button>
                </div>

                <div className="right-section">
                    <Link className="orders-link header-link" to="/orders">

                        <span className="orders-text">Orders</span>
                    </Link>

                    <Link className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src="images/icons/cart-icon.png" />
                        <div className="cart-quantity">{totalQuantity}</div>
                        <div className="cart-text">Cart</div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Header;