'use client'

import * as React from "react"
import { Plus, Minus, Menu, Home, BarChart, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function WorkoutLogAppComponent() {
  const [exercises, setExercises] = React.useState([{ muscle: "", sets: 1, reps: "", weight: "" }])

  const addExercise = () => {
    setExercises([...exercises, { muscle: "", sets: 1, reps: "", weight: "" }])
  }

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }

  const updateExercise = (index: number, field: string, value: string | number) => {
    const updatedExercises = [...exercises]
    updatedExercises[index] = { ...updatedExercises[index], [field]: value }
    setExercises(updatedExercises)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container flex items-center justify-between h-14">
          <h1 className="text-lg font-semibold">Workout Logger</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Navigate through the app</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-4">
                <Button variant="ghost" className="justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
                <Button variant="ghost" className="justify-start">
                  <BarChart className="mr-2 h-4 w-4" />
                  Statistics
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1 container py-4">
        <form className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Log Workout</h2>
            <p className="text-sm text-muted-foreground">Record your workout details and progress.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="startTime">Workout Start Time</Label>
              <Input id="startTime" type="time" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="endTime">Workout End Time</Label>
              <Input id="endTime" type="time" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Exercises</Label>
            {exercises.map((exercise, index) => (
              <div key={index} className="space-y-2 p-4 bg-muted rounded-lg">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`muscle-${index}`}>Muscle Group</Label>
                  <Select value={exercise.muscle} onValueChange={(value) => updateExercise(index, "muscle", value)}>
                    <SelectTrigger id={`muscle-${index}`}>
                      <SelectValue placeholder="Select muscle group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chest">Chest</SelectItem>
                      <SelectItem value="back">Back</SelectItem>
                      <SelectItem value="legs">Legs</SelectItem>
                      <SelectItem value="shoulders">Shoulders</SelectItem>
                      <SelectItem value="arms">Arms</SelectItem>
                      <SelectItem value="core">Core</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {exercise.muscle === "custom" && (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`custom-muscle-${index}`}>Custom Muscle Group</Label>
                    <Input 
                      id={`custom-muscle-${index}`} 
                      placeholder="Enter custom muscle group"
                      // value={exercise.customMuscle}
                      onChange={(e) => updateExercise(index, "customMuscle", e.target.value)}
                    />
                  </div>
                )}
                <div className="grid gap-2 sm:grid-cols-3">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`sets-${index}`}>Sets</Label>
                    <Input 
                      id={`sets-${index}`} 
                      type="number" 
                      min="1"
                      value={exercise.sets}
                      onChange={(e) => updateExercise(index, "sets", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`reps-${index}`}>Reps</Label>
                    <Input 
                      id={`reps-${index}`} 
                      placeholder="e.g., 10-12"
                      value={exercise.reps}
                      onChange={(e) => updateExercise(index, "reps", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`weight-${index}`}>Weight</Label>
                    <Input 
                      id={`weight-${index}`} 
                      placeholder="lbs or kg"
                      value={exercise.weight}
                      onChange={(e) => updateExercise(index, "weight", e.target.value)}
                    />
                  </div>
                </div>
                <Button type="button" variant="destructive" size="sm" onClick={() => removeExercise(index)} className="w-full sm:w-auto">
                  <Minus className="h-4 w-4 mr-2" /> Remove Exercise
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addExercise} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Exercise
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1">Save Workout</Button>
          </div>
        </form>
      </main>
    </div>
  )
}