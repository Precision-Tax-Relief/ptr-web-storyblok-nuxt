export function onRequest() {
  return new Response("Function works!", {
    headers: { "Content-Type": "text/plain" }
  })
}
