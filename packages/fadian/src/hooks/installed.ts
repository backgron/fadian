export const installed = async (ctx: FadianContext) => {
  const { composition } = ctx

  for (const itemType in composition)
    composition[itemType]?.installed?.(ctx)
}
