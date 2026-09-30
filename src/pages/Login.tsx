interface LoginProps {
  onBack: () => void
  onLogin: () => void
}

export default function Login({ onBack, onLogin }: LoginProps) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left: form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10 w-fit text-sm"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7-7 7 7 7" />
          </svg>
          Voltar
        </button>

        <div className="max-w-sm">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-display font-semibold text-foreground text-lg">ReservaCariri</span>
          </div>

          <h1 className="font-display text-3xl font-semibold text-foreground mb-2">Bem-vindo de volta</h1>
          <p className="text-muted-foreground mb-8">Entre com as credenciais do seu restaurante.</p>

          <form
            onSubmit={(e) => { e.preventDefault(); onLogin(); }}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">E-mail</label>
              <input
                type="email"
                placeholder="seu@restaurante.com.br"
                defaultValue="contato@mesaarte.com.br"
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                defaultValue="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-sm text-accent hover:underline">
                Esqueci minha senha
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Entrar na plataforma
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Ainda não tem uma conta?{' '}
            <button className="text-accent font-medium hover:underline">
              Fale com nossa equipe
            </button>
          </p>
        </div>
      </div>

      {/* Right: visual */}
      <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden items-center justify-center p-12">
        {/* Background texture circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/20 translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-sm text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="font-display text-3xl font-semibold text-white mb-4">
            Gerencie seu restaurante com inteligência
          </h2>
          <p className="text-white/70 leading-relaxed">
            Reservas, clientes, cardápio e equipe — tudo em um painel pensado para os restaurantes do Cariri.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 text-left">
            {[
              { n: '340+', label: 'Reservas gerenciadas' },
              { n: '98%', label: 'Taxa de confirmação' },
              { n: '12min', label: 'Tempo médio de resposta' },
              { n: '4.9★', label: 'Avaliação dos clientes' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-display font-semibold text-white">{s.n}</div>
                <div className="text-xs text-white/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
