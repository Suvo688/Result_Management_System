// Function to check the user's role from localStorage and render the appropriate dashboard
function renderDashboard() {
  const userRole = localStorage.getItem("userRole");

  if (userRole === "teacher") {
    // Show teacher dashboard
    document.getElementById("teacherDashboard").style.display = "block";
    document.getElementById("studentDashboard").style.display = "none";
  } else if (userRole === "student") {
    // Show student dashboard
    document.getElementById("teacherDashboard").style.display = "none";
    document.getElementById("studentDashboard").style.display = "block";
  } else {
    // If no role found, redirect to login
    window.location.href = "index.html";
  }
}

// Call the renderDashboard function when the page loads
renderDashboard();

// Sample student data for search functionality (you should replace this with real data or fetch it)
const studentData = [
  { studentId: 'S1001', studentName: 'John Doe' },
  { studentId: 'S1002', studentName: 'Jane Smith' },
  { studentId: 'S1003', studentName: 'Samuel Green' }
];

// Search function
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
