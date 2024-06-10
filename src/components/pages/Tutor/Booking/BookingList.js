import Layout from "../../../layouts/index";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import url from "../../../../services/url";
import { getAccessToken } from "../../../../utils/auth";
import Loading from "../../../layouts/Loading";
import PackageTable from "../../../views/Tutor/Booking/PackageTable";
import WeekTable from "../../../views/Tutor/Booking/WeekTable";
import { Link } from "react-router-dom";

function BookingList() {
    // Call API
    const bookingData = useAxiosGet({
        path: url.TUTOR.BOOKING_WAITING,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const bookings = bookingData.response || {};

    // Set color according to status
    function setColorStatus(status) {
        let color;
        switch (status) {
            case "pending":
                color = "badge bg-secondary";
                break;
            case "confirmed":
                color = "badge bg-primary";
                break;
            case "completed":
                color = "badge bg-success";
                break;
            case "cancelled":
                color = "badge bg-danger";
                break;
            default:
                break;
        }
        return color;
    }

    return (
        <>
            {bookingData.loading && <Loading />}
            <Layout title="Booking List">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body border-bottom pb-0 table-border-style">
                            <div className="d-flex align-items-center justify-content-between">
                                <h5 className="mb-0">Booking List</h5>
                                <div className="dropdown">
                                    <a className="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none" href="#!" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="ti ti-dots-vertical f-18"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        <Link to="" className="dropdown-item">
                                            Today
                                        </Link>
                                        <Link to="" className="dropdown-item">
                                            Weekly
                                        </Link>
                                        <Link to="" className="dropdown-item">
                                            Monthly
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <ul className="nav nav-tabs analytics-tab" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link active"
                                        id="analytics-tab-1"
                                        data-bs-toggle="tab"
                                        data-bs-target="#analytics-tab-1-pane"
                                        type="button"
                                        role="tab"
                                        aria-controls="analytics-tab-1-pane"
                                        aria-selected="true"
                                    >
                                        Booking by Package
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link"
                                        id="analytics-tab-2"
                                        data-bs-toggle="tab"
                                        data-bs-target="#analytics-tab-2-pane"
                                        type="button"
                                        role="tab"
                                        aria-controls="analytics-tab-2-pane"
                                        aria-selected="false"
                                        tabIndex="-1"
                                    >
                                        Booking by Weeks
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body border-bottom pb-0 table-border-style">
                            <div className="tab-content" id="myTabContent">
                                <PackageTable bookings={bookings} setColorStatus={setColorStatus} />

                                <WeekTable bookings={bookings} setColorStatus={setColorStatus} />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default BookingList;
