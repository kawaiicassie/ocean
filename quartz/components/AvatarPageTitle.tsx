import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { pathToRoot } from "../util/path"
interface Options {
  avatarPath: string
}

const defaultOptions: Options = {
  avatarPath: "./static/avatar.jpg",
}

/**
 * A component that renders a page title with an avatar.
 *
 * The avatar is sourced from the `avatarPath` option, which is a path relative to the site root.
 * The page title is sourced from the `pageTitle` option or the `i18n` default.
 *
 * @param fileData - a file object with a slug property
 * @param cfg - a global configuration object
 * @param displayClass - a class to add to the root element
 * @returns a JSX element
 */
const AvatarPageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const options: Options = { ...defaultOptions }
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const avatarSrc = baseDir + options.avatarPath.replace(/^\//, "")

  return (
    <div class={classNames(displayClass, "avatar-page-title")}>
      <img src={avatarSrc} alt="Avatar" class="avatar-image" />
      <h2 class="page-title">
        <a href={baseDir}>{title}</a>
      </h2>
    </div>
  )
}

AvatarPageTitle.css = `
.avatar-page-title {
  display: flex;
  align-items: center;
  gap: 10px; /* Khoảng cách giữa avatar và tiêu đề */
}

.avatar-image {
  width: 50px; /* Kích thước avatar */
  height: 50px;
  border-radius: 10px; /* Làm tròn avatar */
  object-fit: cover;
}

.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
`

export default (() => {
  return AvatarPageTitle
}) satisfies QuartzComponentConstructor
