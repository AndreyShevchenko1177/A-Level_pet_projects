function validateBattlefield(field) {

    let tempArr = Array.from(Array(12), () => 0);
    for (let i = 0; i < 10; i++) {
        field[i] = [0, ...field[i], 0];
    }
    field = [tempArr, ...field, tempArr];



    let x4 = x3 = x2 = x1 = 0;
    let ships = Array.from(Array(5), () => 0);;
    let vizited = Array.from(Array(12), () => Array.from(Array(12), () => false));

    let findShip = function (row, cel) {

        vizited[row][cel] = '+1+';

        let diag = function (i, j) {

            vizited[i - 1][j - 1] = vizited[i - 1][j + 1] = vizited[i + 1][j - 1] = vizited[i + 1][j + 1] = '+1+';

            return (field[i - 1][j - 1] || field[i - 1][j + 1] || field[i + 1][j - 1] || field[i + 1][j + 1]);
        };


        let rowTemp = row;
        let celTemp = cel;
        let len = 0;


        if (field[rowTemp][celTemp + 1]) {
            while (field[rowTemp][celTemp]) {
                if (diag(rowTemp, celTemp)) {
                    return false;
                }
                vizited[rowTemp][celTemp + 1] = '+1+';
                celTemp++;
                len++;
            }
        }

        rowTemp = row;
        celTemp = cel;

        if (field[rowTemp + 1][celTemp]) {
            while (field[rowTemp][celTemp]) {
                if (diag(rowTemp, celTemp)) {
                    return false;
                }
                vizited[rowTemp + 1][celTemp] = '+1+';
                rowTemp++;
                len++;
            }
        }
        len = len ? len : 1;
        ships[len] += 1;
        return !diag(row, cel);
    };



    for (let row = 1; row < 11; row++) {
        for (let cel = 1; cel < 11; cel++) {
            if (field[row][cel] && !vizited[row][cel]) {
                if (!findShip(row, cel)) {
                    return false;
                }
            }
            vizited[row][cel] = '+1+';

        }
    }

    for (let i = 1; i < 5; i++) {
        let shouldBe = !i ? 0 : 5 - i;
        if (shouldBe !== ships[i]) {
            return false;
        }
    }

    return true;
}

console.log(
    validateBattlefield(
        [[1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])
);

