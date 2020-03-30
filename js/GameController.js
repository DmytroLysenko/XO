export default class GameController {
  constructor(user1, user2) {
    this.isUser1 = true;
    this.user1 = user1;
    this.user2 = user2;
    this.gameMatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    setTimeout(this.getNextStep.bind(this), 500);
    if (!user2) {
      this.container = document.querySelector("#js_game");
      this.onClick = this.onClick.bind(this);
    }
  }
  onClick(e) {
    const cStep = e.target.dataset.id;
    if (this.gameMatrix[cStep - 1] === 0) {
      this.gameMatrix[cStep - 1] = 2;
      this.container.removeEventListener("click", this.onClick);
      this.isUser1 = !this.isUser1;

      if (!this.drawPole()) {
        setTimeout(this.getNextStep.bind(this), 1000);
      } else {
        console.log("User1 WIN");
      }
    }
  }
  getNextStep() {
    const cUser = this.isUser1 ? this.user1 : this.user2;
    const userChouse = cUser.getNextStep(this.gameMatrix);

    if (
      (!this.isUser1 && this.gameMatrix[userChouse] !== 0) ||
      this.gameMatrix.indexOf(0) === -1
    ) {
      return false;
    }
    if (this.gameMatrix[userChouse] !== 0) {
      console.log("Error! Field is not empty!");
      // return;
    }
    this.gameMatrix[userChouse] = this.isUser1 ? 1 : 2;
    this.isUser1 = !this.isUser1;

    console.log(this.drawPole());
    if (!this.drawPole()) {
      this.container.addEventListener("click", this.onClick);
    } else {
      console.log("User2 WIN");
    }
  }

  drawPole(fromCheck = false) {
    let isEnd = false;
    for (let i = 0; i < this.gameMatrix.length; i++) {
      const cEl = document.querySelector("#js_" + (i + 1));
      if (this.gameMatrix[i] === 0) {
        cEl.innerHTML = " ";
      }
      if (this.gameMatrix[i] === 1) {
        cEl.innerHTML = "X";
      }
      if (this.gameMatrix[i] === 2) {
        cEl.innerHTML = "O";
      }
      if (this.gameMatrix[i] === 3) {
        cEl.style.backgroundColor = "green";
        isEnd = true;
      }
    }

    if (!fromCheck) {
      this.checkForRezult();
    }

    return isEnd;
  }
  checkForRezult() {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    const m = this.gameMatrix;
    let uw;
    wins.forEach(_ => {
      if (m[_[0]] > 0 && m[_[0]] === m[_[1]] && m[_[1]] === m[_[2]]) {
        uw = m[_[0]];
        m[_[0]] = m[_[1]] = m[_[2]] = 3;
      }
    });
    this.drawPole(true);
  }
}
