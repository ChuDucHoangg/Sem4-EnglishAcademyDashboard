import { useEffect, useMemo, useState } from "react";
import Layout from "../../../layouts/index";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import useAxiosGet from "../../../../hooks/useAxiosGet";
import url from "../../../../services/url";
import { getAccessToken } from "../../../../utils/auth";
import ButtonSubmit from "../../../layouts/ButtonSubmit";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import NotFound from "../../Other/NotFound";

function ClassCourseSlotEditTeacher() {
    const { classId, slug, itemSlug } = useParams();
    const navigate = useNavigate();

    const itemType = [
        { type: 0, name: "Document" },
        { type: 1, name: "Discuss" },
        { type: 2, name: "Exercise" },
    ];

    const [formData, setFormData] = useState({
        id: null,
        title: "",
        content: "",
        itemType: "",
        startDate: "",
        endDate: "",
        orderTop: "",
        classId: parseInt(classId),
        slotId: "",
        pathUrl: "",
    });

    const [formErrors, setFormErrors] = useState({});

    const slotData = useAxiosGet({
        path: url.CLASS.COURSE_SLOT_DETAIL_BY_CLASS + `/${itemSlug}/${classId}`,
        headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    const subjectData = useAxiosGet({
        path: url.CLASS.COURSE_SUBJECT_LIST_BY_CLASS + `/${slug}/${classId}`,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    const subjects = subjectData.response || {};
    const slot = subjects.slotResponseDetailList;
    const [submitting, setSubmitting] = useState(false);

    const slotDetail = useMemo(() => slotData.response || {}, [slotData.response]);

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toISOString().slice(0, 19);
    };

    useEffect(() => {
        if (slotDetail && Object.keys(slotDetail).length > 0) {
            const formattedStartDate = formatDateTime(slotDetail.startDate);
            const formattedEndDate = formatDateTime(slotDetail.endDate);

            setFormData((prevFormData) => ({
                ...prevFormData,
                id: slotDetail.id || null,
                title: slotDetail.title || "",
                content: slotDetail.content || "",
                itemType: slotDetail.itemType || "",
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                orderTop: slotDetail.orderTop || "",
                pathUrl: slotDetail.pathUrl || "",
            }));
        }
    }, [slotDetail, classId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === "itemType" || name === "orderTop" || name === "slotId" ? parseInt(value, 10) : value,
        }));
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setFormData((prevFormData) => ({ ...prevFormData, content: data }));
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

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
        } else if (!urlRegex.test(formData.pathUrl)) {
            newErrors.pathUrl = "Please enter a valid URL.";
            valid = false;
        }

        if (!formData.content) {
            newErrors.content = "Please enter content.";
            valid = false;
        }

        if (formData.itemType === "") {
            newErrors.itemType = "Please choose item type.";
            valid = false;
        }

        if (formData.orderTop === "") {
            newErrors.orderTop = "Please enter order top.";
            valid = false;
        }
        if (!formData.slotId) {
            newErrors.slotId = "Please choose slot.";
            valid = false;
        }
        if (!formData.startDate) {
            newErrors.startDate = "Please enter start date.";
            valid = false;
        }

        if (!formData.endDate) {
            newErrors.endDate = "Please enter end date.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                setSubmitting(true);
                const createRequest = await api.put(url.CLASS.COURSE_ITEM_SLOT_EDIT, formData, { headers: { Authorization: `Bearer ${getAccessToken()}` } });
                if (createRequest.status === 200) {
                    toast.success("Updated successful!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    setFormData({
                        id: "",
                        title: "",
                        content: "",
                        itemType: "",
                        startDate: "",
                        endDate: "",
                        orderTop: "",
                        classId: parseInt(classId),
                        slotId: "",
                        pathUrl: "",
                    });

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
            } finally {
                setSubmitting(false);
            }
        }
    };

    return (
        <>
            {slotData.errorStatus === 404 ? (
                <NotFound />
            ) : (
                <Layout title="Item Slot Update">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                className={`form-control ${formErrors.title ? "is-invalid" : ""}`}
                                                placeholder="Enter Title"
                                                onChange={handleChange}
                                                value={formData.title}
                                            />
                                            {formErrors.title && <p className="invalid-feedback">{formErrors.title}</p>}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">Path URL</label>
                                            <input
                                                type="text"
                                                name="pathUrl"
                                                className={`form-control ${formErrors.pathUrl ? "is-invalid" : ""}`}
                                                placeholder="Enter Path URL"
                                                onChange={handleChange}
                                                value={formData.pathUrl}
                                            />
                                            {formErrors.pathUrl && <p className="invalid-feedback">{formErrors.pathUrl}</p>}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Slot</label>
                                                    <select name="slotId" className={`form-control ${formErrors.slotId ? "is-invalid" : ""}`} onChange={handleChange} value={formData.slotId}>
                                                        <option value="">Choose Item Type</option>
                                                        {slot?.map((slot, index) => (
                                                            <option value={slot.id} key={index}>
                                                                {slot.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {formErrors.itemType && <p className="invalid-feedback">{formErrors.itemType}</p>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Item Type</label>
                                                    <select name="itemType" className={`form-control ${formErrors.itemType ? "is-invalid" : ""}`} onChange={handleChange} value={formData.itemType}>
                                                        <option value="">Choose Item Type</option>
                                                        {itemType.map((item, index) => (
                                                            <option value={item.type} key={index}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {formErrors.itemType && <p className="invalid-feedback">{formErrors.itemType}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">Order Top</label>
                                            <input
                                                type="number"
                                                name="orderTop"
                                                className={`form-control ${formErrors.orderTop ? "is-invalid" : ""}`}
                                                placeholder="Enter Order Top"
                                                onChange={handleChange}
                                                value={formData.orderTop}
                                            />
                                            {formErrors.orderTop && <p className="invalid-feedback">{formErrors.orderTop}</p>}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">Start Date</label>
                                            <input
                                                type="datetime-local"
                                                name="startDate"
                                                className={`form-control ${formErrors.startDate ? "is-invalid" : ""}`}
                                                placeholder="Enter Start Date"
                                                onChange={handleChange}
                                                value={formData.startDate}
                                            />
                                            {formErrors.startDate && <p className="invalid-feedback">{formErrors.startDate}</p>}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">End Date</label>
                                            <input
                                                type="datetime-local"
                                                name="endDate"
                                                className={`form-control ${formErrors.endDate ? "is-invalid" : ""}`}
                                                placeholder="Enter End Date"
                                                onChange={handleChange}
                                                value={formData.endDate}
                                            />
                                            {formErrors.endDate && <p className="invalid-feedback">{formErrors.endDate}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Content</label>
                                    <CKEditor editor={ClassicEditor} data={formData.content} onChange={handleEditorChange} />
                                    {formErrors.content && <p className="invalid-feedback">{formErrors.content}</p>}
                                </div>

                                <div className="col-md-12 mt-auto">
                                    <div className="mb-3">
                                        <label className="text-label form-label">Preview</label>
                                        {formData.pathUrl && <ReactPlayer url={formData.pathUrl} />}
                                    </div>
                                    <div className="text-end btn-page">
                                        <ButtonSubmit value="Update Item Slot" valueSubmit="Updating..." submitting={submitting} handleEvent={handleUpdate} icon="ti ti-edit" className="btn-primary" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            )}
        </>
    );
}

export default ClassCourseSlotEditTeacher;
