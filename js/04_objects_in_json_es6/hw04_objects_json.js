let taskList = (`
1 3-persons
2 different fields
3 fields check
4 array of persons
`)

let a = {};
let b = {};
let c = {};
let myObjArr = [a, b, c];
mustHaveKeys = ["name", "surname"];

function hw04_json(task) {
    if (task === undefined) {
        task = +(prompt("Что? Новый хозяин! надо???  Введите номер задания:\n" + taskList, "Напечь за меня пирогов!").toLowerCase());
    }


    switch (task) {

        case 1: {
            // 3 persons
            // Сделать три ассоциативных массива a, b, c, 
            // в каждом из которых должны быть поля name и surname.


            function insFullname(obj, count) {
                obj["name"] = prompt(`Объект ${count}.["name"] =  ?`, "a");
                obj["surname"] = prompt(`Объект ${count}.["surname"] =  ?`, "Aa");
            }

            let myStr = 'abc';
            for (i = 0; i <= 2; i++) {
                insFullname(
                    myObjArr[i], myStr[i]);
            }
            console.log(a)
            console.log(b)
            console.log(c)


        } //case #
            break;


        case 2: {
            // different fields
            // Добавьте некоторые другие поля(например age, fathername, sex(пол)) так,
            // что бы набор полей отличался у разных объектов

            hw04_json(1);

            a["age"] = +prompt(`Введите age объекта "а":`, 1);
            a["fathername"] = prompt(`Введите fathername объекта "а":`, "aa");
            b["fathername"] = prompt(`Введите fathername объекта "b":`, "bb");
            b["sex"] = prompt(`Введите sex объекта "b": (m/w)`, "m").toLowerCase;
            c["age"] = +prompt(`Введите возраст объекта "c":`, 3);

            console.log(a)
            console.log(b)
            console.log(c)


        } //case #
            break;


        case 3: {
            // fields check
            // Проверьте наличие необязательных полей у каждого из этих массивов.
            // Если поле найдено, выведите его с помощью alert.
            // Проверку делайте по typeof или in в if.

            hw04_json(2);

            for (person in myObjArr) {
                let strTemp = "";
                for (keyi in myObjArr[person]) {
                    if (!mustHaveKeys.includes(keyi)) { strTemp += keyi + ", " }
                }
                console.log(strTemp);
                if (strTemp !== "") {
                    alert(`В ${person}-м обьекте такие необязательные поля: \n${strTemp}`);
                } else { alert(`В ${person}-м обьекте необязательных полей нет.`) }
            }

        } //case #
            break;


        case 4: {
            // array of persons
            // Добавьте несколько ассоциативных массивов с персонами в обычный массив persons,
            //     например a, b, c.
            // Так же добавьте персону литерально({ ...}).
            // Получится обычный массив с элементами - ассоциативными массивами с персонами.

            hw04_json(2);
            myObjArr[3] = {
                name: "q",
                surname: "qq",
                sex: "w"
            }
            console.log(myObjArr);

        } //case #
            break;


        case 0: {

            ;
        } //case #
            break;


        case 0: {

            ;
        } //case #
            break;





        default: { alert("Такого мы еще не умеем...!!!") };
    }
}
