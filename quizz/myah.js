const questions = [
  {
    question: "What's my favorite color?",
    options: ["Blue", "Red", "Green", "Black"],
    answer: "Blue"
  },
  {
    question: "What's my go-to snack?",
    options: ["Crisps", "Cookies", "Fruit", "Popcorn"],
    answer: "Cookies"
  },
  {
    question: "What's my dream job?",
    options: ["Doctor", "YouTuber", "Game Developer", "Pilot"],
    answer: "Doctor"
  },
  {
    question: "Which pet do I like most?",
    options: ["Dog", "Cat", "Parrot", "Hamster"],
    answer: "Dog"
  },
  {
    question: "My favorite season?",
    options: ["Summer", "Winter", "Spring", "Autumn"],
    answer: "Summer"
  },
  {
    question: "How do I like my pizza?",
    options: ["Cheese Only", "Pepperoni", "Hawaiian", "Veggie"],
    answer: "Cheese Only"
  },
  {
    question: "My top movie genre?",
    options: ["Comedy", "Action", "Horror", "Sci-fi"],
    answer: "Horror"
  },
  {
    question: "Coffee or Tea?",
    options: ["Coffee", "Tea"],
    answer: "Coffee"
  },
  {
    question: "Favorite social media?",
    options: ["Instagram", "TikTok", "Snapchat", "Twitter"],
    answer: "TikTok"
  },
  {
    question: "When's my birthday month?",
    options: ["January", "August", "June", "December"],
    answer: "June"
  },
  {
    question: "What game do I love most?",
    options: ["Minecraft", "Fortnite", "Roblox", "Among Us"],
    answer: "Fortnite"
  },
  {
    question: "Favorite drink?",
    options: ["Soda", "Water", "Juice", "Milkshake"],
    answer: "Milkshake"
  },
  {
    question: "My favorite dessert?",
    options: ["Cake", "Ice Cream", "Brownies", "Cookies"],
    answer: "Ice Cream"
  },
  {
    question: "Do I prefer cats or dogs?",
    options: ["Cats", "Dogs"],
    answer: "Dogs"
  },
  {
    question: "Favorite subject in school?",
    options: ["Math", "Science", "Art", "History"],
    answer: "History"
  },
  {
    question: "Would I rather read or watch a movie?",
    options: ["Read", "Watch a movie"],
    answer: "Read"
  },
  {
    question: "What time do I usually sleep?",
    options: ["9 PM", "10 PM", "Midnight", "2 AM"],
    answer: "10 PM"
  },
  {
    question: "What's my lucky number?",
    options: ["4", "7", "9", "13"],
    answer: "13"
  },
  {
    question: "Do I prefer mountains or beach?",
    options: ["Mountains", "Beach"],
    answer: "Beach"
  },
  {
    question: "Which year did I join our school?",
    options: ["Nursery", "Reception", "Year 1", "Year 2+"],
    answer: "Year 2+"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      document.querySelectorAll("#options button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      nextBtn.disabled = false;
    };
    optionsEl.appendChild(btn);
  });

  nextBtn.disabled = true;
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector("#options button.selected");
  if (selected && selected.textContent === questions[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("question-container").style.display = "none";
  resultEl.style.display = "block";
  resultEl.innerHTML = `<h2>You got ${score} out of ${questions.length} right!</h2>`;

  // Webhook sending
  const webhookUrl = "https://discord.com/api/webhooks/1149059404931551303/gqTLSx5IwmFz6pQmFs7LiaPXVRbw_v3xN4YDtZw3E6nuFD-MoPZIM03u5bD4ZyBwC0bP"; // Replace with your Discord webhook

  const payload = {
    username: "Friendship Quiz Bot",
    embeds: [
      {
        title: "New Friendship Quiz Result",
        color: 0x00ffcc,
        fields: [
          { name: "Score", value: `${score} / ${questions.length}`, inline: true },
          { name: "Time", value: new Date().toLocaleString(), inline: true }
        ]
      }
    ]
  };

  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).catch(error => {
    console.error("Failed to send webhook:", error);
  });
}

showQuestion();