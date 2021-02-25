import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import jwt_decode from "jwt-decode";

const getGQL = (url) => (query, variables = {}) => {
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(localStorage.authToken ? { Authorization: `Bearer ${localStorage.authToken}` } : {}),
        },
        body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());
};

export const gql = getGQL("http://player.asmer.fs.a-level.com.ua/graphql");

export const actionAuthLogin = (jwt) => ({ type: "LOGIN", jwt });

export const actionAuthLogout = () => {
    return { type: "LOGOUT" };
};

export const actionLogin = (login, password) => async (dispatch) => {
    let loginData = await dispatch(
        actionPromise(
            "login",
            gql(
                `query login($login:String!, $password:String!){
              login(login:$login,password:$password)
            }`,
                { login, password }
            )
        )
    );

    if (loginData && loginData.data.login) {
        dispatch(actionAuthLogin(loginData.data.login));
        // history.push(`/main/${store.getState().auth.payloadId}`);
    }
};

export const actionPromise = (name, promise) => {
    const actionPending = () => ({ type: "PROMISE", name, status: "PENDING", payload: null, error: null });
    const actionResolved = (payload) => ({ type: "PROMISE", name, status: "RESOLVED", payload, error: null });
    const actionRejected = (error) => ({ type: "PROMISE", name, status: "REJECTED", payload: null, error });

    return async (dispatch) => {
        dispatch(actionPending());
        let payload;
        try {
            payload = await promise;
            dispatch(actionResolved(payload));
        } catch (e) {
            dispatch(actionRejected(e));
        }
        return payload;
    };
};

function authReducer(state, action) {
    if (state === undefined) {
        if (!localStorage.authToken) {
            return {};
        } else {
            action.type = "LOGIN";
            action.jwt = localStorage.authToken;
        }
    }

    if (action.type === "LOGIN") {
        try {
            localStorage.authToken = action.jwt;
            console.log("ЛОГИН", jwt_decode(action.jwt).sub.login);
            return {
                login: true,
                token: action.jwt,
                payload: jwt_decode(action.jwt).sub.login,
                payloadId: jwt_decode(action.jwt).sub.id,
            };
        } catch (error) {
            localStorage.removeItem("authToken");
            return {};
        }
    }

    if (action.type === "LOGOUT") {
        console.log("ЛОГАУТ");
        localStorage.removeItem("authToken");
        return {};
    }
    return state;
}

function promiseReducer(state = {}, action) {
    if (["LOGOUT", "LOGIN"].includes(action.type)) return {};
    if (action.type === "PROMISE") {
        const { name = "default", status, payload, error } = action;
        if (status) {
            return {
                ...state,
                [name]: {
                    status,
                    payload: (status === "PENDING" && state[name] && state[name].payload) || payload,
                    error,
                },
            };
        }
    }
    return state;
}

export const store = createStore(
    combineReducers({ auth: authReducer, promise: promiseReducer }),
    applyMiddleware(thunk)
);

store.subscribe(() => console.log(store.getState()));
