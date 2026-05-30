import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Operations Dashboard | AICORE DIGITAL",
  description: "Real-time monitoring and control for AICORE DIGITAL automation infrastructure. Pipeline flow, data management, QA governance, and client onboarding.",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
