import React, { useState } from 'react';
import { Terminal, Send, RotateCcw } from 'lucide-react';

const COMMANDS: Record<string, string> = {
  help: 'Available commands:\n- pwd          : Print working directory\n- ls -la       : List all files and permissions\n- whoami       : Show current user\n- java -version: Show installed Java runtime\n- docker ps    : List active containers\n- uname -a     : Show kernel and OS release\n- clear        : Clear terminal screen',
  pwd: '/home/developer/knowhere-tech/java-fullstack-2027',
  'ls -la': 'total 56\ndrwxr-xr-x  6 dev dev 4096 Aug 17 08:00 .\ndrwxr-xr-x 18 dev dev 4096 Aug 17 07:45 ..\n-rw-r--r--  1 dev dev  820 Aug 17 08:00 pom.xml\ndrwxr-xr-x  4 dev dev 4096 Aug 17 08:00 src\n-rw-r--r--  1 dev dev  420 Aug 17 08:00 Dockerfile\n-rw-r--r--  1 dev dev  680 Aug 17 08:00 compose.yml\n-rw-r--r--  1 dev dev 1240 Aug 17 08:00 application.yml',
  whoami: 'developer (uid=1000 gid=1000 groups=sudo,docker,developers)',
  'java -version': 'openjdk version "25-ea" 2027-03-16\nOpenJDK Runtime Environment (build 25-ea+12-LTS)\nOpenJDK 64-Bit Server VM (build 25-ea+12-LTS, mixed mode, sharing)',
  'docker ps': 'CONTAINER ID   IMAGE                 COMMAND                  PORTS                    NAMES\n8a21fbc34d12   mysql:8.4             "docker-entrypoint.s…"   0.0.0.0:3306->3306/tcp   mysql-production\n9b12dda81234   redis:alpine          "docker-entrypoint.s…"   0.0.0.0:6379->6379/tcp   redis-cluster-cache\n4c88f121a990   knowhere-api:latest   "java -jar app.jar"      0.0.0.0:8080->8080/tcp   backend-service',
  'uname -a': 'Linux knowhere-node-01 6.8.0-generic #28-Ubuntu SMP x86_64 GNU/Linux'
};

export default function SimulatedLinuxTerminal() {
  const [history, setHistory] = useState<Array<{ cmd: string; out: string }>>([
    { cmd: 'java -version', out: COMMANDS['java -version'] },
    { cmd: 'help', out: COMMANDS['help'] }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = input.trim();
    if (!cleanCmd) return;

    if (cleanCmd.toLowerCase() === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const output = COMMANDS[cleanCmd.toLowerCase()] || `bash: ${cleanCmd}: command not found. Type 'help' for available commands.`;
    setHistory(prev => [...prev, { cmd: cleanCmd, out: output }]);
    setInput('');
  };

  return (
    <div className="panel p-6 lg:p-8 mb-8 font-mono rounded-3xl">
      <div className="flex items-center justify-between mb-4 border-b border-[#142a20] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs text-zinc-400 font-bold ml-2">bash — developer@knowhere-tech:~</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistory([{ cmd: 'help', out: COMMANDS['help'] }])}
            className="text-zinc-500 hover:text-white p-1 rounded transition-colors"
            title="Reset Terminal"
          >
            <RotateCcw size={14} />
          </button>
          <span className="text-xs text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-xl border border-emerald-800/50 font-mono font-bold">
            Interactive Bash CLI
          </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="bg-black rounded-2xl p-5 text-xs max-h-80 overflow-y-auto space-y-4 border border-[#142a20]">
        {history.map((h, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center gap-2.5 text-white">
              <span className="text-emerald-400 font-bold">dev@knowhere:~$</span>
              <span className="text-white font-semibold">{h.cmd}</span>
            </div>
            <pre className="text-zinc-300 whitespace-pre-wrap pl-4 border-l-2 border-emerald-800/40 font-mono text-xs leading-relaxed">
              {h.out}
            </pre>
          </div>
        ))}

        {/* Input Prompt Form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2.5 pt-2">
          <span className="text-emerald-400 font-bold shrink-0">dev@knowhere:~$</span>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type 'help', 'ls -la', 'docker ps', 'uname -a'..."
            className="flex-1 bg-transparent text-white outline-none text-xs placeholder:text-zinc-600 font-mono"
            autoFocus
          />
          <button type="submit" className="text-zinc-500 hover:text-emerald-400 transition-colors p-1">
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
