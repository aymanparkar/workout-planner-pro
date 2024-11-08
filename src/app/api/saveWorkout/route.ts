import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { startTime, endTime, exercises } = await request.json();


    // date time error
    // fixed : 
    // Get the current date as YYYY-MM-DD
    const currentDate = new Date().toISOString().split("T")[0];

    // Convert `startTime` and `endTime` to full ISO 8601 date-time strings
    const startDateTime = new Date(`${currentDate}T${startTime}`).toISOString();
    const endDateTime = new Date(`${currentDate}T${endTime}`).toISOString();

    const workout = await prisma.workout.create({
      data: {
        startTime: startDateTime,
        endTime: endDateTime,
        exercises: {
          create: exercises.map((exercise: any) => ({
            muscle: exercise.muscle,
            sets: exercise.sets,
            reps: exercise.reps,
            weight: exercise.weight,
            customMuscle: exercise.customMuscle || null,
          })),
        },
      },
    });

    return NextResponse.json({ workout }, { status: 201 });
  } catch (error) {
    console.error("Error saving workout:", error);
    return NextResponse.json({ error: "Failed to save workout" }, { status: 500 });
  }
}
