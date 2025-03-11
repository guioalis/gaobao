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
    console.log("\n=== 部署指南 ===\n");
    console.log("检测到部署权限问题，请按照以下步骤手动部署：");
    console.log("\n1. 安装deployctl：");
    console.log("   deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check -r -f https://deno.land/x/deploy/deployctl.ts");
    
    console.log("\n2. 登录Deno Deploy：");
    console.log("   deployctl login");
    
    console.log("\n3. 在Deno Deploy控制台创建新项目：");
    console.log("   a. 访问 https://dash.deno.com/projects");
    console.log("   b. 点击'New Project'按钮");
    console.log("   c. 选择'Empty Project'选项");
    console.log("   d. 输入项目名称，例如'college-advisor'");
    console.log("   e. 点击'Create'按钮完成创建");
    
    console.log("\n4. 部署应用：");
    console.log("   修改deno.json中的项目名称，然后运行：");
    console.log("   deno task deploy");
    console.log("   或者直接运行（替换'your-project-name'为您创建的项目名称）：");
    console.log("   deployctl deploy --project=your-project-name --prod main.ts");
    
    console.log("\n如果您遇到问题，请参考DEPLOY.md文件获取更多信息。");
    console.log("=== 部署指南结束 ===\n");
    
    // 询问是否修改deno.json中的项目名称
    console.log("是否需要修改deno.json中的项目名称？(y/n)");
    const buf = new Uint8Array(1);
    await Deno.stdin.read(buf);
    const input = new TextDecoder().decode(buf).trim().toLowerCase();
    
    if (input === 'y') {
      console.log("\n请输入您在Deno Deploy创建的项目名称：");
      const projectNameBuf = new Uint8Array(100);
      const bytesRead = await Deno.stdin.read(projectNameBuf);
      const projectName = new TextDecoder().decode(projectNameBuf.subarray(0, bytesRead)).trim();
      
      if (projectName) {
        try {
          // 读取deno.json
          const denoJsonPath = "./deno.json";
          const denoJsonContent = await Deno.readTextFile(denoJsonPath);
          const denoJson = JSON.parse(denoJsonContent);
          
          // 更新项目名称
          denoJson.tasks.deploy = `deployctl deploy --project=${projectName} --prod main.ts`;
          
          // 写回文件
          await Deno.writeTextFile(denoJsonPath, JSON.stringify(denoJson, null, 2));
          console.log(`\ndeno.json已更新，项目名称已设置为: ${projectName}`);
          
          // 询问是否尝试部署
          console.log("\n是否尝试使用deno task deploy命令直接部署？(y/n)");
          await Deno.stdin.read(buf);
          const deployInput = new TextDecoder().decode(buf).trim().toLowerCase();
          
          if (deployInput === 'y') {
            console.log("\n正在尝试部署...");
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
          console.error(`更新deno.json时出错: ${error.message}`);
          console.log("请手动修改deno.json文件中的项目名称。");
        }
      } else {
        console.log("未输入项目名称，请手动修改deno.json文件。");
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