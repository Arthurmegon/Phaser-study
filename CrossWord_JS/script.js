var list1 = ["teste", "entao", "alt", "ato"];
var letters1 = ["T", "E", "S", "T", "E", "N", "T", "A", "O", "L", "T", "A", "O"];

function submit1(){
  var enterWord = input1.value;
  if (enterWord == list1[0]) {
    a1.innerHTML = letters1[0];
    a2.innerHTML = letters1[1];
    a3.innerHTML = letters1[2];
    a4.innerHTML = letters1[3];
    a5.innerHTML = letters1[4];
    input1.value = "";
    error.innerHTML = "";
    acerto.innerHTML = "Acertou :)";
  }

  if (enterWord == list1[1]) {
    a2.innerHTML = letters1[1];
    a6.innerHTML = letters1[5];
    a7.innerHTML = letters1[6];
    a8.innerHTML = letters1[7];
    a9.innerHTML = letters1[8];
    input1.value = "";
    error.innerHTML = "";
    acerto.innerHTML = "Acertou :)";
  }

  if (enterWord == list1[2]) {
    a8.innerHTML = letters1[7];
    a10.innerHTML = letters1[9];
    a11.innerHTML = letters1[10];
    input1.value = "";
    error.innerHTML = "";
    acerto.innerHTML = "Acertou :)";
  }

  if (enterWord == list1[3]) {
    a12.innerHTML = letters1[11];
    a11.innerHTML = letters1[10];
    a13.innerHTML = letters1[12];
    input1.value = "";
    error.innerHTML = "";
    acerto.innerHTML = "Acertou :)";
  }

  if (enterWord != list1[0, 1, 2, 3]) {
    error.innerHTML = "Errou :(";
    acerto.innerHTML = "";
    input1.value = "";
  }
}