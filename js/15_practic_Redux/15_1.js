function createStoreMy(reducer) {
    let state = reducer({});
    let cbs = [];

    return {
        dispatch(actionType) {
            const newState = reducer(actionType, state);
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

// передаем функцию редьюсера
let storeMy = createStoreMy(({ type }, state = true) => {
    if (type === "SET") return true;
    if (type === "RESET") return false;
    if (type === "TOGGLE") return !state;
});

storeMy.subscribe(() => console.log(storeMy.getState()));

storeMy.dispatch({ type: "SET" });

for (i = 0; i < 10; i++) {
    let ch = document.createElement("input");
    ch.type = "checkbox";
    ch.checked = storeMy.getState();

    let btn = document.createElement("button");
    btn.append("Ubsub");
    btn.onclick = storeMy.subscribe(() => {
        ch.checked = storeMy.getState();
    });

    ch.onclick = () => {
        storeMy.dispatch({ type: ch.checked ? "SET" : "RESET" });
    };

    document.body.append(ch);
    document.body.append(btn);
}
