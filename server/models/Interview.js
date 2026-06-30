const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  role: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    required: true,
  },

  experience: {
    type: String,
    required: true,
  },

  company: {
    type: String,
    required: true,
  },

  questions: {
    type: [String],
    required: true,
  },

  answers: {
    type: [String],
    default: []
  },

  overallFeedback: {
    type: String,
    default: ""
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const Interview = mongoose.model(
  "Interview",
  interviewSchema
);

module.exports = Interview;