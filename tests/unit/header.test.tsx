import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../../src/components/Header';

describe('Header Component', () => {
  it('renders branding and all navigation tabs', () => {
    const setActiveTab = vi.fn();
    const onRunDemoIncident = vi.fn();

    render(
      <Header
        activeTab="agent-studio"
        setActiveTab={setActiveTab}
        onRunDemoIncident={onRunDemoIncident}
        isExecutingDemo={false}
      />
    );

    expect(screen.getByText(/ServiceNow Staff AI Engineer Suite/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /AI Agent Studio/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /AI Control Tower/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Skill Kit & Data Fabric/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /MCP & A2A Protocol/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /OpenTelemetry/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /LLM & Cloud Hybrid/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Staff AI Leadership & Defense/i })
    ).toBeInTheDocument();
  });

  it('triggers setActiveTab when a navigation tab is clicked', () => {
    const setActiveTab = vi.fn();
    const onRunDemoIncident = vi.fn();

    render(
      <Header
        activeTab="agent-studio"
        setActiveTab={setActiveTab}
        onRunDemoIncident={onRunDemoIncident}
        isExecutingDemo={false}
      />
    );

    const controlTowerTab = screen.getByRole('button', { name: /AI Control Tower/i });
    fireEvent.click(controlTowerTab);
    expect(setActiveTab).toHaveBeenCalledWith('control-tower');

    const mcpTab = screen.getByRole('button', { name: /MCP & A2A Protocol/i });
    fireEvent.click(mcpTab);
    expect(setActiveTab).toHaveBeenCalledWith('mcp-a2a');
  });

  it('renders button in idle state and triggers onRunDemoIncident', () => {
    const setActiveTab = vi.fn();
    const onRunDemoIncident = vi.fn();

    render(
      <Header
        activeTab="agent-studio"
        setActiveTab={setActiveTab}
        onRunDemoIncident={onRunDemoIncident}
        isExecutingDemo={false}
      />
    );

    const button = screen.getByRole('button', { name: /Simulate P1 Agentic Remediation/i });
    expect(button).not.toBeDisabled();
    fireEvent.click(button);
    expect(onRunDemoIncident).toHaveBeenCalledTimes(1);
  });

  it('renders button in executing disabled state', () => {
    const setActiveTab = vi.fn();
    const onRunDemoIncident = vi.fn();

    render(
      <Header
        activeTab="control-tower"
        setActiveTab={setActiveTab}
        onRunDemoIncident={onRunDemoIncident}
        isExecutingDemo={true}
      />
    );

    const button = screen.getByRole('button', { name: /Orchestrating P1 Autonomous Triage/i });
    expect(button).toBeDisabled();
  });

  it('renders distinct active tab styling for non-default tabs', () => {
    const setActiveTab = vi.fn();
    const onRunDemoIncident = vi.fn();

    const { rerender } = render(
      <Header
        activeTab="staff-leadership"
        setActiveTab={setActiveTab}
        onRunDemoIncident={onRunDemoIncident}
        isExecutingDemo={false}
      />
    );

    expect(
      screen.getByRole('button', { name: /Staff AI Leadership & Defense/i })
    ).toBeInTheDocument();

    rerender(
      <Header
        activeTab="llm-architecture"
        setActiveTab={setActiveTab}
        onRunDemoIncident={onRunDemoIncident}
        isExecutingDemo={false}
      />
    );
    expect(screen.getByRole('button', { name: /LLM & Cloud Hybrid/i })).toBeInTheDocument();
  });
});
