import { Link } from 'react-router-dom';
import { Shield, Heart, Sparkles } from 'lucide-react';
import { useTheme } from '../ThemeContext';

function Footer() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <footer
            className="no-print"
            style={{
                background: isDark
                    ? 'linear-gradient(180deg, rgba(6, 10, 23, 0) 0%, #0a0f1e 15%)'
                    : 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.6) 20%, var(--color-slate-900) 100%)',
            }}
        >
            {/* Accent glow line at top */}
            <div style={{
                height: '1px',
                background: isDark
                    ? 'linear-gradient(90deg, transparent, var(--color-primary-500), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(99,130,255,0.3), transparent)',
            }} />

            <div className="container-app" style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-2xl)' }}>
                {/* Top — Brand + Nav */}
                <div
                    className="flex flex-col md:flex-row items-start md:items-center justify-between"
                    style={{
                        gap: 'var(--space-2xl)',
                        paddingBottom: 'var(--space-2xl)',
                        borderBottom: isDark
                            ? '1px solid rgba(99, 130, 255, 0.12)'
                            : '1px solid rgba(148,163,184,0.1)',
                    }}
                >
                    {/* Brand */}
                    <div className="flex items-center" style={{ gap: 'var(--space-md)' }}>
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{
                                background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))',
                                boxShadow: isDark
                                    ? '0 0 24px rgba(79,110,247,0.4)'
                                    : '0 0 20px rgba(79,110,247,0.25)',
                            }}
                        >
                            <Shield className="w-4 h-4 text-white" strokeWidth={2.2} />
                        </div>
                        <span style={{
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 700,
                            fontSize: '1.125rem',
                            color: isDark ? '#e2e8f0' : 'white',
                        }}>
                            Pharma<span style={{ color: 'var(--color-primary-400)' }}>Guard</span>
                        </span>
                    </div>

                    {/* Nav links */}
                    <nav className="flex items-center flex-wrap" style={{ gap: 'var(--space-xl)' }}>
                        {[
                            { to: '/analyze', label: 'Analysis' },
                            { to: '/docs', label: 'Documentation' },
                            { to: '/developer', label: 'Developer API' },
                        ].map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className="text-sm no-underline transition-colors font-medium"
                                style={{ color: isDark ? '#94a3b8' : 'rgba(148,163,184,0.7)' }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = isDark ? '#e2e8f0' : 'white')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = isDark ? '#94a3b8' : 'rgba(148,163,184,0.7)')}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Bottom — tagline */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-between"
                    style={{ paddingTop: 'var(--space-lg)', gap: 'var(--space-md)' }}
                >
                    <p className="text-xs flex items-center m-0" style={{
                        gap: 'var(--space-xs)',
                        color: isDark ? '#64748b' : 'rgba(148,163,184,0.5)',
                    }}>
                        <Sparkles className="w-3 h-3" style={{ color: 'var(--color-primary-400)' }} />
                        AI-powered precision pharmacogenomics
                    </p>
                    <p className="text-xs flex items-center m-0" style={{
                        gap: 'var(--space-xs)',
                        color: isDark ? '#64748b' : 'rgba(148,163,184,0.5)',
                    }}>
                        Built with <Heart className="w-3 h-3" style={{ color: '#f87171' }} /> for precision medicine
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
