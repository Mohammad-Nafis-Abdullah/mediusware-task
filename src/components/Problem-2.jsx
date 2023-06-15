import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactModal from "./Modal";

export const ALL_CONTACT = "all-contacts";
export const US_CONTACT = "us-contacts";

const Problem2 = () => {
    const [show,setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(()=> {
        !show && closeModal(); 
    },[show]);

    const openModal = (path)=> {
        setShow(true);
        navigate(`/problem-2/${path}`)
    };

    const closeModal = ()=> {
        setShow(false);
        navigate('/problem-2')
    }


    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button
                        className="btn btn-lg btn-outline-primary"
                        type="button"
                        onClick={() => openModal(ALL_CONTACT)}
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-lg btn-outline-warning"
                        type="button"
                        onClick={() => openModal(US_CONTACT)}
                    >
                        US Contacts
                    </button>
                </div>

                <ContactModal show={show} openModal={openModal} closeModal={closeModal}/>
            </div>
        </div>
    );
};

export default Problem2;