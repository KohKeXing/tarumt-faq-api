const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Load all FAQ JSON files
const faqs = {
  admission: require("./data/faq_admission.json"),
  courses: require("./data/faq_courses.json"),
  fees: require("./data/faq_fees.json"),
  facilities: require("./data/faq_facilities.json"),
  contact: require("./data/faq_contact.json"),
  registration: require("./data/faq_registration.json"),
  international: require("./data/faq_international.json"),
  calendar: require("./data/faq_calendar.json"),
  student_life: require("./data/faq_student_life.json"),
  library: require("./data/faq_library.json"),
  exams: require("./data/faq_exams.json"),

};

// Dynamic FAQ endpoint
app.get("/faq/:category", (req, res) => {
  const category = req.params.category.toLowerCase();
  const q = req.query.question?.toLowerCase();

  if (!faqs[category]) {
    return res.json({ answer: "Category not found." });
  }

  if (!q) {
    // If no question query, return all FAQs in that category
    return res.json(faqs[category]);
  }

  // Find matching question
  const result = faqs[category].find(f =>
    f.question.toLowerCase().includes(q)
  );

  res.json(result || { answer: "Sorry, I don’t have that information yet." });
});

app.listen(port, () => {
  console.log(`FAQ API running at http://localhost:${port}`);
});
