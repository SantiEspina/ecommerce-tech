import React from 'react';
import { connect } from 'react-redux';
import { orderByFilt } from '../../../Redux/actions';

import './Filter.scss';

function Filter ({ products, orderByFilt }) {
    return (
        <div className='filterCnt'>
            <div>{products} Products</div>
            <div>
                Order By: {''}
                <select className='selectFilter' onChange={(e) => orderByFilt(e.target.value)}> 
                    <option value='newest'>Newest</option>
                    <option value='lowest'>Lowest</option>
                    <option value='highest'>Highest</option>
                </select>
            </div>
        </div>
    )
};  

export default connect(null, { orderByFilt })(Filter);