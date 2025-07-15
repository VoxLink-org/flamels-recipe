// _components/site-header.js
import { LitElement, html, css, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { classMap } from 'lit/directives/class-map.js';

// 这是 Nunjucks 短代码 {% lucide "arrow-up-right" %} 的 SVG 等价物
// 我们直接把它放到组件里，实现自包含

const arrowUpRightIcon = unsafeHTML(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`);

const tailwindStyles = css`${unsafeCSS(COMPONENT_STYLES)}`;

class SiteHeader extends LitElement {
  // 1. 定义组件需要从外部接收的属性
  static properties = {
    sitePath: { type: String }, // 对应 {{ site.path }}
    pageUrl: { type: String },  // 对应 {{ page.url }}
  };

  // 2. 样式可以直接从您的 Tailwind/CSS 文件中获得，这里我们不添加额外样式
  static styles = tailwindStyles;

  constructor() {
    super();
    // 设置默认值
    this.sitePath = '/';
    this.pageUrl = '/';
  }

  // 3. 将 NJK 的 HTML 和逻辑翻译到 render 方法中
  render() {
    // 准备用于条件判断的 class
    const aboutClasses = {
      'text-sm': true, 'font-medium': true, 'text-muted-foreground': true, 'hover:text-primary': true,
      '!text-primary': this.pageUrl === '/docs/about/', // NJK: if page.url == '/docs/about/'
    };
    const blogsClasses = {
      'text-sm': true, 'font-medium': true, 'text-muted-foreground': true, 'hover:text-primary': true,
      '!text-primary': this.pageUrl.includes('/docs'), // NJK: if '/docs' in page.url
    };

    return html`
      <header class="border-b flex items-center gap-x-4 py-2 px-4 lg:py-3 lg:px-6 mx-auto sticky top-0 w-full bg-background z-50">
        <a class="inline-flex items-center" href="${this.sitePath}">
          <img class="max-sm:h-4 max-sm:w-4 h-5 w-5" src="${this.sitePath}/favicon-32x32.png" />
          <span class="hidden sm:inline-block ml-2 text-sm font-semibold">Flamel's recipe</span>
        </a>
        <a class="ml-auto ${classMap(aboutClasses)}" href="${this.sitePath}/docs/about/">
          About
        </a>
        <a class="${classMap(blogsClasses)}" href="${this.sitePath}/docs">
          Blogs
        </a>
        <a class="flex gap-x-1 items-center text-sm font-medium text-muted-foreground hover:text-primary" href="https://t.me/finance_tools_mcp" target="_blank">
          Telegram
          ${arrowUpRightIcon}
        </a>
      </header>
    `;
  }
}

customElements.define('site-header', SiteHeader);