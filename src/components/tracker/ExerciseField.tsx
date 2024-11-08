import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Minus } from "lucide-react"
import { Exercise } from "./WorkoutForm"

interface ExerciseFieldsProps {
  index: number;
  exercise: Exercise;
  onUpdate: (index: number, field: keyof Exercise, value: string | number) => void;
  onRemove: (index: number) => void;
}

export default function ExerciseFields({
  index,
  exercise,
  onUpdate,
  onRemove
}: ExerciseFieldsProps) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-end gap-4 border border-gray-200 p-4 rounded-lg bg-white shadow-sm mb-4">
      <div className="w-full sm:w-auto flex-grow">
        <Label htmlFor={`muscle-${index}`} className="mb-2 block">Muscle Group</Label>
        <Select
          value={exercise.muscle}
          onValueChange={(value) => onUpdate(index, "muscle", value)}
        >
          <SelectTrigger id={`muscle-${index}`} className="w-full">
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
        <div className="w-full sm:w-auto flex-grow">
          <Label htmlFor={`custom-muscle-${index}`} className="mb-2 block">Custom Muscle Group</Label>
          <Input
            id={`custom-muscle-${index}`}
            placeholder="Enter custom muscle group"
            value={exercise.customMuscle || ""}
            onChange={(e) => onUpdate(index, "customMuscle", e.target.value)}
          />
        </div>
      )}
      <div className="w-full sm:w-24">
        <Label htmlFor={`sets-${index}`} className="mb-2 block">Sets</Label>
        <Input
          id={`sets-${index}`}
          type="number"
          min="1"
          value={exercise.sets}
          onChange={(e) => onUpdate(index, "sets", parseInt(e.target.value))}
        />
      </div>
      <div className="w-full sm:w-32">
        <Label htmlFor={`reps-${index}`} className="mb-2 block">Reps</Label>
        <Input
          id={`reps-${index}`}
          placeholder="e.g., 10-12"
          value={exercise.reps}
          onChange={(e) => onUpdate(index, "reps", e.target.value)}
        />
      </div>
      <div className="w-full sm:w-32">
        <Label htmlFor={`weight-${index}`} className="mb-2 block">Weight</Label>
        <Input
          id={`weight-${index}`}
          placeholder="lbs or kg"
          value={exercise.weight}
          onChange={(e) => onUpdate(index, "weight", e.target.value)}
        />
      </div>
      <Button type="button" variant="outline" size="icon" onClick={() => onRemove(index)} className="mt-4 sm:mt-0">
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  )
}