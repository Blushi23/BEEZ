import { FunctionComponent } from "react";
import Card from "../interfaces/Card";

interface BusinessMapProps {
    card: Card;
}

const BusinessMap: FunctionComponent<BusinessMapProps> = (
    { card }
) => {

    return (
        <>
            <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDyTKFoTf1tUXXiLctaaUmWVbNeVkrCB_Q&q=${card.houseNumber}+${card.street},+${card.city},+${card.country}`}
                width="450"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
        </>
    )
}

export default BusinessMap;