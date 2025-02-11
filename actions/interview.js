"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function generateQuiz() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) throw new Error("User not found");

  try {
    const prompt = `Genrate 5 Technical interviw questions for a ${
      user.industry
    } professional ${
      user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
    }.
      Each question should be multiple choice with 4 options.
      Return the response in this JSON  format only ,no additional text: 
      { 
      "questions":[
      {
        "question":"string",
        "options":["string","string","string","string"],
        "correctAnswer": "string",
        "explanation":"string"
      }
    ]
    }
      `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const quiz = JSON.parse(cleanedText);

    return quiz.questions;
  } catch (error) {
    console.error("Error in genartinh quiz", error);
    throw new Error("Failed to generate quiz questions");
  }
}

export async function saveQuizResult(questions, answers, score) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) throw new Error("User not found");

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));
  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);
  let improvementTip = null;

  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question:" ${q.question}"\ Correct Answer:"${q.answer}\User Answer":"${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `The user got the following ${user.industry} technical interview questions wrong:
    ${wrongQuestionsText}
      based on these misatakes ,peovide conscise specifi improv tip.
      Focus on knowledge gaps revelad by these wrong answers.
      Focus on what to learn.
    `;
    try {
      const result = await model.generateContent(improvementPrompt);
      const response = result.response;
      improvementTip = response.text().trim();
    } catch (error) {
      console.error("Error genearing improvment tip", error);
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });
    return assessment;
  } catch (error) {
    console.error("Error saving quiz results", error);
    throw new Error("Failed to save quiz result");
  }
}
