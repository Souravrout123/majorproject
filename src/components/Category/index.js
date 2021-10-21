import React from 'react';
import spiritual from '../../images/spiritual.jpg';
import garden from '../../images/garden.jpg';
import './styles.scss';


const ProductCategory = props => {
    return (
        <div className="ProductCategory">
            <div className="wrap">
                <div  className="item" style={{
                    backgroundImage: `url(${spiritual})`
            }}>
                <a>shop spiritual Products</a>
            </div>

                <div className="item" style={{
                    backgroundImage: `url(${garden})`
                 }}>
                     <a>Shop garden Products </a>
                </div>
            </div>
        </div>
    )

}

export default ProductCategory;


