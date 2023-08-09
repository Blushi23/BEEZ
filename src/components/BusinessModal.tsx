import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { getCardById } from "../services/cardsService";
import Card from "../interfaces/Card";
import BusinessMap from "./BusinessMap";
import { SiteTheme } from "../App";

interface BusinessModalProps {
    show: boolean;
    onHide: Function;
    cardId: any;
}

const BusinessModal: FunctionComponent<BusinessModalProps> = ({ show, onHide, cardId }) => {
    let [card, setCard] = useState<Card>()
    let theme = useContext(SiteTheme);

    useEffect(() => {
        if (cardId) {
            getCardById(cardId)
                .then((res) => setCard(res.data))
                .catch((err) => console.log(err))
        }
    }, [cardId]);

    return (
        <>
            {card && (<Modal show={show} onHide={() => onHide()}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={`${theme}`}>
                <div className="modalContent">
                    <Modal.Header closeButton>
                        <Modal.Title> <h2>{card.title}</h2>
                            <h5> {card.subtitle}</h5> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row modalBody">
                            <div className="col-md-8">
                                <p>{card.description}</p>
                            </div>
                            <div className="col-md-4">
                                <img src={card.imageUrl} width={200} alt={card.imageAlt} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <h4 className="text-center">Contact us</h4>
                            <div className="col-md-7">
                                <BusinessMap />
                            </div>
                            <div className="col-md-5">
                                <p>Phone: {card.phone}</p>
                                <p>Web: {card.web}</p>
                                <p>Email: {card.email}</p>
                                <p>Adress: {card.street} {card.houseNumber}, {card.city}, {card.country}, {card.zip} {card.state} </p>
                            </div>
                        </div>
                    </Modal.Body>
                </div >
            </Modal >
            )}
        </>
    )
}

export default BusinessModal;