import React from 'react';
import JvmCompilationVisualizer from './JvmCompilationVisualizer';
import OopInheritanceVisualizer from './OopInheritanceVisualizer';
import DsaSortingVisualizer from './DsaSortingVisualizer';
import SqlJoinVisualizer from './SqlJoinVisualizer';
import GitWorkflowVisualizer from './GitWorkflowVisualizer';
import RestLifecycleVisualizer from './RestLifecycleVisualizer';
import SimulatedLinuxTerminal from './SimulatedLinuxTerminal';
import ReactReconciliationVisualizer from './ReactReconciliationVisualizer';
import DockerArchitectureVisualizer from './DockerArchitectureVisualizer';

interface VisualizerProps {
  id?: string;
}

export default function VisualizerRegistry({ id }: VisualizerProps) {
  if (!id) return null;

  switch (id) {
    case 'jvm-compilation':
    case 'java-compilation':
    case 'java-jvm':
      return <JvmCompilationVisualizer />;

    case 'oop-inheritance':
    case 'oop-polymorphism':
    case 'oop-abstraction':
      return <OopInheritanceVisualizer />;

    case 'dsa-sorting':
    case 'dsa-array':
    case 'dsa-algorithms':
      return <DsaSortingVisualizer />;

    case 'sql-joins':
    case 'sql-join':
    case 'sql-query':
      return <SqlJoinVisualizer />;

    case 'git-workflow':
    case 'git-branching':
      return <GitWorkflowVisualizer />;

    case 'rest-lifecycle':
    case 'rest-api':
    case 'spring-rest':
    case 'spring-boot':
      return <RestLifecycleVisualizer />;

    case 'linux-terminal':
    case 'simulated-terminal':
    case 'bash':
      return <SimulatedLinuxTerminal />;

    case 'react-reconciliation':
    case 'react-lifecycle':
    case 'react-components':
    case 'react-state':
      return <ReactReconciliationVisualizer />;

    case 'docker-architecture':
    case 'docker-container':
    case 'docker-compose':
      return <DockerArchitectureVisualizer />;

    default:
      return null;
  }
}
