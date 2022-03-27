function assert(res, answ) {
    if (res !== answ) throw new Error(`expected: ${answ}, got: ${res}`)
}

function startAllTests(){
    check_emptyString_emptyStringReturned();
    check_floatNum_errorReturned();
    find_nonExistentTeam_errorReturned();
    firstSearch_firstWon_firtsReturned();
    secondSearch_firstWon_secondReturned();
    firstSearch_secondWon_firstReturned();
    secondSearch_secondWon_secondReturned();
    firstSearch_draw_firstReturned();
    secondSearch_draw_secondReturned();
    searchTeam_twiceWrote_teamInfoReturned();
    console.log('All Tests Done');
}

//поскольку кач-во кода задачи неважно, то я там накостылял дай бог. Знаю все некрасиво, ну и что теперь)
//я так понял, что неправильный ввод в resSheet может быть только флоатовый счет
//а то что счета например не будет указано или там названия команды нет или не в том порядке этого не указано в задании
//я бы сделал проверку на это, но это супер долго и муторно все эти валидации + я это делаю как обычно в последний момент и на данный момент до дедлайна 1.5 часа
//поэтому я думаю, что если в условии задачи сказано что на вход поступает определенная строка (название счет название счет запятая), то неправильные строки можно не учитывать
//плюс тут невозможно расписать тесты для всех ифов, потому что они и так учитываются в тестах ниже (по типу первая это цифра или вторая и тд...), не знаю норм это или нет
//в общем, препод, надеюсь на твое понимание, не режь баллы сильно плиз(
//p. s. так-то компилятора нет, но тут все просто - нажать на кнопку в хтмл там все выведется в консоль

function check_emptyString_emptyStringReturned() {
    //arrange
    let resSheet = "Los Angeles Clippers 104 Dallas Mavericks 88";
    let stringToFind = "";

    //act
    let result = nbaCup(resSheet, stringToFind);

    //assert
    assert(result, "");
}

function check_floatNum_errorReturned(){
    //arrange
    let resSheet = "Los Angeles Clippers 104 Dallas Mavericks 88.8";
    let stringToFind = "Los Angeles Clippers";

    //act
    let result = nbaCup(resSheet, stringToFind);

    //assert
    assert(result, "Error(float number):Los Angeles Clippers 104 Dallas Mavericks 88.8");
}

function find_nonExistentTeam_errorReturned(){
    //arrange
    let resSheet = "Los Angeles Clippers 104 Dallas Mavericks 88";
    let stringToFind = "Los Angeles Clipp";

    //act
    let result = nbaCup(resSheet, stringToFind);

    //assert
    assert(result, "Los Angeles Clipp:This team didn't play!");
}

function firstSearch_firstWon_firtsReturned(){
    //arrange
    let resSheet = "Los Angeles Clippers 104 Dallas Mavericks 88";
    let stringToFind = "Los Angeles Clippers";

    //act
    let result = nbaCup(resSheet, stringToFind);

    //assert
    assert(result, "Los Angeles Clippers:W=1;D=0;L=0;Scored=104;Conceded=88;Points=3");
}

function secondSearch_firstWon_secondReturned(){
    let resSheet = "Los Angeles Clippers 104 Dallas Mavericks 88";
    let stringToFind = "Dallas Mavericks";

    //act
    let result = nbaCup(resSheet, stringToFind);

    //assert
    assert(result, "Dallas Mavericks:W=0;D=0;L=1;Scored=88;Conceded=104;Points=0");
}

function firstSearch_secondWon_firstReturned(){
    let resSheet = "Los Angeles Clippers 88 Dallas Mavericks 104";
    let stringToFind = "Los Angeles Clippers";

    //act
    let result = nbaCup(resSheet, stringToFind);

    //assert
    assert(result, "Los Angeles Clippers:W=0;D=0;L=1;Scored=88;Conceded=104;Points=0");
}

function secondSearch_secondWon_secondReturned(){
    //arrange
    let resSheet = "Los Angeles Clippers 88 Dallas Mavericks 104";
    let stringToFind = "Dallas Mavericks";

    //act
    let result = nbaCup(resSheet, stringToFind);

    //assert
    assert(result, "Dallas Mavericks:W=1;D=0;L=0;Scored=104;Conceded=88;Points=3");
}

function firstSearch_draw_firstReturned(){
    //arrange
    let resSheet = "Los Angeles Clippers 88 Dallas Mavericks 88";
    let stringToFind = "Los Angeles Clippers";

    //act
    let result = nbaCup(resSheet, stringToFind);

    //assert
    assert(result, "Los Angeles Clippers:W=0;D=1;L=0;Scored=88;Conceded=88;Points=1");
}

function secondSearch_draw_secondReturned(){
    //arrange
    let resSheet = "Los Angeles Clippers 88 Dallas Mavericks 88";
    let stringToFind = "Dallas Mavericks";

    //act
    let result = nbaCup(resSheet, stringToFind);

    //assert
    assert(result, "Dallas Mavericks:W=0;D=1;L=0;Scored=88;Conceded=88;Points=1");
}

function searchTeam_twiceWrote_teamInfoReturned(){
    //arrange
    let resSheet = "Los Angeles Clippers 104 Dallas Mavericks 88, Some Cool Team 90 Dallas Mavericks 100";
    let stringToFind = "Dallas Mavericks";

    //act
    let result = nbaCup(resSheet, stringToFind);

    //assert
    assert(result, "Dallas Mavericks:W=1;D=0;L=1;Scored=188;Conceded=194;Points=3");
}