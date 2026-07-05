import html2canvas from 'html2canvas'
import type { Ref } from 'vue'

/** Page margin applied via @page only (not element padding). */
export const PRINT_PAGE_MARGIN = '1.5cm'

/** Character sheets and maps print on A4 portrait. */
export const SHEET_PRINT_PAGE_SIZE = 'A4 portrait'
export const MAP_PRINT_PAGE_SIZE = 'A4 portrait'

const PRINT_IFRAME_ID = 'tod-print-iframe'

type PrintLayout = 'a4' | 'fit'

function buildSheetPrintStyles(): string {
  return `
      @page {
        size: ${SHEET_PRINT_PAGE_SIZE};
        margin: ${PRINT_PAGE_MARGIN};
      }

      html,
      body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: white;
        overflow: hidden;
      }

      .tod-printable {
        width: 100%;
        height: 100%;
        margin: 0 !important;
        padding: 0 !important;
        border: none !important;
        box-shadow: none !important;
        outline: none !important;
        aspect-ratio: unset !important;
        max-width: none !important;
        overflow: hidden;
        display: flex;
        box-sizing: border-box;
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
        page-break-inside: avoid;
        break-inside: avoid;
      }

      .tod-printable > * {
        width: 100%;
        height: 100%;
        flex: 1;
        min-height: 0;
      }
  `
}

function buildFitPrintStyles(): string {
  return `
      @page {
        size: ${MAP_PRINT_PAGE_SIZE};
        margin: ${PRINT_PAGE_MARGIN};
      }

      html,
      body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: white;
      }

      body {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100%;
      }

      .tod-printable {
        width: auto !important;
        height: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        border: none !important;
        box-shadow: none !important;
        outline: none !important;
        aspect-ratio: unset !important;
        max-width: none !important;
        overflow: visible;
        display: block;
        box-sizing: border-box;
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
        page-break-inside: avoid;
        break-inside: avoid;
      }

      .tod-printable > * {
        width: auto;
        height: auto;
      }

      .map-grid {
        border-collapse: collapse !important;
        border: 2pt solid #000 !important;
      }

      .map-cell {
        width: 1in !important;
        height: 1in !important;
        min-width: 1in !important;
        min-height: 1in !important;
        border: 1pt solid #000 !important;
        print-color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
      }
  `
}

function buildPrintDocument(element: HTMLElement, layout: PrintLayout): string {
  const headStyles = Array.from(
    document.querySelectorAll<HTMLLinkElement | HTMLStyleElement>('link[rel="stylesheet"], style')
  )
    .map(node => node.outerHTML)
    .join('\n')

  const printStyles = layout === 'fit'
    ? buildFitPrintStyles()
    : buildSheetPrintStyles()

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Print</title>
    ${headStyles}
    <style>${printStyles}</style>
  </head>
  <body>${element.outerHTML}</body>
</html>`
}

function printWhenReady(win: Window, doc: Document, onDone: () => void) {
  const links = Array.from(doc.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
  let printed = false

  const print = () => {
    if (printed) return
    printed = true
    win.addEventListener('afterprint', onDone, { once: true })
    win.focus()
    win.print()
  }

  if (links.length === 0) {
    print()
    return
  }

  let pending = links.length
  const onLinkReady = () => {
    pending--
    if (pending <= 0) print()
  }

  links.forEach((link) => {
    if (link.sheet) onLinkReady()
    else {
      link.addEventListener('load', onLinkReady, { once: true })
      link.addEventListener('error', onLinkReady, { once: true })
    }
  })

  setTimeout(print, 2000)
}

export function usePrintExport() {
  function printSheet(target: Ref<HTMLElement | null>, layout: PrintLayout = 'a4') {
    const element = target.value
    if (!element) return

    document.getElementById(PRINT_IFRAME_ID)?.remove()

    const iframe = document.createElement('iframe')
    iframe.id = PRINT_IFRAME_ID
    iframe.setAttribute('aria-hidden', 'true')
    Object.assign(iframe.style, {
      position: 'fixed',
      width: '0',
      height: '0',
      border: 'none',
      right: '0',
      bottom: '0'
    })
    document.body.appendChild(iframe)

    const win = iframe.contentWindow
    const doc = iframe.contentDocument
    if (!win || !doc) {
      iframe.remove()
      return
    }

    doc.open()
    doc.write(buildPrintDocument(element, layout))
    doc.close()

    const cleanup = () => iframe.remove()
    printWhenReady(win, doc, cleanup)
  }

  async function saveAsImage(element: HTMLElement | null, filename: string) {
    if (!element) return

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false
    })

    const link = document.createElement('a')
    link.download = filename
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  async function saveRefAsImage(target: Ref<HTMLElement | null>, filename: string) {
    await saveAsImage(target.value, filename)
  }

  return { printSheet, saveAsImage, saveRefAsImage }
}
