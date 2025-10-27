import React, { useEffect, useState } from 'react';
import { getGods } from '../api/greekApi';
import { BaseEntity } from '../types/myth';
import { Link } from 'react-router-dom';

export default function GodsList() {
  const [gods, setGods] = useState<BaseEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getGods()
      .then(data => setGods(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando deuses...</div>;
  if (error) return <div className="alert alert-danger">Erro: {error}</div>;

  return (
    <div>
      <h1>Deuses</h1>
      <div className="row">
        {gods.map(g => (
          <div key={g.id} className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card h-100">
              {g.image && <img src={g.image} className="card-img-top" alt={g.name} />}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{g.name}</h5>
                <p className="card-text text-truncate">{g.description}</p>
                <div className="mt-auto">
                  <Link to={`/gods/${g.id}`} className="btn btn-primary btn-sm">Ver mais</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
