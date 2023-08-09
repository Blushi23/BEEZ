import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { deleteCard, getCardByOwner } from "../services/cardsService";
import { Link } from "react-router-dom";
import { successMsg } from "../services/feedbackService";
import BusinessModal from "./BusinessModal";

interface MyCardsProps {
    userInfo: any;
    openModal: boolean;
    setOpenModal: Function;
}

const MyCards: FunctionComponent<MyCardsProps> = ({ userInfo, openModal, setOpenModal }) => {
    let [cardsCreated, setCardsCreated] = useState<Card[]>([]);
    let [cardsChanged, setCardsChanged] = useState<boolean>(false);

    useEffect(() => {
        getCardByOwner(userInfo.email)
            .then((res) => setCardsCreated(res.data))
            .catch((err) => console.log(err))
    }, [userInfo.email, userInfo.userId, cardsChanged]);

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

    return (
        <>
            <h3 className="display-3">My cards</h3>
            {cardsCreated.length ? (
                <div className="container">
                    <div className="row">
                        {cardsCreated.map((card: Card) => (
                            <div
                                key={card.id}
                                className="card col-md-3 mx-2 my-2"
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
                                                            < Link to={`/update/${card.id}`}><i className="fa-solid fa-pencil"></i></Link>
                                                            <Link to="" className="btn" onClick={() => handleDelete(card.id as number)}>
                                                                <i className="fa-solid fa-trash" ></i></Link>
                                                        </div>
                                                    )}
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
                <p>There are no cards created by you yet</p>
            )}
            <BusinessModal
                show={openModal}
                onHide={() => setOpenModal(false)}
                cardId={openModal} />  </>
    )
}

export default MyCards;