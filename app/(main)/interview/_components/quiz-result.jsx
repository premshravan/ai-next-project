import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, CheckCircle2, Trophy, XCircle } from "lucide-react";
import React from "react";

const QuizResult = ({ result, hideStartNew = false, onStartNew }) => {
  if (!result) return null;

  return (
    <div className="mx-auto">
      <h1 className="flex items-center gap-2 text-3xl gradient-title">
        <Trophy className="h-6 w-6 text-yellow-200" />
      </h1>

      <CardContent>
        {/* score */}

        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold ">
            {result.quizScore.toFixed(1)}%
            <Progress value={result.quizScore} className="w-full"></Progress>
          </h3>
        </div>
        {/* improvmemt tips */}
        {result.improvementTip && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-medium">Improvement Tip</p>
            <p>{result.improvementTip}</p>
          </div>
        )}

        <div>
          <h3 className="font-medium">Questions review</h3>
          {result.questions.map((q,index) => (
            <div className="border rounded-lg p-4 space-y-2" key={index}>
              <div className="flex items-start justify-between gap-2">
                <p>{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Your answer is :{q.userAnswer}</p>
                {!q.isCorrect && <p>CorrectANswer: {q.answer}</p>}
              </div>

              <div className="text-sm bg-muted p-2 rounded">
                <p className="font-medium">Explanation:</p>
                <p>{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      {
        !hideStartNew && (
            <CardFooter>
                <Button onClick={onStartNew} className="w-full">
                    Start New Quiz
                </Button>
            </CardFooter>
        )
      }
    </div>
  );
};

export default QuizResult;
