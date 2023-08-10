import { FunctionComponent } from "react";

interface BusinessMapProps {

}

const BusinessMap: FunctionComponent<BusinessMapProps> = () => {

    return (
        <>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3433.801144967728!2d34.80991948487132!3d30.611371681679575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1501f24fd865ef2d%3A0x202e62f00a56a49c!2z157XnNeV158g15HXqNeQ16nXmdeq!5e0!3m2!1siw!2sil!4v1691654055488!5m2!1siw!2sil"
                width="450"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
        </>
    )
}

export default BusinessMap;