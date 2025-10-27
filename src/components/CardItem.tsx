import React from 'react';
import { Link } from 'react-router-dom';
import type { BaseEntity } from '../types/myth';

export default function CardItem({ item }: { item: BaseEntity }) {
  return (
    <div className="card h-100">
      {item.image && <img src={item.image} className="card-img-top" alt={item.name} style={{objectFit:'cover', height:180}} />}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text" style={{flex:'1 1 auto'}}>{item.description ?? '—'}</p>
        <div className="mt-2">
          <Link to={`/gods/${encodeURIComponent(String(item.id))}`} className="btn btn-primary btn-sm me-2">Ver</Link>
          <Link to={`/gods/${encodeURIComponent(encodeURIComponent(String(item.name)))}`} className="btn btn-outline-secondary btn-sm">Ver por nome</Link>
        </div>
      </div>
    </div>
  );
}
