import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html className="">
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Lato:400,500"
                        rel="stylesheet"
                    />
                </Head>
                <body className="text-text-primary">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
