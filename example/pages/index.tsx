import { render } from 'storyblok-rich-text-react-renderer-ts'
import { demoContent } from '../lib/demoContent'


export default function Home() {
  return (
    <div>
      <h1>This is a test</h1>
      <main>
        {render(demoContent)}
      </main>
    </div>
  )
}
