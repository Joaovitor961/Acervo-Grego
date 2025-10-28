import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { type BaseEntity } from '../types/myth';
import { findGodByParam } from '../api/greekApi';

export default function GodDetail() {
  const { id } = useParams<{ id: string }>(); // pode ser id numérico ou nome encoded
  const navigate = useNavigate();
  const [god, setGod] = useState<BaseEntity | null>(null);
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

    findGodByParam(param)
      .then(found => {
        if (!found) {
          setError(`Deus não encontrado para "${param}"`);
        } else {
          setGod(found);
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
        <p className="mt-3 text-muted">Carregando informações do deus...</p>
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

  if (!god) return null;

  const attrs = god.attributes ?? {};

  return (
    <div className="detail-page">
      {/* Hero Section com imagem grande */}
      <div className="detail-hero" style={{
        backgroundImage: god.image ? `url(${god.image})` : 'none',
        backgroundColor: god.image ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div className="detail-hero-overlay">
          <div className="container">
            <Link to="/gods" className="btn btn-light btn-sm mb-3">
              ← Voltar aos Deuses
            </Link>
            <h1 className="display-3 fw-bold text-white mb-3">{god.name}</h1>
            {attrs.origin && (
              <p className="lead text-white-50 mb-0">{attrs.origin}</p>
            )}
          </div>
        </div>
      </div>

      <div className="container py-5">
        {/* Descrição Principal com Imagem */}
        {god.description && (
          <div className="card mb-4 detail-card">
            <div className="card-body p-4">
              <div className="row g-4">
                {/* Texto da descrição */}
                <div className={god.image ? "col-12 col-md-8" : "col-12"}>
                  <h3 className="card-title mb-3">
                    <span className="detail-icon">📜</span>
                    Sobre {god.name}
                  </h3>
                  <p className="lead mb-0">{god.description}</p>
                </div>
                
                {/* Imagem ao lado */}
                {god.image && (
                  <div className="col-12 col-md-4">
                    <div className="detail-image-container">
                      <img 
                        src={god.image} 
                        alt={god.name} 
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
                  Árvore Genealógica
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

          {/* Histórias */}
          {attrs.stories && attrs.stories.length > 0 && (
            <div className="col-12">
              <div className="card detail-card">
                <div className="card-body p-4">
                  <h3 className="card-title mb-4">
                    <span className="detail-icon">📖</span>
                    Histórias e Mitos
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
          <Link to="/gods" className="btn btn-primary btn-lg">
            ← Voltar para todos os Deuses
          </Link>
        </div>
      </div>
    </div>
  );
}