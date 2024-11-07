let userScore = 0;
let cpuScore = 0;
let roundNum = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector(".msg");
const userScore_span = document.getElementById("user-score");
const cpuScore_span = document.getElementById("cpu-score");
const round = document.querySelector(".round");
const reset = document.querySelector(".reset");

const genCpuChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const playGame = (userChoice) => {
  console.log("user choice =", userChoice);
};

function DrawGame(userChoice, cpuChoice) {
  console.log("game was draw.");
  msg.innerText = `It's a tie: ${userChoice} vs ${cpuChoice}`;
}

const Winner = (Userwin, userChoice, cpuChoice) => {
  if (Userwin) {
    userScore++;
    console.log("User wins");
    msg.innerText = `You win! ${userChoice} beats ${cpuChoice}`;
    userScore_span.innerHTML = userScore;
  } else {
    cpuScore++;
    console.log("CPU wins");
    msg.innerText = `You lose. ${cpuChoice} beats ${userChoice}`;
    cpuScore_span.innerHTML = cpuScore;
  }

  if (userScore === 5 || cpuScore === 5) {
    
    if(userScore === 5){
      msg.style.color = "green";
      
        msg.innerText = `You won the game. You - ${userScore} : CPU - ${cpuScore}`;
    }else{  
      msg.style.color = "red";
        msg.innerText = `You lost the game. You - ${userScore} : CPU - ${cpuScore}`;
    }

    choices.forEach((choice) => {
      choice.style.visibility = "hidden";
    });
    reset.style.display = "inline";
  }
};

const DisplayImgChoice = (userChoice, cpuChoice) => {
  const UserImg = document.getElementById("user-choice-img");
  const CpuImg = document.getElementById("cpu-choice-img");

  const imgMap = {
    rock: "/images/rock2.png",
    paper: "/images/paper2.png",
    scissors: "/images/scissors2.png",
  };

  UserImg.src = imgMap[userChoice];
  UserImg.alt = userChoice;
  UserImg.style.visibility = "visible";

  CpuImg.src = imgMap[cpuChoice];
  CpuImg.alt = cpuChoice;
  CpuImg.style.visibility = "visible";
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
    const cpuChoice = genCpuChoice();
    console.log("cpu choice =", cpuChoice);
    roundNum++;
    round.innerHTML = `Round: ${roundNum}`;
    
    DisplayImgChoice(userChoice, cpuChoice);

    if (userChoice === cpuChoice) {
      DrawGame(userChoice, cpuChoice);
    } else {
      let Userwin = true;
      if (
        (userChoice === "rock" && cpuChoice === "paper") ||
        (userChoice === "paper" && cpuChoice === "scissors") ||
        (userChoice === "scissors" && cpuChoice === "rock")
      ) {
        Userwin = false;
      } else {
        Userwin = true;
      }

      Winner(Userwin, userChoice, cpuChoice);
    }
  });
});

// Reset button functionality
reset.addEventListener("click", () => {
  userScore = 0;
  cpuScore = 0;
  roundNum = 0;
  
  userScore_span.innerHTML = userScore;
  cpuScore_span.innerHTML = cpuScore;
  round.innerHTML = `Round: ${roundNum}`;
  msg.innerText = "Player that reaches five wins first\nwill win the game.";

  // Make choices visible again
  choices.forEach((choice) => {
    choice.style.visibility = "visible";
  });

  // Hide reset button
  reset.style.display = "none";
  msg.style.color = "navajowhite";
  // Reset images
  document.getElementById("user-choice-img").style.visibility = "hidden";
  document.getElementById("cpu-choice-img").style.visibility = "hidden";
});
