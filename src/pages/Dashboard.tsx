import { useState } from 'react'

type View = 'overview' | 'agenda' | 'reservas' | 'clientes' | 'cardapio' | 'equipe' | 'nyx' | 'relatorios' | 'configuracoes'

interface DashboardProps {
  onLogout: () => void
}

/* ── Shared Icon ─────────────────────────────────────────────── */
function Icon({ d, size = 18, className = '' }: { d: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={d} />
    </svg>
  )
}

/* ── Sidebar ─────────────────────────────────────────────────── */
const navItems: { id: View; label: string; icon: string }[] = [
  { id: 'overview', label: 'Visão Geral', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'agenda', label: 'Agenda', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'reservas', label: 'Reservas', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { id: 'clientes', label: 'Clientes', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { id: 'cardapio', label: 'Cardápio', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
  { id: 'equipe', label: 'Equipe', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { id: 'nyx', label: 'NYX', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2' },
  { id: 'relatorios', label: 'Relatórios', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id: 'configuracoes', label: 'Configurações', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
]

function Sidebar({ view, onView, onLogout }: { view: View; onView: (v: View) => void; onLogout: () => void }) {
  return (
    <aside className="w-60 shrink-0 bg-primary h-screen sticky top-0 flex flex-col overflow-y-auto">
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-display font-semibold text-white text-sm">ReservaCariri</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onView(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
              view === item.id
                ? 'bg-white/20 text-white font-medium'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon d={item.icon} size={16} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-3 pb-5 border-t border-white/10 pt-4">
        <div className="flex items-center gap-3 px-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-semibold">M</div>
          <div>
            <div className="text-white text-xs font-medium">Mesa & Arte</div>
            <div className="text-white/50 text-xs">Administrador</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Icon d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" size={16} />
          Sair
        </button>
      </div>
    </aside>
  )
}

/* ── Topbar ──────────────────────────────────────────────────── */
function Topbar({ title }: { title: string }) {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-8 shrink-0">
      <h1 className="font-display font-semibold text-foreground text-lg">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <Icon d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">M</div>
          <span className="text-sm font-medium text-foreground hidden sm:block">Mesa & Arte</span>
        </div>
      </div>
    </header>
  )
}

/* ══════════════════════════════════════════════════════════════ */
/* ── OVERVIEW ─────────────────────────────────────────────────  */

const upcomingReservations = [
  { id: 1, client: 'João Silva', time: '19:00', people: 4, table: 'Mesa 05', status: 'confirmado', origin: 'NYX' },
  { id: 2, client: 'Maria Santos', time: '19:30', people: 2, table: 'Mesa 02', status: 'pendente', origin: 'WhatsApp' },
  { id: 3, client: 'Lucas Ferreira', time: '20:00', people: 6, table: 'Mesa 08', status: 'confirmado', origin: 'NYX' },
  { id: 4, client: 'Ana Bezerra', time: '20:30', people: 3, table: 'Mesa 04', status: 'confirmado', origin: 'Telefone' },
  { id: 5, client: 'Carlos Melo', time: '21:00', people: 5, table: 'Mesa 07', status: 'pendente', origin: 'NYX' },
]

const recentActivity = [
  { type: 'Nova reserva', desc: 'Carlos Melo – 21:00, 5 pessoas', time: '5 min', color: 'text-blue-600 bg-blue-50' },
  { type: 'Confirmada', desc: 'Ana Bezerra – 20:30, Mesa 04', time: '18 min', color: 'text-green-600 bg-green-50' },
  { type: 'Alteração', desc: 'Maria Santos – horário alterado para 19:30', time: '34 min', color: 'text-amber-600 bg-amber-50' },
  { type: 'Cancelamento', desc: 'Paulo Rocha – 18:00 cancelado', time: '1h 12min', color: 'text-red-600 bg-red-50' },
  { type: 'Nova reserva', desc: 'Lucas Ferreira – 20:00, 6 pessoas', time: '2h 5min', color: 'text-blue-600 bg-blue-50' },
]

const weekHours = ['12h', '13h', '14h', '18h', '19h', '20h', '21h', '22h']
const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const weekData: Record<string, string[]> = {
  'Seg': ['', '■', '', '■', '■', '■', '■', ''],
  'Ter': ['■', '', '■', '', '■', '■', '■', '■'],
  'Qua': ['', '', '', '■', '■', '■', '', '■'],
  'Qui': ['■', '■', '', '■', '■', '■', '■', ''],
  'Sex': ['■', '', '■', '■', '■', '■', '■', '■'],
  'Sáb': ['■', '■', '■', '■', '■', '■', '■', '■'],
  'Dom': ['', '■', '', '■', '■', '■', '', ''],
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmado: 'bg-green-100 text-green-700',
    pendente: 'bg-amber-100 text-amber-700',
    cancelado: 'bg-red-100 text-red-700',
  }
  return (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}

function Overview() {
  return (
    <div className="p-8 space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { n: '18', label: 'Agendamentos hoje', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'text-primary bg-primary/10' },
          { n: '76%', label: 'Taxa de ocupação', icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'text-accent bg-accent/10' },
          { n: 'R$ 4.320', label: 'Receita prevista', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-green-600 bg-green-50' },
          { n: '20:30', label: 'Próximo horário livre', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-purple-600 bg-purple-50' },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <Icon d={s.icon} size={19} />
            </div>
            <div className="font-display text-2xl font-semibold text-foreground">{s.n}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Resumo + Agenda */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Resumo */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-display font-semibold text-foreground mb-4">Resumo do dia</h2>
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-5">
            <p className="text-sm text-foreground leading-relaxed">
              Hoje temos <strong>18 reservas confirmadas</strong> com ocupação estimada de <strong>76%</strong>.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Próximo horário livre: <strong className="text-foreground">20:30</strong>
            </p>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Confirmadas', n: 14, color: 'bg-green-500' },
              { label: 'Pendentes', n: 4, color: 'bg-amber-400' },
              { label: 'Canceladas', n: 2, color: 'bg-red-400' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${s.color} shrink-0`} />
                <span className="text-sm text-muted-foreground flex-1">{s.label}</span>
                <span className="text-sm font-semibold text-foreground">{s.n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Agenda semanal */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h2 className="font-display font-semibold text-foreground mb-4">Agenda da semana</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left text-muted-foreground pb-3 pr-3 font-medium w-12">Hora</th>
                  {weekDays.map((d) => (
                    <th key={d} className="text-center text-muted-foreground pb-3 font-medium">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weekHours.map((h, hi) => (
                  <tr key={h}>
                    <td className="pr-3 py-1.5 text-muted-foreground">{h}</td>
                    {weekDays.map((d) => {
                      const booked = weekData[d][hi] === '■'
                      return (
                        <td key={d} className="py-1 px-1 text-center">
                          <div className={`h-7 rounded-lg mx-auto w-8 ${booked ? 'bg-primary/20 border border-primary/30' : 'bg-muted border border-transparent'}`} />
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-primary/20 border border-primary/30" /><span className="text-xs text-muted-foreground">Reservado</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-muted" /><span className="text-xs text-muted-foreground">Disponível</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Próximos agendamentos + Atividade */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-border">
            <h2 className="font-display font-semibold text-foreground">Próximos agendamentos</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60">
                <tr>
                  {['Cliente', 'Horário', 'Pessoas', 'Mesa', 'Status', 'Ações'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {upcomingReservations.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                          {r.client[0]}
                        </div>
                        <span className="font-medium text-foreground">{r.client}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-foreground">{r.time}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{r.people} pess.</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{r.table}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={r.status} /></td>
                    <td className="px-5 py-3.5">
                      <button className="text-xs text-primary hover:underline font-medium">Ver</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Atividade recente */}
        <div className="bg-card border border-border rounded-2xl">
          <div className="px-6 py-5 border-b border-border">
            <h2 className="font-display font-semibold text-foreground">Atividade recente</h2>
          </div>
          <div className="divide-y divide-border">
            {recentActivity.map((a, i) => (
              <div key={i} className="px-5 py-4">
                <div className="flex items-start gap-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-md shrink-0 mt-0.5 ${a.color}`}>{a.type}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground leading-snug">{a.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1">{a.time} atrás</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════ */
/* ── AGENDA ────────────────────────────────────────────────────  */

const allHours = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']

const agendaData: Record<string, { client: string; people: number; status: string } | null> = {
  '12:00': { client: 'Família Alves', people: 6, status: 'confirmado' },
  '13:00': { client: 'Pedro Costa', people: 2, status: 'confirmado' },
  '14:00': null,
  '19:00': { client: 'João Silva', people: 4, status: 'confirmado' },
  '19:30': { client: 'Maria Santos', people: 2, status: 'pendente' },
  '20:00': { client: 'Lucas Ferreira', people: 6, status: 'confirmado' },
  '20:30': null,
  '21:00': { client: 'Carlos Melo', people: 5, status: 'pendente' },
}

function Agenda() {
  const [view, setView] = useState<'dia' | 'semana'>('dia')
  const today = new Date()
  const dateStr = today.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground capitalize">{dateStr}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Mesa & Arte</p>
        </div>
        <div className="flex items-center gap-2 bg-muted rounded-xl p-1">
          {(['dia', 'semana'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${view === v ? 'bg-card text-foreground shadow-sm border border-border' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="divide-y divide-border">
          {allHours.map((h) => {
            const booking = agendaData[h]
            const free = !booking
            return (
              <div key={h} className={`flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors ${!free ? '' : ''}`}>
                <div className="w-16 text-sm font-medium text-muted-foreground shrink-0">{h}</div>
                {free ? (
                  <div className="flex-1 flex items-center gap-3">
                    <div className="h-8 flex-1 border-2 border-dashed border-border rounded-xl flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Disponível</span>
                    </div>
                  </div>
                ) : (
                  <div className={`flex-1 flex items-center justify-between px-4 py-2.5 rounded-xl border ${booking!.status === 'confirmado' ? 'bg-primary/8 border-primary/20' : 'bg-amber-50 border-amber-200'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${booking!.status === 'confirmado' ? 'bg-primary' : 'bg-amber-400'}`} />
                      <span className="font-medium text-sm text-foreground">{booking!.client}</span>
                      <span className="text-xs text-muted-foreground">{booking!.people} pessoas</span>
                    </div>
                    <StatusBadge status={booking!.status} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════ */
/* ── RESERVAS ──────────────────────────────────────────────────  */

const allReservations = [
  { id: 1, client: 'João Silva', date: '29/09', time: '19:00', people: 4, table: 'Mesa 05', status: 'confirmado', origin: 'NYX' },
  { id: 2, client: 'Maria Santos', date: '29/09', time: '19:30', people: 2, table: 'Mesa 02', status: 'pendente', origin: 'WhatsApp' },
  { id: 3, client: 'Lucas Ferreira', date: '29/09', time: '20:00', people: 6, table: 'Mesa 08', status: 'confirmado', origin: 'NYX' },
  { id: 4, client: 'Ana Bezerra', date: '29/09', time: '20:30', people: 3, table: 'Mesa 04', status: 'confirmado', origin: 'Telefone' },
  { id: 5, client: 'Carlos Melo', date: '29/09', time: '21:00', people: 5, table: 'Mesa 07', status: 'pendente', origin: 'NYX' },
  { id: 6, client: 'Família Alves', date: '28/09', time: '12:00', people: 6, table: 'Mesa 10', status: 'confirmado', origin: 'NYX' },
  { id: 7, client: 'Pedro Costa', date: '28/09', time: '13:00', people: 2, table: 'Mesa 03', status: 'confirmado', origin: 'WhatsApp' },
  { id: 8, client: 'Paulo Rocha', date: '28/09', time: '18:00', people: 4, table: 'Mesa 06', status: 'cancelado', origin: 'Telefone' },
]

function Reservas() {
  const [filter, setFilter] = useState('todos')

  const filtered = allReservations.filter((r) =>
    filter === 'todos' ? true : r.status === filter
  )

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        {['todos', 'confirmado', 'pendente', 'cancelado'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'}`}
          >
            {f}
          </button>
        ))}
        <button className="ml-auto px-4 py-2 bg-accent text-accent-foreground rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors">
          + Nova reserva
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60">
              <tr>
                {['Cliente', 'Data', 'Horário', 'Pessoas', 'Mesa', 'Status', 'Origem', 'Ações'].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                        {r.client[0]}
                      </div>
                      <span className="font-medium text-foreground">{r.client}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{r.date}</td>
                  <td className="px-5 py-3.5 text-foreground">{r.time}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{r.people}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{r.table}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={r.status} /></td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2 py-1 rounded-md ${r.origin === 'NYX' ? 'bg-primary/10 text-primary' : r.origin === 'WhatsApp' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'}`}>
                      {r.origin}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="text-xs text-primary hover:underline font-medium">Editar</button>
                      <button className="text-xs text-red-500 hover:underline">Cancelar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════ */
/* ── CLIENTES ──────────────────────────────────────────────────  */

const clients = [
  { name: 'João Silva', phone: '(88) 9 9812-3456', visits: 8, last: '29/09/2026', status: 'frequente' },
  { name: 'Maria Santos', phone: '(88) 9 9765-4321', visits: 3, last: '29/09/2026', status: 'regular' },
  { name: 'Lucas Ferreira', phone: '(88) 9 9543-2100', visits: 12, last: '29/09/2026', status: 'vip' },
  { name: 'Ana Bezerra', phone: '(88) 9 9234-5678', visits: 5, last: '29/09/2026', status: 'regular' },
  { name: 'Carlos Melo', phone: '(88) 9 9876-0011', visits: 1, last: '29/09/2026', status: 'novo' },
  { name: 'Família Alves', phone: '(88) 9 9456-7890', visits: 6, last: '28/09/2026', status: 'frequente' },
  { name: 'Pedro Costa', phone: '(88) 9 9321-6540', visits: 4, last: '28/09/2026', status: 'regular' },
]

function Clientes() {
  const [search, setSearch] = useState('')
  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  )

  const badge: Record<string, string> = {
    vip: 'bg-purple-100 text-purple-700',
    frequente: 'bg-primary/10 text-primary',
    regular: 'bg-blue-50 text-blue-700',
    novo: 'bg-muted text-muted-foreground',
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar cliente..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </div>
        <button className="px-4 py-2.5 bg-accent text-accent-foreground rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors">
          + Novo cliente
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60">
              <tr>
                {['Cliente', 'Telefone', 'Visitas', 'Última visita', 'Tipo', 'Ações'].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c) => (
                <tr key={c.name} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                        {c.name[0]}
                      </div>
                      <span className="font-medium text-foreground">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{c.phone}</td>
                  <td className="px-5 py-3.5 text-foreground font-medium">{c.visits}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{c.last}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${badge[c.status]}`}>{c.status}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="text-xs text-primary hover:underline font-medium">Histórico</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════ */
/* ── CARDÁPIO ──────────────────────────────────────────────────  */

const dishes = [
  { name: 'Baião de Dois', cat: 'Prato Principal', price: 'R$ 48,90', avail: true },
  { name: 'Carne de Sol ao Molho', cat: 'Prato Principal', price: 'R$ 64,90', avail: true },
  { name: 'Escondidinho de Carne de Sol', cat: 'Prato Principal', price: 'R$ 52,90', avail: true },
  { name: 'Galinha Caipira', cat: 'Prato Principal', price: 'R$ 57,90', avail: false },
  { name: 'Caldinho de Feijão', cat: 'Entrada', price: 'R$ 18,90', avail: true },
  { name: 'Pamonha Salgada', cat: 'Entrada', price: 'R$ 14,90', avail: true },
  { name: 'Cartola', cat: 'Sobremesa', price: 'R$ 22,90', avail: true },
  { name: 'Cuscuz com Leite', cat: 'Sobremesa', price: 'R$ 16,90', avail: true },
]

const cats = ['Todos', 'Entrada', 'Prato Principal', 'Sobremesa']

function Cardapio() {
  const [cat, setCat] = useState('Todos')

  const filtered = dishes.filter((d) => cat === 'Todos' || d.cat === cat)

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${cat === c ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'}`}
          >
            {c}
          </button>
        ))}
        <button className="ml-auto px-4 py-2 bg-accent text-accent-foreground rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors">
          + Novo prato
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((d) => (
          <div key={d.name} className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3h18v18H3zM3 9h18M9 21V9" />
              </svg>
            </div>
            <div className="font-semibold text-foreground mb-1">{d.name}</div>
            <div className="text-xs text-muted-foreground mb-3">{d.cat}</div>
            <div className="flex items-center justify-between">
              <div className="font-display font-semibold text-primary">{d.price}</div>
              <div className={`w-8 h-4 rounded-full flex items-center transition-colors cursor-pointer ${d.avail ? 'bg-primary justify-end' : 'bg-border justify-start'}`}>
                <div className="w-3 h-3 rounded-full bg-white mx-0.5 shadow-sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════ */
/* ── EQUIPE ────────────────────────────────────────────────────  */

const team = [
  { name: 'Rodrigo Figueiredo', role: 'Gerente', access: 'Admin', status: 'ativo', since: 'Jan 2025' },
  { name: 'Camila Nunes', role: 'Atendente', access: 'Operador', status: 'ativo', since: 'Mar 2025' },
  { name: 'Rafael Oliveira', role: 'Garçom', access: 'Visualizador', status: 'ativo', since: 'Jun 2025' },
  { name: 'Juliana Carvalho', role: 'Atendente', access: 'Operador', status: 'ativo', since: 'Ago 2025' },
  { name: 'Marcos Pinheiro', role: 'Chef', access: 'Visualizador', status: 'inativo', since: 'Set 2024' },
]

function Equipe() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-accent text-accent-foreground rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors">
          + Novo membro
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60">
              <tr>
                {['Membro', 'Cargo', 'Acesso', 'Desde', 'Status', 'Ações'].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {team.map((m) => (
                <tr key={m.name} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold shrink-0">
                        {m.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                      </div>
                      <span className="font-medium text-foreground">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{m.role}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${m.access === 'Admin' ? 'bg-accent/10 text-accent' : m.access === 'Operador' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {m.access}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{m.since}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${m.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="text-xs text-primary hover:underline font-medium">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════ */
/* ── NYX PANEL ─────────────────────────────────────════════════  */

const nyxConversations = [
  { client: 'Carlos Melo', time: '21:05', last: 'Reserva confirmada para 21:00', status: 'concluído' },
  { client: 'Fernanda Lima', time: '20:48', last: 'Aguardando confirmação do cliente', status: 'aguardando' },
  { client: 'Roberto Saraiva', time: '20:30', last: 'Solicitou intervenção humana', status: 'intervenção' },
  { client: 'Bianca Torres', time: '19:55', last: 'Reserva confirmada para 20:00', status: 'concluído' },
  { client: 'Henrique Dias', time: '19:20', last: 'Informações sobre o cardápio', status: 'concluído' },
]

const nyxChat = [
  { from: 'client', text: 'Gostaria de reservar uma mesa para 4 pessoas hoje às 20h.', time: '20:30' },
  { from: 'nyx', text: 'Olá! Vou verificar a disponibilidade. Um momento... 🔍', time: '20:30' },
  { from: 'nyx', text: 'Temos disponibilidade às 20h para 4 pessoas. Posso confirmar sua reserva?', time: '20:31' },
  { from: 'client', text: 'Sim, por favor!', time: '20:31' },
  { from: 'nyx', text: 'Perfeito! Reserva confirmada ✅ Esperamos você às 20h no Mesa & Arte!', time: '20:31' },
]

function NyxPanel() {
  const [selected, setSelected] = useState(0)

  const statusStyle: Record<string, string> = {
    concluído: 'bg-green-100 text-green-700',
    aguardando: 'bg-amber-100 text-amber-700',
    intervenção: 'bg-red-100 text-red-700',
  }

  return (
    <div className="p-8 space-y-6">
      {/* Status cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { n: '●  Ativo', label: 'Status do NYX', color: 'text-green-600 bg-green-50' },
          { n: '47', label: 'Atendimentos hoje', color: 'text-primary bg-primary/10' },
          { n: '18', label: 'Reservas via NYX', color: 'text-accent bg-accent/10' },
          { n: '1', label: 'Aguardando intervenção', color: 'text-red-600 bg-red-50' },
        ].map((s) => (
          <div key={s.label} className={`bg-card border border-border rounded-2xl p-5`}>
            <div className={`text-2xl font-display font-semibold ${s.color.split(' ')[0]} mb-1`}>{s.n}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Conversation list + Chat */}
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-display font-semibold text-foreground">Histórico de conversas</h2>
          </div>
          <div className="divide-y divide-border">
            {nyxConversations.map((c, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-left px-5 py-4 hover:bg-muted/30 transition-colors ${selected === i ? 'bg-primary/5' : ''}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm text-foreground">{c.client}</span>
                  <span className="text-xs text-muted-foreground">{c.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground truncate flex-1 pr-2">{c.last}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-md font-medium shrink-0 ${statusStyle[c.status]}`}>{c.status}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat preview */}
        <div className="lg:col-span-3 bg-card border border-border rounded-2xl overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
              {nyxConversations[selected].client[0]}
            </div>
            <div>
              <div className="font-semibold text-sm text-foreground">{nyxConversations[selected].client}</div>
              <div className="text-xs text-muted-foreground">{nyxConversations[selected].time}</div>
            </div>
            <div className="ml-auto">
              <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${statusStyle[nyxConversations[selected].status]}`}>
                {nyxConversations[selected].status}
              </span>
            </div>
          </div>

          <div className="flex-1 p-5 space-y-3 bg-[#ECE5DD] min-h-64 overflow-y-auto">
            {nyxChat.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'nyx' ? 'justify-start' : 'justify-end'}`}>
                {m.from === 'nyx' && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold mr-2 mt-1 shrink-0">N</div>
                )}
                <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                  m.from === 'nyx'
                    ? 'bg-card text-foreground rounded-tl-none'
                    : 'bg-[#DCF8C6] text-foreground rounded-tr-none'
                }`}>
                  <div>{m.text}</div>
                  <div className="text-xs text-muted-foreground mt-1 text-right">{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 py-4 border-t border-border">
            <button className="w-full py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-medium hover:bg-primary/20 transition-colors">
              Assumir atendimento
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════ */
/* ── PLACEHOLDER VIEWS ─────────────────────────────────────────  */

function PlaceholderView({ label }: { label: string }) {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-96">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <Icon d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" size={28} className="text-muted-foreground" />
      </div>
      <h2 className="font-display text-xl font-semibold text-foreground mb-2">{label}</h2>
      <p className="text-muted-foreground text-sm">Esta seção está em desenvolvimento.</p>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════ */
/* ── DASHBOARD SHELL ───────────────────────────────────────────  */

const viewTitles: Record<View, string> = {
  overview: 'Visão Geral',
  agenda: 'Agenda',
  reservas: 'Reservas',
  clientes: 'Clientes',
  cardapio: 'Cardápio',
  equipe: 'Equipe',
  nyx: 'NYX – Assistente de Reservas',
  relatorios: 'Relatórios',
  configuracoes: 'Configurações',
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [view, setView] = useState<View>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:relative z-40 lg:z-auto transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar view={view} onView={(v) => { setView(v); setSidebarOpen(false) }} onLogout={onLogout} />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <div className="flex items-center lg:hidden px-4 h-14 border-b border-border bg-card">
          <button onClick={() => setSidebarOpen(true)} className="text-foreground mr-3">
            <Icon d="M4 6h16M4 12h16M4 18h16" />
          </button>
          <span className="font-display font-semibold text-foreground">{viewTitles[view]}</span>
        </div>
        <div className="hidden lg:block">
          <Topbar title={viewTitles[view]} />
        </div>

        <main className="flex-1 overflow-y-auto">
          {view === 'overview' && <Overview />}
          {view === 'agenda' && <Agenda />}
          {view === 'reservas' && <Reservas />}
          {view === 'clientes' && <Clientes />}
          {view === 'cardapio' && <Cardapio />}
          {view === 'equipe' && <Equipe />}
          {view === 'nyx' && <NyxPanel />}
          {view === 'relatorios' && <PlaceholderView label="Relatórios" />}
          {view === 'configuracoes' && <PlaceholderView label="Configurações" />}
        </main>
      </div>
    </div>
  )
}
