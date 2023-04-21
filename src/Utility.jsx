export function moneyFormatter(cost) {
  if (isNaN(cost)) {
    return "";
  }

  return new Intl.NumberFormat(undefined, {
    currency: "usd",
    style: "currency",
  }).format(cost);
}

export function clamp(value, min, max) {
  let returnedValue = value;

  returnedValue = returnedValue < min ? min : returnedValue;
  returnedValue = returnedValue > max ? max : returnedValue;

  return returnedValue;
}

export function levenshtein(string1, string2) {
  const distances = Array(string2.length + 1)
    .fill(null)
    .map(() => Array(string1.length + 1).fill(null));

  for (let i = 0; i <= string1.length; i++) {
    distances[0][i] = i;
  }

  for (let j = 0; j <= string2.length; j++) {
    distances[j][0] = j;
  }

  for (let j = 1; j <= string2.length; j++) {
    for (let i = 1; i <= string1.length; i++) {
      if (string1[i - 1] === string2[j - 1]) {
        distances[j][i] = distances[j - 1][i - 1];
      } else {
        distances[j][i] =
          Math.min(
            distances[j][i - 1],
            distances[j - 1][i],
            distances[j - 1][i - 1]
          ) + 1;
      }
    }
  }

  return distances[string2.length][string1.length];
}

export function jaccard(string1, string2) {
  const set1 = new Set(string1);
  const set2 = new Set(string2);

  const unionSet = new Set([...set1, ...set2]);
  const intersectionSet = new Set(
    [...set1].filter((s) => {
      return set2.has(s);
    })
  );

  return intersectionSet.size / unionSet.size;
}

export function splitString(string) {
  const wordsQuery = string.split(" ");
  const wordsByComma = string.split(",").map((w) => w.trim());
  const wordsBySlash = string.split("/").map((w) => w.trim());

  wordsByComma.forEach((w) => {
    if (!wordsQuery.includes(w)) wordsQuery.push(w);
  });

  wordsBySlash.forEach((w) => {
    if (!wordsQuery.includes(w)) wordsQuery.push(w);
  });

  return wordsQuery;
}
