// 智能高考志愿填报应用 - 主入口文件

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.177.0/http/file_server.ts";
import { join } from "https://deno.land/std@0.177.0/path/mod.ts";
import { aiService } from "./services/ai_service.js";

// 配置信息
const PORT = Deno.env.get("PORT") || 8000;
const API_KEY = Deno.env.get("API_KEY") || "123321"; // 生产环境应从环境变量获取
const API_URL = Deno.env.get("API_URL") || "https://dangbeichaohua.deno.dev/v1";
const MODEL = Deno.env.get("MODEL") || "deepseek-r1";

// 处理请求的主函数
async function handleRequest(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // 静态文件服务
  if (pathname === "/" || pathname === "/index.html") {
    return await serveFile(req, join(Deno.cwd(), "public", "index.html"));
  }
  
  if (pathname.startsWith("/static/")) {
    return await serveFile(
      req, 
      join(Deno.cwd(), "public", pathname.replace("/static/", ""))
    );
  }

  // API 路由
  if (pathname === "/api/recommend") {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "只支持POST请求" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const requestData = await req.json();
      const { score, interests, province } = requestData;
      
      // 调用AI服务获取推荐
      const recommendations = await aiService.getRecommendations(
        score, 
        interests, 
        province, 
        API_URL, 
        API_KEY, 
        MODEL
      );
      
      return new Response(JSON.stringify({ recommendations }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("处理推荐请求时出错:", error);
      return new Response(JSON.stringify({ error: "处理请求时出错" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // 查询院校信息
  if (pathname === "/api/university") {
    const universityName = url.searchParams.get("name");
    if (!universityName) {
      return new Response(JSON.stringify({ error: "缺少院校名称参数" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const universityInfo = await aiService.getUniversityInfo(
        universityName,
        API_URL,
        API_KEY,
        MODEL
      );
      
      return new Response(JSON.stringify({ universityInfo }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("获取院校信息时出错:", error);
      return new Response(JSON.stringify({ error: "获取院校信息时出错" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // 查询分数线
  if (pathname === "/api/score-line") {
    const universityName = url.searchParams.get("university");
    const province = url.searchParams.get("province");
    const year = url.searchParams.get("year");
    
    if (!universityName || !province) {
      return new Response(JSON.stringify({ error: "缺少必要参数" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const scoreLine = await aiService.getScoreLine(
        universityName,
        province,
        year,
        API_URL,
        API_KEY,
        MODEL
      );
      
      return new Response(JSON.stringify({ scoreLine }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("获取分数线信息时出错:", error);
      return new Response(JSON.stringify({ error: "获取分数线信息时出错" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // 风险评估
  if (pathname === "/api/risk-assessment") {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "只支持POST请求" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const requestData = await req.json();
      const { score, choices, province } = requestData;
      
      const riskAssessment = await aiService.getRiskAssessment(
        score,
        choices,
        province,
        API_URL,
        API_KEY,
        MODEL
      );
      
      return new Response(JSON.stringify({ riskAssessment }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("风险评估时出错:", error);
      return new Response(JSON.stringify({ error: "风险评估时出错" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // 高考位次查询
  if (pathname === "/api/rank-info") {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "只支持POST请求" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const requestData = await req.json();
      const { score, province, year } = requestData;
      
      const rankInfo = await aiService.getRankInfo(
        score,
        province,
        year,
        API_URL,
        API_KEY,
        MODEL
      );
      
      return new Response(JSON.stringify({ rankInfo }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("获取位次信息时出错:", error);
      return new Response(JSON.stringify({ error: "获取位次信息时出错" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // 404 - 未找到
  return new Response("找不到请求的资源", { status: 404 });
}

// 启动服务器
console.log(`服务器启动在 http://localhost:${PORT}`);
await serve(handleRequest, { port: Number(PORT) });