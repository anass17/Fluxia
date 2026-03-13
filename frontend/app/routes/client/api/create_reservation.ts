import { redirect, type ActionFunctionArgs } from "react-router";


export async function action({ request } : ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const response = await fetch("http://localhost:8000/api/reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return { error: "Could not create reservation" }
  }

  return { success: true }
}