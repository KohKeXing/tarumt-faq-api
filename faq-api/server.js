const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// FAQ 数据库 (你可以先放在这里，或者拆 JSON 文件)
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
  graduation: require("./data/faq_graduation.json"),
  tech_support: require("./data/faq_tech_support.json")
};

// 动态 API
app.get("/faq/:category", (req, res) => {
  const category = req.params.category.toLowerCase();
  const q = req.query.question?.toLowerCase();

  if (!faqs[category]) {
    return res.json({ answer: "Category not found." });
  }

  // 找到对应问题
  const result = faqs[category].find(f =>
    f.question.toLowerCase().includes(q)
  );

  res.json(result || { answer: "Sorry, I don’t have that information yet." });
});

app.listen(port, () => {
  console.log(`FAQ API running at http://localhost:${port}`);
});
