export default function LoadingSpinner({
    size = 24,
    stroke = "#686868",
    className = "",
    ...props
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`animate-spin ${className}`}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    );
}

export function LoadingButton({
    loadingState,
    spinnerStroke = "#686868",
    className = "",
    loadingClassName = "",
    ...props
}) {
    return <button
        className={loadingState ? loadingClassName : className}
        disabled={loadingState}
        {...props}
    >{
        !loadingState ? props.children : <>
            <LoadingSpinner stroke={spinnerStroke} className="inline mr-2" />
            {props.children}
        </>
    }</button>;
}
