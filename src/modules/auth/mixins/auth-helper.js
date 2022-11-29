const formHelper = {
    data: () => ({}),

    methods: {
        // ===========================================
        // UPDATE USER INPUT FORM AND VALIDITY STATE
        // ===========================================
        updateFormState(data, type) {
            console.log("DATA UPDATE", data);
            this.form[type] = data.value;
            this.validity[type] = data.validity;
        },
    },
};

export default formHelper;