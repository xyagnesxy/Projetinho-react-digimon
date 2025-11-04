//cria uma cópia embaralhada do array e retorna os count primeiros itens dela
export function getRandomSubset(array, count) {
  if (!Array.isArray(array)) return [];
  const cloned = [...array];
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned.slice(0, Math.min(count, cloned.length));
}
