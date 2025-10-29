/**
 * Helper para gerenciar imagens de deuses e heróis
 */

// Pré-carrega todas as imagens disponíveis usando import.meta.glob
const godImages = import.meta.glob('../assets/images/gods/*.{jpg,jpeg,png,webp}', { eager: true, as: 'url' });
const heroImages = import.meta.glob('../assets/images/heroes/*.{jpg,jpeg,png,webp}', { eager: true, as: 'url' });

/**
 * Normaliza o nome para corresponder ao nome do arquivo de imagem
 */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD') // Decompõe caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remove marcas diacríticas
    .replace(/[^a-z0-9]/g, '-') // Substitui caracteres não alfanuméricos por hífen
    .replace(/-+/g, '-') // Remove hífens duplicados
    .replace(/^-|-$/g, ''); // Remove hífens no início/fim
}

/**
 * Retorna a URL da imagem para um deus
 * @param name - Nome do deus
 * @returns URL da imagem ou undefined se não encontrada
 */
export function getGodImage(name: string): string | undefined {
  const normalizedName = normalizeName(name);
  // Tenta encontrar a imagem em qualquer formato
  const extensions = ['webp', 'png', 'jpg', 'jpeg'];
  
  for (const ext of extensions) {
    const key = `../assets/images/gods/${normalizedName}.${ext}`;
    if (godImages[key]) {
      return godImages[key] as string;
    }
  }
  
  return undefined;
}

/**
 * Retorna a URL da imagem para um herói
 * @param name - Nome do herói
 * @returns URL da imagem ou undefined se não encontrada
 */
export function getHeroImage(name: string): string | undefined {
  const normalizedName = normalizeName(name);
  
  // Tenta encontrar a imagem em qualquer formato
  const extensions = ['webp', 'png', 'jpg', 'jpeg'];
  
  for (const ext of extensions) {
    const key = `../assets/images/heroes/${normalizedName}.${ext}`;
    if (heroImages[key]) {
      return heroImages[key] as string;
    }
  }
  
  return undefined;
}

