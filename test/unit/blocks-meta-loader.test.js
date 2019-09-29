import * as path from 'path'
import { BlocksMetaLoader } from '../../lib/utils/blocks/blocks-meta-loader'

const blocksDir = path.resolve(__dirname, '../fixtures/blocks')
const blocks = [
  {
    name: 'TextBlock',
    file: 'text-block.vue',
    props: {
      text: {
        type: 'text',
        default: '',
      },
      isDark: {
        type: 'checkbox',
        default: false,
      },
    },
  },
]

describe('BlocksMetaLoader', () => {
  test('check for load blocks meta', () => {
    const blocksMetaLoader = new BlocksMetaLoader(blocksDir)
    const loadedBlocks = blocksMetaLoader.load()

    expect(loadedBlocks).toHaveLength(blocks.length)
    expect(loadedBlocks).toEqual(blocks)
  })
})
