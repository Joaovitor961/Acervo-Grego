// src/components/SearchBar.tsx
import React, { useState, useEffect } from 'react';

type Props = {
  value?: string;
  onChange: (q: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value = '', onChange, placeholder = 'Buscar por nome...' }: Props) {
  const [q, setQ] = useState(value);

  // debounce simples de 300ms para evitar chamadas em cada tecla
  useEffect(() => {
    const t = setTimeout(() => onChange(q), 300);
    return () => clearTimeout(t);
  }, [q, onChange]);

  return (
    <div className="mb-3">
      <input
        className="form-control"
        placeholder={placeholder}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Buscar"
      />
    </div>
  );
}
