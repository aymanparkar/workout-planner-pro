"use client";

import Image from "next/image";
import { signal } from "@preact-signals/safe-react";

import { WorkoutForm } from "@/components/tracker/WorkoutForm";
export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <WorkoutForm></WorkoutForm>
    </div>
  );
}
