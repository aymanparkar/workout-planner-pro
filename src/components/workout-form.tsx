'use client'

import { signal } from "@preact-signals/safe-react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface Exercise {
  muscle: string
  sets: number
  reps: string
  weight: string
  customMuscle?: string
}

const exercises = signal<Exercise[]>([
  { muscle: "", sets: 1, reps: "", weight: "" },
])

const startTime = signal<string>("")
const endTime = signal<string>("")

function addExercise() {
  exercises.value = [
    ...exercises.value,
    { muscle: "Chest", sets: 1, reps: "10", weight: "10kg" },
  ]
}

function removeExercise(index: number) {
  exercises.value = exercises.value.filter((_, i) => i !== index)
}

function updateExercise(
  index: number,
  field: keyof Exercise,
  value: string | number
) {
  const updatedExercises = [...exercises.value]
  updatedExercises[index] = { ...updatedExercises[index], [field]: value }
  exercises.value = updatedExercises
}

export function WorkoutForm() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Log Workout</h1>
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                    Workout Start Time
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    className="mt-1"
                    value={startTime.value}
                    onChange={(e) => startTime.value = e.target.value}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                    Workout End Time
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    className="mt-1"
                    value={endTime.value}
                    onChange={(e) => endTime.value = e.target.value}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Exercises</h2>
                <div className="space-y-4">
                  {exercises.value.map((exercise, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-md">
                      <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                          <Label htmlFor={`muscle-${index}`} className="block text-sm font-medium text-gray-700">
                            Muscle Group
                          </Label>
                          <Select
                            value={exercise.muscle}
                            onValueChange={(value) => updateExercise(index, 'muscle', value)}
                          >
                            <SelectTrigger id={`muscle-${index}`} className="w-full mt-1">
                              <SelectValue placeholder="Select muscle group" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Chest">Chest</SelectItem>
                              <SelectItem value="Back">Back</SelectItem>
                              <SelectItem value="Legs">Legs</SelectItem>
                              <SelectItem value="Shoulders">Shoulders</SelectItem>
                              <SelectItem value="Arms">Arms</SelectItem>
                              <SelectItem value="Core">Core</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor={`sets-${index}`} className="block text-sm font-medium text-gray-700">
                            Sets
                          </Label>
                          <Input
                            id={`sets-${index}`}
                            type="number"
                            className="mt-1"
                            value={exercise.sets}
                            onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`reps-${index}`} className="block text-sm font-medium text-gray-700">
                            Reps
                          </Label>
                          <Input
                            id={`reps-${index}`}
                            type="text"
                            className="mt-1"
                            value={exercise.reps}
                            onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`weight-${index}`} className="block text-sm font-medium text-gray-700">
                            Weight
                          </Label>
                          <Input
                            id={`weight-${index}`}
                            type="text"
                            className="mt-1"
                            value={exercise.weight}
                            onChange={(e) => updateExercise(index, 'weight', e.target.value)}
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExercise(index)}
                        className="mt-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Remove
                      </Button>
                    </div>
                  ))}
                </div>
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
            </form>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-lg">
            <Button type="button" variant="outline" className="mr-3">
              Cancel
            </Button>
            <Button type="submit">Save Workout</Button>
          </div>
        </div>
      </div>
    </div>
  )
}