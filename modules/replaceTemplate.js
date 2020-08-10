module.exports = (temp, project) => {
    let output = temp.replace(/{%PROJECT_NAME%}/g, project.projectName);
    output = output.replace(/{%PROJECT_SOURCE%}/g, project.projectSource);
    output = output.replace(/{%CLIENT_NAME%}/g, project.clientName);
    output = output.replace(/{%DEVELOPER%}/g, project.developer);
    output = output.replace(/{%PROJECT_MANAGER%}/g, project.projectManager);
    output = output.replace(/{%STARTING_DATE%}/g, project.startingDate);
    output = output.replace(/{%DUE_DATE%}/g, project.dueDate);
    output = output.replace(/{%PLATFORM%}/g, project.platform);
    output = output.replace(/{%THEME%}/g, project.theme);
    output = output.replace(/{%PLUGINS%}/g, project.plugins);
    output = output.replace(/{%STATUS%}/g, project.status);
    output = output.replace(/{%ID%}/g, project.id);
    return output;
};