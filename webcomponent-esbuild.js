
const esbuild = require("esbuild");
const { execSync } = require('child_process');

module.exports.buildSiteHeader = async () => {
    console.log('Building Web Component for header...');
    // 定义输入和输出路径，方便管理
    const TAILWIND_INPUT = 'src/styles/main.css'; // 您的 tailwindcss 主入口
    // const TAILWIND_OUTPUT = '_site/styles.css'; // 最终输出的 CSS 文件

    // 1. 生成完整的 Tailwind CSS 文件
    console.log('Generating Tailwind CSS...');
    // execSync(`npx tailwindcss -i ${TAILWIND_INPUT} -o ${TAILWIND_OUTPUT} --minify`);

    // 2. 读取刚刚生成的 CSS 内容为字符串
    const cssContent = execSync(
      `npx tailwindcss -i ${TAILWIND_INPUT} --minify`,
      { encoding: 'utf8' }
    );

    await esbuild.build({
      entryPoints: ['src/webcomponents/site-header.js'], // 入口文件
      bundle: true,                               // 将所有依赖打包成一个文件
      outfile: '_site/js/site-header.js',         // 输出路径
      sourcemap: process.env.ELEVENTY_ENV !== 'production', // 开发时生成 sourcemap
      minify: process.env.ELEVENTY_ENV === 'production',    // 生产环境时压缩
            // 将 CSS 字符串定义为一个可在 JS 中访问的全局常量
      define: {
        'COMPONENT_STYLES': JSON.stringify(cssContent)
      }

    }).catch((err) => {
        console.error(err);
        process.exit(1);
    });
    console.log('Web Component build complete. ', '_site/js/site-header.js' );
  }
