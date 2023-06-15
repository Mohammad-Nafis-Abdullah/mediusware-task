import React, { useState } from "react";

const Problem1 = () => {
    const [active, setActive] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [pending, setPending] = useState([]);
    const [archive, setArchive] = useState([]);
    const [others, setOthers] = useState([]);

    const [show, setShow] = useState("all");

    const handleClick = (val) => {
        setShow(val);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = {
            name: e.target.name.value,
            status: e.target.status.value,
        };
        e.target.reset();
        switch (result.status.toLowerCase()) {
            case "active":
                return setActive((prev) => [...prev, result]);

            case "completed":
                return setCompleted((prev) => [...prev, result]);

            case "pending":
                return setPending((prev) => [...prev, result]);

            case "archive":
                return setArchive((prev) => [...prev, result]);

            default:
                return setOthers((prev) => [...prev, result]);
        }
    };

    const showData = () => {
        switch (show) {
            case "active":
                return [...active];

            case "completed":
                return [...completed];

            default:
                return [...active,...completed,...pending,...archive,...others];
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
                <div className="col-6 ">
                    <form
                        onSubmit={handleSubmit}
                        className="row gy-2 gx-3 align-items-center mb-4"
                    >
                        <div className="col-auto">
                            <input
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder="Name"
                            />
                        </div>
                        <div className="col-auto">
                            <input
                                name="status"
                                type="text"
                                className="form-control"
                                placeholder="Status"
                            />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul
                        className="nav nav-pills mb-3"
                        id="pills-tab"
                        role="tablist"
                    >
                        <li className="nav-item">
                            <button
                                className={`nav-link ${
                                    show === "all" && "active"
                                }`}
                                type="button"
                                onClick={() => handleClick("all")}
                            >
                                All
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${
                                    show === "active" && "active"
                                }`}
                                type="button"
                                onClick={() => handleClick("active")}
                            >
                                Active
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${
                                    show === "completed" && "active"
                                }`}
                                type="button"
                                onClick={() => handleClick("completed")}
                            >
                                Completed
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showData().map((value, i) => {
                                return (
                                    <tr key={i}>
                                        <td scope="col">{value.name}</td>
                                        <td scope="col">{value.status}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
