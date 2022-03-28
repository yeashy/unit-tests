const nbaCup = require("./nbaCup.js")

test('empty string requested - empty string returned', ()=>{
    expect(nbaCup("Los Angeles Clippers 104 Dallas Mavericks 88", "")).toBe("");
});

test('float score got - error returned', ()=>{
    expect(nbaCup("Los Angeles Clippers 104 Dallas Mavericks 88.8", "Los Angeles Clippers")).toBe("Error(float number):Los Angeles Clippers 104 Dallas Mavericks 88.8");
})

test('non-exitent team requested - team didn`t play returned', ()=>{
    expect(nbaCup("Los Angeles Clippers 104 Dallas Mavericks 88", "Los Angeles Clipp")).toBe("Los Angeles Clipp:This team didn't play!");
})

test('fisrt team requested - first team info returned', () => {
    expect(nbaCup("Los Angeles Clippers 104 Dallas Mavericks 88", "Los Angeles Clippers")).toBe("Los Angeles Clippers:W=1;D=0;L=0;Scored=104;Conceded=88;Points=3");
});

test('second team requested - second team info returned', () => {
    expect(nbaCup("Los Angeles Clippers 104 Dallas Mavericks 88", "Dallas Mavericks")).toBe("Dallas Mavericks:W=0;D=0;L=1;Scored=88;Conceded=104;Points=0");
});

test('score in first place got - error returned', () => {
    expect(nbaCup("88 Los Angeles Clippers 104 Dallas Mavericks", "Dallas Mavericks")).toBe("Error(incorrect input):88 Los Angeles Clippers 104 Dallas Mavericks");
});

test('score after score got - error returned', ()=>{
    expect(nbaCup("Los Angeles Clippers 104 88 Dallas Mavericks", "Dallas Mavericks")).toBe("Error(incorrect input):Los Angeles Clippers 104 88 Dallas Mavericks");
})

test('empty result sheet got - error returned', ()=>{
    expect(nbaCup("", "Dallas Mavericks")).toBe("Error(empty result sheet)");
})

test('3 scores got - error returned', ()=>{
    expect(nbaCup("Los Angeles Clippers 104 Dallas 67 Mavericks 88", "Dallas Mavericks")).toBe("Error(incorrect input):Los Angeles Clippers 104 Dallas 67 Mavericks 88");
})

test('1 scores got - error returned', ()=>{
    expect(nbaCup("Los Angeles Clippers 104 Dallas Mavericks", "Dallas Mavericks")).toBe("Error(incorrect input):Los Angeles Clippers 104 Dallas Mavericks");
})

//вроде все круто
