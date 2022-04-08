<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE');
header('Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With');

echo "HEllo";

function setStatus($status = "200", $message = null)
{
    $answer = "";
    switch ($status) {
        default:
        case "200":
            $answer = "HTTP/1.0 200 OK";
            break;
        case "400":
            $answer = "HTTP/1.0 400 Bad Request";
            break;
        case "404":
            $answer = "HTTP/1.0 404 Not Found";
            break;
    }

    header($answer);
    if (!is_null($message)) {
        echo json_encode(['message' => $message]);
    }
    exit;
}


function getData($method)
{
    $data = new stdClass;
    if ($method != 'GET') {
        $data->body = json_decode(file_get_contents('php://input'));
    }
    $data->parametres = [];
    $dataGet = $_GET;
    foreach ($dataGet as $key => $value) {
        if ($key != 'q') {
            $data->parametres[$key] = $value;
        }
    }
    return $data;
}

function getMethod()
{
    return $_SERVER['REQUEST_METHOD'];
}

function getUrl()
{
    $url = isset($_GET['q']) ? $_GET['q'] : null;
    $url = rtrim($url, '/');
    $urlList = explode('/', $url);
    return $urlList;
}

header('Content-type: application/json');
global $DB;

$DB = new mysqli('localhost', 'root', '', 'tests');

$router = getUrl()[0];
$data = getData(getMethod());
$method = getMethod();

echo json_encode($data);

if ($router == "index.php") {
    if($method != "GET" && $method != "POST") setStatus("400", "incorrect method");
    if(is_null($data->body->input)) setStatus("400", "incorrect input data");
    else {
        if($method == "POST"){
            addToDb($data);
        } else {
            getFromDb($data->$parametres);
        }
    }
} else setStatus('404', "$router doesn't exist");

function addToDb($data){
    global $DB;
    $input = $data->body->input;
    $team = $data->body->team;
    $output = $data->body->output;
    if(is_null($team)) setStatus("400", "incorrect input data");
    $DB->query("INSERT INTO tests(input, team, output) VALUES('$input', '$team', '$output')");
    setStatus("200", "OK");
}

function getFromDb($parametres){
    global $DB;
    if(is_null($parametres)){
        $result = $DB->query("SELECT input, team, output FROM tests WHERE 1=1");
        $answer = [];
        if($result->num_rows){
            while ($row = $result->fetch_assoc()) {
                $answer[] = ["input" => $row['input'], "team"=>$row["team"], "output" => $row['output']];
            }
        }

        setStatus("200", $answer);
        return;
    } else {
        if(count($parametres) > 1 || is_null($parametres->id)) setStatus("400", "incorrect parameteres");
        $id = $parametres->id;
        $answer = $DB->query("SELECT input, team, output FROM tests WHERE id = $id")->fetch_assoc();

        if(is_null($answer)) setStatus("400", "incorrect id");

        setStatus("200", $answer);
        return;
    }
}

$DB->close();
