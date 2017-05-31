form = document.forms.form1;
images = [5, 15, 45];
def = [35, 1, 50, 1];
color = ["#fa3", "#38f"];
qwer = ["a0", "a1"];
rewq = ["c0", "c1"];
document.imagespreload = new Array(images.length);
for (i = 0; i < images.length; i++) {
  document.imagespreload[i] = new Image;
  document.imagespreload[i].src = "images/" + images[i] + "mm.jpg";
}
function ascending(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
}
function lens(n) {
  if (f[n] >= images[0]) document.getElementById(qwer[n]).style.color = "#000";
  else document.getElementById(qwer[n]).style.color = "#f00";
  if (f[n] > 0 && c[n] > 0) {
    if (c[n] == 1) document.getElementById(rewq[n]).innerHTML = "Кроп-фактор";
    else document.getElementById(rewq[n]).innerHTML = "Кроп-фактор<br/>(" + Math.round(f[n] * 10) / 10 + " mm)";
    document.getElementById(qwer[n]).innerHTML = Math.round(Math.atan(18 / f[n]) * 3600 / Math.PI) / 10 + "° × " + Math.round(Math.atan(12 / f[n]) * 3600 / Math.PI) / 10 + "°";
  } else {
    document.getElementById(qwer[n]).innerHTML = "Ошибка!";
    document.getElementById(rewq[n]).innerHTML = "Кроп-фактор";
  }
}
function hashing() {
  hash = window.location.hash;
  if (hash != "") {
    tmp = new Array();
    tmp = (hash.substr(1)).split("&");
    form.elements.lens0.value = tmp[0];
    form.elements.crop0.value = tmp[1];
    form.elements.lens1.value = tmp[2];
    form.elements.crop1.value = tmp[3];
  } else {
    form.elements.lens0.value = def[0];
    form.elements.crop0.value = def[1];
    form.elements.lens1.value = def[2];
    form.elements.crop1.value = def[3];
  }
}
hashing();
function linking() {
  window.location.hash = form.elements.lens0.value + "&" + form.elements.crop0.value + "&" + form.elements.lens1.value + "&" + form.elements.crop1.value;
}
function calculate(range) {
  if (range) {
    form.elements.lens0.value = form.elements.range0.value;
    form.elements.lens1.value = form.elements.range1.value;
  } else {
    form.elements.range0.value = form.elements.lens0.value;
    form.elements.range1.value = form.elements.lens1.value;
  }
  f = [+form.elements.lens0.value, +form.elements.lens1.value];
  c = [+form.elements.crop0.value, +form.elements.crop1.value];
  f[0] = f[0] * c[0];
  f[1] = f[1] * c[1];
  lens(0); lens(1);
  if (f[0] >= images[0] && f[1] >= images[0]) {
    document.getElementById("internal").style.opacity = 1;
    if (f[0] > f[1]) {
      document.getElementById("internal").style.outline = "4px solid " + color[0];
      document.getElementById("external").style.outline = "4px solid " + color[1];
    }
    else {
      if (f[0] < f[1]) {
        document.getElementById("internal").style.outline = "4px solid " + color[1];
        document.getElementById("external").style.outline = "4px solid " + color[0];
      }
      else {
        document.getElementById("internal").style.outline = "4px solid " + color[0];
        document.getElementById("external").style.outline = "4px dashed " + color[1];
      }
    }
    f.sort(ascending);
    for (i = images.length - 1; i >= 0; i--) if (f[0] >= images[i]) {
        document.getElementById("external").style.backgroundImage = "url(images/" + images[i] + "mm.jpg)";
        document.getElementById("external").style.backgroundSize = f[0] / images[i] * 100 + "%";
        break;
      }
    y = f[0] / f[1] * 100;
    document.getElementById("internal").style.width = y + "%";
    document.getElementById("internal").style.height = y + "%";
  } else {
    document.getElementById("external").style.outline = "4px solid #f00";
    document.getElementById("internal").style.opacity = 0;
  }
}
calculate();