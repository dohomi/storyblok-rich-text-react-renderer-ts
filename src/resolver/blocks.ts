import { CodeAttributes, HeadingAttributes, ImageAttributes } from '@marvr/storyblok-rich-text-types'
import { FunctionComponent, ReactNode, createElement } from 'react'

export type StoryblokRichtextContentType =
  | "heading"
  | "code_block"
  | "paragraph"
  | "blockquote"
  | "ordered_list"
  | "bullet_list"
  | "list_item"
  | "horizontal_rule"
  | "hard_break"
  | "image"
  | "blok";

const simpleNodeResolver = (element: string | FunctionComponent) => (children: ReactNode): JSX.Element | null =>
  children != null ? createElement(element, null, children) : null

const emptyNodeResolver = (element: string | FunctionComponent) => (): JSX.Element | null =>
  createElement(element)

export const defaultBlocksResolvers = {
  doc: simpleNodeResolver('div'),
  heading: (children: ReactNode, attrs: HeadingAttributes): JSX.Element | null =>
    createElement(`h${attrs.level}`, null, children),
  code_block: (children: ReactNode, attrs: CodeAttributes): JSX.Element | null =>
    createElement('pre', null, createElement('code', { className: attrs.class }, children)),
  image: (children: ReactNode, attrs: ImageAttributes): JSX.Element | null =>
    createElement('img', attrs, children),
  paragraph: simpleNodeResolver('p'),
  blockquote: simpleNodeResolver('blockquote'),
  ordered_list: simpleNodeResolver('ol'),
  bullet_list: simpleNodeResolver('ul'),
  list_item: simpleNodeResolver('li'),
  horizontal_rule: emptyNodeResolver('hr'),
  hard_break: emptyNodeResolver('br')
}
