import config from "../config/index";

const url = {
    BASE_URL: config.key.BASE_API_URL,

    COURSE: {
        LIST: "any/course-online",
        DETAIL: "any/course-online/detail/{}",
        CREATE: "course-online",
        UPDATE: "course-online",
        DELETE: "course-online",
    },

    COURSE_OFFLINE: {
        LIST: "course-offline",
        DETAIL: "course-offline",
        CREATE: "course-offline",
        UPDATE: "course-offline",
        DELETE: "course-offline",
    },

    CATEGORY: {
        LIST: "any/category",
        DETAIL: "category",
        CREATE: "category",
        EDIT: "category",
        DELETE: "category",
    },

    AUTH: {
        LOGIN: "auth/user/signip",
        CHANGE_PASSWORD: "user/change-password",
        FORGOT_PASSWORD: "auth/user/forgot-password",
        RESET_PASSWORD: "auth/user/reset-password",
        PROFILE: "user/profile",
        UPDATE_PROFILE: "user/update-profile",
    },

    TUTOR: {
        BOOKING_WAITING: "tutor/booking-waiting",
        BOOKING_WAITING_PACKAGE: "package-student/tutor",
        BOOKING_WAITING_WEEKS: "subscription/tutor",

        BOOKING_CONFIRM_PACKAGE: "package-student/confirm",
        BOOKING_CANCEL_PACKAGE: "package-student/cancel",

        BOOKING_CONFIRM_WEEKS: "subscription/confirm",
        BOOKING_CANCEL_WEEKS: "subscription/cancel",

        BOOKING_BY_TUTOR: "tutor/booking",
    },
};
export default url;
