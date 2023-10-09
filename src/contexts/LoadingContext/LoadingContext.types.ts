export interface ILoadingContext {
  loading: boolean;
  displayLoadingCard: boolean;
  loadingCardText: string | null;
  setLoading: (val: boolean) => void;
  setDisplayLoadingCard: (val: boolean) => void;
  setLoadingCardText: (val: string | null) => void;
}
