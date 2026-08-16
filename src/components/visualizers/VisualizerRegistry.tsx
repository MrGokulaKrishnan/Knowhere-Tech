import React from 'react';
import JvmCompilationVisualizer from './JvmCompilationVisualizer';
import OopInheritanceVisualizer from './OopInheritanceVisualizer';
import DsaSortingVisualizer from './DsaSortingVisualizer';
import SqlJoinVisualizer from './SqlJoinVisualizer';
import GitWorkflowVisualizer from './GitWorkflowVisualizer';
import RestLifecycleVisualizer from './RestLifecycleVisualizer';
import SimulatedLinuxTerminal from './SimulatedLinuxTerminal';

interface VisualizerProps {
  id?: string;
}

export default function VisualizerRegistry({ id }: VisualizerProps) {
  if (!id) return null;

  switch (id) {
    case 'jvm-compilation':
    case 'java-intro':
      return <JvmCompilationVisualizer />;
    case 'oop-inheritance':
    case 'oop-polymorphism':
      return <OopInheritanceVisualizer />;
    case 'dsa-sorting':
    case 'dsa-array':
      return <DsaSortingVisualizer />;
    case 'sql-joins':
    case 'sql-join':
      return <SqlJoinVisualizer />;
    case 'git-workflow':
      return <GitWorkflowVisualizer />;
    case 'rest-lifecycle':
    case 'spring-rest':
      return <RestLifecycleVisualizer />;
    case 'linux-terminal':
      return <SimulatedLinuxTerminal />;
    default:
      return <JvmCompilationVisualizer />;
  }
}
