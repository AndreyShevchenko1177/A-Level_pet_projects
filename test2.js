async function categories(el = aside, parentId = null) {
    let result = await gql(
        `query cats($query:String){
                                              CategoryFind(query: $query){
                                                name}`,
        { query: JSON.stringify([{ "parent._id": parentId }]) }
    );
    if (result.errors) return;
    let ul = document.createElement("ul");
    el.append(ul);
    for (let { name, _id } of result.data.CategoryFind) {
        let li = document.createElement("li");
        li.innerText = name;
        let loaded;
        li.onclick = () => {
            if (!loaded) {
                categories(li, _id);
                loaded = true;
            }
        };
        ul.append(li);
    }
}
