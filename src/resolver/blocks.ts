import { CodeAttributes, HeadingAttributes, ImageAttributes } from '@marvr/storyblok-rich-text-types'
import React, { FunctionComponent, ReactNode } from 'react'

type BlockType =
  'doc' |
  'paragraph' |
  'blockquote' |
  'ordered_list' |
  'bullet_list' |
  'list_item'

const simpleNodeResolver = (element: string | FunctionComponent) => (children: React.ReactNode) =>
  children != null ? React.createElement(element, null, children) : null

const emptyNodeResolver = (element: string | FunctionComponent) => () =>
  React.createElement(element)

type GenericBlockResolver = {
  [key in BlockType]: (children: ReactNode) => ReactNode
}

export type BlockResolvers = GenericBlockResolver & {
  code_block: (children: ReactNode, attrs: CodeAttributes) => ReactNode
  image: (children: ReactNode, attrs: ImageAttributes) => ReactNode
  heading: (children: ReactNode, attrs: HeadingAttributes) => ReactNode
  horizontal_rule: () => ReactNode
  hard_break: () => ReactNode
}

export const defaultBlocksResolvers: BlockResolvers = {
  doc: simpleNodeResolver('div'),
  heading: (children: React.ReactNode, attrs: HeadingAttributes) =>
    React.createElement(`h${attrs.level}`, null, children),
  code_block: (children: React.ReactNode, attrs: CodeAttributes) => {
    return React.createElement('pre', null, React.createElement('code', { className: attrs.class }, children))
  },
  image: (children: React.ReactNode, attrs: ImageAttributes) =>
    React.createElement('img', attrs, children),
  paragraph: simpleNodeResolver('p'),
  blockquote: simpleNodeResolver('blockquote'),
  ordered_list: simpleNodeResolver('ol'),
  bullet_list: simpleNodeResolver('ul'),
  list_item: simpleNodeResolver('li'),
  horizontal_rule: emptyNodeResolver('hr'),
  hard_break: emptyNodeResolver('br')
}
