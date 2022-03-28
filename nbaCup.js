function nbaCup(resultSheet, toFind) {
    if (toFind === '') return '';
    if (resultSheet === '') return "Error(empty result sheet)";

    let gamesArr = resultSheet.split(',');

    for (let i = 0; i < gamesArr.length; i++) {
        if (gamesArr[i].indexOf('.') !== -1) return `Error(float number):${gamesArr[i]}`
    }

    function makeTeamsArr(gamesArr) {
        let teamsArr = [];

        function separateTeamname(game) {
            let teamname = '';
            let teamname2 = '';
            let c = 0, j = 0;
            game = game.split(' ');
            for (let i = 0; i < game.length; i++) {
                if (game[i] != parseInt(game[i])) {
                    if (!c) teamname += i === 0 ? game[i] : ' ' + game[i];
                    else teamname2 += i === j ? game[i] : ' ' + game[i];

                }
                else {
                    if(i == 0 || i == j){
                        return `Error(incorrect input):${game.join(' ')}`;
                    }
                    c++;
                    if(c == 3) return `Error(incorrect input):${game.join(' ')}`;
                    j = i + 1;
                    continue;
                }
                if(i == game.length - 1 && c < 2) return `Error(incorrect input):${game.join(' ')}`;
            }
            return [teamname, teamname2];
        }

        for (let i = 0; i < gamesArr.length; i++) {
            let alreadyHere1 = false;
            let alreadyHere2 = false;
            if(typeof separateTeamname(gamesArr[i]) == 'string') return separateTeamname(gamesArr[i]);

            for (let j = 0; j < teamsArr.length; j++) {
                if (teamsArr[j].teamname == separateTeamname(gamesArr[i])[0]) {
                    alreadyHere1 = true;
                }
                if (teamsArr[j].teamname == separateTeamname(gamesArr[i])[1]) {
                    alreadyHere2 = true;
                }
            }
            if (!alreadyHere1) teamsArr.push({
                teamname: separateTeamname(gamesArr[i])[0]
            });
            if (!alreadyHere2) teamsArr.push({
                teamname: separateTeamname(gamesArr[i])[1]
            });
        }
        return teamsArr;
    }

    function countParametres(gamesArr, teamsArr) {
        let answerArr = [];

        for (let i = 0; i < teamsArr.length; i++) {
            answerArr.push({
                teamname: teamsArr[i].teamname,
                wins: 0,
                draws: 0,
                losses: 0,
                scored: 0,
                conceded: 0,
                games: 0,
                points: 0
            })
        }

        for (let i = 0; i < teamsArr.length; i++) {
            for (let j = 0; j < gamesArr.length; j++) {

                if (gamesArr[j].indexOf(teamsArr[i].teamname) !== -1) {
                    let score1 = 0, score2 = 0;

                    game = gamesArr[j].split(' ');

                    for (let k = 0; k < game.length; k++) {

                        if (game[k] == parseInt(game[k])) {
                            if (k != game.length - 1) score1 = parseInt(game[k]);
                            else score2 = parseInt(game[k])
                        }
                    }

                    if (gamesArr[j].indexOf(teamsArr[i].teamname) === 0) {
                        answerArr[i].scored += score1;
                        answerArr[i].conceded += score2;

                        if (score1 > score2) {
                            answerArr[i].wins++;
                            answerArr[i].points += 3;
                        } else if (score1 < score2) {
                            answerArr[i].losses++;
                        } else {
                            answerArr[i].draws++;
                            answerArr[i].points += 1;
                        }
                    } else {
                        answerArr[i].scored += score2;
                        answerArr[i].conceded += score1;

                        if (score2 > score1) {
                            answerArr[i].wins++;
                            answerArr[i].points += 3;
                        } else if (score2 < score1) {
                            answerArr[i].losses++;
                        } else {
                            answerArr[i].draws++;
                            answerArr[i].points += 1;
                        }
                    }

                    answerArr[i].games++;
                }
            }
        }

        return answerArr;
    }

    if(typeof makeTeamsArr(gamesArr) == 'string') return makeTeamsArr(gamesArr);

    let resultArr = countParametres(gamesArr, makeTeamsArr(gamesArr));

    for (let i = 0; i < resultArr.length; i++) {
        if (resultArr[i].teamname === toFind) {
            return `${resultArr[i].teamname}:W=${resultArr[i].wins};D=${resultArr[i].draws};L=${resultArr[i].losses};Scored=${resultArr[i].scored};Conceded=${resultArr[i].conceded};Points=${resultArr[i].points}`;
        } else if (i === resultArr.length - 1) return `${toFind}:This team didn't play!`;
    }
}

module.exports = nbaCup;