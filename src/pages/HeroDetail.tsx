import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { type BaseEntity } from '../types/myth';
import { findHeroByParam } from '../api/greekApi';

export default function HeroDetail() {
  const { id } = useParams<{ id: string }>(); // pode ser id numérico ou nome encoded
  const navigate = useNavigate();
  const [hero, setHero] = useState<BaseEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Identificador não informado');
      setLoading(false);
      return;
    }
    setLoading(true);
    // parâmetro pode estar duplamente encoded; decode até ficar confortável
    let param = id;
    try {
      param = decodeURIComponent(param);
      // se parece estar double-encoded, tente decodificar de novo (safe)
      const maybe = decodeURIComponent(param);
      if (maybe !== param) param = maybe;
    } catch {
      // ignore
    }

    findHeroByParam(param)
      .then(found => {
        if (!found) {
          setError(`Herói não encontrado para "${param}"`);
        } else {
          setHero(found);
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Loading state estilizado
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3 text-muted">Carregando informações do herói...</p>
      </div>
    );
  }

  // Error state estilizado
  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <span className="me-3 fs-3">⚠️</span>
          <div className="flex-grow-1">
            <h4 className="alert-heading">Erro ao carregar</h4>
            <p className="mb-0">{error}</p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          ← Voltar
        </button>
      </div>
    );
  }

  if (!hero) return null;

  const attrs = hero.attributes ?? {};

  return (
    <div className="detail-page">
      {/* Hero Section com imagem grande */}
      <div className="detail-hero hero-variant" style={{
        backgroundImage: hero.image ? `url(${hero.image})` : 'none',
        backgroundColor: hero.image ? 'transparent' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      }}>
        <div className="detail-hero-overlay">
          <div className="container">
            <Link to="/heroes" className="btn btn-light btn-sm mb-3">
              ← Voltar aos Heróis
            </Link>
            <h1 className="display-3 fw-bold text-white mb-3">{hero.name}</h1>
            {attrs.origin && (
              <p className="lead text-white-50 mb-0">{attrs.origin}</p>
            )}
          </div>
        </div>
      </div>

      <div className="container py-5">
        {/* Descrição Principal com Imagem */}
        {hero.description && (
          <div className="card mb-4 detail-card">
            <div className="card-body p-4">
              <div className="row g-4">
                {/* Texto da descrição */}
                <div className={hero.image ? "col-12 col-md-8" : "col-12"}>
                  <h3 className="card-title mb-3">
                    <span className="detail-icon">📜</span>
                    Sobre {hero.name}
                  </h3>
                  <p className="lead mb-0">{hero.description}</p>
                </div>
                
                {/* Imagem ao lado */}
                {hero.image && (
                  <div className="col-12 col-md-4">
                    <div className="detail-image-container">
                      <img 
                        src={hero.image} 
                        alt={hero.name} 
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="row g-4">
          {/* Card de Atributos Principais */}
          <div className="col-12 col-lg-6">
            <div className="card h-100 detail-card">
              <div className="card-body p-4">
                <h3 className="card-title mb-4">
                  <span className="detail-icon">✨</span>
                  Atributos
                </h3>

                {attrs.abode && (
                  <div className="mb-3">
                    <h6 className="text-muted mb-2">- Morada</h6>
                    <p className="mb-0">{attrs.abode}</p>
                  </div>
                )}

                {attrs.symbols && attrs.symbols.length > 0 && (
                  <div className="mb-3">
                    <h6 className="text-muted mb-2">- Símbolos</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {attrs.symbols.map((symbol, idx) => (
                        <span key={idx} className="badge bg-primary-subtle text-primary-emphasis">
                          {symbol}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {attrs.powers && attrs.powers.length > 0 && (
                  <div className="mb-3">
                    <h6 className="text-muted mb-2">- Poderes</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {attrs.powers.map((power, idx) => (
                        <span key={idx} className="badge bg-warning-subtle text-warning-emphasis">
                          {power}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card de Família */}
          <div className="col-12 col-lg-6">
            <div className="card h-100 detail-card">
              <div className="card-body p-4">
                <h3 className="card-title mb-4">
                  <span className="detail-icon">👨‍👩‍👧‍👦</span>
                  Família e Linhagem
                </h3>

                {attrs.family ? (
                  <div>
                    {attrs.family.parents && attrs.family.parents.length > 0 && (
                      <div className="mb-3">
                        <h6 className="text-muted mb-2">- Pais</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {attrs.family.parents.map((parent, idx) => (
                            <span key={idx} className="badge bg-info-subtle text-info-emphasis">
                              {parent}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {attrs.family.siblings && attrs.family.siblings.length > 0 && (
                      <div className="mb-3">
                        <h6 className="text-muted mb-2">- Irmãos</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {attrs.family.siblings.map((sibling, idx) => (
                            <span key={idx} className="badge bg-info-subtle text-info-emphasis">
                              {sibling}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {attrs.family.spouse && attrs.family.spouse.length > 0 && (
                      <div className="mb-3">
                        <h6 className="text-muted mb-2">- Cônjuge(s)</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {attrs.family.spouse.map((spouse, idx) => (
                            <span key={idx} className="badge bg-danger-subtle text-danger-emphasis">
                              {spouse}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-muted mb-0">Informações de família não disponíveis.</p>
                )}
              </div>
            </div>
          </div>

          {/* Feitos Heroicos */}
          {attrs.stories && attrs.stories.length > 0 && (
            <div className="col-12">
              <div className="card detail-card">
                <div className="card-body p-4">
                  <h3 className="card-title mb-4">
                    <span className="detail-icon">🏆</span>
                    Feitos Heroicos
                  </h3>

                  <div className="stories-list">
                    {attrs.stories.map((story, idx) => (
                      <div key={idx} className="story-item">
                        <p className="mb-0">{story}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botão de ação final */}
        <div className="text-center mt-5">
          <Link to="/heroes" className="btn btn-primary btn-lg">
            ← Voltar para todos os Heróis
          </Link>
        </div>
      </div>
    </div>
  );
} 
