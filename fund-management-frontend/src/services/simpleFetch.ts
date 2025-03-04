export async function simpleFetch(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch funds');
    }
    return response.json();
}