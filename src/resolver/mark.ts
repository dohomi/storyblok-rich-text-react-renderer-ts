import { LinkAttributes, Mark, StyledAttributes } from '@marvr/storyblok-rich-text-types'
import React, { FunctionComponent, ReactNode } from 'react'

const simpleMarkResolver = (element: string | FunctionComponent) => (children: React.ReactNode) =>
  React.createElement(element, null, children)

export type MarkResolvers = {
  [key in Mark]: ReactNode
};

export const defaultMarkResolvers: MarkResolvers = {
  [Mark.LINK]: (children: React.ReactNode, { href, target, linktype }: LinkAttributes) =>
    React.createElement('a', {
      href: linktype === 'email' ? `mailto:${href}` : href,
      target
    }, children),
  [Mark.STYLED]: (children: React.ReactNode, attrs: StyledAttributes) =>
    React.createElement('span', { className: attrs.class }, children),
  [Mark.BOLD]: simpleMarkResolver('b'),
  [Mark.STRONG]: simpleMarkResolver('strong'),
  [Mark.ITALIC]: simpleMarkResolver('i'),
  [Mark.STRIKE]: simpleMarkResolver('s'),
  [Mark.UNDERLINE]: simpleMarkResolver('u'),
  [Mark.CODE]: simpleMarkResolver('code')
}
