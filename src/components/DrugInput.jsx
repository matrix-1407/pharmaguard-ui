import { useState } from 'react';
import { Pill, X, Check } from 'lucide-react';
import Card from './Card';

const DRUG_OPTIONS = [
    { name: 'Warfarin', category: 'Anticoagulant' },
    { name: 'Clopidogrel', category: 'Antiplatelet' },
    { name: 'Codeine', category: 'Analgesic' },
    { name: 'Tamoxifen', category: 'Antineoplastic' },
    { name: 'Simvastatin', category: 'Statin' },
    { name: 'Abacavir', category: 'Antiretroviral' },
];

function DrugInput({ value, onChange }) {
    const selected = value
        ? value.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

    function toggleDrug(drugName) {
        let updated;
        if (selected.includes(drugName)) {
            updated = selected.filter((d) => d !== drugName);
        } else {
            updated = [...selected, drugName];
        }
        onChange(updated.join(', '));
    }

    function clearAll() {
        onChange('');
    }

    return (
        <Card className="w-full">
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-xl)' }}>
                <div className="flex items-center" style={{ gap: 'var(--space-md)' }}>
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'var(--color-primary-50)' }}
                    >
                        <Pill className="w-4 h-4" style={{ color: 'var(--color-primary-600)' }} />
                    </div>
                    <h3 className="text-sm font-semibold m-0" style={{ color: 'var(--color-text)' }}>
                        Select Drugs
                    </h3>
                </div>
                {selected.length > 0 && (
                    <button
                        type="button"
                        onClick={clearAll}
                        className="inline-flex items-center text-xs font-medium cursor-pointer transition-colors"
                        style={{
                            gap: 'var(--space-xs)',
                            padding: '0.25rem 0.625rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'transparent',
                            border: '1px solid var(--color-border)',
                            color: 'var(--color-text-muted)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-danger)';
                            e.currentTarget.style.color = 'var(--color-danger)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-border)';
                            e.currentTarget.style.color = 'var(--color-text-muted)';
                        }}
                    >
                        <X className="w-3 h-3" /> Clear
                    </button>
                )}
            </div>

            {/* Drug chip grid — all 6 always visible */}
            <div className="grid grid-cols-2 sm:grid-cols-3" style={{ gap: 'var(--space-md)' }}>
                {DRUG_OPTIONS.map((drug) => {
                    const isSelected = selected.includes(drug.name);
                    return (
                        <button
                            key={drug.name}
                            type="button"
                            onClick={() => toggleDrug(drug.name)}
                            className="flex items-center transition-all cursor-pointer"
                            style={{
                                gap: 'var(--space-sm)',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-lg)',
                                border: isSelected
                                    ? '2px solid var(--color-primary-500)'
                                    : '2px solid var(--color-border)',
                                background: isSelected
                                    ? 'linear-gradient(135deg, var(--color-primary-50), rgba(79,110,247,0.08))'
                                    : 'var(--color-surface)',
                                boxShadow: isSelected
                                    ? '0 0 0 3px rgba(79, 110, 247, 0.12), var(--shadow-sm)'
                                    : 'var(--shadow-sm)',
                                fontFamily: 'var(--font-body)',
                                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                            }}
                            onMouseEnter={(e) => {
                                if (!isSelected) {
                                    e.currentTarget.style.borderColor = 'var(--color-primary-300)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                    e.currentTarget.style.transform = 'scale(1.02)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isSelected) {
                                    e.currentTarget.style.borderColor = 'var(--color-border)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }
                            }}
                        >
                            {/* Checkbox indicator */}
                            <div
                                className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all"
                                style={{
                                    background: isSelected
                                        ? 'var(--color-primary-600)'
                                        : 'transparent',
                                    border: isSelected
                                        ? '2px solid var(--color-primary-600)'
                                        : '2px solid var(--color-border)',
                                }}
                            >
                                {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                            </div>

                            {/* Drug info */}
                            <div className="text-left" style={{ minWidth: 0 }}>
                                <p className="text-sm font-semibold m-0" style={{
                                    color: isSelected ? 'var(--color-primary-700)' : 'var(--color-text)',
                                }}>
                                    {drug.name}
                                </p>
                                <p className="text-xs m-0" style={{ color: 'var(--color-text-muted)' }}>
                                    {drug.category}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Selected summary */}
            {selected.length > 0 && (
                <div
                    className="flex items-center flex-wrap animate-fade-in"
                    style={{
                        marginTop: 'var(--space-lg)',
                        padding: 'var(--space-md)',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(79, 110, 247, 0.04)',
                        border: '1px solid rgba(79, 110, 247, 0.1)',
                        gap: 'var(--space-xs)',
                    }}
                >
                    <Pill className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--color-primary-500)' }} />
                    <span className="text-xs font-medium" style={{ color: 'var(--color-primary-600)' }}>
                        Selected:
                    </span>
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                        {selected.join(', ')}
                    </span>
                </div>
            )}
        </Card>
    );
}

export default DrugInput;
