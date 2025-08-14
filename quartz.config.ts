import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "The Ocean",
    pageTitleSuffix: " - cherrybie",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "vi-VN",
    baseUrl: "kawaiicassie.github.io/ocean",
    ignorePatterns: ["private", "templates", ".obsidian", "content/*/Index.md", "docs"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Alegreya",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#faf4ed", //base
          lightgray: "#f2e9e1", //overlay
          gray: "#907aa9", //highlight background
          darkgray: "#575279", //text
          dark: "#907aa9", //overlay
          secondary: "#b4637a", //rose
          tertiary: "#9893a5", //muted
          highlight: "rgb(223, 218, 217)", //hl medium
          textHighlight: "#56949f", //foam
        },
        darkMode: {
          light: "#191724",
          lightgray: "#26233a",
          gray: "#c4a7e7",
          darkgray: "#e0def4",
          dark: "#c4a7e7",
          secondary: "#eb6f92",
          tertiary: "#6e6a86",
          highlight: "rgb(64, 61, 82)",
          textHighlight: "#9ccfd8",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
