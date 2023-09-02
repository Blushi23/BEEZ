import axios from 'axios';
import Card from '../interfaces/Card';

const api: string = `${process.env.REACT_APP_API}/favorites`;

export function getFav(userId: string) {
    return axios.get(`${api}?userId=${userId}`);
}

export function createFav(userId: string) {
    return axios.post(api, { userId, cards: [] });
}
export async function addToFav(userId: string, cardToAdd: Card) {
    try {
        let res = await getFav(userId);
        res.data[0].cards.push({ ...cardToAdd });
        return axios.patch(`${api}/${res.data[0].userId}`, {
            cards: res.data[0].cards,
        });
    } catch (error) {
        console.log(error);
    }
}
export async function removeFromFav(userId: string, cardId: string) {
    try {
        let res = await getFav(userId);
        res.data[0].cards = res.data[0].cards.filter((card: Card) => card._id !== cardId);
        return axios.patch(`${api}/${res.data[0].id}`, {
            cards: res.data[0].cards,
        });
    } catch (error) {
        console.log(error);
    }
}
