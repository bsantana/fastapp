const INITIAL_STATE = {
    all: [],
    selected: null
};

export default (state = INITIAL_STATE, action) => {
    console.log('action');
    console.log(action);

    switch (action.type) {
        case 'FETCH_POSTS':
            return { ...state, all: action.payload };
        case 'FETCH_POST':
            return { ...state, selected: action.payload };
        default:
            return state;
    };
};