import { useEffect } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Toast from "../components/toast";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    const handleMessages = (message) => {
        switch (message.data?.action) {
            case "toast": {
                document.body.appendChild(Toast({
                    message: "test"
                }));
            }
        }
    }

    useEffect(() => {
        window.addEventListener("message", handleMessages);

        return () => window.removeEventListener("message", handleMessages);
    })

    return (
        <>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    );
}

export default MyApp;
