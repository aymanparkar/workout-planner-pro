"use client";

import { signal } from "@preact-signals/safe-react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    { muscle: "chest", sets: 1, reps: "10", weight: "10kg" },
  ];
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

export function WorkoutForm() {
  
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const workoutData = {
      startTime: startTime.value,
      endTime: endTime.value,
      exercises: exercises.value,
    };

    try {
      const response = await fetch("/api/saveWorkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workoutData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Workout saved:", result);

        startTime.value = "";
        endTime.value = "";
        exercises.value = [{ muscle: "", sets: 1, reps: "", weight: "" }];
      } else {
        console.error("Failed to save workout", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while saving the workout:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Log Workout
          </h1>
          <p className="text-gray-600 mb-8">
            Record your workout details and progress.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime" className="mb-2 block">
                    Workout Start Time
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime.value}
                    onChange={(e) => (startTime.value = e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime" className="mb-2 block">
                    Workout End Time
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime.value}
                    onChange={(e) => (endTime.value = e.target.value)}
                  />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Exercises
                </h2>
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
                  className="mt-4"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Exercise
                </Button>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Save Workout</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
