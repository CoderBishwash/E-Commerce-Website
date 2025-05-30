/**
 * cart key => cart-list
 * wishlist key => wish-list
*/

let LocalStorage = window.localStorage;

export const GetData = (key) => {
    let Data = LocalStorage.getItem(key);
    return Data == null ? [] : JSON.parse(Data);
};

export const SetData = (key, data) => {
    LocalStorage.setItem(key, JSON.stringify(data));
    return true;
}