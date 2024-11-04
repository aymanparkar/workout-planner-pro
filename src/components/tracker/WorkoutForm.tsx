"use client";

import { signal } from "@preact-signals/safe-react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ExerciseFields from "./ExerciseField";

export interface Exercise {
  muscle: string;
  sets: number;
  reps: string;
  weight: string;
  customMuscle?: string;
}

const exercises = signal<Exercise[]>([
  { muscle: "", sets: 1, reps: "", weight: "" },
]);

const startTime = signal<string>("");
const endTime = signal<string>("");

function addExercise() {
  exercises.value = [
    ...exercises.value,
    { muscle: "Chest", sets: 1, reps: "10", weight: "10kg" },
  ];
  console.log("HELLO WORLD");
}

function removeExercise(index: number) {
  exercises.value = exercises.value.filter((_, i) => i !== index);
}

function updateExercise(
  index: number,
  field: keyof Exercise,
  value: string | number
) {
  const updatedExercises = [...exercises.value];
  updatedExercises[index] = { ...updatedExercises[index], [field]: value };
  exercises.value = updatedExercises;
}

// // Key for localStorage
// const WORKOUT_STORAGE_KEY = "workoutData";

// // Save exercises to localStorage
// function saveWorkoutToLocalStorage() {
//   const workoutData = {
//     exercises: exercises.value,
//     startTime: startTime.value,
//     endTime: endTime.value,
//   };
//   localStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify(workoutData));
// }

// // Load exercises from localStorage on component mount
// function loadWorkoutFromLocalStorage() {
//   const storedData = localStorage.getItem(WORKOUT_STORAGE_KEY);
//   if (storedData) {
//     const parsedData = JSON.parse(storedData);
//     exercises.value = parsedData.exercises;
//     startTime.value = parsedData.startTime || "";
//     endTime.value = parsedData.endTime || "";
//   }
// }

// // Call loadWorkoutFromLocalStorage when the component mounts
// loadWorkoutFromLocalStorage();

export function WorkoutForm() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Log Workout</CardTitle>
          <CardDescription>
            Record your workout details and progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="startTime">Workout Start Time</Label>
                <Input id="startTime" type="time" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="endTime">Workout End Time</Label>
                <Input id="endTime" type="time" />
              </div>
              <div className="space-y-2">
                <Label>Exercises</Label>
                {exercises.value.map((exercise, index) => (
                  <ExerciseFields
                    key={index}
                    index={index}
                    exercise={exercise}
                    onUpdate={updateExercise}
                    onRemove={removeExercise}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addExercise}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Exercise
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button >Save Workout</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
