import axios from 'axios';
import Card from '../interfaces/Card';
import _ from "lodash";
// import { string } from 'yup';
// import { Card } from 'react-bootstrap';

let api: string = `${process.env.REACT_APP_API}/favorites`;

// export function getFav(userId: string) {
//     return axios.get(`${api}?userId=${userId}`);
// }
export function getFav() {
    return axios.get(api, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}

export function createFav(userId: string) {
    return axios.post(api, { userId, cards: [] });
}

export function addOrRemoveFromFav(cardToAdd: string) {
    const cardId = { _id: cardToAdd }
    // let card = _.pick(cardToAdd, [
    //     "title",
    //     "subtitle",
    //     "description",
    //     "phone",
    //     "email",
    //     "web",
    //     "imageUrl",
    //     "imageAlt",
    //     "state",
    //     "country",
    //     "city",
    //     "street",
    //     "houseNumber",
    //     "zip",
    //     "_id",
    //     "owner",
    // ]);
    return axios.post(api, cardId, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string).token
        },

    })
}
// export async function addToFav(userId: string, cardToAdd: Card) {
//     try {
//         let res = await getFav(userId);
//         res.data[0].cards.push({ ...cardToAdd });
//         return axios.patch(`${api}/${res.data[0].userId}`, {
//             cards: res.data[0].cards,
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
// export async function removeFromFav(userId: string, cardId: string) {
//     try {
//         let res = await getFav(userId);
//         res.data[0].cards = res.data[0].cards.filter((card: Card) => card._id !== cardId);
//         return axios.patch(`${api}/${res.data[0].id}`, {
//             cards: res.data[0].cards,
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
