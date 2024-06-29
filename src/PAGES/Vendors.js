import React, { useState, useEffect } from 'react';
import { getVendors } from './SERVICES/api';

export const Vendors = () => {

    const [items, setItems] = useState();

    useEffect(() => {
        getVendors().then((resp) => {
            setItems(resp.data);
        })
    }, []);

    return (
        <div>
            <h1>VENDOR:</h1>
            {items.map((item) => (
                <div key={item._id}>
                    <div> Name: {item.vendors} </div>
                    <div> Phone: {item.phone}</div>
                </div>
            ))}
        </div>
    )
}