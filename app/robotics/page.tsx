import type { Metadata } from "next"
import { RoboticsPage } from "@/components/robotics-ops"

export const metadata: Metadata = {
  title: "AICore Robotics Ops | AICore Digital",
  description:
    "A supervised robot-fleet operations console for remote telecom and energy sites. Currently a software simulation with live weather, computed satellite-dish pointing angles, and on-device camera detection. Looking for a hardware-pilot partner.",
}

export default function Page() {
  return <RoboticsPage />
}
