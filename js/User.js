class GameCpu {
  getNextStep(gameMatrix) {
    //Get Array 0-8 where 0 = free; 1 = x; 2 = o;
    throw new Error("getNextStep may be implemented!");
    //return Math.floor( (Math.random()*(9)));//Must return value from 0 to 8
  }
}
export default class User extends GameCpu {
  constructor() {
    super();
  }

  getNextStep(gameMatrix, userNumber = 1) {
    if (!gameMatrix.includes(1) & !gameMatrix.includes(2)) {
      return 4;
    }

    const rivalNumber = userNumber === 1 ? 2 : 1;

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const gameStatus = {
      needAttack: false,
      needReflection: false,
      indexAttack: null,
      indexReflection: null,
      canNextStep: [],
      freeFields: []
    };

    gameMatrix.forEach((item, index) => {
      if (item === 0) {
        gameStatus.freeFields.push(index);
      }
    });

    gameStatus.canNextStep.push(...gameStatus.freeFields);

    for (const line of lines) {
      const zerroIndex = [];
      const userIndex = [];
      const rivalIndex = [];

      line.forEach(index => {
        switch (gameMatrix[index]) {
          case userNumber:
            userIndex.push(index);
            break;
          case rivalNumber:
            rivalIndex.push(index);
            break;
          case 0:
            zerroIndex.push(index);
            break;
        }
      });

      if ((userIndex.length === 2) & (zerroIndex.length === 1)) {
        gameStatus.needAttack = true;
        gameStatus.indexAttack = zerroIndex[0];
      }

      if ((rivalIndex.length === 2) & (zerroIndex.length === 1)) {
        gameStatus.needReflection = true;
        gameStatus.indexReflection = zerroIndex[0];
      }
      if (
        (userIndex.length === 1) &
        (rivalIndex.length === 1) &
        (zerroIndex.length === 1)
      ) {
        gameStatus.canNextStep.splice(zerroIndex[0], 1);
      }
    }

    if (gameStatus.needAttack) {
      return gameStatus.indexAttack;
    }

    if (gameStatus.needReflection) {
      return gameStatus.indexReflection;
    }

    if (gameMatrix[4] === 0) {
      return 4;
    }

    if (gameStatus.freeFields.length > 4) {
      const arrIndex = gameStatus.canNextStep.filter(item => item % 2 === 0);
      return arrIndex[Math.floor(Math.random() * (arrIndex.length - 1))]; //Must return value from 0 to 8
    }

    //Get Array 0-8 where 0 = free; 1 = x; 2 = o;
    return gameStatus.freeFields[
      Math.floor(Math.random() * (gameStatus.freeFields.length - 1))
    ]; //Must return value from 0 to 8
  }
  getUserName () {
    console.log("Dmytro Lysenko");
  }
}
