import html2canvas from 'html2canvas'
import type { Ref } from 'vue'

export function usePrintExport() {
  function printSheet() {
    window.print()
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
