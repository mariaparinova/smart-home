export function generateTabId(tabTitle: string) {
  return tabTitle.replaceAll(/\s+/g, '-');
}

export function generateCardId() {
  return self.crypto.randomUUID();
}
