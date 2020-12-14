import React, { ReactNode } from 'react'
import { BlockResolvers, defaultBlocksResolvers } from './resolver/blocks'
import { defaultMarkResolvers, MarkResolvers } from './resolver/mark'
import { MarkNode } from '@marvr/storyblok-rich-text-types'

type RenderOptionsProps = {
  blokResolvers?: {
    [k: string]: (props: any) => ReactNode
  }
  defaultBlokResolver?: (name: string, props: any) => ReactNode
  nodeResolvers?: Partial<BlockResolvers>
  markResolvers?: Partial<MarkResolvers>
}

export const render = (document: any, options: RenderOptionsProps): ReactNode | null => {
  if (
    typeof document === 'object' &&
    document.type === 'doc' &&
    Array.isArray(document.content)
  ) {
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
      } else if (node.type === 'text') {
        const marks = node.marks ?? []
        return marks.reduceRight((children: any, mark: MarkNode) => {
          const resolver = markResolvers[mark.type]
          return resolver
            ? addKey(resolver(children, mark.attrs))
            : children
        }, node.text)
      } else {
        const resolver = nodeResolvers[node.type]
        return resolver
          ? addKey(resolver(renderNodes(node.content), node.attrs))
          : null
      }
    }

    return renderNodes(document.content)
  }
  return null
}
