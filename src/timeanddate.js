//  D A T E   A N D   T I M E
function getTimeAndDate() {
  let time;
  let date;
  setInterval(() => {
    time = new Date().toLocaleTimeString();
    document.getElementById("time").innerHTML = time;
    date = new Date().toLocaleDateString();
    document.getElementById("date").innerHTML = date;
  }, 1000);
}

export default getTimeAndDate;
