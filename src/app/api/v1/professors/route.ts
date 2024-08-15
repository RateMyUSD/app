export async function POST(request: Request) {
  const body = await request.json();

  if (!body) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
