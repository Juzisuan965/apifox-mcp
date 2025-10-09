#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";

const BASE_URL = "https://api.apifox.com";

const APIFOX_AUTH = process.env.APIFOX_AUTH || "";

const server = new McpServer({
  name: "apifox-mcp",
  version: "1.0.1",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// ... set up server resources, tools, and prompts ...
server.tool(
  "get_api_endpoint_info",
  "获取apifox的接口定义信息，数据符合OpenAPI 3.1规范。遇到例如：https://app.apifox.com/link/project/{projectId}/apis/api-{endpointId}的链接，请解析出projectId和endpointId，并调用本工具获取接口定义信息。",
  {
    projectId: z.number().describe("Apifox的项目ID"),
    endpointId: z.number().describe("接口Endpoint的ID"),
  },
  async ({ projectId, endpointId }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/v1/projects/${projectId}/export-openapi`,
        JSON.stringify({
          scope: {
            type: "SELECTED_ENDPOINTS",
            selectedEndpointIds: [endpointId],
          },
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "X-Apifox-Api-Version": "2024-03-28",
            Authorization: `Bearer ${APIFOX_AUTH}`,
          },
        }
      );
      return {
        content: [
          { type: "text", text: JSON.stringify(response.data, null, 2) },
        ],
      };
    } catch (error) {
      let errorMessage = "";
      if (axios.isAxiosError(error)) {
        errorMessage = JSON.stringify(error.response?.data, null, 2);
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = JSON.stringify(error, null, 2);
      }
      return {
        isError: true,
        content: [{ type: "text", text: errorMessage }],
      };
    }
  }
);

async function main(): Promise<void> {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Apifox MCP Server running");
  } catch (error: any) {
    throw error;
  }
}

main().catch((error: Error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
