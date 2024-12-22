import classNames from "classnames";

export default function Button({ label, loading, ...rest }) {
    return (
        <div
            className={classNames(
                "h-15 w-full rounded-lg",
                loading && "loading p-0.5"
            )}
        >
            <button
                className={classNames(
                    "h-full w-full rounded-md z-10 transition-all",
                    loading
                        ? "bg-bg-disabled text-text-disabled cursor-not-allowed"
                        : "bg-brand text-white"
                )}
                disabled={loading}
                {...rest}
            >
                {label}
            </button>
        </div>
    );
}
