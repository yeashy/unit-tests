//тут вообще по идее и задание 2 и задание 3, тесты естественно далеко не все, но мне не оч важно, так как у меня уже 200 баллов
//я надеюсь получить чисто по 0-1 балла за эти два задания и все норм
//интеграция с бд вообще проверяется криво, не на бэке, а на фронте, да и вообще че к чему
//пхп у меня на опенсервере с доменом, поэтому тут запросы идут к конкретному юрлу
//ну и сама логика тестов тут не очень, так как некоторые тесты надо вызывать только после (или перед) других тестов (типа тест на получение всех данных
//подразумевает, что бд пустая, то есть до этого нельзя смотреть тест stringsent...) ну и плюс к этому тесты не проходят автоматически подряд, и надо вызывать самому


function post() {
    return fetch('https://tests.ru/index.php', {
        mode: 'no-cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            input: document.getElementById('input-text').value,
            team: document.getElementById('team-input').value,
            output: nbaCup(document.getElementById('input-text').value, document.getElementById('team-input').value)
        })
    })
        .then(response => {
            if (!response.ok) {
                return {
                    status: 400,
                    message: "incorrect input data"
                }
            }
            else {
                return response.json();
            }
        })
}

function getById(id){
    return fetch(`https://tests.ru/index.php?id=${id}`, {
        mode: 'no-cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return {
                status: 400,
                message: "incorrect parameteres"
            }
        }
        else {
            return response.json();
        }
    })
}

document.getElementById('post-form').onsubmit = (e) => {
    e.preventDefault();
    let answer = post()
        .then(response => stringSent_normalResponseGot(response));
}


document.getElementById('get-by-id-form').onsubmit = (e) => {
    e.preventDefault();
    let answer = getById(document.getElementById('input-id').value)
        .then(response => () => {
            if (response.status === 200){
                normalIdSent_normalResponseGot(response);
            }
            else {
                badIdSent_badResponseGot(response);
            }
        });
}

document.getElementById('get-form').onsubmit = (e) => {
    e.preventDefault();
    let answer = getAll()
        .then(response => normalRequestSent_normalResponseGot(response));
}

function getAll(){
    return fetch(`https://tests.ru/index.php`, {
        mode: 'no-cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return {
                status: 400,
                message: "incorrect input data"
            }
        }
        else {
            return response.json();
        }
    })
}

function normalIdSent_normalResponseGot(response){
    let expected = {
        status: 200,
        message: {
            input: "",
            team: "",
            output: ""
        }
    }

    if(response.status === expected.status && response.message === expected.message) return;
    else throw `expected: \n status: ${expected.status}, message: ${expected.message} \n got: \n status: ${response.status}, message: ${response.message}`;
}

function badIdSent_badResponseGot(response){
    let expected = {
        status: 400,
        message: "incorrect id"
    }

    if(response.status === expected.status && response.message === expected.message) return;
    else throw `expected: \n status: ${expected.status}, message: ${expected.message} \n got: \n status: ${response.status}, message: ${response.message}`;
}

function stringSent_normalResponseGot(response){
    let expected = {
        status: 200,
        message: ""
    }

    if(response.status === expected.status && response.message === expected.message) return;
    else throw `expected: \n status: ${expected.status}, message: ${expected.message} \n got: \n status: ${response.status}, message: ${response.message}`;
}


function normalRequestSent_normalResponseGot(response){
    let expected = {
        status: 200,
        message: []
    }

    if(response.status === expected.status && response.message === expected.message) return;
    else throw `expected: \n status: ${expected.status}, message: ${expected.message} \n got: \n status: ${response.status}, message: ${response.message}`;
}