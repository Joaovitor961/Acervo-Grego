/**
 * Helper para gerenciar imagens de deuses e heróis
 * 
 * Convenção de nomenclatura dos arquivos:
 * - Nome do deus/herói em lowercase
 * - Sem acentos ou caracteres especiais
 * - Sem espaços (usar hífen se necessário)
 * - Formato: .jpg, .png, .webp
 * 
 * Exemplos:
 * - "Zeus" -> zeus.jpg ou zeus.webp ou zeus.png
 * - "Athena" -> athena.jpg
 * - "Heracles" -> heracles.jpg
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
 * @returns URL da imagem ou placeholder se não encontrada
 */
export function getGodImage(name: string): string {
  const normalizedName = normalizeName(name);
  
  // Tenta encontrar a imagem em qualquer formato
  const extensions = ['webp', 'png', 'jpg', 'jpeg'];
  
  for (const ext of extensions) {
    const key = `../assets/images/gods/${normalizedName}.${ext}`;
    if (godImages[key]) {
      return godImages[key] as string;
    }
  }
  
  // Se não encontrar, retorna placeholder
  return getPlaceholderImage(name, 'god');
}

/**
 * Retorna a URL da imagem para um herói
 * @param name - Nome do herói
 * @returns URL da imagem ou placeholder se não encontrada
 */
export function getHeroImage(name: string): string {
  const normalizedName = normalizeName(name);
  
  // Tenta encontrar a imagem em qualquer formato
  const extensions = ['webp', 'png', 'jpg', 'jpeg'];
  
  for (const ext of extensions) {
    const key = `../assets/images/heroes/${normalizedName}.${ext}`;
    if (heroImages[key]) {
      return heroImages[key] as string;
    }
  }
  
  // Se não encontrar, retorna placeholder
  return getPlaceholderImage(name, 'hero');
}

/**
 * Gera uma imagem placeholder usando SVG com iniciais
 * @param name - Nome da entidade
 * @param type - Tipo (god ou hero) para definir a cor
 * @returns Data URL do SVG
 */
export function getPlaceholderImage(name: string, type: 'god' | 'hero' = 'god'): string {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  // Cores diferentes para deuses e heróis
  const colors = {
    god: { bg: '#4A5568', text: '#F7FAFC' },      // Cinza azulado
    hero: { bg: '#2C5282', text: '#F7FAFC' }      // Azul
  };
  
  const color = colors[type];
  
  const svg = `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="${color.bg}"/>
      <text
        x="50%"
        y="50%"
        font-size="140"
        font-family="Arial, sans-serif"
        font-weight="bold"
        fill="${color.text}"
        text-anchor="middle"
        dominant-baseline="central"
      >${initials}</text>
    </svg>
  `.trim();
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Verifica se uma imagem existe antes de usá-la
 * Útil para feedback em desenvolvimento
 */
export async function checkImageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Lista de nomes normalizados que você pode usar como referência
 * para nomear seus arquivos de imagem
 */
export function getImageFileName(name: string): string {
  return normalizeName(name);
}

/**
 * Função de debug para ver quais imagens foram carregadas
 * Use no console: import { debugImages } from './utils/imageHelper'; debugImages();
 */
export function debugImages() {
  console.log('=== 🖼️  IMAGENS CARREGADAS ===\n');
  
  console.log('📁 DEUSES:', Object.keys(godImages).length, 'imagens');
  Object.keys(godImages).forEach(key => {
    const filename = key.split('/').pop();
    console.log('  ✅', filename);
  });
  
  console.log('\n📁 HERÓIS:', Object.keys(heroImages).length, 'imagens');
  Object.keys(heroImages).forEach(key => {
    const filename = key.split('/').pop();
    console.log('  ✅', filename);
  });
  
  console.log('\n💡 Dica: Os nomes devem estar em lowercase (ex: zeus.webp, athena.jpg)');
  
  return {
    gods: Object.keys(godImages),
    heroes: Object.keys(heroImages)
  };
}

