function changeColor() {

    var x = document.getElementById("li1");

    x.style.color = "blue";

    if (x.style.color == "blue") {

        x.style.color = "yellow";

    }

}

window.setInterval("changeColor", 1000);