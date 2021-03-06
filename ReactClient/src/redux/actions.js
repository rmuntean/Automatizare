
// Action types
export const LOGGED_IN = 'LOGGED_IN';
export const TOGGLE_MENU = 'TOGGLE_MENU';
export const GOT_USERS = 'GOT_USERS';
export const GOT_TEMPERATURE = 'GOT_TEMPERATURE';

// Action creators

export function logIn(value) {
    return {
        type: LOGGED_IN,
        value
    };
}

export function toggleMenu(value) {
    return {
        type: TOGGLE_MENU,
        value
    };
}

export function gotUsers(value) {
    return {
        type: GOT_USERS,
        value
    };
}

export function gotTemperature(value) {
    return {
        type: GOT_TEMPERATURE,
        value
    };
}
