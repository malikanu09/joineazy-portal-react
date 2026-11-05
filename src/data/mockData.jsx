export const initialUsers = [
  { id: "admin-1", name: "Prof. Sharma", role: "admin", email: "sharma@joineazy.com" },
  { id: "admin-2", name: "Prof. Verma", role: "admin", email: "verma@joineazy.com" },
  { id: "stu-1", name: "Annu Malik", role: "student", email: "annu@joineazy.com" },
  { id: "stu-2", name: "Rahul Kumar", role: "student", email: "rahul@joineazy.com" },
  { id: "stu-3", name: "Priya Singh", role: "student", email: "priya@joineazy.com" },
  { id: "stu-4", name: "Amit Sharma", role: "student", email: "amit@joineazy.com" },
  { id: "stu-5", name: "Neha Gupta", role: "student", email: "neha@joineazy.com" },
];

export const initialAssignments = [
  {
    id: "asg-1",
    title: "React Dashboard UI",
    description: "Build a responsive admin and student dashboard using React & Tailwind CSS.",
    dueDate: "2026-11-05T23:30",
    driveLink: "https://drive.google.com/sample-task1",
    createdBy: "admin-1",
    assignedTo: ["stu-1", "stu-2", "stu-3", "stu-4", "stu-5"],
  },
  {
    id: "asg-2",
    title: "Node.js REST API",
    description: "Develop CRUD endpoints using Express and MongoDB with JWT authentication.",
    dueDate: "2026-11-08T18:00",
    driveLink: "https://drive.google.com/sample-task2",
    createdBy: "admin-1",
    assignedTo: ["stu-1", "stu-2", "stu-3"],
  }
];

// Submissions structure: { [assignmentId]: { [studentId]: "submitted" | "pending" } }
export const initialSubmissions = {
  "asg-1": {
    "stu-1": "submitted",
    "stu-2": "pending",
    "stu-3": "submitted",
    "stu-4": "pending",
    "stu-5": "submitted"
  },
  "asg-2": {
    "stu-1": "pending",
    "stu-2": "pending",
    "stu-3": "pending"
  }
};