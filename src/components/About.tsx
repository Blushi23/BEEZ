import { FunctionComponent } from "react";

interface AboutProps {
}

const About: FunctionComponent<AboutProps> = () => {
    return (
        <>
            <div className=" about">
                <div className="about-content">

                    <h3> Welcome to BEEZ - Your Ultimate Business Finder System!</h3>

                    <p>At BEEZ, we empower businesses to take control of their online presence and connect with their target audience like never before. We provide a comprehensive content management system that enables business users to effortlessly publish and manage their content, while offering a seamless experience for all users in search of the businesses and content they need.</p>

                    <h5>Our Vision:</h5>
                    <p>We believe in the power of effective communication and the impact it can have on businesses and individuals. Our vision is to create a dynamic platform that bridges the gap between businesses and their customers, making it easier than ever for users to discover, engage with, and support the businesses that matter to them.</p>

                    <h5>What Sets Us Apart:</h5>

                    <p><b>User-Friendly Content Management:</b> BEEZ offers a user-friendly interface that allows businesses to easily create, edit, and publish their content. Whether you're a small startup or an established enterprise, our intuitive tools make it simple to showcase your products, services, and updates.</p>

                    <p><b>Discoverability and Accessibility:</b> We understand that finding the right businesses and content is essential. BEEZ provides a powerful search engine, ensuring that users can easily discover relevant businesses and access the content they need, all in one convenient location.</p>

                    <h5>Join the BEEZ Community:</h5>
                    <p> We invite businesses and users from all walks of life to join our vibrant community. Whether you're a business owner, an entrepreneur, a professional, or someone in search of products and services, BEEZ is here to cater to your needs. Experience the ease of content management, discover new opportunities, and connect with like-minded individuals who share your passion.</p>

                    <p>At BEEZ, we are dedicated to supporting businesses and empowering users. Together, let's make your content shine and create lasting connections that drive success. Join us today and let's shape the future of businesses together!</p>   </div>
            </div>
        </>
    )
}

export default About;