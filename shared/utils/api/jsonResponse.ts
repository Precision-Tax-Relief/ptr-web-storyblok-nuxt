/**
 * Creates a JSON response with appropriate headers
 */
export default function <T>(data: T, status = 200, headers = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, "Content-Type": "application/json" }
  })
}
