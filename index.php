<?php
function errorhandler() {
    echo "";
}
set_error_handler('errorhandler');

if(!$_POST['action'] == 'guess') {
    echo("<style>*{margin:0;padding:0;}body{background-color:black;width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;color:black;font-size:50px;font-family:'Arial';color:white;}</style><span>nie dowiesz sie tutaj jaki jest dzisiaj champion</span>");
    return;
}

// wybiera losowa liczbe od 1-161 w zaleznosci od dnia miesiaca
srand(mktime(0, 0, 0));
$num = rand(0, 161);

// pobiera dane z pliku champions.json
$data = file_get_contents("./champions.json");
$decoded = json_decode($data, true);

$correct = [];

// sprawdza czy wpisane przez nas dane zgadzaja sie z tymi na liscie, jesli polowicznie sie zgadzaja zwraca 'one', jesli calkiem sie zgadzaja 'two', a jesli wcale to 'zero'
if($_POST['champion']['gender'] == $decoded[$num]['gender']) {
    array_push($correct, 'two');
} else {
    array_push($correct, 'zero');
}

if($_POST['champion']['position'] === array_intersect($_POST['champion']['position'], $decoded[$num]['position']) && $decoded[$num]['position'] === array_intersect($decoded[$num]['position'], $_POST['champion']['position'])) {
    array_push($correct, 'two');
} elseif(!empty(array_intersect($_POST['champion']['position'], $decoded[$num]['position']))) {
    array_push($correct, 'one');
} else {
    array_push($correct, 'zero');
}

if($_POST['champion']['species'] === array_intersect($_POST['champion']['species'], $decoded[$num]['species']) && $decoded[$num]['species'] === array_intersect($decoded[$num]['species'], $_POST['champion']['species'])) {
    array_push($correct, 'two');
} elseif(!empty(array_intersect($_POST['champion']['species'], $decoded[$num]['species']))) {
    array_push($correct, 'one');
} else {
    array_push($correct, 'zero');
}

if($_POST['champion']['resource'] == $decoded[$num]['resource']) {
    array_push($correct, 'two');
} else {
    array_push($correct, 'zero');
}

if($_POST['champion']['range'] === array_intersect($_POST['champion']['range'], $decoded[$num]['range']) && $decoded[$num]['range'] === array_intersect($decoded[$num]['range'], $_POST['champion']['range'])) {
    array_push($correct, 'two');
} elseif(!empty(array_intersect($_POST['champion']['range'], $decoded[$num]['range']))) {
    array_push($correct, 'one');
} else {
    array_push($correct, 'zero');
}

if($_POST['champion']['region'] === array_intersect($_POST['champion']['region'], $decoded[$num]['region']) && $decoded[$num]['region'] === array_intersect($decoded[$num]['region'], $_POST['champion']['region'])) {
    array_push($correct, 'two');
} elseif(!empty(array_intersect($_POST['champion']['region'], $decoded[$num]['region']))) {
    array_push($correct, 'one');
} else {
    array_push($correct, 'zero');
}
// zwraca tablice z wartosciami spowrotem na strone
echo(json_encode($correct));

?>