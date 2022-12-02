export default {
    getFileData: (state) => state.file,
    getAllFilesData: (state) => (id) => {
        return state.all_files.find((file) => file.id === id);
    },
};