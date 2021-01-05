// vetur.config.js
//https://vuejs.github.io/vetur/reference/#example
/** @type {import('vls').VeturConfig} */
module.exports = {
    // **optional** default: `{}`
    // override vscode settings part
    // Notice: It only affects the settings used by Vetur.
    settings: {
        "vetur.useWorkspaceDependencies": true,
        "vetur.experimental.templateInterpolationService": true
    },
    // **optional** default: `[{ root: './' }]`
    // support monorepos
    projects: [
        './frontend',
    ]
}