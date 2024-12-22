import classNames from "classnames";
import Head from "next/head";
import Image from "next/image";
import { FaCloudDownloadAlt } from "react-icons/fa";
import Drawer from "../components/drawer";
import Calendar from "../components/calendar";
import Carousel from "../components/carousel";
import SocialLinks from "../components/socialLinks";
import { theme } from "../tailwind.config";

export default function Home() {
    const renderLeftSection = () => {
        return (
            <>
                <div className="p-4 mb-3 bg-bg-primary rounded-xl">
                    <h6 className="mb-2 -mt-2 font-medium text-center text-lg">
                        Happy Birthday
                    </h6>
                    <div className="relative aspect-square">
                        <Image
                            className="rounded-t-xl"
                            src="/images/guruji.jpg"
                            alt="Guruji"
                            fill
                        />
                    </div>
                    <p className="m-0 p-2 bg-brand text-white text-center rounded-b-xl">
                        Guruji Mohan Priyacharya
                    </p>
                </div>
                <div className="p-4 mb-3 bg-bg-primary rounded-xl">
                    <h6 className="mb-2 -mt-2 font-medium text-center text-lg">
                        Pranami Vishwa Patrika
                    </h6>
                    <div className="relative aspect-square">
                        <Image
                            className="rounded-t-xl"
                            src="/images/patrika.jpg"
                            alt="Pranami Vishwa Patrika placeholder"
                            fill
                        />
                    </div>
                    <div className="inline-flex w-full justify-between items-center p-2 bg-brand text-white text-center rounded-b-xl">
                        <p className="m-0">Sept 2022</p>
                        <FaCloudDownloadAlt
                            color={theme.colors.white}
                            size={"1rem"}
                        />
                    </div>
                </div>
                <div className="p-4 bg-bg-primary rounded-xl">
                    <Calendar />
                </div>
            </>
        );
    }

    return (
        <div className="relative overflow-hidden -mt-4 sm:mt-0">
            <div
                id="home"
                className={"transition-all origin-left"}
            >
                <Head>
                    <title>Pranami Vishwa</title>
                    <meta name="description" content="Pranami Vishwa Parishad" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div className="container">
                    <div className="grid grid-cols-12 gap-5">
                        <section className={classNames("hidden", "md:block md:col-span-4", "lg:col-span-3")}>
                            {renderLeftSection()}
                        </section>
                        <main className={classNames("col-span-12", "md:col-span-8")}>
                            <Carousel />
                            <div className="mt-5 font-medium">
                                <p className="m-0 text-center text-2xl">
                                    Welcome to
                                </p>
                                <h1 className="p-0 text-center text-4xl text-brand border-none">
                                    Pranami Vishwa Parishad
                                </h1>
                            </div>
                            <div className={classNames("mb-4", "lg:hidden")}>
                                <SocialLinks />
                            </div>
                            <p>
                                Shri Krishna Pranami Vishwa Parishad is a central organization of the society, primarily engaged in propagating basic principles of this faith in India and other countries through literature, audio-video media, organizing seminars-conferences and religious gatherings on auspicious occasions at its different centers. The Parishad also organizes camps at major religious events in the country like Kumbh and Magh melas.
                            </p>
                            <p>
                                A monthly magazine “Pranami Vishwa” is published by the Parishad. It contains short articles, discourses and details of activities being carried out- pertaining to the society, at various centers worldwide.
                            </p>
                            <h2 className="mt-6 text-3xl font-medium">
                                Shri Krishna Pranami Dharma - Nijanand Sect
                            </h2>
                            <p>
                                The followers of this religious faith are popularly known as Pranamis. This religion was founded by Najanandacharya Shri Devchandra Ji (1581-1655 AD) who postulated the knowledge about the universal truth of the Supreme Lord. Being devotees of Lord Krishna and Radha - worship them as Shri Raj-Shyama Ji.  They enacted and participated in the plays of Braj and Raas Leelas. The gopis, their companions in these plays, were the eternal souls- Brahmasrishtis, of the Supreme Abode (Paramdham). Further elaboration of these doctrines was done by Mahamati Prannath Ji (1618-1694 AD) in the form of 18758 verses compiled in TARTAM SAGAR, also known by the title Kuljam Swarup. All Pranamis are religiously vegetarians, and are called by the name-Sundar Saath.
                            </p>
                        </main>
                        <div className={classNames("hidden col-span-1", "lg:block")}>
                            <SocialLinks />
                        </div>
                    </div>
                </div>
            </div>
            <Drawer>{renderLeftSection()}</Drawer>
        </div>
    );
}
