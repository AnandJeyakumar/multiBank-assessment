// This function counts how many times each character appears in a string,
// and returns them in the order they first appear.
export function getCharFrequency(input: string): string {
  
  // Check if input is empty or only contains spaces
  if (!input || input.trim().length === 0) {
    return "Input string is empty.";
  }

  // Use a Map to store character counts
  const freqMap = new Map<string, number>();

  // Loop through each character in the string
  for (const char of input) {
    if (char === ' ') continue; 

    // If the character already exists in the map, increase the count
    // Otherwise, set it to 1
    const currentCount = freqMap.get(char) || 0;
    freqMap.set(char, currentCount + 1);
  }

  // Convert the map to a formatted string like "h:1, e:1, l:3"
  const result = Array.from(freqMap.entries())
    .map(([char, count]) => `${char}:${count}`)
    .join(', ');

  return result;
}


const input = "hello world";

console.log(getCharFrequency(input));
