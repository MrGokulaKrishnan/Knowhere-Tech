import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, RotateCcw } from 'lucide-react';

const QUICK_COMMANDS = [
  'ls -la', 'pwd', 'whoami', 'java -version', 'docker ps', 
  'git status', 'cat pom.xml', 'curl /api/health', 'top', 'df -h'
];

const COMMANDS: Record<string, string | React.ReactNode> = {
  help: 'Available commands:\n- pwd          : Print working directory\n- ls -la       : List all files and permissions\n- whoami       : Show current user\n- java -version: Show installed Java runtime\n- docker ps    : List active containers\n- uname -a     : Show kernel and OS release\n- git status   : Show working tree status\n- git log --oneline : Show commit history\n- cat pom.xml  : Show maven config\n- cat application.yml: Show spring config\n- mvn test     : Run tests\n- curl /api/health : Health check\n- df -h        : Show disk usage\n- top          : Show processes\n- echo [arg]   : Echo back the argument\n- date         : Show current date\n- env          : Show environment variables\n- clear        : Clear terminal screen',
  pwd: '/home/developer/knowhere-tech/java-fullstack',
  'ls -la': (
    <span>
      total 56<br />
      drwxr-xr-x  6 dev dev 4096 Aug 17 08:00 <span className="text-cyan-400 font-bold">.</span><br />
      drwxr-xr-x 18 dev dev 4096 Aug 17 07:45 <span className="text-cyan-400 font-bold">..</span><br />
      -rw-r--r--  1 dev dev  820 Aug 17 08:00 pom.xml<br />
      drwxr-xr-x  4 dev dev 4096 Aug 17 08:00 <span className="text-cyan-400 font-bold">src</span><br />
      -rwxr-xr-x  1 dev dev  420 Aug 17 08:00 <span className="text-emerald-400 font-bold">Dockerfile</span><br />
      -rw-r--r--  1 dev dev  680 Aug 17 08:00 compose.yml<br />
      -rw-r--r--  1 dev dev 1240 Aug 17 08:00 application.yml
    </span>
  ),
  whoami: 'developer (uid=1000 gid=1000 groups=sudo,docker,developers)',
  'java -version': 'openjdk version "25-ea" LTS\nOpenJDK Runtime Environment (build 25-ea+12-LTS)\nOpenJDK 64-Bit Server VM (build 25-ea+12-LTS, mixed mode, sharing)',
  'docker ps': 'CONTAINER ID   IMAGE                 COMMAND                  PORTS                    NAMES\n8a21fbc34d12   mysql:8.4             "docker-entrypoint.s…"   0.0.0.0:3306->3306/tcp   mysql-production\n9b12dda81234   redis:alpine          "docker-entrypoint.s…"   0.0.0.0:6379->6379/tcp   redis-cluster-cache\n4c88f121a990   knowhere-api:latest   "java -jar app.jar"      0.0.0.0:8080->8080/tcp   backend-service',
  'uname -a': 'Linux knowhere-node-01 6.8.0-generic #28-Ubuntu SMP x86_64 GNU/Linux',
  'git status': 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git restore <file>..." to discard changes in working directory)\n\tmodified:   src/main/java/com/knowhere/api/UserController.java\n\tmodified:   pom.xml\n\nno changes added to commit (use "git add" and/or "git commit -a")',
  'git log --oneline': 'a1b2c3d (HEAD -> main, origin/main) feat: add user authentication endpoints\n8f9e0d1 fix: resolve caching issue in Redis config\n4b5c6d7 chore: bump spring-boot-starter-parent to 3.2.0\n9a8b7c6 docs: update API swagger documentation\n1234567 init: initial project setup',
  'cat pom.xml': '<?xml version="1.0" encoding="UTF-8"?>\n<project xmlns="http://maven.apache.org/POM/4.0.0">\n  <modelVersion>4.0.0</modelVersion>\n  <groupId>com.knowhere</groupId>\n  <artifactId>api</artifactId>\n  <version>1.0.0-SNAPSHOT</version>\n  <parent>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-parent</artifactId>\n    <version>3.2.0</version>\n  </parent>\n</project>',
  'cat application.yml': 'server:\n  port: 8080\nspring:\n  datasource:\n    url: jdbc:mysql://localhost:3306/knowhere\n    username: root\n    password: ${DB_PASSWORD}\n  data:\n    redis:\n      host: localhost\n      port: 6379',
  'mvn test': '[INFO] Scanning for projects...\n[INFO] \n[INFO] ----------------------< com.knowhere:api >----------------------\n[INFO] Building api 1.0.0-SNAPSHOT\n[INFO] --------------------------------[ jar ]---------------------------------\n[INFO] \n[INFO] --- maven-surefire-plugin:3.1.2:test (default-test) @ api ---\n[INFO] Using auto detected provider org.apache.maven.surefire.junitplatform.JUnitPlatformProvider\n[INFO] \n[INFO] -------------------------------------------------------\n[INFO]  T E S T S\n[INFO] -------------------------------------------------------\n[INFO] Running com.knowhere.api.UserControllerTest\n[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 1.204 s\n[INFO] \n[INFO] Results:\n[INFO] \n[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0\n[INFO] \n[INFO] ------------------------------------------------------------------------\n[INFO] BUILD SUCCESS\n[INFO] ------------------------------------------------------------------------',
  'curl localhost:8080/api/health': '{"status":"UP","components":{"db":{"status":"UP"},"redis":{"status":"UP"}}}',
  'curl /api/health': '{"status":"UP","components":{"db":{"status":"UP"},"redis":{"status":"UP"}}}',
  'df -h': 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/root        50G   32G   16G  67% /\ntmpfs           7.8G     0  7.8G   0% /dev/shm\ntmpfs           3.2G  1.5M  3.2G   1% /run\n/dev/sda1       256M  120M  136M  47% /boot/efi',
  top: 'top - 18:58:24 up 14 days,  2:30,  1 user,  load average: 0.45, 0.52, 0.58\nTasks: 124 total,   1 running, 123 sleeping,   0 stopped,   0 zombie\n%Cpu(s):  4.2 us,  1.8 sy,  0.0 ni, 93.8 id,  0.2 wa,  0.0 hi,  0.0 si,  0.0 st\nMiB Mem :  15948.5 total,   2456.2 free,   8102.4 used,   5389.9 buff/cache\n\n    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n   1245 dev       20   0 4895120 842100  32100 S  12.5   5.2  45:12.30 java\n    842 dev       20   0  412100  54200  28100 S   4.2   0.3   8:45.10 node\n   2311 root      20   0   14500   4100   3200 R   0.5   0.0   0:00.15 top',
  date: new Date().toString(),
  env: 'USER=developer\nHOME=/home/developer\nSHELL=/bin/bash\nTERM=xterm-256color\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\nLANG=en_US.UTF-8\nJAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64',
};

export default function SimulatedLinuxTerminal() {
  const [history, setHistory] = useState<Array<{ cmd: string; out: React.ReactNode }>>([
    { cmd: 'java -version', out: COMMANDS['java -version'] },
    { cmd: 'help', out: COMMANDS['help'] }
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdString: string) => {
    const cleanCmd = cmdString.trim();
    if (!cleanCmd) return;

    if (cleanCmd.toLowerCase() === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    let output: React.ReactNode;
    
    if (cleanCmd.toLowerCase().startsWith('echo ')) {
      output = cleanCmd.substring(5);
    } else {
      output = COMMANDS[cleanCmd.toLowerCase()] || `bash: ${cleanCmd}: command not found. Type 'help' for available commands.`;
    }

    setHistory(prev => [...prev, { cmd: cleanCmd, out: output }]);
    setCmdHistory(prev => [cleanCmd, ...prev].slice(0, 20));
    setHistoryIndex(-1);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < cmdHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const prevIndex = historyIndex - 1;
        setHistoryIndex(prevIndex);
        setInput(cmdHistory[prevIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
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
            <div className="text-zinc-300 whitespace-pre-wrap pl-4 border-l-2 border-emerald-800/40 font-mono text-xs leading-relaxed">
              {h.out}
            </div>
          </div>
        ))}

        {/* Input Prompt Form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2.5 pt-2">
          <span className="text-emerald-400 font-bold shrink-0">dev@knowhere:~$</span>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'ls -la', 'docker ps', 'uname -a'..."
            className="flex-1 bg-transparent text-white outline-none text-xs placeholder:text-zinc-600 font-mono"
            autoFocus
          />
          <button type="submit" className="text-zinc-500 hover:text-emerald-400 transition-colors p-1">
            <Send size={14} />
          </button>
        </form>
        <div ref={endRef} />
      </div>

      {/* Quick Command Chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {QUICK_COMMANDS.map(cmd => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="text-[11px] font-mono px-3 py-1.5 rounded-full bg-[#0a140f] border border-emerald-900/30 text-emerald-400/80 hover:text-emerald-300 hover:bg-[#142a20] hover:border-emerald-700/50 transition-all"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
