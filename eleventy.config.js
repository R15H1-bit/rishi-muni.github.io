import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import katex from "@vscode/markdown-it-katex";

const VIDEO = /\.(mp4|webm|mov)$/i;

// Turns any paragraph that contains only images into a figure (one image)
// or a side-by-side gallery (several images on consecutive lines).
// The image's "title" (the quoted text after the path) becomes the caption.
function mediaBlocks(md) {
  md.core.ruler.push("media_blocks", (state) => {
    const t = state.tokens;
    for (let i = 0; i < t.length - 2; i++) {
      if (t[i].type !== "paragraph_open" || t[i + 1].type !== "inline") continue;
      const kids = t[i + 1].children || [];
      const imgs = kids.filter((k) => k.type === "image");
      const onlyMedia = imgs.length > 0 && kids.every(
        (k) => k.type === "image" || k.type === "softbreak" || (k.type === "text" && !k.content.trim())
      );
      if (!onlyMedia) continue;
      t[i].type = "media_open";
      t[i].meta = { count: imgs.length };
      t[i + 2].type = "media_close";
      t[i + 1].children = imgs;
    }
  });

  md.renderer.rules.media_open = (tokens, idx) => {
    const n = tokens[idx].meta.count;
    return n === 1 ? `<div class="media media--single">\n` : `<div class="media media--gallery" style="--cols:${Math.min(n, 3)}">\n`;
  };
  md.renderer.rules.media_close = () => `</div>\n`;

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const tok = tokens[idx];
    const src = tok.attrGet("src");
    const alt = self.renderInlineAsText(tok.children, options, env);
    const caption = tok.attrGet("title");
    const esc = md.utils.escapeHtml;
    const media = VIDEO.test(src)
      ? `<video src="${esc(src)}" controls playsinline preload="metadata"${alt ? ` aria-label="${esc(alt)}"` : ""}></video>`
      : `<a class="zoom" href="${esc(src)}"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy"></a>`;
    return `<figure>${media}${caption ? `<figcaption>${md.renderInline(caption)}</figcaption>` : ""}</figure>`;
  };
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.amendLibrary("md", (md) => {
    md.set({ html: true, typographer: true });
    md.use(katex.default ?? katex, { throwOnError: false });
    md.use(mediaBlocks);
  });

  // Images, video, PDFs and CAD exports sitting next to a project's index.md are copied as-is.
  eleventyConfig.addPassthroughCopy("src/projects/**/*.{jpg,jpeg,png,gif,webp,svg,avif,mp4,webm,mov,pdf,stl,glb,step,zip}");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/files": "files" });
  // Self-hosted font and equation styles (no third-party requests).
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2": "assets/fonts/archivo.woff2",
    "node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-italic.woff2": "assets/fonts/archivo-italic.woff2",
    "node_modules/katex/dist/katex.min.css": "assets/katex/katex.min.css",
    "node_modules/katex/dist/fonts": "assets/katex/fonts",
  });

  eleventyConfig.addCollection("projects", (api) =>
    api.getFilteredByGlob("src/projects/*/index.md")
      .filter((p) => !p.data.draft)
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99) || b.date - a.date)
  );

  eleventyConfig.addFilter("byDiscipline", (projects, d) => projects.filter((p) => p.data.discipline === d));
  eleventyConfig.addFilter("longestWord", (s) => Math.max(...String(s).split(/\s+/).map((w) => w.length)));
  eleventyConfig.addFilter("year", (date) => new Date(date).getUTCFullYear());

  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
