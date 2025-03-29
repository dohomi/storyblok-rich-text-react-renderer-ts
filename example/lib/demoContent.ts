export const demoContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 1,
      },
      content: [
        {
          text: "Headline",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          text: "This is some Rich Text Editor",
          type: "text",
        },
        {
          type: "hard_break",
        },
        {
          text: "You ",
          type: "text",
        },
        {
          text: "can",
          type: "text",
          marks: [
            {
              type: "italic",
            },
          ],
        },
        {
          text: " ",
          type: "text",
        },
        {
          text: "try",
          type: "text",
          marks: [
            {
              type: "underline",
            },
          ],
        },
        {
          text: " ",
          type: "text",
        },
        {
          text: "different",
          type: "text",
          marks: [
            {
              type: "subscript",
            },
          ],
        },
        {
          text: "markups",
          type: "text",
          marks: [
            {
              type: "superscript",
            },
          ],
        },
        {
          text: "some",
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
        },
        {
          text: " ",
          type: "text",
        },
        {
          text: "styling",
          type: "text",
          marks: [
            {
              type: "strike",
            },
          ],
        },
      ],
    },
    {
      type: "bullet_list",
      content: [
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "one",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "two",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "three",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "ordered_list",
      attrs: {
        order: 1,
      },
      content: [
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "one",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "two",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "three",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
    },
  ],
};
