import apiConfig from "../../axios.config";

const { API_CALL } = apiConfig;

// API Paths
export const API_PATHS = {
  WELCOME: `/`,
  CONSENT: `/consent`,
  GET_DATA: `/get-data`,
  USER: `users`
};

export default class ApiRoutes {

  ROUTES = ({
    GET_ANUMATI_URL: (mobileNumber) => `${API_PATHS.CONSENT}/${mobileNumber}`,
    GET_DATA: `${API_PATHS.GET_DATA}`,
    USER: `${API_PATHS.USER}/mobile/9999999999/`,
    USER_PROFILE: `${API_PATHS.USER}/mobile/9999999999/profile`,
    USER_FI_SUMMARY: `${API_PATHS.USER}/mobile/9999999999/fi_data_summary`,
    USER_FI_BY_TYPE: fi_type => `${API_PATHS.USER}/mobile/9999999999/fi_data/${fi_type}`,
  });

  getAnumatiURL(mobileNumber) {
    return API_CALL(this.ROUTES.GET_ANUMATI_URL(mobileNumber));
  }

  fetchFIData() {
    return API_CALL(this.ROUTES.GET_DATA)
  }

  fetchUser() {
    return API_CALL(this.ROUTES.USER)
  }

  fetchUserProfile() {
    return API_CALL(this.ROUTES.USER)
  }

  fetchUserFiSummary() {
    return API_CALL(this.ROUTES.USER_FI_SUMMARY)
  }

  fetchUserFiDataByType(fi_type) {
    return API_CALL(this.ROUTES.USER_FI_BY_TYPE(fi_type))
  }

}
