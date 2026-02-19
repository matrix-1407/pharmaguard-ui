import { useState, useRef } from 'react';
import { Pill, X, Search } from 'lucide-react';
import Card from './Card';

const DRUG_SUGGESTIONS = [
    { name: 'Warfarin', category: 'Anticoagulant' },
    { name: 'Clopidogrel', category: 'Antiplatelet' },
    { name: 'Codeine', category: 'Analgesic' },
    { name: 'Tamoxifen', category: 'Antineoplastic' },
    { name: 'Simvastatin', category: 'Statin' },
    { name: 'Abacavir', category: 'Antiretroviral' },
    { name: 'Fluorouracil', category: 'Antineoplastic' },
    { name: 'Mercaptopurine', category: 'Immunosuppressant' },
];

function DrugInput({ value, onChange }) {
    const [query, setQuery] = useState(value || '');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);

    const filtered = DRUG_SUGGESTIONS.filter(
        (d) => d.name.toLowerCase().includes(query.toLowerCase()) && d.name.toLowerCase() !== query.toLowerCase()
    );

    function selectDrug(name) {
        setQuery(name);
        onChange(name);
        setShowSuggestions(false);
    }

    function handleInputChange(e) {
        const val = e.target.value;
        setQuery(val);
        onChange(val);
        setShowSuggestions(val.length > 0);
    }

    function clearDrug() {
        setQuery('');
        onChange('');
        inputRef.current?.focus();
    }

    return (
        <Card className="w-full">
            <div className="flex items-center" style={{ gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--color-primary-50)' }}
                >
                    <Pill className="w-4 h-4" style={{ color: 'var(--color-primary-600)' }} />
                </div>
                <h3 className="text-sm font-semibold m-0" style={{ color: 'var(--color-slate-800)' }}>
                    Drug Selection (comma-separated)
                </h3>
            </div>

            <div className="relative">
                <div
                    className="flex items-center border transition-all"
                    style={{
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-md) var(--space-lg)',
                        gap: 'var(--space-sm)',
                        borderColor: showSuggestions ? 'var(--color-primary-400)' : 'var(--color-border)',
                        background: 'var(--color-surface)',
                        boxShadow: showSuggestions ? '0 0 0 3px rgba(79, 110, 247, 0.1)' : 'none',
                    }}
                >
                    <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={() => query.length > 0 && setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        placeholder="Enter drugs (e.g., Codeine, Warfarin)"
                        className="flex-1 text-sm outline-none"
                        style={{
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--color-text)',
                            fontFamily: 'var(--font-body)',
                        }}
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={clearDrug}
                            className="p-1 rounded-md cursor-pointer transition-colors"
                            style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)' }}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Selected drug chip */}
                {query && !showSuggestions && DRUG_SUGGESTIONS.some(d => d.name.toLowerCase() === query.toLowerCase()) && (
                    <div className="flex items-center animate-fade-in" style={{ marginTop: 'var(--space-md)', gap: 'var(--space-sm)' }}>
                        <span
                            className="inline-flex items-center rounded-full text-sm font-medium"
                            style={{
                                padding: '0.375rem 0.875rem',
                                gap: 'var(--space-sm)',
                                background: 'linear-gradient(135deg, var(--color-primary-50), rgba(79,110,247,0.08))',
                                color: 'var(--color-primary-700)',
                                border: '1px solid var(--color-primary-200)',
                            }}
                        >
                            <Pill className="w-3.5 h-3.5" />
                            {query}
                            <button
                                type="button"
                                onClick={clearDrug}
                                className="cursor-pointer"
                                style={{ background: 'transparent', border: 'none', color: 'var(--color-primary-400)', padding: 0, display: 'flex', marginLeft: '0.125rem' }}
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    </div>
                )}

                {/* Autocomplete dropdown */}
                {showSuggestions && filtered.length > 0 && (
                    <div
                        className="absolute top-full left-0 right-0 z-20 overflow-hidden animate-fade-in"
                        style={{
                            marginTop: 'var(--space-sm)',
                            padding: 'var(--space-sm) 0',
                            background: 'var(--color-surface)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--color-border)',
                            boxShadow: 'var(--shadow-lg)',
                        }}
                    >
                        {filtered.map((drug) => (
                            <button
                                key={drug.name}
                                type="button"
                                onClick={() => selectDrug(drug.name)}
                                className="w-full flex items-center text-left cursor-pointer transition-colors"
                                style={{
                                    padding: '0.625rem var(--space-lg)',
                                    gap: 'var(--space-md)',
                                    background: 'transparent',
                                    border: 'none',
                                    fontFamily: 'var(--font-body)',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-slate-50)')}
                                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                            >
                                <Pill className="w-4 h-4 shrink-0" style={{ color: 'var(--color-primary-400)' }} />
                                <div>
                                    <p className="text-sm font-medium m-0" style={{ color: 'var(--color-text)' }}>{drug.name}</p>
                                    <p className="text-xs m-0" style={{ color: 'var(--color-text-muted)' }}>{drug.category}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
}

export default DrugInput;
