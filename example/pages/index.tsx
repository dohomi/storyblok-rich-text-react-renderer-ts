import { render } from 'storyblok-rich-text-react-renderer-ts'
import { demoContent } from '../lib/demoContent'


export default function Home() {
  return (
    <div>
      <h1>This is a test</h1>
      <main>
        {render(demoContent, {
          nodeResolvers: {
            image: (children, attrs) => (
              <img {...attrs} />
            )
          },
          markResolvers: {
            bold: (children) => (
              <strong>{children}</strong>
            ),
            italic: children => (
              <i>{children}</i>
            ),
            link: (children, { target, href }) => {
              return <a href={href} target={target}>{children}</a>
            }
          }
        })}
      </main>
    </div>
  )
}
