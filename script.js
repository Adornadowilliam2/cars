const questions = [
  {
    question: "Which company makes this car?",
    image: "media/ae86toyotatrueno.png",
    options: ["Toyota", "Ford", "Honda", "BMW"],
    answer: "Toyota",
  },
  {
    question: "Which company makes this car?",
    image: "media/lancerevoiiimitsubishi.png",
    options: ["Toyota", "Ford", "Nissan", "Mitsubishi"],
    answer: "Mitsubishi",
  },
  {
    question: "Which company makes this car?",
    image: "media/suzukicappucino.png",
    options: ["Suzuki", "Ford", "Nissan", "Mitsubishi"],
    answer: "Suzuki",
  },
  {
    question: "Which company makes this car?",
    image: "media/r34skylinenissangtr.png",
    options: ["Nissan", "Mitsubishi", "Suzuki", "Mazda"],
    answer: "Nissan",
  },
  {
    question: "Which company makes this car?",
    image: "media/levintoyota.png",
    options: ["BMW", "Toyota", "Nissan", "Mitsubishi"],
    answer: "Toyota",
  },
  {
    question: "Which company makes this car?",
    image: "media/fcmazdarx7.png",
    options: ["Mazda", "Toyota", "Nissan", "Mitsubishi"],
    answer: "Mazda",
  },
  {
    question: "What company makes this car?",
    image: "media/imprezasubaru.png",
    options: ["Subaru", "Toyota", "Nissan", "Mitsubishi"],
    answer: "Subaru",
  },
  {
    question: "Which company makes this car?",
    image: "media/fdmazdarx7.png",
    options: ["Mazda", "Toyota", "Nissan", "Mitsubishi"],
    answer: "Mazda",
  },
  {
    question: "Which company makes this car?",
    image: "media/ek9hondacivic.png",
    options: ["Honda", "Toyota", "Nissan", "Mitsubishi"],
    answer: "Honda",
  },
  {
    question: "Which company makes this car?",
    image: "media/eightyfivelevintoyota.png",
    options: ["Toyota", "Ford", "Nissan", "Mitsubishi"],
    answer: "Toyota",
  },
];

// Function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Shuffle questions initially
shuffle(questions);

let currentQuestionIndex = 0;
let userAnswers = [];
const totalQuestions = questions.length;

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  document.getElementById("car-image").src = currentQuestion.image;
  document.getElementById("car-image").style.margin = "auto";
  document.getElementById("car-image").style.display = "block";
  document.getElementById("question").innerText = currentQuestion.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  // Shuffle options
  const shuffledOptions = currentQuestion.options.sort(
    () => Math.random() - 0.5
  );

  shuffledOptions.forEach((option) => {
    const optionLabel = document.createElement("label");
    optionLabel.innerHTML = `<input type="radio" name="option" value="${option}">${option}`;
    optionsContainer.appendChild(optionLabel);
    optionsContainer.appendChild(document.createElement("br"));
  });

  // Show question elements
  document.getElementById("car-image").style.display = "block";
  document.getElementById("question").style.display = "block";
  document.getElementById("next-btn").style.display = "block";
  optionsContainer.style.display = "block";

  // Hide results and play again button
  document.getElementById("results").style.display = "none";
  document.getElementById("play-again-btn").style.display = "none";
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);
  setTimeout(() => {
    toast.classList.remove("show");
    document.body.removeChild(toast);
  }, 3000);
}

function showResults() {
  let resultMessage = "<h2>Your Results:</h2>";
  userAnswers.forEach((answer, index) => {
    const correctAnswer = questions[index].answer;
    if (answer === correctAnswer) {
      resultMessage += `<p style="color:green">Question ${
        index + 1
      }: ${answer} (Correct)</p>`;
    } else {
      resultMessage += `<p style="color:red">Question ${
        index + 1
      }: ${answer} (Incorrect)</p>`;
    }
  });

  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = resultMessage;
  resultsContainer.style.display = "block"; // Show results

  // Hide question elements
  document.getElementById("car-image").style.display = "none";
  document.getElementById("question").style.display = "none";
  document.getElementById("options").style.display = "none";
  document.getElementById("next-btn").style.display = "none";

  // Show play again button
  document.getElementById("play-again-btn").style.display = "block";
}

document.getElementById("next-btn").addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) {
    showToast("Please select an option");
    return;
  }

  // Store the user's answer
  userAnswers[currentQuestionIndex] = selectedOption.value;

  currentQuestionIndex++;

  if (currentQuestionIndex < totalQuestions) {
    loadQuestion();
  } else {
    showResults(); // Show results after the last question
  }
});

// Play again functionality
document.getElementById("play-again-btn").addEventListener("click", () => {
  currentQuestionIndex = 0;
  userAnswers = []; // Reset answers
  shuffle(questions); // Shuffle questions again
  loadQuestion(); // Load the first question again
});

// Load the first question
loadQuestion();
