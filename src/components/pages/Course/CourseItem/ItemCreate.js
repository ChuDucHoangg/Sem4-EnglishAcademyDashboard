import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../layouts";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import url from "../../../../services/url";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import api from "../../../../services/api";
import { getAccessToken } from "../../../../utils/auth";
import { toast } from "react-toastify";

function ItemCreate() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const itemType = [
        {
            type: 0,
            name: "Lesson",
        },
        {
            type: 1,
            name: "Quiz",
        },
        {
            type: 2,
            name: "Document",
        },
    ];

    const topicData = useAxiosGet({
        path: url.COURSE.DETAIL + `/${slug}`,
    });

    const topics = topicData.response || [];
    const topic = topics?.topicOnlineDetailList;

    const [duration, setDuration] = useState(0);

    const handleDuration = (duration) => {
        setDuration(duration);
    };

    const [formData, setFormData] = useState({
        title: "",
        pathUrl: "",
        duration: duration,
        content: "",
        itemType: null,
        orderTop: null,
        topicOnlineId: null,
    });

    const [formErrors, setFormErrors] = useState({
        title: "",
        pathUrl: "",
        duration: "",
        content: "",
        itemType: null,
        orderTop: null,
        topicOnlineId: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        let convertedValue = value;
        if (name === "itemType" || name === "orderTop" || name === "topicOnlineId") {
            convertedValue = value ? parseInt(value, 10) : null;
        }

        setFormData({
            ...formData,
            [name]: convertedValue,
        });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.title) {
            newErrors.title = "Please enter title.";
            valid = false;
        } else if (formData.title.length < 3) {
            newErrors.title = "Title must be at least 3 characters.";
            valid = false;
        } else if (formData.title.length > 255) {
            newErrors.title = "Title must be less than 255 characters.";
            valid = false;
        }

        if (!formData.pathUrl) {
            newErrors.pathUrl = "Please enter path URL.";
            valid = false;
        }

        if (formData.duration === "") {
            newErrors.duration = "Please enter duration.";
            valid = false;
        }

        if (formData.content === "") {
            newErrors.content = "Please enter content.";
            valid = false;
        }

        if (formData.itemType === null) {
            newErrors.itemType = "Please choose item type.";
            valid = false;
        }

        if (formData.orderTop === null) {
            newErrors.orderTop = "Please enter order top.";
            valid = false;
        }

        if (formData.topicOnlineId === null) {
            newErrors.topicOnlineId = "Please choose topic online.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const createRequest = await api.post(url.ITEM.CREATE, formData, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

                if (createRequest.status === 200) {
                    toast.success("Created Item Successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    navigate(`/course-online/detail/${slug}`);
                }
            } catch (error) {
                toast.error("Error! An error occurred. Please try again later!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
    };

    useEffect(() => {
        if (formData.pathUrl) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                duration: duration,
            }));
        }
    }, [duration, formData.pathUrl]);

    return (
        <Layout title="Item Create">
            <div className="col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Title</label>
                                        <input type="text" name="title" className={`form-control ${formErrors.title ? "is-invalid" : ""}`} placeholder="Enter Title" onChange={handleChange} />
                                        {formErrors.title && <p className="invalid-feedback">{formErrors.title}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Duration</label>
                                        <input type="text" name="duration" value={formData.duration} className={`form-control ${formErrors.duration ? "is-invalid" : ""}`} onChange={handleChange} />
                                        {formErrors.duration && <p className="invalid-feedback">{formErrors.duration}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Path URL</label>
                                        <input type="text" name="pathUrl" className={`form-control ${formErrors.pathUrl ? "is-invalid" : ""}`} placeholder="Enter Path URL" onChange={handleChange} />
                                        {formErrors.pathUrl && <p className="invalid-feedback">{formErrors.pathUrl}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Item Type</label>
                                        <select name="itemType" className={`form-control ${formErrors.itemType ? "is-invalid" : ""}`} onChange={handleChange}>
                                            <option value="">Choose Type</option>
                                            {itemType.map((item, index) => (
                                                <option value={item.type} key={index}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        {formErrors.itemType && <p className="invalid-feedback">{formErrors.itemType}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Topic</label>
                                        <select name="topicOnlineId" className={`form-control ${formErrors.topicOnlineId ? "is-invalid" : ""}`} onChange={handleChange}>
                                            <option value="">Choose Topic</option>
                                            {topic?.map((topic, index) => (
                                                <option value={topic.id} key={index}>
                                                    {topic.name}
                                                </option>
                                            ))}
                                        </select>
                                        {formErrors.topicOnlineId && <p className="invalid-feedback">{formErrors.topicOnlineId}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Order Top</label>
                                        <input type="number" name="orderTop" className={`form-control ${formErrors.orderTop ? "is-invalid" : ""}`} onChange={handleChange} />
                                        {formErrors.orderTop && <p className="invalid-feedback">{formErrors.orderTop}</p>}
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="form-group">
                                        <label className="form-label">Content</label>
                                        <textarea name="content" className={`form-control ${formErrors.content ? "is-invalid" : ""}`} cols="30" rows="3" onChange={handleChange}></textarea>
                                        {formErrors.content && <p className="invalid-feedback">{formErrors.content}</p>}
                                    </div>
                                </div>
                                <div className="col-md-3 mt-auto">
                                    <div className="text-end btn-page">
                                        <button className="btn btn-primary" type="submit">
                                            <span className="d-flex align-items-center justify-content-center">
                                                <i className="ti ti-plus"></i>Create This Course Offline
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="text-label form-label">Preview Trailer</label>
                                        {formData.pathUrl && <ReactPlayer url={formData.pathUrl} onDuration={handleDuration} />}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ItemCreate;
