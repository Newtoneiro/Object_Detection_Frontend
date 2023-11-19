/**
 * @file LoadingContext.types.ts
 * @description LoadingContext Typescript Type Definitions.
 */

/**
 * Represents the props for the LoadingContext component.
 * @interface ILoadingContext
 * @exports ILoadingContext
 *
 * @property {boolean} loading - Whether the loading is taking place.
 * @property {boolean} displayLoadingCard - Whether the loading card should be displayed.
 * @property {string | null} loadingCardText - The loading card text.
 * @property {boolean} assetsLoaded - Whether the assets are loaded.
 * @property {(val: boolean) => void} setLoading - The function to set the loading.
 * @property {(val: boolean) => void} setDisplayLoadingCard - The function to set the display loading card.
 * @property {(val: string | null) => void} setLoadingCardText - The function to set the loading card text.
 */
export interface ILoadingContext {
  loading: boolean;
  displayLoadingCard: boolean;
  loadingCardText: string | null;
  assetsLoaded: boolean;
  setLoading: (val: boolean) => void;
  setDisplayLoadingCard: (val: boolean) => void;
  setLoadingCardText: (val: string | null) => void;
}
