import { defineStore } from "pinia";

interface IChapterAdd {
  chapterNumber: number | null;
  statusKey: number | null;
  releaseDate: string;
  urlFile: string;
  fileName: string;
}

export const useChapterStore = defineStore('chapterStore', {
  state: () => ({
    chapterAddModel: [] as IChapterAdd[]
  }),
  getters: {
    getChapterAddModel: (state) => state.chapterAddModel
  },
  actions: {
    handleAddChapterModel(chapterAddModel: IChapterAdd) {
      this.chapterAddModel.push(chapterAddModel)
    },
    handleAddMultipleChapterModel(chapterAddModel: IChapterAdd[]) {
      this.chapterAddModel.push(...chapterAddModel)
    },
    handleUpdateChapterModel(index: number, chapterAddModel: IChapterAdd) {
      if (index >= 0 && index < this.chapterAddModel.length) {
        this.chapterAddModel[index] = chapterAddModel
      }
    },
    handleRemoveChapterModel(index: number) {
      if (index >= 0 && index < this.chapterAddModel.length) {
        this.chapterAddModel.splice(index, 1)
      }
    },
    handleResetChapterModel() {
      this.chapterAddModel = []
    }
  }
})
