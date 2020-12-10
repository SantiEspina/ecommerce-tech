import { FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS, FIND_PRODUCT_FAIL, ORDER_BY_FILT, ADD_PRODUCT } from './constants';

let initialState = [
    {
        name: 'teclado',
        description: 'asdfdasf',
        image: 'http://www.lojafoxgames.com.br/admin/produtos/produto_04_06_2018_1528128984.jpg',
        price: 20,
        stock: 5,
        id: 1
    },
    {
        name: 'mouse',
        description: 'asdfdasf',
        image: 'http://www.tecknet.co.uk/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/m/2/m268-red-4-1.jpg',
        price: 50,
        stock: 10,
        id: 2
    },
    {
        name: 'monitor',
        description: 'asdfdasf',
        image: 'https://images.anandtech.com/doci/11347/predator-01_678x452.jpg',
        price: 100,
        stock: 15,
        id: 3
    },
    {
        name: 'notebook',
        description: 'asdfdasf',
        image: 'https://gamehall.com.br/wp-content/uploads/2017/01/predator-21x.jpg',
        price: 200,
        stock: 20,
        id: 4
    },
    {
        name: 'compu',
        description: 'asdfdasf',
        image: 'https://cdn.mos.cms.futurecdn.net/B6sGQ8Rv5KGKfXDH7KUnVJ-1200-80.jpg',
        price: 500,
        stock: 2,
        id: 5
    },
    {
        name: 'compu',
        description: 'asdfdasf',
        image: 'https://cdn.mos.cms.futurecdn.net/B6sGQ8Rv5KGKfXDH7KUnVJ-1200-80.jpg',
        price: 500,
        stock: 2,
        id: 5
    }
];

export default function findProductReducer(state = initialState, action) {
    switch(action.type) {
        case FIND_PRODUCT_REQUEST:
            return { loading: true};
        case FIND_PRODUCT_SUCCESS: 
            return state.filter(p => p.name == action.payload)
        case FIND_PRODUCT_FAIL:
            return {loading:false, error:action.payload}
        case ORDER_BY_FILT: 
            let sort = action.payload;
            return sort === 'newest' ?
            (state.sort((a, b) => 
                a.id < b.id ?
                1 : -1
            )) : (
                sort === 'lowest' ?
                (state.sort((a, b) => 
                    a.price > b.price ?
                    1 : -1
                )) : (
                    state.sort((a, b) => 
                        a.price < b.price ? 
                        1 : -1
                    )
                )
            );
        case ADD_PRODUCT:
            return [
                ...state,
                action.payload
            ]
        default: return state;
    }
}