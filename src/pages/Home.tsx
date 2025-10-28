import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOlympianGods } from '../api/greekApi';
import { type BaseEntity } from '../types/myth';

export default function Home() {
  const [olympianGods, setOlympianGods] = useState<BaseEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getOlympianGods()
      .then(data => {
        console.log('[Home] Deuses Olímpicos carregados:', data.length);
        setOlympianGods(data);
      })
      .catch(err => {
        console.error('[Home] Erro ao carregar deuses olímpicos:', err);
        setError(err.message ?? String(err));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Seção de Boas-vindas e Descrição */}
      <section className="mb-5">
        <h1 className="display-4 mb-3">Bem-vindo ao Acervo Grego</h1>
        <p className="lead">
          Explore a fascinante mitologia grega através de uma coleção completa de deuses, heróis e suas histórias épicas.
        </p>
        <p>
          Descubra as lendas que moldaram a civilização ocidental, conheça as divindades do Olimpo, 
          os heróis que enfrentaram desafios impossíveis e as histórias que atravessaram milênios.
        </p>
        <p>
          Este acervo digital reúne informações detalhadas sobre cada figura mitológica, incluindo 
          suas origens, poderes, símbolos, relações familiares e as histórias que as tornaram imortais.
        </p>
      </section>

      {/* Seção de Deuses Olímpicos */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>Os Olímpicos</h2>
            <p className="text-muted mb-0">
              As principais divindades que habitam o Monte Olimpo
            </p>
          </div>
          <Link to="/gods" className="btn btn-primary">
            Ver Todos os Deuses
          </Link>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-2 text-muted">Carregando deuses olímpicos...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            <strong>Erro:</strong> {error}
          </div>
        )}

        {!loading && !error && olympianGods.length === 0 && (
          <div className="alert alert-info" role="alert">
            Nenhum deus olímpico encontrado.
          </div>
        )}

        {!loading && !error && olympianGods.length > 0 && (
          <div className="row">
            {olympianGods.map((god) => (
              <div key={god.id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                <div className="card h-100 shadow-sm">
                  {god.image && (
                    <img 
                      src={god.image} 
                      className="card-img-top" 
                      alt={god.name}
                      style={{ height: 200, objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{god.name}</h5>
                    <p className="card-text text-muted small mb-2">
                      {god.attributes?.origin || 'Divindade grega'}
                    </p>
                    <p className="card-text flex-grow-1">
                      {god.description 
                        ? (god.description.length > 100 
                            ? god.description.substring(0, 100) + '...' 
                            : god.description)
                        : 'Sem descrição disponível.'}
                    </p>
                    
                    {/* Informações adicionais */}
                    {god.attributes?.symbols && god.attributes.symbols.length > 0 && (
                      <p className="card-text small mb-2">
                        <strong>Símbolos:</strong> {god.attributes.symbols.slice(0, 3).join(', ')}
                        {god.attributes.symbols.length > 3 && '...'}
                      </p>
                    )}
                    
                    <Link 
                      to={`/gods/${god.id}`} 
                      className="btn btn-sm btn-outline-primary mt-auto"
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Seção de Navegação Rápida */}
      <section className="mb-5">
        <h2 className="mb-4">Explore o Acervo</h2>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title h5">Deuses</h3>
                <p className="card-text">
                  Conheça todas as divindades gregas, desde os poderosos olímpicos até 
                  os deuses primordiais e menores.
                </p>
                <Link to="/gods" className="btn btn-primary">
                  Explorar Deuses
                </Link>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title h5">Heróis</h3>
                <p className="card-text">
                  Descubra os heróis lendários que realizaram feitos impossíveis e 
                  enfrentaram monstros terríveis.
                </p>
                <Link to="/heroes" className="btn btn-primary">
                  Explorar Heróis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


