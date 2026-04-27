import { createContentLoader } from 'vitepress'

import { toGroupedFiles } from '../.vitepress/utils/files-loader'

export default createContentLoader('tech/**/*.md', {
  excerpt: true,
  transform(raw) {
    return toGroupedFiles(raw)
  },
})
