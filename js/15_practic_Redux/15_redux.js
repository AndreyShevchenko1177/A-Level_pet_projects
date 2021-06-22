function createStore(reducer) {
    let state = reducer({});

    let cbs = [];

    return {
        dispatch(action) {
            const newState = reducer(action, state);

            if (newState !== state) {
                state = newState;
                cbs.forEach((cb) => cb());
            }
        },

        subscribe(cb) {
            cbs.push(cb);
            return () => (cbs = cbs.filter((c) => c !== cb));
        },

        getState() {
            return state;
        },
    };
}

let store = createStore(({ type }, state = true) => {
    if (type === "SET") return true;
    if (type === "RESET") return false;
    if (type === "TOGGLE") return !state;

    return state;
});

//console.log(store.getState())

store.subscribe(() => console.log(store.getState()));

store.dispatch({ type: "RESET" });
store.dispatch({ type: "TOGGLE" });
store.dispatch({ type: "ПИВА ДАЙ" });

// const actionCartSet = (id, count) => ({ type: "CART_SET", id, count });

// store.dispatch(actionCartSet(1, 5));

function SuperCheckbox(el) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = store.getState();

    let unsubscribe = store.subscribe(() => (checkbox.checked = store.getState()));
    checkbox.onchange = () => store.dispatch({ type: "TOGGLE" });

    el.append(checkbox);
}
