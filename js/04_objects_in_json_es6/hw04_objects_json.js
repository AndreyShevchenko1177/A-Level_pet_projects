let taskList = (`
1 3-persons
2 different fields
`)

let a = {};
let b = {};
let c = {};

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
                obj["name"] = prompt(`Объект ${count}.["name"] =  ?`, "");
                obj["surname"] = prompt(`Объект ${count}.["surname"] =  ?`, "");
            }

            let myObj = [a, b, c];
            let myStr = 'abc';
            for (i = 0; i <= 2; i++) {
                insFullname(myObj[i], myStr[i]);
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
            debugger

            hw04_json(1);

            a["age"] = +prompt(`Введите age объекта "а":`, 0);
            a["fathername"] = prompt(`Введите fathername объекта "а":`, "");
            b["fathername"] = prompt(`Введите fathername объекта "b":`, "");
            b["sex"] = prompt(`Введите sex объекта "b": (m/w)`, "m").toLowerCase;
            c["age"] = +prompt(`Введите возраст объекта "c":`, 0);

            console.log(a)
            console.log(b)
            console.log(c)


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
