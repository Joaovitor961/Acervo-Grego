import { BaseEntity } from '../types/myth';

const BASE = 'https://thegreekmythapi.vercel.app/api';

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json() as Promise<T>;
}

export const getGods = () => fetchJSON<BaseEntity[]>('/gods');
export const getHeroes = () => fetchJSON<BaseEntity[]>('/heroes');
export const getMonsters = () => fetchJSON<BaseEntity[]>('/monsters');
export const getTitans = () => fetchJSON<BaseEntity[]>('/titans');
export const getGodByName = (name: string) => fetchJSON<BaseEntity>(`/gods/${name}`);
// export const getGodById = (id: number) => fetchJSON<BaseEntity>(`/gods/${id}`);
