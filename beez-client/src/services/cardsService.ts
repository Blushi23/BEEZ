import axios from "axios";
import Card from "../interfaces/Card";

let api: string = `${process.env.REACT_APP_API}/cards`

export function getCards() {
    return axios.get(api,
        // { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } }
    );
}
export function getCardById(id: string) {
    return axios.get(`${api}/${id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}

export function getCardByOwner(ownerEmail: string,) {
    return axios.get(`${api}/my-cards/${ownerEmail}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}

export function addCard(newCard: Card) {
    return axios.post(api, newCard, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}
export function updateCard(updatedCard: Card, id: string) {
    return axios.put(`${api}/${id}`, updatedCard, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}

export function deleteCard(id: string) {
    return axios.delete(`${api}/${id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}

