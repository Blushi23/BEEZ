import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { successMsg } from "../services/feedbackService";
import { Link } from "react-router-dom";
import { deleteCard, getCards } from "../services/cardsService";
import { addToFav, getFav, removeFromFav } from "../services/favoritesService";
import BusinessModal from "./BusinessModal";
import { SiteTheme } from "../App";

interface HomeProps {
    userInfo: any;
    openModal: boolean;
    setOpenModal: Function;
    cards: any;
    setCards: Function;
}

const Home: FunctionComponent<HomeProps> = ({ userInfo, openModal, setOpenModal, cards, setCards }) => {
    let [favorites, setFavorites] = useState<number[]>([])
    let [cardsChanged, setCardsChanged] = useState<boolean>(false);
    let theme = useContext(SiteTheme);

    useEffect(() => {
        getFav(userInfo.userId).then((res) => {
            let userFavorites = res.data.find((fav: any) => fav.userId === userInfo.userId);
            let defaultCards: number[] = userFavorites?.cards.map((card: any) => card.id) || [];
            setFavorites(defaultCards)
        }).catch((err) => console.log(err))
        getCards().then((res) => setCards(res.data)).catch((err) => console.log(err));

    }, [cardsChanged, setCards, userInfo.userId]);
    //לבדוק אם באמת יש צורך ב-dependency של set cards

    let render = () => {
        setCardsChanged(!cardsChanged)
    }
    let handleDelete = (id: number) => {
        if (window.confirm("Are you sure?")) {
            deleteCard(id)
                .then((res) => {
                    render();
                    successMsg("Card deleted successfully!");
                })
                .catch((err) => console.log(err));
        }
    };

    let handleAddToFav = (card: Card) => {
        if (favorites.includes(card.id as number)) {
            removeFromFav(userInfo.userId, card.id as number)
                .then((res) => {
                    setFavorites(favorites.filter((id) => id !== card.id));
                    successMsg(`${card.title} business card was removed from favorites!`);
                })
                .catch((err) => { console.log(err); });
        } else {
            addToFav(userInfo.userId, card)
                .then((res) => {
                    setFavorites([...favorites, card.id as number]);
                    successMsg(`${card.title} business card was added to favorites!`);
                })
                .catch((err) => { console.log(err); });
        }
    };

    return (
        <div className={`${theme}`} >
            <h1 className="display-3 home-title mt-3">Welcome to BEEZ</h1>
            <h4 className="text-center">Here you can find all the businesses youv'e been looking for</h4>
            {(userInfo.role === "business" || userInfo.role === "admin") && (
                <Link to="/new" className="btn btn-success rounded-5"><i className="fa-solid fa-plus"></i></Link>)}

            {cards.length ? (
                <div className="container">
                    <div className="row">
                        {cards.map((card: Card) => (
                            <div
                                key={card.id}
                                className="card col-md-3 mx-2 my-2 "
                                style={{ width: "22rem" }}
                            >
                                <img
                                    src={card.imageUrl}
                                    className="card-img-top mt-2"
                                    style={{ width: "20rem", height: "12rem" }}
                                    alt={card.imageAlt}
                                    onClick={() => setOpenModal(card.id)}
                                />
                                <div className="card-title text-center mt-2">
                                    <h5>{card.title}</h5>
                                    <h6>{card.subtitle}</h6>
                                    <hr />
                                </div>
                                <div className="card-body mb-3">
                                    <p className="card-text">{card.description}</p>
                                    <p className="card-text">Phone: {card.phone} </p>
                                    <p className="card-text">Adress: {card.street} {card.houseNumber}, {card.city}, {card.country}</p>

                                    <div className="cardIcons">
                                        <div className="row">
                                            {userInfo.email && (
                                                <>
                                                    {(userInfo.email === card.owner || userInfo.role === "admin") && (
                                                        <div className="col left-icons text-start">
                                                            < Link to={`update/${card.id}`} className="mx-1">
                                                                <i className="fa-solid fa-pencil"></i>
                                                            </Link>
                                                            <Link to="" className=" btn" onClick={() => handleDelete(card.id as number)}>
                                                                <i className="fa-solid fa-trash" ></i>
                                                            </Link>
                                                        </div>
                                                    )}
                                                    <div className="col right-icons text-end">
                                                        <Link to={`tel:${card.phone}`}>
                                                            <i className="fa-solid fa-phone"></i></Link>

                                                        {userInfo.role && (favorites.includes(card.id as number) ? (<button className="btn star" onClick={() => handleAddToFav(card)}> <i className="fa-solid fa-star text-warning" ></i></button>) : (<button className="btn star" onClick={() => handleAddToFav(card)}> <i className="fa-regular fa-star" ></i></button>)
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                            {!userInfo.email && (
                                                <div className="single-icon text-end">
                                                    <Link to={`tel:${card.phone}`}>
                                                        <i className="fa-solid fa-phone"></i></Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
            ) : (
                <p>No products</p>
            )}
            <BusinessModal
                show={openModal}
                onHide={() => setOpenModal(false)}
                cardId={openModal} />
        </div>
    )
}
export default Home;
