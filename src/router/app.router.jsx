import AppLayout from "@/layouts/app-layout"
import HelloWorldPage from "@/pages/hello-world-page"

export const appRouter = [
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: HelloWorldPage,
      },
    ],
  },
]
