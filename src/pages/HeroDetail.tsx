import React, { useEffect, useState } from 'react';
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

  if (loading) return <div>Carregando detalhe...</div>;
  if (error) return (
    <div>
      <div className="alert alert-warning">Erro: {error}</div>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );

  if (!hero) return null;

  const attrs = hero.attributes ?? {};

  return (
    <div>
      <div className="d-flex align-items-start mb-4">
        {hero.image && (
          <img src={hero.image} alt={hero.name} style={{width: 220, height: 220, objectFit: 'cover'}} className="me-4 rounded" />
        )}
        <div>
          <h1>{hero.name}</h1>
          <p className="lead">{hero.description ?? 'Sem descrição disponível.'}</p>

          <div className="mt-3">
            <Link to="/heroes" className="btn btn-outline-secondary btn-sm me-2">Voltar aos Heróis</Link>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-6">
          <h5>Atributos</h5>
          <dl>
            {attrs.origin && (<>
              <dt>Origem</dt><dd>{attrs.origin}</dd>
            </>)}
            {attrs.abode && (<>
              <dt>Abode / Morada</dt><dd>{attrs.abode}</dd>
            </>)}
            {attrs.symbols && attrs.symbols.length > 0 && (<>
              <dt>Símbolos</dt><dd>{attrs.symbols.join(', ')}</dd>
            </>)}
            {attrs.powers && attrs.powers.length > 0 && (<>
              <dt>Poderes</dt><dd>{attrs.powers.join(', ')}</dd>
            </>)}
          </dl>
        </div>

        <div className="col-12 col-lg-6">
          <h5>Família</h5>
          {attrs.family ? (
            <ul>
              {attrs.family.parents && <li><strong>Pais:</strong> {attrs.family.parents.join(', ')}</li>}
              {attrs.family.siblings && <li><strong>Irmãos:</strong> {attrs.family.siblings.join(', ')}</li>}
              {attrs.family.spouse && <li><strong>Esposa/Parceiro:</strong> {attrs.family.spouse.join(', ')}</li>}
            </ul>
          ) : <p>Informações de família não disponíveis.</p>}

          <h5 className="mt-3">Histórias / Referências</h5>
          {attrs.stories && attrs.stories.length > 0 ? (
            <ol>
              {attrs.stories.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          ) : <p>Sem histórias registradas.</p>}
        </div>
      </div>
    </div>
  );
}

