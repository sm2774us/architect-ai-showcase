import { describe, it, expect } from 'vitest';
import {
  initialAgents,
  mockIncidentsList,
  mockCmdbList,
  initialPolicies,
  skillKitList,
  mcpToolsCatalog,
  interviewScenarios,
  candidateProfile,
} from '../../src/data/mockData';

describe('ServiceNow Enterprise Mock Data Suite', () => {
  it('should export valid initialAgents with all required attributes', () => {
    expect(initialAgents.length).toBeGreaterThanOrEqual(5);
    initialAgents.forEach((agent) => {
      expect(agent.id).toBeDefined();
      expect(agent.name).toBeDefined();
      expect(agent.role).toBeDefined();
      expect(agent.model).toBeDefined();
      expect(Array.isArray(agent.tools)).toBe(true);
      expect(agent.confidence).toBeGreaterThan(0);
    });
  });

  it('should export valid mockIncidentsList', () => {
    expect(mockIncidentsList.length).toBeGreaterThanOrEqual(3);
    mockIncidentsList.forEach((inc) => {
      expect(inc.sys_id).toMatch(/^INC/);
      expect(inc.priority).toBeDefined();
      expect(inc.short_description).toBeDefined();
    });
  });

  it('should export valid mockCmdbList with tiering and CI classes', () => {
    expect(mockCmdbList.length).toBeGreaterThanOrEqual(4);
    mockCmdbList.forEach((ci) => {
      expect(ci.sys_id).toBeDefined();
      expect(ci.name).toBeDefined();
      expect(ci.tier).toBeDefined();
      expect(ci.environment).toBe('Production');
    });
  });

  it('should export valid initialPolicies with categories and enforcement types', () => {
    expect(initialPolicies.length).toBeGreaterThanOrEqual(4);
    initialPolicies.forEach((pol) => {
      expect(pol.id).toMatch(/^POL-/);
      expect(pol.name).toBeDefined();
      expect(pol.category).toBeDefined();
      expect(pol.enforcement).toBeDefined();
      expect(pol.status).toBe('Active');
    });
  });

  it('should export valid skillKitList with glide scripts and schemas', () => {
    expect(skillKitList.length).toBeGreaterThanOrEqual(2);
    skillKitList.forEach((skill) => {
      expect(skill.id).toBeDefined();
      expect(skill.targetTable).toBeDefined();
      expect(skill.systemPrompt).toBeDefined();
      expect(skill.outputSchema).toBeDefined();
      expect(skill.glideScript).toContain('GlideRecord');
    });
  });

  it('should export valid mcpToolsCatalog conforming to MCP tool spec', () => {
    expect(mcpToolsCatalog.length).toBeGreaterThanOrEqual(4);
    mcpToolsCatalog.forEach((tool) => {
      expect(tool.name).toBeDefined();
      expect(tool.description).toBeDefined();
      expect(tool.inputSchema).toBeDefined();
      expect(tool.category).toBeDefined();
    });
  });

  it('should export valid interviewScenarios with staff-level answers and points', () => {
    expect(interviewScenarios.length).toBeGreaterThanOrEqual(5);
    interviewScenarios.forEach((scen) => {
      expect(scen.id).toBeDefined();
      expect(scen.question).toBeDefined();
      expect(scen.category).toBeDefined();
      expect(scen.staffLevelKeyPoints.length).toBeGreaterThan(0);
      expect(scen.suggestedAnswer).toBeDefined();
    });
  });

  it('should export valid candidateProfile with certifications and skills matrix', () => {
    expect(candidateProfile.targetRole).toContain('Staff AI Engineer');
    expect(candidateProfile.experienceYears).toBeGreaterThanOrEqual(8);
    expect(candidateProfile.certifications.length).toBeGreaterThanOrEqual(4);
    expect(candidateProfile.skillsMatrix.serviceNowCore).toContain('AI Agent Studio');
    expect(candidateProfile.skillsMatrix.agenticAi).toContain('Model Context Protocol (MCP)');
  });
});
