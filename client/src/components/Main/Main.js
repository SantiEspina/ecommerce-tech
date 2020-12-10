import React from 'react';
import Product from './Product/Product.js';
import Filter from './Filter/Filter.js';
import { connect } from 'react-redux';

import './Main.scss';

function Main ({prueba}) {
    return (
        <div className='main'>
            <Filter products={prueba.length}/>
            <Product prop={prueba}/>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        prueba: state
    }
};


export default connect(mapStateToProps, null)(Main);