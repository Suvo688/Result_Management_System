// Data storage
const studentData = [];

// Utility function to calculate grade
function calculateGrade(marks) {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  return "F";
}

// Add student result
document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const studentId = document.getElementById("studentId").value;
  const studentName = document.getElementById("studentName").value;
  const subject = document.getElementById("subject").value;
  const marks = parseInt(document.getElementById("marks").value);

  const grade = calculateGrade(marks);

  // Add new student record
  studentData.push({ studentId, studentName, subject, marks, grade });
  updateTable();
  resetForm();
});

// Update table with student data
function updateTable() {
  const tableBody = document.getElementById("studentTable");
  tableBody.innerHTML = "";

  studentData.forEach((data, index) => {
    const row = `
      <tr>
        <td>${data.studentId}</td>
        <td>${data.studentName}</td>
        <td>${data.subject}</td>
        <td>${data.marks}</td>
        <td>${data.grade}</td>
        <td>
          <button class="btn-edit" onclick="editRecord(${index})">Edit</button>
          <button class="btn-delete" onclick="deleteRecord(${index})">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Reset form after submission
function resetForm() {
  document.getElementById("studentId").value = "";
  document.getElementById("studentName").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("marks").value = "";
}

// Edit record
function editRecord(index) {
  const record = studentData[index];
  document.getElementById("studentId").value = record.studentId;
  document.getElementById("studentName").value = record.studentName;
  document.getElementById("subject").value = record.subject;
  document.getElementById("marks").value = record.marks;

  // Remove record to avoid duplication
  studentData.splice(index, 1);
  updateTable();
}

// Delete record
function deleteRecord(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    studentData.splice(index, 1);
    updateTable();
  }
}

// Analytics: Generate Chart Data
function generateChartData() {
  const subjectMarks = {};
  const highestMarks = [];
  const lowestMarks = [];

  studentData.forEach((record) => {
    if (!subjectMarks[record.subject]) {
      subjectMarks[record.subject] = [];
    }
    subjectMarks[record.subject].push(record.marks);
  });

  for (const subject in subjectMarks) {
    highestMarks.push(Math.max(...subjectMarks[subject]));
    lowestMarks.push(Math.min(...subjectMarks[subject]));
  }

  return { highestMarks, lowestMarks, subjects: Object.keys(subjectMarks) };
}

// Render Analytics Chart
function renderAnalyticsChart() {
  const { highestMarks, lowestMarks, subjects } = generateChartData();

  const ctx = document.getElementById("marksChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: subjects,
      datasets: [
        {
          label: "Highest Marks",
          data: highestMarks,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Lowest Marks",
          data: lowestMarks,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Load analytics when on the Analytics page
if (document.body.classList.contains("analytics-bg")) {
  renderAnalyticsChart();
}

function searchStudent() {
    const searchInput = document.getElementById("searchStudent").value.toLowerCase();
    const results = studentData.filter(student =>
      student.studentName.toLowerCase().includes(searchInput) ||
      student.studentId.includes(searchInput)
    );
  
    if (results.length > 0) {
      alert(`Found ${results.length} students!`);
    } else {
      alert("No matching students found.");
    }
  }
  