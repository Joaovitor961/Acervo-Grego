import { useEffect, useState } from 'react';
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
          <div id="olympiansCarousel" className="carousel slide" data-bs-ride="carousel">
            {/* Indicadores */}
            <div className="carousel-indicators">
              {olympianGods.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#olympiansCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0 ? 'true' : undefined}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Slides */}
            <div className="carousel-inner">
              {olympianGods.map((god, index) => (
                <div key={god.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">
                      <div className="card shadow-lg border-0">
                        <div className="row g-0">
                          {/* Imagem do Deus */}
                          <div className="col-md-5">
                            {god.image ? (
                              <img 
                                src={god.image} 
                                className="img-fluid rounded-start w-100 h-100" 
                                alt={god.name}
                                style={{ objectFit: 'cover', minHeight: '400px' }}
                              />
                            ) : (
                              <div 
                                className="bg-secondary rounded-start w-100 h-100 d-flex align-items-center justify-content-center"
                                style={{ minHeight: '400px' }}
                              >
                                <span className="text-white fs-1">👤</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Informações do Deus */}
                          <div className="col-md-7">
                            <div className="card-body p-4 p-md-5 d-flex flex-column h-100">
                              <h3 className="card-title display-5 mb-3">{god.name}</h3>
                              
                              <p className="text-muted mb-3">
                                <strong>Origem:</strong> {god.attributes?.origin || 'Divindade grega'}
                              </p>
                              
                              <p className="card-text flex-grow-1 mb-4">
                                {god.description || 'Sem descrição disponível.'}
                              </p>
                              
                              {/* Símbolos */}
                              {god.attributes?.symbols && god.attributes.symbols.length > 0 && (
                                <div className="mb-3">
                                  <strong className="d-block mb-2">Símbolos:</strong>
                                  <div className="d-flex flex-wrap gap-2">
                                    {god.attributes.symbols.slice(0, 5).map((symbol, idx) => (
                                      <span key={idx} className="badge bg-primary-subtle text-primary-emphasis">
                                        {symbol}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Poderes */}
                              {god.attributes?.powers && god.attributes.powers.length > 0 && (
                                <div className="mb-3">
                                  <strong className="d-block mb-2">Poderes:</strong>
                                  <div className="d-flex flex-wrap gap-2">
                                    {god.attributes.powers.slice(0, 4).map((power, idx) => (
                                      <span key={idx} className="badge bg-warning-subtle text-warning-emphasis">
                                        {power}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              <Link 
                                to={`/gods/${god.id}`} 
                                className="btn btn-primary btn-lg mt-auto"
                              >
                                Ver Todos os Detalhes
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controles de navegação */}
            <button 
              className="carousel-control-prev" 
              type="button" 
              data-bs-target="#olympiansCarousel" 
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button 
              className="carousel-control-next" 
              type="button" 
              data-bs-target="#olympiansCarousel" 
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Próximo</span>
            </button>
          </div>
        )}
      </section>

      {/* Seção de Navegação Rápida */}
      <section className="mb-5">
        <h2 className="mb-4">Explore o Acervo</h2>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="card quick-nav-card">
              <div className="card-body">
                <h3 className="card-title h5">⚡ Deuses</h3>
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
            <div className="card quick-nav-card">
              <div className="card-body">
                <h3 className="card-title h5">🗡️ Heróis</h3>
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


