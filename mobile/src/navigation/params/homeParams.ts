/**
 * Param list for the Home feature nested stack.
 */
export type HomeStackParamList = {
  Home: undefined;
  HomeDetails: { itemId: string };
  /** Modal screen; `origin` is optional metadata (e.g. for debugging). */
  HomeModalInfo: { origin?: string } | undefined;
};
