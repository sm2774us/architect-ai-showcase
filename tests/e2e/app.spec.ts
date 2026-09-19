import { test, expect } from '@playwright/test';

test.describe('ServiceNow Staff AI Architect Platform E2E Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to application root
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('loads home page with enterprise header and navigation tabs', async ({ page }) => {
    // Assert document title matches enterprise metadata
    await expect(page).toHaveTitle(/ServiceNow Staff AI Engineer Showcase/i);

    // Verify main header title
    const headerTitle = page.locator('header h1');
    await expect(headerTitle).toContainText('ServiceNow Staff AI Engineer Suite');

    // Verify all 7 nav tabs exist by their specific IDs
    const tabIds = [
      '#nav-tab-agent-studio',
      '#nav-tab-control-tower',
      '#nav-tab-skill-kit-fabric',
      '#nav-tab-mcp-a2a',
      '#nav-tab-opentelemetry',
      '#nav-tab-llm-architecture',
      '#nav-tab-staff-leadership',
    ];

    for (const id of tabIds) {
      const tabButton = page.locator(id);
      await expect(tabButton).toBeVisible();
    }
  });

  test('navigates seamlessly across major architectural modules', async ({ page }) => {
    // Navigate to Control Tower
    await page.locator('#nav-tab-control-tower').click();
    await expect(
      page.getByText('Live AI Control Tower Policy Tester (Adversarial Sandbox)')
    ).toBeVisible();

    // Navigate to Skill Kit & Data Fabric
    await page.locator('#nav-tab-skill-kit-fabric').click();
    await expect(page.getByText('Enterprise Skill Kit & Workflow Data Fabric')).toBeVisible();

    // Navigate to MCP & A2A Lab
    await page.locator('#nav-tab-mcp-a2a').click();
    await expect(page.getByText('Model Context Protocol (MCP) Tool Executor')).toBeVisible();

    // Navigate to OpenTelemetry
    await page.locator('#nav-tab-opentelemetry').click();
    await expect(page.getByText('Distributed AI System Observability & Tracing')).toBeVisible();

    // Navigate to Enterprise Architecture
    await page.locator('#nav-tab-llm-architecture').click();
    await expect(page.getByText('LLM Architectures & Multi-Cloud Hybrid Routing')).toBeVisible();

    // Navigate to Staff Defense & Leadership
    await page.locator('#nav-tab-staff-leadership').click();
    await expect(
      page.getByText('Staff AI Engineer Qualifications & Architecture Defense')
    ).toBeVisible();
  });

  test('executes incident triage workflow in Agent Studio', async ({ page }) => {
    // Ensure on Agent Studio
    await page.locator('#nav-tab-agent-studio').click();

    // Verify input trigger exists
    const queryInput = page.locator('#input-agent-studio-query');
    await expect(queryInput).toBeVisible();

    // Click execute agent button
    const executeBtn = page.locator('#btn-trigger-agent-studio-run');
    await expect(executeBtn).toBeVisible();
    await executeBtn.click();

    // Ensure execution trace tab is active
    await page.locator('#tab-btn-execution-trace').click();

    // Verify execution steps or RCA summary appears
    await expect(page.getByText('Autonomous Root Cause Diagnosis (RCA)')).toBeVisible({
      timeout: 20000,
    });
  });

  test('interacts with MCP tool execution playground', async ({ page }) => {
    // Navigate to MCP Lab
    await page.locator('#nav-tab-mcp-a2a').click();

    // Verify MCP tool argument input exists
    const toolArgs = page.locator('#input-mcp-tool-arguments');
    await expect(toolArgs).toBeVisible();

    // Click Execute MCP Tool Call
    const callToolBtn = page.locator('#btn-execute-mcp-tool');
    await expect(callToolBtn).toBeVisible();
    await callToolBtn.click();

    // Verify JSON-RPC response appears
    await expect(page.getByText('Standard MCP Response Envelope')).toBeVisible({ timeout: 10000 });
  });
});
