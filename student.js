// Simulate student name
document.getElementById('studentName').textContent = "Erica";

// Career data
const careers = [
  { name: "Engineering", counselors: ["Alice", "Bob"] },
  { name: "Medicine", counselors: ["Clara", "David"] },
  { name: "IT & Software", counselors: ["Eve", "Frank"] },
  { name: "Arts & Design", counselors: ["Grace", "Hannah"] },
  { name: "Business & Management", counselors: ["Ivan", "Judy"] }
];

// Elements
const exploreCareersBtn = document.querySelector('#exploreCareers button');
const careerSection = document.getElementById('careerSection');
const careerCards = document.getElementById('careerCards');

const counselorSection = document.getElementById('counselorSection');
const counselorCards = document.getElementById('counselorCards');

// Show careers when clicked
exploreCareersBtn.addEventListener('click', () => {
  careerSection.style.display = 'block';
  counselorSection.style.display = 'none';
  careerCards.innerHTML = '';
  careers.forEach(career => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h3>${career.name}</h3>
      <button onclick="showCounselors('${career.name}')">Select Career</button>
    `;
    careerCards.appendChild(card);
  });
});

// Show counselors for selected career
function showCounselors(careerName) {
  const career = careers.find(c => c.name === careerName);
  if(!career) return;
  counselorSection.style.display = 'block';
  counselorCards.innerHTML = '';
  career.counselors.forEach(c => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h3>${c}</h3>
      <p>Qualified Counselor for ${careerName}</p>
      <button onclick="requestSession('${c}')">Request Session</button>
    `;
    counselorCards.appendChild(card);
  });
  // Scroll to counselor section
  counselorSection.scrollIntoView({behavior: "smooth"});
}

// Dummy request session
function requestSession(counselorName) {
  alert(`Request sent to ${counselorName}`);
}
