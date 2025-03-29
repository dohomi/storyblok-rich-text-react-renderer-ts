import {
  LinkAttributes as LA,
  StyledAttributes,
} from "@marvr/storyblok-rich-text-types";
import { ReactNode, createElement, FC } from "react";

type LinkAttributes = LA & {
  anchor?: string;
};

export type StoryblokRichtextMark =
  | "bold"
  | "italic"
  | "strike"
  | "underline"
  | "code"
  | "link"
  | "styled";

const simpleMarkResolver =
  (element: string | FC) =>
  (children: ReactNode): JSX.Element | null =>
    createElement(element, null, children);

export const defaultMarkResolvers = {
  link: (
    children: ReactNode,
    { href, linktype, target }: LinkAttributes
  ): JSX.Element | null =>
    createElement(
      "a",
      {
        href: linktype === "email" ? `mailto:${href}` : href,
        target,
      },
      children
    ),
  styled: (children: ReactNode, attrs: StyledAttributes): JSX.Element | null =>
    createElement("span", { className: attrs.class }, children),
  bold: simpleMarkResolver("b"),
  strong: simpleMarkResolver("strong"),
  italic: simpleMarkResolver("i"),
  strike: simpleMarkResolver("s"),
  underline: simpleMarkResolver("u"),
  code: simpleMarkResolver("code"),
};
