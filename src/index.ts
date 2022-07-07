import React, { ReactNode } from 'react'
import { defaultBlocksResolvers, StoryblokRichtextContentType } from './resolver/blocks'
import { defaultMarkResolvers, StoryblokRichtextMark } from './resolver/mark'

type StoryblokRichtextContent = {
  type: StoryblokRichtextContentType;
  attrs?: {
    level?: number;
    class?: string;
    src?: string;
    alt?: string;
    title?: string;
    order?: number;
    body?: Array<{
      _uid: string;
    }>;
  };
  marks?: {
    type: StoryblokRichtextMark;
    attrs?: {
      linktype?: string;
      href?: string;
      target?: string;
      anchor?: string;
      uuid?: string;
      class?: string;
    };
  }[];
  text?: string;
  content: StoryblokRichtextContent[];
};

export type StoryblokRichtext = {
  type: 'doc';
  content: StoryblokRichtextContent[];
};

export { Mark, Block } from '@marvr/storyblok-rich-text-types'

export type RenderOptionsProps = {
  blokResolvers?: {
    [k: string]: (props: any) => JSX.Element | null
  }
  defaultBlokResolver?: (name: string, props: any) => JSX.Element | null
  nodeResolvers?: Partial<typeof defaultBlocksResolvers>
  markResolvers?: Partial<typeof defaultMarkResolvers>
  defaultStringResolver?: (str: string) => JSX.Element
}

export const render = (document: StoryblokRichtext | any, options?: RenderOptionsProps): ReactNode | null => {
  if (document?.type === 'doc' && Array.isArray(document?.content)) {
    const {
      blokResolvers = {},
      defaultBlokResolver = () => null,
      nodeResolvers: customNodeResolvers = {},
      markResolvers: customMarkResolvers = {}
    } = options ?? {}
    const nodeResolvers: any = {
      ...defaultBlocksResolvers,
      ...customNodeResolvers
    }

    const markResolvers: any = {
      ...defaultMarkResolvers,
      ...customMarkResolvers
    }

    let currentKey = 0

    const addKey = (element: any) =>
      React.isValidElement(element)
        ? React.cloneElement(element, { key: currentKey++ })
        : element

    const renderNodes = (nodes: any) => {
      const elements = nodes
        ? nodes.map(renderNode).filter((node: any) => node != null)
        : null
      return Array.isArray(elements) && elements.length === 0
        ? null
        : elements
    }

    const renderNode = (node: any) => {
      if (node.type === 'blok') {
        const { body } = node.attrs
        return body.map(({ component, ...props }: any) => {
          const resolver = blokResolvers[component]
          const element = resolver
            ? resolver(props)
            : defaultBlokResolver(component, props)
          return addKey(element)
        })
      } else {
        let childNode
        if (node.type === 'text') {
          childNode = node.text
        } else {
          const resolver = nodeResolvers[node.type]
          childNode = resolver
            ? addKey(resolver(renderNodes(node.content), node.attrs))
            : null
        }
        const marks = node.marks ?? []
        return marks.reduceRight((children: any, mark: any) => {
          const resolver = markResolvers[mark.type]
          return resolver
            ? addKey(resolver(children, mark.attrs))
            : children
        }, childNode)
      }
    }

    return renderNodes(document.content)
  } else if (typeof document === 'string') {
    return options?.defaultStringResolver ? options.defaultStringResolver(document) : document
  }
  return null
}
