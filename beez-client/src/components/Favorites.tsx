import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { addOrRemoveFromFav, getFav } from "../services/favoritesService";
import { Link, useNavigate } from "react-router-dom";
import { deleteCard, getCards } from "../services/cardsService";
import { successMsg } from "../services/feedbackService";
import BusinessModal from "./BusinessModal";

interface FavoritesProps {
    userInfo: any;
    openModal: boolean;
    setOpenModal: Function;
}

const Favorites: FunctionComponent<FavoritesProps> = ({ userInfo, openModal, setOpenModal }) => {
    let [savedCards, setSavedCards] = useState<Card[]>([]);
    let navigate = useNavigate();
    let [favorites, setFavorites] = useState<string[]>([])
    let [cardsChanged, setCardsChanged] = useState<boolean>(false);
    let render = () => {
        setCardsChanged(!cardsChanged)
    }

    let handleAddToFav = (card: Card) => {
        if (favorites.includes(card._id as string)) {
            addOrRemoveFromFav(card._id as string)
                .then((res) => {
                    setFavorites(favorites.filter((id) => id !== card._id));
                    render()
                    successMsg(`${card.title} business card was removed from favorites!`);
                })
                .catch((err) => { console.log(err); });
        } else {
            addOrRemoveFromFav(card._id as string)
                .then((res) => {
                    setFavorites([...favorites, card._id as string]);
                    successMsg(`${card.title} business card was added to favorites!`);
                })
                .catch((err) => { console.log(err); });
        }
    };

    let handleDelete = (id: string) => {
        if (window.confirm("Are you sure?")) {
            deleteCard(id)
                .then((res) => {
                    navigate("/favorites")
                    successMsg("Card deleted successfully!");
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {

        getFav().then((res) => {
            let defaultCards: string[] = res.data?.map((card: any) => card._id) || [];
            setFavorites(defaultCards)
        }).catch((err) => console.log(err))
    }, [userInfo.userId, cardsChanged]);
    useEffect(() => {
        getCards()
    }, []);

    useEffect(() => {
        getCards().then((res) => {
            setSavedCards(res.data.filter((card: Card) => favorites.includes(card._id as string)));
        }).catch((err) => console.log(err));
    }, [favorites]);

    return (
        <>
            <h3 className="display-3">Favorites</h3>
            {savedCards.length ? (
                <div className="container">
                    <div className="row">
                        {savedCards.map((card: Card) => (
                            <div
                                key={card._id}
                                className="card col-md-3 mx-2 my-2"
                                style={{ width: "22rem" }}
                            >
                                <img
                                    src={card.imageUrl}
                                    className="card-img-top mt-2"
                                    style={{ width: "20rem", height: "12rem" }}
                                    alt={card.imageAlt}
                                    onClick={() => setOpenModal(card._id)}
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

                                    <div className="cardIcons ">
                                        <div className="row">
                                            {userInfo.email && (
                                                <>
                                                    {(userInfo.email === card.owner || userInfo.role === "admin") && (
                                                        <div className="col left-icons text-start mt-1">
                                                            < Link to={`/update/${card._id}`}>
                                                                <i className="fa-solid fa-pencil"></i>
                                                            </Link>
                                                            <Link to="" className=" btn" onClick={() => handleDelete(card._id as string)}>
                                                                <i className="fa-solid fa-trash mx-1" ></i>
                                                            </Link>
                                                        </div>
                                                    )}
                                                    <div className="col right-icons text-end">
                                                        <Link to={`tel:${card.phone}`}>
                                                            <i className="fa-solid fa-phone"></i></Link>

                                                        {userInfo.role && (
                                                            <button className="btn star" onClick={() => handleAddToFav(card)}> <i className="fa-solid fa-star text-warning" ></i></button>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="ms-4">No favorite cards yet</p>
            )}
            <BusinessModal
                show={openModal}
                onHide={() => setOpenModal(false)}
                cardId={openModal} />
        </>
    );
};

export default Favorites;