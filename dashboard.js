const trainingContents = {
  "Technical Abilities": [],
  "Basic Tactical Skills": [],
  "Coordination Skills (with the ball)": [],
  "Creativity and Intelligence games": [],
  "Technique Contents": [
    "Pass and receive",
    "Guide control",
    "Shooting",
    "Header",
    "Crossing",
    "Driving + dribbling"
  ],
  "Specific technique by position": [],
  "Functional Structures": [],
  "Core tactical Principles": [
    "Offensive principles",
    "Defensive principles"
  ],
  "Specific Tactical Contents": [
    "Offensive Organisation",
    "Defensive Organisation",
    "Offensive Transition",
    "Defensive Transition",
    "Set Pieces"
  ],
  "Specific physical contents": [
    "Coordination",
    "Aerobic drills",
    "Speed drills",
    "Specific Strength",
    "Injury prevention",
    "Flexibility"
  ]
};

let selectedAgeGroup = null;

function selectAgeGroup(group) {
  selectedAgeGroup = group;
  document.getElementById("ageGroupContent").innerHTML = `<h3>${group} Contents</h3>`;
  for (let content in trainingContents) {
    const subcats = trainingContents[content];
    let html = `<div class="content-box"><h4>${content}</h4>`;

    if (subcats.length > 0) {
      subcats.forEach(sub => {
        html += `
          <div class="subcategory">
            <label>${sub}</label>
            <input type="number" min="0" placeholder="Minutes" 
              onchange="saveMinutes('${group}', '${content}', '${sub}', this.value)" />
          </div>`;
      });
    } else {
      html += `
        <div class="subcategory">
          <label>${content}</label>
          <input type="number" min="0" placeholder="Minutes"
            onchange="saveMinutes('${group}', '${content}', 'General', this.value)" />
        </div>`;
    }

    html += `</div>`;
    document.getElementById("ageGroupContent").innerHTML += html;
  }
}

function saveMinutes(group, content, subcategory, minutes) {
  const user = localStorage.getItem("currentUser");
  if (!user) return;

  const key = `training_${user}_${group}`;
  const existing = JSON.parse(localStorage.getItem(key)) || [];

  existing.push({
    content,
    subcategory,
    minutes: parseInt(minutes),
    date: new Date().toISOString()
  });

  localStorage.setItem(key, JSON.stringify(existing));
  alert("Saved!");
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

function generateAnalysis() {
  alert("Coming soon: charts will appear here.");
}