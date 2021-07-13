import { LinkAttributes, StyledAttributes } from '@marvr/storyblok-rich-text-types'
import React, { FunctionComponent, ReactNode } from 'react'


const simpleMarkResolver = (element: string | FunctionComponent) => (children: React.ReactNode) =>
  React.createElement(element, null, children)

type MarkType = 'bold' |
  'strong' |
  'strike' |
  'underline' |
  'italic' |
  'code'

type GenericMarkResolver = {
  [key in MarkType]: (children: ReactNode) => ReactNode
}

export type MarkResolvers = GenericMarkResolver & {
  link: (children: ReactNode, attrs: LinkAttributes) => ReactNode
  styled: (children: ReactNode, attrs: StyledAttributes) => ReactNode
};

export const defaultMarkResolvers: MarkResolvers = {
  link: (children: ReactNode, { href, target, linktype }: LinkAttributes) =>
    React.createElement('a', {
      href: linktype === 'email' ? `mailto:${href}` : href,
      target
    }, children),
  styled: (children: React.ReactNode, attrs: StyledAttributes) =>
    React.createElement('span', { className: attrs.class }, children),
  bold: simpleMarkResolver('b'),
  strong: simpleMarkResolver('strong'),
  italic: simpleMarkResolver('i'),
  strike: simpleMarkResolver('s'),
  underline: simpleMarkResolver('u'),
  code: simpleMarkResolver('code')
}
