'use server';

/**
 *
 * @param input string
 * @returns boolean - Returns true if the input has been flagged for moderation, false otherwise
 */
export async function moderateText(input: string): Promise<boolean> {
  const request = await fetch('https://api.openai.com/v1/moderations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ input }),
  });

  const { results } = await request.json();

  return !(results?.[0].flagged as boolean);
}
