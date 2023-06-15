import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ChildModal from "./ChildModal";
import { useLocation } from "react-router-dom";
import { ALL_CONTACT, US_CONTACT } from "./Problem-2";
import InfiniteScroll from "react-infinite-scroll-component";
import { getNamefromPath } from "../utils/utils";
import loading from "../assets/media/loading.gif";

const BASE_ALL_CONTACT_URL = "https://contact.mediusware.com/api/contacts/";
const BASE_US_CONTACT_URL =
    "https://contact.mediusware.com/api/country-contacts/United%20States/";

const ContactModal = ({ show, openModal, closeModal }) => {
    const { pathname } = useLocation();
    const [text, setText] = useState("");
    const [data, setData] = useState({});
    const [even, setEven] = useState(false);
    const [childContent, setChildContent] = useState(null);
    const TIME_REF = useRef();
    const MODAL_BODY_REF = useRef();
    const REFETCH_REF = useRef();

    useEffect(() => {
        // console.log('call on path change',getNamefromPath(pathname));
        MODAL_BODY_REF.current?.scrollTo(0, 0);
        switch (getNamefromPath(pathname)) {
            case ALL_CONTACT:
                fetch(BASE_ALL_CONTACT_URL)
                    .then((res) => res.json())
                    .then((res) => {
                        // console.log(res);
                        setData(res);
                    });
                break;

            case US_CONTACT:
                fetch(BASE_US_CONTACT_URL)
                    .then((res) => res.json())
                    .then((res) => {
                        // console.log(res);
                        setData(res);
                    });
                break;

            default:
                break;
        }
    }, [pathname]);

    const handleChildModalContent = (content = null) => {
        setChildContent(content);
    };

    useEffect(() => {
        if (text) {
            // console.log("call on search");
            if (TIME_REF.current) {
                clearTimeout(TIME_REF.current);
                TIME_REF.current = null;
            }
            if (!TIME_REF.current) {
                TIME_REF.current = setTimeout(() => {
                    fetch(
                        `https://contact.mediusware.com/api/contacts/?search=${text}`
                    )
                        .then((res) => res.json())
                        .then((res) => {
                            // console.log(res);
                            setData(res);
                        });
                }, 1000);
            }
        }
    }, [text]);

    const handleEnterSearch = (e) => {
        if (e.key === "Enter") {
            clearTimeout(TIME_REF.current);
            TIME_REF.current = null;
            fetch(`https://contact.mediusware.com/api/contacts/?search=${text}`)
                .then((res) => res.json())
                .then((res) => {
                    // console.log(res);
                    setData(res);
                });
        }
    };

    const handleNextPageContent = () => {
        // console.log("call on fetch url change");
        if (data.next) {
            if (REFETCH_REF.current) {
                clearTimeout(REFETCH_REF.current);
                REFETCH_REF.current = null;
            }
            if (!REFETCH_REF.current) {
                REFETCH_REF.current = setTimeout(() => {
                    fetch(data.next)
                        .then((res) => res.json())
                        .then((res) => {
                            // console.log(res);
                            setData((prev) => ({
                                ...res,
                                results: [...prev.results, ...res.results],
                            }));
                        });
                }, 500);
            }
        }
    };

    return (
        <Modal
            show={!!show}
            backdrop="static"
            keyboard={false}
            style={{
                zIndex: 9999,
            }}
            size="xl"
            scrollable={true}
        >
            <Modal.Header
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Modal.Title
                    style={{
                        alignSelf: "start",
                        textTransform: "uppercase",
                    }}
                >
                    {getNamefromPath(pathname).split("-").join(" ")}
                </Modal.Title>

                <input
                    type="text"
                    placeholder="Search Phone Number"
                    onKeyUp={handleEnterSearch}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    style={{
                        width: "100%",
                        borderRadius: "5px",
                        padding: "3px 10px",
                        fontWeight: "bold",
                        fontSize: "20px",
                    }}
                />
            </Modal.Header>
            <Modal.Body
                style={{
                    padding: "0 20px",
                    height: "400px",
                }}
                id="scrollableDiv"
                ref={MODAL_BODY_REF}
            >
                {data.count ? (
                    <InfiniteScroll
                        dataLength={data.results.length}
                        next={handleNextPageContent}
                        hasMore={!!data?.next}
                        scrollThreshold={0.95}
                        loader={
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: "8px",
                                }}
                            >
                                <img
                                    src={loading}
                                    alt="Loading..."
                                    style={{
                                        height: "40px",
                                        display: "inline-block",
                                    }}
                                />
                            </div>
                        }
                        endMessage={
                            <h3 style={{ textAlign: "center" }}>
                                No more data
                            </h3>
                        }
                        scrollableTarget="scrollableDiv"
                    >
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Country</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.results
                                    ?.filter((value) =>
                                        even ? value?.id % 2 == 0 : true
                                    )
                                    ?.map((value) => {
                                        return (
                                            <tr
                                                key={value.id}
                                                onClick={() =>
                                                    handleChildModalContent(
                                                        value
                                                    )
                                                }
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <td scope="col">{value.id}</td>
                                                <td scope="col">
                                                    {value.phone}
                                                </td>
                                                <td scope="col">
                                                    {value.country.name}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </InfiniteScroll>
                ) : (
                    <h3 style={{ textAlign: "center" }}>No data available</h3>
                )}
            </Modal.Body>
            <Modal.Footer
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    className="d-flex mt-4"
                    style={{
                        justifyContent: "right",
                        gap: "0 5px",
                        alignSelf: "end",
                    }}
                >
                    <Button
                        className="btn-A"
                        onClick={() => openModal(ALL_CONTACT)}
                    >
                        All Contacts
                    </Button>
                    <Button
                        className="btn-B"
                        onClick={() => openModal(US_CONTACT)}
                    >
                        US Contacts
                    </Button>
                    <Button className="btn-C" onClick={() => closeModal()}>
                        Close
                    </Button>
                </div>
                <div
                    className="form-check"
                    style={{
                        marginRight: "auto",
                    }}
                >
                    <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={(e) => setEven(e.target.checked)}
                        id="flexCheckChecked"
                        style={{
                            border: "solid",
                        }}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                        style={{
                            cursor: "pointer",
                        }}
                    >
                        Only even
                    </label>
                </div>
            </Modal.Footer>
            <ChildModal
                content={childContent}
                close={() => handleChildModalContent()}
            />
        </Modal>
    );
};

export default ContactModal;
