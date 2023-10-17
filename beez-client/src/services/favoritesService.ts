import axios from 'axios';
import _ from "lodash";

let api: string = `${process.env.REACT_APP_API}/favorites`;

export function getFav() {
    return axios.get(api, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}

export function createFav(userId: string) {
    return axios.post(api, { userId, cards: [] });
}

export function addOrRemoveFromFav(cardToAdd: string) {
    const cardId = { _id: cardToAdd }

    return axios.post(api, cardId, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string).token
        },
    })
}
