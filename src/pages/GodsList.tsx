import React, { useEffect, useState } from 'react';
import { getGods } from '../api/greekApi';
import { type BaseEntity } from '../types/myth';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

export default function GodsList() {
  // hooks: sempre na mesma ordem
  const [gods, setGods] = useState<BaseEntity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getGods()
      .then(data => {
        if (!Array.isArray(data)) {
          console.warn('[GodsList] getGods returned not-array:', data);
          setGods([]);
        } else {
          setGods(data);
        }
      })
      .catch(err => {
        console.error('[GodsList] erro ao carregar gods:', err);
        setError(err.message ?? String(err));
        setGods([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // agora cálculo direto, sem hooks extras — mantém ordem de hooks estável
  const filtered = React.useMemo(() => {
    if (!Array.isArray(gods)) return [];
    const q = query.trim().toLowerCase();
    if (!q) return gods;
    return gods.filter(g => (g.name ?? '').toLowerCase().includes(q));
  }, [gods, query]);

  // render
  if (loading) return <div>Carregando deuses...</div>;
  if (error) return <div className="alert alert-danger">Erro: {error}</div>;
  if (!gods) return <div>Sem dados de deuses.</div>;

  return (
    <div>
      <h1 className="mb-3">Deuses</h1>

      <SearchBar value={query} onChange={setQuery} placeholder="Pesquisar deuses por nome..." />

      <div className="row">
        {filtered.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info">Nenhum resultado encontrado para "{query}"</div>
          </div>
        )}

        {filtered.map(g => (
          <div key={`${g.id ?? g.name}`} className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card h-100">
              {g.image && <img src={g.image} className="card-img-top" alt={g.name} style={{objectFit: 'cover', height: 180}} />}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{g.name}</h5>
                <p className="card-text" style={{flex: '1 1 auto'}}>
                  {g.description ? (g.description.length > 150 ? g.description.slice(0, 150) + '…' : g.description) : '—'}
                </p>
                <div className="mt-2">
                  <Link to={`/gods/${encodeURIComponent(String(g.id ?? g.name))}`} className="btn btn-primary btn-sm me-2">Ver</Link>
                  <Link to={`/gods/${encodeURIComponent(encodeURIComponent(String(g.name)))}`} className="btn btn-outline-secondary btn-sm">Ver por nome</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
