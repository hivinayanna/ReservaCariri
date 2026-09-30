import { useState } from 'react'

interface LandingProps {
  onLogin: () => void
  onRestaurant: () => void
}

/* ── Icons ─────────────────────────────────────────────────── */
const Ico = ({ d, size = 20 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

/* ── Header ─────────────────────────────────────────────────── */
function Header({ onLogin, onRestaurant }: { onLogin: () => void; onRestaurant: () => void }) {
  const [open, setOpen] = useState(false)
  const links = ['Início', 'Como funciona', 'Recursos', 'Sobre o sistema']

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a key={l} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <button onClick={onLogin} className="text-sm px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors">
            Entrar
          </button>
          <button onClick={onRestaurant} className="text-sm px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-medium">
            Sou restaurante
          </button>
        </div>
        {/* Mobile */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <Ico d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 pb-4">
          {links.map((l) => (
            <a key={l} href="#" className="block py-2.5 text-sm text-foreground">{l}</a>
          ))}
          <div className="flex gap-2 pt-3">
            <button onClick={onLogin} className="flex-1 py-2 text-sm border border-border rounded-lg">Entrar</button>
            <button onClick={onRestaurant} className="flex-1 py-2 text-sm bg-accent text-white rounded-lg">Sou restaurante</button>
          </div>
        </div>
      )}
    </header>
  )
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <span className="font-display font-semibold text-foreground">ReservaCariri</span>
    </div>
  )
}

/* ── Hero ────────────────────────────────────────────────────── */
function Hero({ onLogin, onRestaurant }: { onLogin: () => void; onRestaurant: () => void }) {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-accent bg-accent/10 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Plataforma para restaurantes do Cariri
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
            Reservas mais simples.{' '}
            <span className="text-primary italic">Atendimento</span>{' '}
            mais inteligente.
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
            O ReservaCariri conecta restaurantes e clientes, automatizando o processo de reservas sem deixar de lado o atendimento humano.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onRestaurant}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Conheça o ReservaCariri
            </button>
            <button
              onClick={onLogin}
              className="px-6 py-3 border border-border text-foreground rounded-xl font-medium hover:bg-muted transition-colors"
            >
              Acessar plataforma
            </button>
          </div>
        </div>

        {/* Visual */}
        <div className="relative">
          {/* Dashboard mockup */}
          <div className="bg-card rounded-2xl border border-border shadow-xl p-5 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-muted-foreground">Mesa & Arte</div>
                <div className="font-display font-semibold text-foreground">Visão Geral</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { n: '18', label: 'Hoje' },
                { n: '76%', label: 'Ocupação' },
                { n: '20:30', label: 'Próx. livre' },
              ].map((s) => (
                <div key={s.label} className="bg-secondary rounded-xl p-3 text-center">
                  <div className="font-display text-lg font-semibold text-primary">{s.n}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[
                { c: 'João Silva', h: '19:00', p: '4 pessoas', s: 'confirmado' },
                { c: 'Maria Santos', h: '19:30', p: '2 pessoas', s: 'pendente' },
                { c: 'Lucas Ferreira', h: '20:00', p: '6 pessoas', s: 'confirmado' },
              ].map((r) => (
                <div key={r.c} className="flex items-center gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium shrink-0">
                    {r.c[0]}
                  </div>
                  <span className="text-foreground font-medium flex-1">{r.c}</span>
                  <span className="text-muted-foreground">{r.h}</span>
                  <span className="text-muted-foreground">{r.p}</span>
                  <span className={`px-1.5 py-0.5 rounded-md font-medium ${r.s === 'confirmado' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {r.s}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp chat bubble */}
          <div className="absolute -bottom-4 -right-4 lg:-right-8 w-64 bg-card rounded-2xl border border-border shadow-xl p-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">N</div>
              <div>
                <div className="text-xs font-semibold text-foreground">NYX</div>
                <div className="text-xs text-green-600">online</div>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="bg-muted rounded-lg rounded-tl-none p-2 text-foreground max-w-[85%]">
                Mesa pra 4 às 20h?
              </div>
              <div className="bg-primary rounded-lg rounded-tr-none p-2 text-primary-foreground max-w-[85%] ml-auto">
                Verificando disponibilidade...
              </div>
              <div className="bg-primary rounded-lg rounded-tr-none p-2 text-primary-foreground max-w-[85%] ml-auto">
                Temos horário às 20h! ✓
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── About ───────────────────────────────────────────────────── */
function About() {
  return (
    <section className="bg-secondary py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="font-display text-4xl font-semibold text-foreground mb-4">
            Uma nova forma de gerenciar reservas
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Ferramentas genéricas de agendamento nem sempre atendem às necessidades específicas dos restaurantes da região do Cariri. O ReservaCariri foi criado pensando na realidade local.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
              title: 'Personalização',
              desc: 'Uma solução pensada para a realidade dos restaurantes da região, com funcionalidades que fazem sentido no dia a dia.',
            },
            {
              icon: 'M13 10V3L4 14h7v7l9-11h-7z',
              title: 'Eficiência',
              desc: 'Otimize o processo desde a solicitação até a confirmação da reserva, reduzindo o trabalho manual da equipe.',
            },
            {
              icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
              title: 'Suporte humano',
              desc: 'Mesmo com automação, o cliente nunca fica sem possibilidade de atendimento. A equipe pode intervir a qualquer momento.',
            },
          ].map((c) => (
            <div key={c.title} className="bg-card rounded-2xl border border-border p-7">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                <Ico d={c.icon} size={22} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{c.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── How it works ────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { label: 'Cliente', color: 'bg-accent', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', desc: 'Envia mensagem pelo WhatsApp informando data, horário e número de pessoas.' },
    { label: 'WhatsApp', color: 'bg-green-600', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', desc: 'Canal de atendimento onde o cliente interage com o NYX.' },
    { label: 'NYX', color: 'bg-primary', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2', desc: 'Assistente de IA que entende a solicitação e conduz o processo de reserva.' },
    { label: 'n8n', color: 'bg-purple-600', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', desc: 'Conecta e automatiza as diferentes etapas do sistema em tempo real.' },
    { label: 'Google Agenda', color: 'bg-blue-600', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', desc: 'Consulta a disponibilidade de horários e registra as reservas confirmadas.' },
    { label: 'Confirmado!', color: 'bg-accent', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', desc: 'Reserva registrada. Cliente e restaurante recebem confirmação automaticamente.' },
  ]

  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h2 className="font-display text-4xl font-semibold text-foreground mb-4">Como funciona</h2>
        <p className="text-muted-foreground">Do pedido à confirmação, todo o processo acontece de forma automática e fluída.</p>
      </div>

      {/* Flow */}
      <div className="relative">
        {/* Connector line */}
        <div className="hidden lg:block absolute top-10 left-[8.33%] right-[8.33%] h-0.5 bg-border z-0" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
          {steps.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center text-center gap-3">
              <div className={`w-20 h-20 rounded-2xl ${s.color} flex items-center justify-center shadow-md`}>
                <Ico d={s.icon} size={28} />
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="absolute">
                  <path d={s.icon} />
                </svg>
              </div>
              <div className="font-semibold text-sm text-foreground">{s.label}</div>
              <p className="text-xs text-muted-foreground leading-snug">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="lg:hidden text-muted-foreground">↓</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Features ────────────────────────────────────────────────── */
function Features() {
  const features = [
    { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Gestão de reservas', desc: 'Visualize, confirme, altere e cancele reservas em tempo real.' },
    { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', title: 'Agenda semanal', desc: 'Visão completa da semana com horários livres e reservados.' },
    { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Controle de disponibilidade', desc: 'Defina capacidade por horário e bloqueie períodos facilmente.' },
    { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Cadastro de clientes', desc: 'Histórico completo de visitas, preferências e contatos.' },
    { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', title: 'Gestão de equipe', desc: 'Cadastro de membros, cargos e controle de acesso.' },
    { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', title: 'Gerenciamento do cardápio', desc: 'Categorias, pratos, preços e disponibilidade por período.' },
    { icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Resumo automático', desc: 'Relatório diário com ocupação, reservas e insights.' },
    { icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Atividade recente', desc: 'Feed em tempo real com todas as ações e movimentações.' },
    { icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2', title: 'Atendimento NYX', desc: 'IA conversacional que atende clientes pelo WhatsApp 24h.' },
  ]

  return (
    <section className="bg-secondary py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="font-display text-4xl font-semibold text-foreground mb-4">
            Tudo que seu restaurante precisa em um só lugar
          </h2>
          <p className="text-muted-foreground">Uma plataforma completa, desenvolvida para simplificar a operação de reservas.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Ico d={f.icon} size={19} />
              </div>
              <h3 className="font-semibold text-foreground mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── NYX Section ─────────────────────────────────────────────── */
function NyxSection() {
  const msgs = [
    { from: 'client', text: 'Gostaria de reservar uma mesa para 4 pessoas hoje às 20h.' },
    { from: 'nyx', text: 'Olá! Vou verificar a disponibilidade para você. Um momento... 🔍' },
    { from: 'nyx', text: 'Temos disponibilidade às 20h para 4 pessoas. Posso confirmar sua reserva?' },
    { from: 'client', text: 'Sim, por favor!' },
    { from: 'nyx', text: 'Perfeito! Reserva confirmada para hoje às 20h ✅ Esperamos você no Mesa & Arte!' },
  ]

  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Chat mockup */}
        <div className="order-2 lg:order-1">
          <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden max-w-md mx-auto">
            {/* Chat header */}
            <div className="bg-primary px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-display font-bold">
                N
              </div>
              <div>
                <div className="text-white font-semibold text-sm">NYX – Mesa & Arte</div>
                <div className="text-white/70 text-xs">Assistente de reservas</div>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-white/70 text-xs">online</span>
              </div>
            </div>
            {/* Messages */}
            <div className="p-5 space-y-3 bg-[#ECE5DD] min-h-60">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'nyx' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                    m.from === 'nyx'
                      ? 'bg-card text-foreground rounded-tl-none'
                      : 'bg-[#DCF8C6] text-foreground rounded-tr-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full mb-6">
            IA Conversacional
          </div>
          <h2 className="font-display text-4xl font-semibold text-foreground mb-5">
            Conheça o NYX,{' '}
            <span className="italic text-primary">seu assistente</span>{' '}
            de reservas
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            O NYX é o assistente de inteligência artificial que conversa com seus clientes pelo WhatsApp. Ele entende a solicitação, consulta a disponibilidade em tempo real e conduz todo o processo de reserva — 24 horas por dia, 7 dias por semana.
          </p>
          <div className="space-y-4">
            {[
              'Consulta disponibilidade em tempo real',
              'Confirma reservas automaticamente',
              'Responde dúvidas sobre o cardápio',
              'Aciona a equipe quando necessário',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1E4D2B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Benefits ────────────────────────────────────────────────── */
function Benefits() {
  const items = [
    { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Menos trabalho manual' },
    { icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', label: 'Organização das reservas' },
    { icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Acompanhamento da ocupação' },
    { icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2', label: 'Atendimento automatizado' },
    { icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4', label: 'Informações centralizadas' },
    { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', label: 'Intervenção humana quando necessário' },
  ]

  return (
    <section className="bg-primary py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="font-display text-4xl font-semibold text-primary-foreground mb-4">
            Benefícios para o seu restaurante
          </h2>
          <p className="text-primary-foreground/70">
            Mais tempo para o que realmente importa: o atendimento e a experiência dos seus clientes.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-4 bg-white/10 rounded-xl px-5 py-4 hover:bg-white/15 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
              </div>
              <span className="text-primary-foreground font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CTA ─────────────────────────────────────────────────────── */
function CTA({ onLogin }: { onLogin: () => void }) {
  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <div className="bg-secondary rounded-3xl p-12 lg:p-20 text-center border border-border">
        <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mb-5">
          Leve seu restaurante para uma nova{' '}
          <span className="italic text-primary">experiência</span>{' '}
          de reservas.
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-8 text-lg">
          Acompanhe e gerencie todas as suas reservas em um painel pensado para os restaurantes do Cariri.
        </p>
        <button
          onClick={onLogin}
          className="px-8 py-4 bg-accent text-accent-foreground rounded-xl font-semibold hover:bg-accent/90 transition-colors text-lg"
        >
          Acessar plataforma
        </button>
      </div>
    </section>
  )
}

/* ── Footer ──────────────────────────────────────────────────── */
function Footer({ onLogin }: { onLogin: () => void }) {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Plataforma de gestão de reservas para restaurantes do Cariri, Ceará.
            </p>
          </div>
          <div>
            <div className="font-semibold text-foreground mb-4 text-sm">Plataforma</div>
            <div className="space-y-2.5">
              {['Início', 'Como funciona', 'Recursos', 'Sobre'].map((l) => (
                <a key={l} href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold text-foreground mb-4 text-sm">Restaurantes</div>
            <div className="space-y-2.5">
              <button onClick={onLogin} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Acessar painel
              </button>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Fale com a equipe</a>
            </div>
          </div>
          <div>
            <div className="font-semibold text-foreground mb-4 text-sm">Contato</div>
            <div className="space-y-2.5 text-sm text-muted-foreground">
              <div>contato@reservacariri.com.br</div>
              <div>Juazeiro do Norte, CE</div>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-10 pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} ReservaCariri. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}

/* ── Page ────────────────────────────────────────────────────── */
export default function Landing({ onLogin, onRestaurant }: LandingProps) {
  return (
    <div className="bg-background min-h-screen">
      <Header onLogin={onLogin} onRestaurant={onRestaurant} />
      <Hero onLogin={onLogin} onRestaurant={onRestaurant} />
      <About />
      <HowItWorks />
      <Features />
      <NyxSection />
      <Benefits />
      <CTA onLogin={onLogin} />
      <Footer onLogin={onLogin} />
    </div>
  )
}
