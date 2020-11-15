

// Синий пояс Number: flats
// Сделайте калькулятор, который позволит вам исходя из информации
// о количества этажей в доме и количества квартир на этаже
// находить подъезд и этаж определенной квартиры по её номеру.

let namberOfFlat;
let maxFloor;
let flatsPerFloor;
let entrance;
let floor;
while (namberOfFlat !== 0) {
    namberOfFlat = (+prompt("Ведите номер квартиры", "1");
    maxFloor = (+prompt("Сколько в доме этажей?", "1"));
    flatsPerFloor = (+prompt("Сколько квартир на этаже?", "1"));
    // debugger;
    entrance = Math.trunc((namberOfFlat - 1) / (maxFloor * flatsPerFloor)) + 1;
    floor = Math.trunc(((namberOfFlat - 1) % (maxFloor * flatsPerFloor)) / flatsPerFloor) + 1;
    alert(`Этажей ${maxFloor}, квартир на этаже ${flatsPerFloor} \n\nКвартира № ${namberOfFlat} \nНаходится в подъезде № ${entrance} \nНа ${floor} этаже.`);
};