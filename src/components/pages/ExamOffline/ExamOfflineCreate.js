import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../layouts";
import ButtonSubmit from "../../layouts/ButtonSubmit";
import { useRef, useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import { toast } from "react-toastify";
import { getAccessToken } from "../../../utils/auth";
import useAxiosGet from "../../../hooks/useAxiosGet";

function ExamOfflineCreate() {
    const { subjectId } = useParams();
    const fileInputRef = useRef();
    const navigate = useNavigate();

    const classesData = useAxiosGet({
        path: url.CLASSES.GET_ALL,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const classes = classesData.response || [];

    const [formData, setFormData] = useState({
        title: "",
        startDate: "",
        endDate: "",
        pastMark: "",
        totalMark: 100,
        description: "",
        subjectId: subjectId,
        file: null,
        classesId: null,
    });

    const [formErrors, setFormErrors] = useState({
        title: "",
        startDate: "",
        endDate: "",
        pastMark: "",
        description: "",
        subjectId: "",
        file: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        let convertedValue = value;
        if (name === "pastMark" || name === "totalMark") {
            convertedValue = value ? parseInt(value, 10) : "";
        }

        setFormData({
            ...formData,
            [name]: convertedValue,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0],
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

        const allowedExtensions = ["xlsx", "xls", "xlsm"];
        if (!formData.file) {
            newErrors.file = "Please choose question file.";
            valid = false;
        } else {
            const fileExtension = formData.file.name.split(".").pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                newErrors.file = "Invalid file format. Only .xlsx, .xls, .xlsm are allowed.";
                valid = false;
            }
        }

        if (!formData.pastMark) {
            newErrors.pastMark = "Please enter Pass Mark.";
            valid = false;
        } else if (isNaN(formData.pastMark)) {
            newErrors.pastMark = "Pass Mark must be a number.";
            valid = false;
        } else if (formData.pastMark > 100) {
            newErrors.pastMark = "Points cannot exceed 100.";
            valid = false;
        }

        if (!formData.description) {
            newErrors.description = "Please enter description.";
            valid = false;
        }

        const currentDate = new Date();

        if (!formData.startDate) {
            newErrors.startDate = "Please enter Start Date.";
            valid = false;
        } else if (new Date(formData.startDate) < currentDate) {
            newErrors.startDate = "Start Date cannot be in the past.";
            valid = false;
        }

        if (formData.classesId === null || formData.classesId === "") {
            newErrors.classesId = "Please choose class.";
            valid = false;
        }

        if (!formData.endDate) {
            newErrors.endDate = "Please enter End Date.";
            valid = false;
        } else if (new Date(formData.endDate) < currentDate) {
            newErrors.endDate = "End Date cannot be in the past.";
            valid = false;
        } else if (new Date(formData.endDate) <= new Date(formData.startDate)) {
            newErrors.endDate = "End Date cannot be before Start Date.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const adjustDateByHours = (dateString, hours) => {
        const date = new Date(dateString);
        date.setHours(date.getHours() - hours);
        return date.toISOString().slice(0, 16);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("startDate", adjustDateByHours(formData.startDate, 7));
            formDataToSend.append("endDate", adjustDateByHours(formData.endDate, 7));
            formDataToSend.append("pastMark", formData.pastMark);
            formDataToSend.append("totalMark", formData.totalMark);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("file", formData.file);
            formDataToSend.append("subjectId", formData.subjectId);
            formDataToSend.append("classesId", formData.classesId);

            try {
                const createRequest = await api.post(url.TEST_OFFLINE.CREATE, formDataToSend, { headers: { Authorization: `Bearer ${getAccessToken()}`, "Content-Type": "multipart/form-data" } });

                if (createRequest.status === 200) {
                    toast.success("Created Test Online!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }

                    navigate(-1);
                }
            } catch (error) {
                console.log(error);

                toast.error(error.response.data.message, {
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

    return (
        <Layout title="Create Final Exam">
            <form onSubmit={handleSubmit}>
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            className={`form-control ${formErrors.title ? "is-invalid" : ""}`}
                                            onChange={handleChange}
                                            placeholder="Enter Test Title"
                                            autoFocus
                                        />
                                        {formErrors.title && <p className="invalid-feedback">{formErrors.title}</p>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Start Date</label>
                                        <input
                                            type="datetime-local"
                                            name="startDate"
                                            className={`form-control ${formErrors.startDate ? "is-invalid" : ""}`}
                                            value={formData.startDate}
                                            onChange={handleChange}
                                        />
                                        {formErrors.startDate && <p className="invalid-feedback">{formErrors.startDate}</p>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Choose Class</label>
                                        <select className={`form-select ${formErrors.classesId ? "is-invalid" : ""}`} name="classesId" onChange={handleChange}>
                                            <option value="">Please choose class</option>
                                            {classes.map((cl) => (
                                                <option value={cl.id} key={cl.id}>
                                                    {cl.name}
                                                </option>
                                            ))}
                                        </select>
                                        {formErrors.classesId && <p className="invalid-feedback">{formErrors.classesId}</p>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">End Date</label>
                                        <input
                                            type="datetime-local"
                                            name="endDate"
                                            className={`form-control ${formErrors.endDate ? "is-invalid" : ""}`}
                                            value={formData.endDate}
                                            onChange={handleChange}
                                        />
                                        {formErrors.endDate && <p className="invalid-feedback">{formErrors.endDate}</p>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Pass Mark</label>
                                        <input
                                            type="text"
                                            name="pastMark"
                                            className={`form-control ${formErrors.pastMark ? "is-invalid" : ""}`}
                                            value={formData.pastMark}
                                            onChange={handleChange}
                                            placeholder="Enter Pass Mark"
                                        />
                                        {formErrors.pastMark && <p className="invalid-feedback">{formErrors.pastMark}</p>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            name="description"
                                            rows="3"
                                            className={`form-control ${formErrors.description ? "is-invalid" : ""}`}
                                            value={formData.description}
                                            onChange={handleChange}
                                        ></textarea>
                                        {formErrors.description && <p className="invalid-feedback">{formErrors.description}</p>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Question file</label>
                                        <input ref={fileInputRef} type="file" name="file" className={`form-control ${formErrors.file ? "is-invalid" : ""}`} onChange={handleFileChange} />
                                        {formErrors.file && <p className="invalid-feedback">{formErrors.file}</p>}
                                    </div>

                                    <div className="text-end">
                                        <ButtonSubmit className="btn-primary" value="Create New Test" icon="ti ti-plus" handleEvent={handleSubmit} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    );
}

export default ExamOfflineCreate;