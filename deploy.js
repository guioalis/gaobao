// 智能高考志愿填报应用 - 部署脚本

/**
 * 自动化部署流程
 * 1. 构建VuePress静态网站
 * 2. 提供部署指南
 */

async function deploy() {
  try {
    // 1. 构建VuePress静态网站
    console.log("正在构建VuePress静态网站...");
    const buildProcess = Deno.run({
      cmd: ["npm", "run", "docs:build"],
      stdout: "piped",
      stderr: "piped"
    });
    
    const buildStatus = await buildProcess.status();
    if (!buildStatus.success) {
      const errorOutput = new TextDecoder().decode(await buildProcess.stderrOutput());
      throw new Error(`VuePress静态网站构建失败: ${errorOutput}`);
    }
    
    console.log("VuePress静态网站构建成功！");
    
    // 2. 提供部署指南
    console.log("\n=== 部署指南 ===");
    console.log("检测到deployctl未正确安装，请按照以下步骤手动部署：");
    console.log("\n1. 安装deployctl：");
    console.log("   deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check -r -f https://deno.land/x/deploy/deployctl.ts");
    console.log("\n2. 登录Deno Deploy：");
    console.log("   deployctl login");
    console.log("\n3. 部署应用：");
    console.log("   deno task deploy");
    console.log("   或者直接运行：");
    console.log("   deployctl deploy --project=miaoge-gaobao-78 --prod main.ts");
    console.log("\n如果您遇到问题，请参考DEPLOY.md文件获取更多信息。");
    console.log("=== 部署指南结束 ===\n");
    
    // 询问是否尝试使用deno task deploy
    console.log("是否尝试使用deno task deploy命令直接部署？(y/n)");
    const buf = new Uint8Array(1);
    await Deno.stdin.read(buf);
    const input = new TextDecoder().decode(buf).trim().toLowerCase();
    
    if (input === 'y') {
      console.log("\n正在尝试使用deno task deploy部署...");
      const directDeployProcess = Deno.run({
        cmd: ["deno", "task", "deploy"],
        stdout: "piped",
        stderr: "piped"
      });
      
      const directDeployStatus = await directDeployProcess.status();
      if (!directDeployStatus.success) {
        const errorOutput = new TextDecoder().decode(await directDeployProcess.stderrOutput());
        console.error(`部署失败: ${errorOutput}`);
        console.log("请按照上述部署指南手动完成部署。");
      } else {
        console.log("部署成功！应用已发布到Deno Deploy平台。");
      }
    } else {
      console.log("请按照上述部署指南手动完成部署。");
    }
  } catch (error) {
    console.error(`部署过程中出错: ${error.message}`);
    Deno.exit(1);
  }
}

// 执行部署流程
deploy();