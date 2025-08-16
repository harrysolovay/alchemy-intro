export default {
  fetch: async (request: Request): Promise<Response> => {
    return Response.json({
      message: "Deploying to CF with Alchemy!",
      timestamp: new Date().toISOString(),
      url: request.url
    })
  }
}