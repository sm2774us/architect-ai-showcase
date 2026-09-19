import { test, expect } from '@playwright/test';

test.describe('ServiceNow Staff AI Architect Platform E2E Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to local application root
    await page.goto('/');
  });

  test('loads home page with enterprise header and navigation tabs', async ({ page }) => {
    // Assert document title
    await expect(page).toHaveTitle(/ServiceNow AI Architect/i);

    // Verify main header title
    const headerTitle = page.locator('header h1');
    await expect(headerTitle).toContainText('ServiceNow');

    // Verify navigation tabs exist
    const tabs = [
      'Agent Studio',
      'Control Tower',
      'MCP & A2A Lab',
      'OpenTelemetry',
      'Skill Kits & Data Fabric',
      'Enterprise Architecture',
      'Staff Defense & Leadership',
    ];

    for (const tab of tabs) {
      const tabButton = page.getByRole('button', { name: tab });
      await expect(tabButton).toBeVisible();
    }
  });

  test('navigates seamlessly across major architectural modules', async ({ page }) => {
    // Navigate to Control Tower
    await page.getByRole('button', { name: 'Control Tower' }).click();
    await expect(page.locator('text=Enterprise AI Governance')).toBeVisible();

    // Navigate to MCP & A2A Lab
    await page.getByRole('button', { name: 'MCP & A2A Lab' }).click();
    await expect(page.locator('text=Model Context Protocol (MCP)')).toBeVisible();

    // Navigate to OpenTelemetry
    await page.getByRole('button', { name: 'OpenTelemetry' }).click();
    await expect(page.locator('text=Distributed Tracing')).toBeVisible();

    // Navigate to Enterprise Architecture
    await page.getByRole('button', { name: 'Enterprise Architecture' }).click();
    await expect(page.locator('text=Multi-Tier Hybrid LLM Topology')).toBeVisible();

    // Navigate to Staff Defense & Leadership
    await page.getByRole('button', { name: 'Staff Defense & Leadership' }).click();
    await expect(page.locator('text=Staff AI Architect Defense Simulator')).toBeVisible();
  });

  test('executes incident triage workflow in Agent Studio', async ({ page }) => {
    // Start at Agent Studio
    await page.getByRole('button', { name: 'Agent Studio' }).click();

    // Select the P1 Incident
    const incidentOption = page.locator('text=P1 - Global Payment Gateway Timeout');
    if (await incidentOption.isVisible()) {
      await incidentOption.click();
    }

    // Click execute agent button
    const executeBtn = page.getByRole('button', {
      name: /Run Staff AI Agent Pipeline|Run Agent Pipeline/i,
    });
    await expect(executeBtn).toBeVisible();
    await executeBtn.click();

    // Verify execution steps appear
    await expect(page.locator('text=Orchestration Execution Trace')).toBeVisible({
      timeout: 15000,
    });
  });

  test('interacts with MCP tool execution playground', async ({ page }) => {
    await page.getByRole('button', { name: 'MCP & A2A Lab' }).click();

    // Verify MCP tools list is populated
    await expect(page.locator('text=servicenow_cmdb_lookup')).toBeVisible();

    // Click Call Tool
    const callToolBtn = page.getByRole('button', { name: /Execute MCP Tool/i });
    if (await callToolBtn.isVisible()) {
      await callToolBtn.click();
      await expect(page.locator('text=JSON-RPC 2.0 Response')).toBeVisible({ timeout: 10000 });
    }
  });
});
