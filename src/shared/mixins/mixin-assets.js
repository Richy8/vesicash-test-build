// ===========================================================
// A SIMPLE APPLICATION LEVEL MIXIN FOR EASY IMAGE LOADING
// WITHIN AND OUTSIDE APPLICATION MODULES
// ===========================================================

const MixinAssets = {
  methods: {
    loadImage(src, module = null) {
      return module
        ? require(`@/modules/${module}/assets/${src}`)
        : require(`@/shared/assets/static/${src}`);
    },

    // =======================================================
    // IMAGES LOADED HERE WOULD NOT BE AVAILABLE IN PROD
    // THEY ARE JUST PLACEHOLDER IMAGES
    // =======================================================
    loadFalseImage(src) {
      return require(`@/shared/assets/dynamic/${src}`);
    },
  },
};

export { MixinAssets };
