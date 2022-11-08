exports.default = {
    default: env("FILESYSTEM_DRIVER") || "local",
    disks: {
        local: {
            driver: "local",
            root: storage_path("app"),
        },
        public: {
            driver: "local",
            root: storage_path("app/public"),
        },
    },
};
