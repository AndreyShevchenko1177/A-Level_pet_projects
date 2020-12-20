// You probably know the "like" system from Facebook and other pages. People can "like" blog posts, pictures or other items. We want to create the text that should be displayed next to such an item.

// Implement a function likes :: [String] -> String, which must take in input array, containing the names of people who like an item. It must return the display text as shown in the examples:

// likes [] -- must be "no one likes this"
// likes ["Peter"] -- must be "Peter likes this"
// likes ["Jacob", "Alex"] -- must be "Jacob and Alex like this"
// likes ["Max", "John", "Mark"] -- must be "Max, John and Mark like this"
// likes ["Alex", "Jacob", "Mark", "Max"] -- must be "Alex, Jacob and 2 others

debugger;
function likes(names) {
    let str = "";

    if (!names.length) str = "no one likes this";
    else {
        if (names.length == 1) str = names[0] + " likes this";
        else {
            if (names.length < 4) {
                for (i = 0; i < names.length - 1; i++) str += names[i] + ", ";
                str = str.slice(0, -2) + " and " + names[names.length - 1] + " like this";
            } else {
                for (i = 0; i < 2; i++) str += names[i] + ", ";
                str = str.slice(0, -2) + " and " + (names.length - 2) + " others like this";
            }
        }
    }
    return str;
}

likes(["Alex", "Jacob", "Mark", "Max"]);
