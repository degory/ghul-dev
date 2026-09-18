// The built site, served the way the host serves it.
//
//   npm run build && npm run serve
//
// `vitepress preview` is not quite the host: the Rosetta Code section answers every address under
// it from one page, which is a rule in ghul-playground's deploy/nginx/ghul.dev.conf and nowhere
// else. Without it /rosetta/<slug> is a 404 locally and works in production, which is the wrong
// way round for a thing to be broken. This serves clean URLs and that fallback, and nothing else -
// it is for looking at the site, not for running it.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'

const ROOT = new URL('../src/.vitepress/dist/', import.meta.url).pathname
const TYPES = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.ico':'image/x-icon', '.md':'text/plain' }

const exists = async p => { try { return (await stat(p)).isFile() } catch { return false } }

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  const tries = [join(ROOT, path), join(ROOT, path + '.html'), join(ROOT, path, 'index.html')]
  if (path.startsWith('/rosetta/')) tries.push(join(ROOT, 'rosetta/index.html'))
  tries.push(join(ROOT, '404.html'))
  for (const file of tries) {
    if (await exists(file)) {
      res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' })
      res.end(await readFile(file))
      return
    }
  }
  res.writeHead(404); res.end('not found')
}).listen(5099, () => console.log('http://127.0.0.1:5099/'))
