export default {
  fetch: async (request: Request): Promise<Response> => {
    return Response.json({
      message: "Does it work?",
      timestamp: new Date().toISOString(),
      url: request.url
    })
  }
}