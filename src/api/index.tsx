import axios from "axios";
// import store from "../flux/store";
// import { setChatsData } from "flux/reducers/chat";
// import { setTemplates } from "../flux/reducers/extras";

const API = axios.create({ baseURL: "http://localhost:8000/api" });

API.interceptors.request.use(
  (config) => {
    // Get token from localStorage instead of Redux store
    const token = localStorage.getItem("authToken");

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log("API Request | Interceptor | Error", error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and user data on 401 Unauthorized
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");

      // Redirect to login if not already there
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }

      // You can dispatch Redux actions if needed
      // const dispatch = useDispatch();
      // dispatch(setUser({}));

      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

// API.interceptors.request.use(
//   (config) => {
//     const {
//       auth: { token },
//     } = store.getState();
//     if (token && config.headers) {
//       config.headers["auth-token"] = token;
//     }

//     return config;
//   },
//   (error) => {
//     console.log("API Request | Interceptor |  Error", error);
//     return Promise.reject(error);
//   }
// );
// API.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       store.dispatch(setUser({}));
//       store.dispatch(setChatsData({}));
//       store.dispatch(setTemplates({}));
//     } else {
//       return error?.response;
//     }
//   }
// );
export default API;
