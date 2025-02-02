const cw = require("capture-website");

const projects = require("./projects.json");

module.exports = function(api) {
  api.loadSource(async actions => {
    const contentTypeProjects = actions.addCollection("Project");

    for (const project of projects) {
      try {
        await cw.file(project.url, `./static/img/${project.id}.png`, {
          scaleFactor: 1
        });
        project.image = `${project.id}.png`;
      } catch (err) {
        project.image =
          err.code === "EEXIST" ? `${project.id}.png` : "dummy.png";
      }

      contentTypeProjects.addNode({
        id: project.id,
        name: project.name,
        image: project.image,
        description: project.description,
        url: project.url,
        source: project.source,
        tags: project.tags
      });
    }
  });
};
