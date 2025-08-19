import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$plantId')({
  component: RouteComponent,
})

function RouteComponent() {
  const {plantId} = Route.useParams();


  return <div>Hello {plantId}</div>
}
