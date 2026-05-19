export async function GET() {
  try {
    const response = await fetch(
      `${process.env.API_URL}/latest`
    );

    const data = await response.json();

    return Response.json(data);

  } catch (err) {
    return Response.json({
      error: err.message
    });
  }
}
