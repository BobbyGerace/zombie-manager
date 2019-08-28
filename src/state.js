let id = 1000;

export const locations = {
    warehouse: 0,
    hospital: 1,
    school: 2,
};

export const initialState = {
    location: locations.warehouse,
    inputValue: '',
    zombies: [
        { id: 1, name: 'Frankenstein', location: locations.warehouse },
        { id: 2, name: 'Jon Snow', location: locations.warehouse },
        { id: 3, name: 'Lazarus', location: locations.hospital },
        { id: 4, name: 'Kenny', location: locations.school },
        { id: 5, name: 'Fred', location: locations.school },
    ],
};

export const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD': 
            return {
                ...state,
                inputValue: '',
                zombies: state.zombies.concat([{
                    id: id++,
                    name: state.inputValue,
                    location: state.location,
                }]),
            };
        case 'CHANGE_TAB':
            return {
                ...state,
                location: action.id,
            };
        case 'ON_INPUT':
            return {
                ...state,
                inputValue: action.value,
            };
        case 'KILL':
            return {
                ...state,
                zombies: state.zombies.filter(z => z.id !== action.id),
            };
        case 'MOVE':
            return {
                ...state,
                zombies: state.zombies.map(
                    z => z.id === action.id ? { ...z, location: action.location } : z
                ),
            };
        default:
            return state;
    }
};

export const actions = {
    changeTab(id) {
        return {
            type: 'CHANGE_TAB',
            id,
        };
    },
    add() {
        return {
            type: 'ADD',
        };
    },
    onInput(value) {
        return {
            type: 'ON_INPUT',
            value,
        };
    },
    kill(id) {
        return {
            type: 'KILL',
            id,
        };
    },
    move(id, location) {
        return {
            type: 'MOVE',
            id,
            location,
        };
    },
};

export function countZombiesByLocation(zombies, location) {
    return zombies.filter(z => z.location === location).length;
}
