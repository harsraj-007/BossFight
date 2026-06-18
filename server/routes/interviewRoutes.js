const express = require("express");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

const { generateQuestions, getHistory, getInterviewById,
        evaluateAnswer, evaluateInterview } = require("../controllers/interviewController");

router.post(
  "/generate-questions",
  authMiddleware,
  generateQuestions
);

router.post(
  "/evaluate-answer",
  authMiddleware,
  evaluateAnswer
);

router.post(
  "/evaluate-interview",
  authMiddleware,
  evaluateInterview
);


router.get(
  "/history",
  authMiddleware,
  getHistory,
  getInterviewById
);

module.exports = router;
