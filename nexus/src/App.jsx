import { useState, useEffect } from 'react'
import { Activity, Bot, Terminal, Settings, Play, Square, Pause, Wifi, WifiOff, Plus, ArrowLeft, Users, Database, Workflow, Shield, Save } from 'lucide-react'

// --- KATUTA MODULE COMPONENT ---
function KatutaModule({ onBack, agentData }) {
  const [activeTab, setActiveTab] = useState('overview')

  // Real Data from Backend (or defaults)
  const realReservations = agentData?.reservations || []
  const metrics = agentData?.metrics || { total_reservas: 0, mesas_ocupadas: 0, occupancy_rate: '0%' }

  const [flows, setFlows] = useState([
    { id: 'f1', name: 'Main Reservation Flow', status: 'active', type: 'core' },
    { id: 'f2', name: 'WhatsApp Auto-Reply', status: 'active', type: 'comms' },
    { id: 'f3', name: 'Weekend Promo Blast', status: 'paused', type: 'marketing' },
    { id: 'f4', name: 'Satisfaction Survey', status: 'active', type: 'marketing' }
  ])

  const [users, setUsers] = useState([
    { id: 1, name: 'Admin', role: 'Owner', lastActive: 'Now' },
    { id: 2, name: 'Waiter 01', role: 'Staff', lastActive: '2h ago' },
    { id: 3, name: 'Kitchen Rep', role: 'View Only', lastActive: '5m ago' }
  ])

  // Map Real Data to UI Structure or use Fallback
  const reservations = realReservations.length > 0 ? realReservations.map((r, i) => ({
    id: r.Reserva_ID || i,
    name: r.Nome_Cliente || 'Unknown',
    time: r.Hora || '??:??',
    people: r.Qtd_Pessoas || '?',
    table: r.Mesa_ID || 'Pending',
    status: r.Status || 'Pending'
  })) : [
    { id: 101, name: 'Waiting for Data...', time: '--:--', people: '-', table: '-', status: 'Syncing' }
  ]

  const toggleFlow = (id) => {
    setFlows(flows.map(f => f.id === id ? { ...f, status: f.status === 'active' ? 'paused' : 'active' } : f))
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Module Sidebar */}
      <div className="w-64 bg-emerald-900/10 border-r border-emerald-500/20 p-4 flex flex-col">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={18} /> Back to Nexus
        </button>

        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
            <Activity size={24} />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">Katuta's<br />Pizzaria</h2>
            <span className="text-[10px] text-emerald-500/50 font-mono uppercase">Core Module v7.1</span>
          </div>
        </div>

        <nav className="space-y-1">
          {[
            { id: 'overview', icon: Activity, label: 'Overview' },
            { id: 'flows', icon: Workflow, label: 'Flow Controls' },
            { id: 'users', icon: Users, label: 'User Manager' },
            { id: 'data', icon: Database, label: 'Live Reservations' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full p-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all ${activeTab === item.id ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Module Content */}
      <div className="flex-1 p-8 overflow-auto bg-slate-900/50 relative">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="relative z-10">

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold mb-6">System Overview</h1>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700">
                  <h3 className="text-slate-400 text-sm mb-2">Total Reservations Today</h3>
                  <p className="text-4xl font-bold text-white">{metrics.total_reservas}</p>
                  <div className="mt-4 text-sm text-emerald-400 flex items-center gap-1">
                    <Activity size={12} /> Live from Sheets
                  </div>
                </div>
                <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700">
                  <h3 className="text-slate-400 text-sm mb-2">Tables Occupied</h3>
                  <p className="text-4xl font-bold text-white">{metrics.mesas_ocupadas}</p>
                  <div className="mt-4 text-sm text-blue-400 flex items-center gap-1">
                    <Bot size={12} /> {metrics.occupancy_rate} capacity
                  </div>
                </div>
                <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700">
                  <h3 className="text-slate-400 text-sm mb-2">System Health</h3>
                  <p className="text-4xl font-bold text-emerald-500">100%</p>
                  <div className="mt-4 text-sm text-slate-500">Katuta API Connected</div>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mt-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Shield size={20} className="text-emerald-400" /> Emergency Controls</h3>
                <div className="flex gap-4">
                  <button className="px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-500 rounded-lg font-bold flex items-center gap-2 transition-all">
                    <Pause size={18} /> PAUSE ALL RESERVATIONS
                  </button>
                  <button className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium flex items-center gap-2 transition-all">
                    <WifiOff size={18} /> Disconnect WhatsApp
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FLOWS TAB */}
          {activeTab === 'flows' && (
            <div className="max-w-4xl">
              <h1 className="text-3xl font-bold mb-2">Flow Control</h1>
              <p className="text-slate-400 mb-8">Manage individual automation circuits.</p>

              <div className="space-y-4">
                {flows.map(flow => (
                  <div key={flow.id} className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 flex justify-between items-center group hover:border-slate-500 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${flow.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                        <Workflow size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{flow.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full uppercase tracking-wide border ${flow.type === 'core' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' :
                            flow.type === 'marketing' ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' :
                              'border-slate-500/30 text-slate-400'
                          }`}>{flow.type}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-mono ${flow.status === 'active' ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {flow.status.toUpperCase()}
                      </span>
                      <button
                        onClick={() => toggleFlow(flow.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${flow.status === 'active' ? 'bg-emerald-500' : 'bg-slate-600'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${flow.status === 'active' ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === 'users' && (
            <div className="max-w-4xl">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2">User Management</h1>
                  <p className="text-slate-400">Control access to the reservation dashboard.</p>
                </div>
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center gap-2 font-medium">
                  <Plus size={18} /> Add User
                </button>
              </div>

              <div className="bg-slate-800/80 rounded-xl border border-slate-700 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-900/50 text-slate-400 text-sm font-medium uppercase tracking-wider">
                    <tr>
                      <th className="p-4">User</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Last Active</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="p-4 font-medium text-white">{user.name}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">{user.role}</span>
                        </td>
                        <td className="p-4 text-slate-400 text-sm">{user.lastActive}</td>
                        <td className="p-4 text-right">
                          <button className="text-blue-400 hover:text-blue-300 text-sm mr-4 font-medium">Reset Password</button>
                          <button className="text-red-400 hover:text-red-300 text-sm font-medium">Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DATA TAB */}
          {activeTab === 'data' && (
            <div className="max-w-5xl">
              <h1 className="text-3xl font-bold mb-2">Live Reservations</h1>
              <p className="text-slate-400 mb-8">Real-time view of the database - Fetched from Katuta API.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reservations.map(res => (
                  <div key={res.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg">{res.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded font-bold ${res.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' :
                          res.status === 'Seated' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                        }`}>{res.status}</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-400 text-sm mt-2">
                      <div className="flex items-center gap-1"><Users size={14} /> {res.people} ppl</div>
                      <div className="flex items-center gap-1"><Square size={14} /> {res.table}</div>
                      <div className="flex items-center gap-1 ml-auto font-mono text-emerald-400">{res.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
// --- END KATUTA MODULE ---


function App() {
  const [agents, setAgents] = useState([])
  const [logs, setLogs] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [processingId, setProcessingId] = useState(null)
  const [selectedAgent, setSelectedAgent] = useState(null)

  useEffect(() => {
    const fetchBrainStatus = async () => {
      try {
        const response = await fetch('http://localhost:5678/webhook/nexus/status')
        const data = await response.json()

        setAgents(data.agents || [])
        if (data.latestLog) {
          setLogs(prev => {
            if (prev.length > 0 && prev[0].message === data.latestLog.message) return prev;
            return [data.latestLog, ...prev].slice(0, 15)
          })
        }
        setIsConnected(true)
      } catch (error) {
        if (isConnected) console.error("Connection lost to Nexus Brain:", error)
        setIsConnected(false)
      }
    }
    const interval = setInterval(fetchBrainStatus, 2000)
    fetchBrainStatus()
    return () => clearInterval(interval)
  }, [isConnected])

  const handleCommand = (command, agentId = null) => {
    if (command === 'MANAGE_MODULE') {
      const agent = agents.find(a => a.id === agentId)
      setSelectedAgent(agent)
      return
    }

    setProcessingId(agentId || 'global')
    setTimeout(() => {
      const actionMsg = agentId ? `Sending ${command} to #${agentId}...` : `Initiating ${command}...`
      setLogs(prev => [{ timestamp: new Date().toISOString(), message: `[COMMAND] ${actionMsg}`, level: 'CMD' }, ...prev])
      alert(`COMMAND EXECUTED:\n${actionMsg}`)
      setProcessingId(null)
    }, 500)
  }

  // --- RENDER MODULE VIEW OR DASHBOARD ---
  if (selectedAgent && selectedAgent.type === 'CORE') {
    return <KatutaModule onBack={() => setSelectedAgent(null)} agentData={selectedAgent.data} />
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500/30">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800/50 border-r border-slate-700/50 p-4 flex flex-col backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-10 text-emerald-400">
          <div className="p-2 bg-emerald-500/10 rounded-lg"><Activity size={24} /></div>
          <div><h1 className="text-xl font-bold tracking-tight">NEXUS</h1><p className="text-xs text-slate-500 font-mono">V1.0.0 BETA</p></div>
        </div>
        <nav className="space-y-1 flex-1">
          <div className="p-3 bg-slate-700/50 rounded-lg flex items-center gap-3 text-sm font-medium border border-slate-600/50 text-emerald-100"><Bot size={18} /> Agents</div>
          <div className="p-3 hover:bg-slate-700/30 rounded-lg flex items-center gap-3 text-sm font-medium text-slate-400 cursor-pointer"><Terminal size={18} /> Logs</div>
        </nav>
        <div className="pt-4 border-t border-slate-700/50">
          <div className={`flex items-center gap-2 text-xs font-mono px-2 py-1.5 rounded transition-colors duration-500 ${isConnected ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {isConnected ? <Wifi size={14} /> : <WifiOff size={14} />} {isConnected ? 'BRAIN CONNECTED' : 'BRAIN OFFLINE'}
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-1 p-8 overflow-hidden flex flex-col">
        <header className="flex justify-between items-center mb-8 shrink-0">
          <div><h2 className="text-2xl font-semibold text-white">Command Center</h2><p className="text-slate-400 text-sm">Orchestrating autonomous agents</p></div>
          <div className="flex gap-3"><div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 text-xs font-mono text-slate-400 flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>{isConnected ? 'LIVE FEED' : 'NO SIGNAL'}</div></div>
        </header>

        <div className="grid grid-cols-12 gap-6 h-full overflow-hidden">
          <div className="col-span-8 overflow-auto pr-2 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!isConnected && agents.length === 0 && (
                <div className="col-span-2 p-10 text-center text-slate-500 border-2 border-dashed border-slate-700 rounded-xl">
                  <Activity size={48} className="mx-auto mb-4 opacity-50 animate-bounce" />
                  <h3 className="text-lg font-medium text-slate-400">Searching for Brain Signal...</h3>
                </div>
              )}
              {agents.map(agent => (
                <div key={agent.id} className={`group backdrop-blur border transition-all rounded-xl p-5 shadow-lg relative overflow-hidden ${agent.type === 'CORE' ? 'bg-emerald-900/10 border-emerald-500/50 hover:border-emerald-400' : 'bg-slate-800/80 border-slate-700 hover:border-emerald-500/50'}`}>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className={`p-2.5 rounded-lg ${agent.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700/50 text-slate-400'}`}>
                      {agent.type === 'CORE' ? <Activity size={24} /> : <Bot size={24} />}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${agent.status === 'active' ? 'bg-emerald-500 text-slate-900' : 'bg-slate-700 text-slate-400'}`}>{agent.status}</div>
                  </div>
                  <h3 className="font-bold text-lg mb-1 flex items-center gap-2">{agent.name} {agent.type === 'CORE' && <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">MODULE</span>}</h3>
                  <p className="text-sm text-slate-400 mb-6 font-mono h-5 truncate">{agent.task}</p>
                  <div className="flex gap-2 relative z-10">
                    <button onClick={() => handleCommand(agent.type === 'CORE' ? 'MANAGE_MODULE' : 'STOP', agent.id)} disabled={processingId === agent.id} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${agent.type === 'CORE' ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-slate-700 hover:bg-emerald-600 hover:text-white'}`}>
                      {processingId === agent.id ? <Activity size={14} className="animate-spin" /> : (agent.type === 'CORE' ? <Settings size={14} /> : <Pause size={14} />)}
                      {processingId === agent.id ? 'PROCESSING...' : (agent.type === 'CORE' ? 'MANAGE' : 'STOP')}
                    </button>
                    <button onClick={() => handleCommand('DEBUG', agent.id)} className="px-3 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"><Terminal size={14} /></button>
                  </div>
                </div>
              ))}
              <div onClick={() => handleCommand('DEPLOY_NEW_AGENT')} className="border-2 border-slate-700 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-800/50 hover:text-emerald-400 hover:border-emerald-500/50 cursor-pointer transition-all h-[200px] active:scale-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-3 shadow-inner">{processingId === 'global' ? <Activity size={24} className="animate-spin" /> : <Plus size={24} />}</div>
                <span className="text-sm font-bold tracking-wide">{processingId === 'global' ? 'DEPLOYING...' : 'DEPLOY NEW AGENT'}</span>
              </div>
            </div>
          </div>
          <div className="col-span-4 bg-black/40 rounded-xl border border-slate-700/50 flex flex-col relative overflow-hidden backdrop-blur-sm h-[calc(100vh-200px)]">
            <div className="p-3 border-b border-slate-700/50 bg-slate-900/50 flex justify-between items-center text-xs font-mono text-slate-400"><span className="flex items-center gap-2"><Terminal size={12} /> SYSTEM LOGS</span><span className="text-emerald-500/50">v1.0.2</span></div>
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-3 font-medium scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {logs.map((log, index) => (
                <div key={index} className={`flex gap-3 ${log.level === 'CMD' ? 'text-blue-400 bg-blue-500/10 p-1 rounded' : 'text-emerald-400/90'}`}><span className="text-slate-600 opacity-50">[{new Date(log.timestamp).toLocaleTimeString()}]</span><span>{log.level === 'CMD' && <span className="font-bold mr-2">CMD:</span>}{log.message}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
