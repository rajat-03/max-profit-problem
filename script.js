class Infrastructure {
  constructor() {
    this.earnings = 0;
    this.infra = [];
  }
}

const timeUnits = [5, 4, 10];
const earnings = [1500, 1000, 3000];
let targetTime;

function util(time, money, res, arr) {
  if (money === res.earnings) {
    const arrClone = [...arr];
    res.infra.push(arrClone);
  }

  if (money > res.earnings) {
    res.earnings = money;
    res.infra = [];
    const arrClone = [...arr];
    res.infra.push(arrClone);
  }

  for (let i = 0; i < 3; i++) {
    if (timeUnits[i] < time) {
      arr[i] += 1;
      util(
        time - timeUnits[i],
        money + (time - timeUnits[i]) * earnings[i],
        res,
        arr
      );
      arr[i] -= 1;
    }
  }
}

function getResultString(infra, totalProfit) {
  return `T: ${infra[0]}, P: ${infra[1]}, C: ${infra[2]}, Earning: $${totalProfit}`;
}

const main = (totalTimeUnits) => {
  const res = new Infrastructure();

  util(totalTimeUnits, 0, res, [0, 0, 0]);

  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (res.infra.length === 0) {
    resultsContainer.innerHTML = "No Solutions";
  } else {
    resultsContainer.innerHTML = res.infra
      .map(
        (infra, index) =>
          `<div><b>${index + 1}.)</b> ${getResultString(
            infra,
            res.earnings
          )}</div>`
      )
      .join("");
  }
};

document.getElementById("myform").addEventListener("submit", (e) => {
  e.preventDefault();
  const timeInput = parseInt(document.forms["myForm"]["time"].value, 10);

  if (!isNaN(timeInput) && timeInput > 0 && timeInput <= 200) {
    main(timeInput);
  } else {
    document.getElementById("results").innerHTML =
      "<div>Please enter a valid positive number between 1 and 200.</div>";
  }
});
