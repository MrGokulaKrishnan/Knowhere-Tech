import React, { useState } from 'react';
import { Package, Play, Layers } from 'lucide-react';

const DOCKER_LAYERS = [
  { id: 'app', title: 'Layer 4: Spring Boot Executable (.jar)', size: '42 MB', type: 'Writable Container Layer', desc: 'Application bytecode, configuration profiles, and embedded Tomcat runtime.' },
  { id: 'deps', title: 'Layer 3: Maven Dependencies Cache', size: '120 MB', type: 'Read-Only Layer', desc: 'Spring framework dependencies, Hibernate ORM, and Jackson JSON libraries.' },
  { id: 'jdk', title: 'Layer 2: Eclipse Temurin OpenJDK 25', size: '210 MB', type: 'Read-Only Layer', desc: 'Java Virtual Machine execution engine, garbage collector, and native JNI libraries.' },
  { id: 'os', title: 'Layer 1: Alpine Linux 3.20 Base Image', size: '7.8 MB', type: 'Read-Only Base Layer', desc: 'Minimal musl libc kernel boundary, package manager, and root file system.' },
];

export default function DockerArchitectureVisualizer() {
  const [selectedLayer, setSelectedLayer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [containerStatus, setContainerStatus] = useState<'stopped' | 'running'>('stopped');

  const startContainer = () => {
    setIsRunning(true);
    setTimeout(() => {
      setContainerStatus('running');
      setIsRunning(false);
    }, 1200);
  };

  const stopContainer = () => {
    setContainerStatus('stopped');
  };

  return (
    <div className="panel p-6 lg:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="eyebrow text-emerald-400 font-mono text-xs">
              Docker & Containerization Architecture
            </span>
          </div>
          <h3 className="text-lg lg:text-xl font-display font-bold text-white flex items-center gap-2.5">
            <Package size={22} className="text-emerald-400" />
            OCI Multi-Stage Image Layers & Container Runtime
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Explore Union File System (OverlayFS) layers, copy-on-write mechanics, and isolated namespace execution.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {containerStatus === 'stopped' ? (
            <button
              onClick={startContainer}
              disabled={isRunning}
              className="button-primary text-xs !py-2.5 !px-5"
            >
              <Play size={14} />
              <span>{isRunning ? 'Spinning Up...' : 'docker run -d -p 8080:8080'}</span>
            </button>
          ) : (
            <button
              onClick={stopContainer}
              className="button-secondary text-xs !py-2.5 !px-5 text-rose-300 hover:bg-rose-950/40 hover:border-rose-800"
            >
              <span>Stop Container</span>
            </button>
          )}
        </div>
      </div>

      {/* Container Status Banner */}
      <div className={`p-4 rounded-2xl border mb-6 flex items-center justify-between transition-all duration-300 ${
        containerStatus === 'running'
          ? 'bg-emerald-950/40 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
          : 'bg-black/60 border-[#142a20]'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${containerStatus === 'running' ? 'bg-emerald-400 animate-ping' : 'bg-zinc-600'}`} />
          <div>
            <p className="text-sm font-semibold text-white font-mono">
              Status: {containerStatus === 'running' ? 'Active Container (knowhere-api:latest)' : 'Container Idle'}
            </p>
            <p className="text-xs text-zinc-400 font-mono">
              Port Mapping: 0.0.0.0:8080 → 8080/tcp | Memory Limit: 512MB
            </p>
          </div>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-black/60 px-3 py-1 rounded-xl border border-[#142a20]">
          cgroups v2 + namespaces
        </span>
      </div>

      {/* Interactive Layer Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-3">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
            OverlayFS Image Layer Stack (Bottom to Top)
          </p>
          {DOCKER_LAYERS.map((layer, idx) => (
            <div
              key={layer.id}
              onClick={() => setSelectedLayer(idx)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                selectedLayer === idx
                  ? 'border-emerald-400 bg-emerald-950/60 shadow-[0_0_15px_rgba(16,185,129,0.25)] scale-[1.01]'
                  : 'border-[#142a20] bg-black hover:border-emerald-500/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white flex items-center gap-2 font-mono">
                  <Layers size={14} className={selectedLayer === idx ? 'text-emerald-400' : 'text-zinc-500'} />
                  {layer.title}
                </span>
                <span className="text-[11px] font-mono text-emerald-300 bg-[#050806] px-2 py-0.5 rounded-md border border-[#142a20]">
                  {layer.size}
                </span>
              </div>
              <p className="text-xs text-zinc-400">{layer.type}</p>
            </div>
          ))}
        </div>

        {/* Layer Deep Dive */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-black border border-[#142a20] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-[#142a20] pb-2">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                Layer Inspection
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">SHA256 Layer Hash</span>
            </div>

            <h4 className="font-bold text-white text-sm mb-2">
              {DOCKER_LAYERS[selectedLayer].title}
            </h4>

            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              {DOCKER_LAYERS[selectedLayer].desc}
            </p>

            <div className="p-3 rounded-xl bg-[#050806] border border-[#142a20] font-mono text-xs text-emerald-200">
              <p className="text-zinc-500 mb-1">// Dockerfile Directive:</p>
              <p>{selectedLayer === 0 ? 'COPY --from=builder /app/target/*.jar app.jar' : selectedLayer === 1 ? 'COPY pom.xml . && mvn dependency:go-offline' : selectedLayer === 2 ? 'FROM eclipse-temurin:25-jre-alpine' : 'FROM alpine:3.20'}</p>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#142a20] flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>Storage Driver: overlay2</span>
            <span className="text-emerald-400">Cached in Registry</span>
          </div>
        </div>
      </div>
    </div>
  );
}
