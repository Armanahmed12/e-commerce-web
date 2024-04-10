import React from 'react';
import { useLocation } from 'react-router-dom';

const CheckOut = () => {
    const location = useLocation();
    return (
        <div>
            <h2>Proceed check out</h2>
        </div>
    );
};

export default CheckOut;