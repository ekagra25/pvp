import React from "react";
import { useForm } from "react-hook-form";

export default function Form({ defaultValues, children, onSubmit }) {
    const methods = useForm();
    console.log("file: form.js → line 6 → Form → methods", methods);
    const { handleSubmit } = methods;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {React.Children.map(children, (child) =>
                React.createElement(child.type, {
                    ...{
                        ...child.props,
                        methods,
                        key: child.props.name,
                    },
                })
            )}
        </form>
    );
}
