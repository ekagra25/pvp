import classNames from "classnames";
import Head from "next/head";
import Image from "next/image";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import { theme } from "../tailwind.config";
import { useForm } from 'react-hook-form';
import Input from "../components/input";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Form from "../components/form";
import Button from "../components/button";
import Toast from "../components/toast";

export default function ContactUs() {
    // const {
    //     register,
    //     handleSubmit,
    //     getValues,
    //     formState: { errors },
    // } = useForm();

    const methods = useForm({
        defaultValues: {
            name: "",
            contact: ""
        },
    });
    const { handleSubmit } = methods;

    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     async function getData() {
    //         const querySnapshot = await getDocs(collection(db, "queries"));
    //         querySnapshot.forEach((doc) => {
    //             console.log(`${doc.id} => `, doc.data());
    //         });
    //     }
    //     getData();
    // }, []);

    const onSubmit = async (values) => {
        console.log("file: contact-us.js → line 19 → onSubmit → values", values)
        setLoading(true)
        // try {
        //     const docRef = await addDoc(collection(db, "queries"), values);
        //     console.log("Document written with ID: ", docRef.id);
        // } catch (e) {
        //     console.error("Error adding document: ", e);
        // }
    }

    return (
        <div className="container">
            <Head>
                <title>Contact Us</title>
                <meta name="description" content="Pranami Vishwa Parishad Contact Page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative">
                <div className="relative col-span-1">
                    <Image
                        src="/images/contact.jpg"
                        alt="Contact Us"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* <Form onSubmit={console.log}>
                    <Input name="name" placeholder="Full Name" value={getValues("name")} error={errors.name?.message} options={{required: {value: true, message: "Enter a valid name"}}} register={register} />
                    <button className="h-15 w-full bg-brand text-white rounded-lg" type="submit">Submit</button>
                </Form> */}

                <form className="col-span-1 p-5 pt-20 border border-border-dark rounded-xl bg-contact bg-contain bg-no-repeat" onSubmit={handleSubmit(onSubmit)}>
                    <Input name="name" placeholder="Full Name" options={{required: {value: true, message: "Enter a valid name"}}} methods={methods} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5">
                        <Input className="col-span-1" name="contact" placeholder="Contact Number" options={{required: {value: true, message: "Enter a valid contact number"}, pattern: {value: /^[1-9]\d{9}$/, message: "Enter a valid contact number"}}} methods={methods} />
                        <Input className="col-span-1" name="email" placeholder="Email Address" options={{required: {value: true, message: "Enter a valid email address"}, pattern: {value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, message: "Enter a valid email address"}}} methods={methods} />
                    </div>
                    <textarea
                        className="p-2.5 mb-5 border border-border-light rounded-lg w-full placeholder-text-tertiary focus:border-brand-light outline-none transition-all resize-none"
                        {...methods.register("message")}
                        placeholder="Leave us a message..."
                        rows={3}
                        
                    />
                    <Button label="Submit" loading={loading} type="submit" />
                </form>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 relative mt-8">
                <div className="flex flex-row mb-5 sm:mb-0 sm:flex-col col-span-1 items-center">
                    <FiMapPin color={theme.colors.brand} size="2.5rem" className="mr-5 sm:mr-0 sm:mb-1" />
                    <div>
                        <p className="text-2xl sm:text-center">
                            Meet with us
                        </p>
                        <span>
                            Shri Krishna Pranami Mandir<br />
                            Hakikat Nagar<br />
                            Delhi-110009, India
                        </span>
                    </div>
                </div>
                <div className="flex flex-row mb-5 sm:mb-0 sm:flex-col col-span-1 items-center">
                    <FiPhone color={theme.colors.brand} size="2.5rem" className="mr-5 sm:mr-0 sm:mb-1" />
                    <div>
                        <p className="text-2xl sm:text-center">
                            Talk to us
                        </p>
                        <span>
                            +91 99999 99999
                        </span>
                    </div>
                </div>
                <div className="flex flex-row mb-5 sm:mb-0 sm:flex-col col-span-1 items-center">
                    <FiMail color={theme.colors.brand} size="2.5rem" className="mr-5 sm:mr-0 sm:mb-1" />
                    <div>
                        <p className="text-2xl sm:text-center">
                            Write to us 
                        </p>
                        <span>
                            pranamivishwa@gmail.com
                        </span>
                    </div>
                </div>
            </div>
            {/* <Toast message={"Thanks for your response!"} /> */}
        </div>
    );
}
