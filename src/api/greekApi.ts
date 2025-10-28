import { type BaseEntity } from '../types/myth';
import { getGodImage, getHeroImage } from '../utils/imageHelper';

const BASE = 'https://thegreekmythapi.vercel.app/api';

async function fetchJSON(path: string): Promise<any> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API error ${res.status}${text ? `: ${text}` : ''}`);
  }
  return res.json();
}

/**
 * Normaliza payloads para sempre devolver um Array<T>.
 * Trata formatos:
 *  - Array -> retorna
 *  - { data: [...] } -> retorna data
 *  - { gods: [...] } ou { Gods: [...] } -> retorna a propriedade array
 *  - { something: { ... }, something2: {...} } -> transforma em array de objects
 *  - { Key: [...] } -> quando o valor é array, retorna ele (flatten)
 */
function normalizeToArray<T>(payload: any): T[] {
  if (payload === null || payload === undefined) return [];

  if (Array.isArray(payload)) return payload as T[];

  if (typeof payload === 'object') {
    // casos comuns: payload.data, payload.results, payload.items
    const commonKeys = ['data', 'results', 'items', 'gods', 'Gods', 'heroes', 'Heroes', 'monsters', 'Monsters', 'titans', 'Titans'];
    for (const k of commonKeys) {
      if (Array.isArray(payload[k])) return payload[k] as T[];
    }

    // se for objeto com um único campo cujo valor é array -> retorne esse array
    const vals = Object.values(payload);
    if (vals.length === 1 && Array.isArray(vals[0])) {
      return vals[0] as T[];
    }

    // se for objeto com várias chaves e cada chave é um object -> retornar array de values
    const objectValues = vals.filter(v => v && typeof v === 'object' && !Array.isArray(v));
    if (objectValues.length > 0 && objectValues.length === vals.length) {
      return objectValues as T[];
    }
  }

  // fallback: não conseguimos normalizar -> array vazio
  return [];
}

/* Endpoints principais */
export async function getGods(): Promise<BaseEntity[]> {
  const raw = await fetchJSON('/gods');
  const normalized = normalizeToArray<BaseEntity>(raw);
  console.log('[greekApi] /gods raw =>', raw);
  console.log('[greekApi] /gods normalized length=', normalized.length);
  
  // Adiciona as URLs das imagens locais
  const result = normalized.map(god => {
    const image = getGodImage(god.name);
    return {
      ...god,
      image
    };
  });
  
  return result;
}

export async function getHeroes(): Promise<BaseEntity[]> {
  const raw = await fetchJSON('/heroes');
  const normalized = normalizeToArray<BaseEntity>(raw);
  console.log('[greekApi] /heroes raw =>', raw);
  console.log('[greekApi] /heroes normalized length=', normalized.length);
  
  // Adiciona as URLs das imagens locais
  return normalized.map(hero => ({
    ...hero,
    image: getHeroImage(hero.name)
  }));
}

/* Helpers para busca local */
export async function findGodByParam(param: string): Promise<BaseEntity | undefined> {
  const all = await getGods();
  const asNum = Number(param);
  if (!Number.isNaN(asNum)) {
    const byId = all.find(item => item.id === asNum);
    if (byId) return byId;
  }
  const q = (param ?? '').trim().toLowerCase();
  let found = all.find(x => (x.name ?? '').toLowerCase() === q);
  if (found) return found;
  found = all.find(x => (x.name ?? '').toLowerCase().startsWith(q));
  if (found) return found;
  found = all.find(x => (x.name ?? '').toLowerCase().includes(q));
  return found;
}

export async function findHeroByParam(param: string): Promise<BaseEntity | undefined> {
  const all = await getHeroes();
  const asNum = Number(param);
  if (!Number.isNaN(asNum)) {
    const byId = all.find(item => item.id === asNum);
    if (byId) return byId;
  }
  const q = (param ?? '').trim().toLowerCase();
  let found = all.find(x => (x.name ?? '').toLowerCase() === q);
  if (found) return found;
  found = all.find(x => (x.name ?? '').toLowerCase().startsWith(q));
  if (found) return found;
  found = all.find(x => (x.name ?? '').toLowerCase().includes(q));
  return found;
}
