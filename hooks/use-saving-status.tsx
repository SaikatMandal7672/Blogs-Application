import { create } from "zustand"

type SavingStatusStore = {
    isSaving: boolean;
    onIsSaving: () => void;
    onIsSaved: () => void;
}

export const useSavingStatus = create<SavingStatusStore>((set) => ({
    isSaving: false,
    onIsSaving: () => set({ isSaving: true }),
    onIsSaved: () => set({ isSaving: false })
}))

