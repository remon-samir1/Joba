import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../Helpers/Axios";
import google from "../../images/google.svg";
import facebook from "../../images/facebook.svg";
import Loading from "../../components/Loading/Loading";

const Providers = () => {
    const [loading, setLoading] = useState(false);
    const HandleGoogleProvider = async () => {
        setLoading(true)
        await Axios.get("/auth/google")
        .then(({ data }) => {
            setLoading(false)
            window.location.href = data.link;
            
        }).catch(() => {
            // if error
        })
    }

    return (
        <>
            {loading && 
              <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
            </div>}
            <div className="providers">

                <Link onClick={HandleGoogleProvider} className="link">
                    <img src={google} alt="google" loading="lazy" />
                    <span>Google</span>
                </Link>

                {/* <Link className="link">
                    <img src={facebook} alt="facebook" loading="lazy" />
                    <span>Facebook</span>
                </Link> */}

            </div>
        </>
    )
}

export default Providers;