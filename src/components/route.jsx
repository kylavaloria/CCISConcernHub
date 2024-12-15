import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from './Header';

export default function RouteElement({
    element,
    headerProps,
    clientUser,
}) {
    const navigate = useNavigate();

    useEffect(() => {
        if (clientUser === null) {
            navigate("/signin");
        }
    }, [clientUser, navigate]);

    return <div className="flex flex-wrap">
        <Header clientUser={clientUser} {...headerProps} />
        {element}
    </div>;
}
