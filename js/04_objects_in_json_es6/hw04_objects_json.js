let taskList = (`
1 3-persons
2 different fields
3 fields check
4 array of persons
5 loop of persons
6 loop of name and surname
7 loop of loop of values
8 fullName
9 serialize - JSON-строку из persons
10 deserialize
11 HTML
`)

let a = {};
let b = {};
let c = {};
let myObjArr = [a, b, c];
mustHaveKeys = ["name", "surname"];



function showAllObjects() {
    let strTemp = "";
    for (i in myObjArr) {
        for (key in myObjArr[i]) {
            strTemp += myObjArr[i][key] + "  "
        }
        console.log(strTemp);
        strTemp = "";
    }
    alert("Загляни в консоль...");
}



function hw04_json(task) {


    if (task === undefined) {
        task = +(prompt("Что? Новый хозяин! надо???  Введите номер задания:\n" + taskList, "Напечь за меня пирогов!").toLowerCase());
    }


    switch (task) {

        case 1: {
            // 3 persons
            // Сделать три ассоциативных массива a, b, c, 
            // в каждом из которых должны быть поля name и surname.


            function insFullname(obj, objName, i) {
                obj["name"] = prompt(`Объект ${objName}.["name"] =  ?`, `Name_${i}`);
                obj["surname"] = prompt(`Объект ${objName}.["surname"] =  ?`, `Surname_${i}`);
            }

            let myStr = 'abc';
            for (i = 0; i <= 2; i++) {
                insFullname(myObjArr[i], myStr[i], i);
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
            a["fathername"] = prompt(`Введите fathername объекта "а":`, "FathernameA");
            b["fathername"] = prompt(`Введите fathername объекта "b":`, "FathernameB");
            b["sex"] = ((prompt(`Введите sex объекта "b": (m/w)`, "m")).toLowerCase());
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
                name: "NameQ",
                surname: "SurnameQ",
                sex: "w"
            }
            console.log(myObjArr);

        } //case #
            break;


        case 5: {
            // loop of persons
            // Сделайте цикл, который выводит весь массив persons
            // в форме объектов console.log(persons[i])

            hw04_json(4);

            for (i in myObjArr) { console.log(myObjArr[i]) };
            alert("Загляни в консоль...");

        } //case #
            break;


        case 6: {
            // loop of name and surname
            // Сделайте цикл, который выводит весь массив persons,
            // но только Имя и Фамилию каждой персоны.

            hw04_json(4);

            let strTemp;
            for (i in myObjArr) {
                strTemp = myObjArr[i].name + " " + myObjArr[i].surname;  //можно и без промежуточной 
                console.log(strTemp);                                   // строки сразу в консоль
            }

            alert("Загляни в консоль...");

        } //case #
            break;


        case 7: {
            // loop of loop of values
            // Сделайте цикл, который выводит весь массив persons,
            // но только значения всех полей из объектов.
            // Используйте вложенный цикл

            hw04_json(4);

            showAllObjects()

        } //case #
            break;


        case 8: {
            // fullName
            // Сделайте цикл, которых добавляет поле fullName в каждый объект,
            // содержащий ФИО.
            // Учтите, что поле fathername не является обязательным.

            hw04_json(4);

            for (i in myObjArr) {
                myObjArr[i]["fullName"] =
                    myObjArr[i].name + " " + myObjArr[i].surname +
                    (((myObjArr[i].fathername) && (" " + myObjArr[i].fathername)) || "")
            }

            showAllObjects();


        } //case #
            break;


        case 9: {
            // serialize
            // Создайте JSON - строку из persons

            hw04_json(8);
            showAllObjects();
            let jsonStr = JSON.stringify(myObjArr);
            console.log(jsonStr);

        } //case #
            break;


        case 10: {
            // deserialize
            // Создайте ассоциативный массив с одной персоной из JSON - строки.
            // Добавьте её в persons

            hw04_json(8);
            showAllObjects();
            let jsonStr = `{"name":"JsonName","surname":"JsonSurname","age":2020,"fullName":"JsonName JsonSurname"}`;
            let jsonObj = JSON.parse(jsonStr);
            myObjArr.push(jsonObj);
            console.log(myObjArr);
            showAllObjects();

        } //case #
            break;



        case 11: {
            // HTML
            // Сделайте цикл, который выводит весь массив persons в форме HTML - таблицы.
            // Имя и Фамилия - колонки.

            hw04_json(10);

            let strHtml = `<table border="1" align="center">`;
            strHtml += `<tr><td>Name</td><td>Surame</td></tr>`;
            for (i in myObjArr) {
                strHtml += `<tr><td>${myObjArr[i].name}</td><td>${myObjArr[i].surname}</td></tr>`;
            };
            strHtml += `</table>`;
            document.write(strHtml);

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
