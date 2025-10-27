import React, { useEffect, useMemo, useState } from 'react';
import { getHeroes } from '../api/greekApi';
import { type BaseEntity } from '../types/myth';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

export default function HeroesList() {
  const [heroes, setHeroes] = useState<BaseEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getHeroes()
      .then(data => setHeroes(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return heroes;
    return heroes.filter(h => (h.name || '').toLowerCase().includes(q));
  }, [heroes, query]);

  if (loading) return <div>Carregando heróis...</div>;
  if (error) return <div className="alert alert-danger">Erro: {error}</div>;

  return (
    <div>
      <h1 className="mb-3">Heróis</h1>

      <SearchBar value={query} onChange={setQuery} placeholder="Pesquisar heróis por nome..." />

      <div className="row">
        {filtered.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info">Nenhum resultado encontrado para "{query}"</div>
          </div>
        )}

        {filtered.map(h => (
          <div key={`${h.id}-${h.name}`} className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card h-100">
              {h.image && <img src={h.image} className="card-img-top" alt={h.name} style={{objectFit: 'cover', height: 180}} />}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{h.name}</h5>
                <p className="card-text" style={{flex: '1 1 auto'}}>{h.description ? (h.description.length > 150 ? h.description.slice(0,150)+'…' : h.description) : '—'}</p>
                <div className="mt-2">
                  <Link to={`/heroes/${encodeURIComponent(String(h.id))}`} className="btn btn-primary btn-sm me-2">Ver</Link>
                  <Link to={`/heroes/${encodeURIComponent(encodeURIComponent(String(h.name)))}`} className="btn btn-outline-secondary btn-sm">Ver por nome</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
